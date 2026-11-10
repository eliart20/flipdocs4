import type { FlipEngine } from "../engine/engine";
import { isCancellation } from "../errors";
import { closeImage } from "../source/decode";
import type { ThumbnailResult } from "../source/pageSource";
import type { FlipBookStrings, OutlineNode, SearchHandle, SearchMatch, SearchOptions, SearchProgress } from "../types";
import { ICONS, button, el, uniqueId } from "./dom";
import { format } from "./strings";

/**
 * The side drawer: page thumbnails, the table of contents and search. Lists
 * are virtualized or capped, so a 2,000-page book costs a few dozen DOM
 * nodes, never one subtree per page.
 */

export type PanelKind = "thumbnails" | "outline" | "search";

export interface PanelHost {
  engine: FlipEngine;
  strings(): FlipBookStrings;
  goToPage(page: number): void;
  search(query: string, options: SearchOptions, onProgress: (progress: SearchProgress) => void): SearchHandle;
  showMatches(matches: SearchMatch[], current: SearchMatch | null): void;
  pageLabel(page: number): string;
  onClose(): void;
}

const THUMB_WIDTH = 92;
const THUMB_GAP = 10;
const THUMB_CACHE = 160;
const OUTLINE_LIMIT = 3000;
const RESULT_LIMIT = 500;

export class SidePanel {
  readonly element: HTMLElement;
  private readonly title: HTMLElement;
  private readonly body: HTMLElement;
  private kind: PanelKind | null = null;
  private cleanup: (() => void) | null = null;
  private readonly thumbs = new Map<number, HTMLElement>();
  private thumbGeneration = -1;
  private searchState: { query: string; options: SearchOptions; progress: SearchProgress | null; current: SearchMatch | null } = {
    query: "",
    options: {},
    progress: null,
    current: null,
  };
  private activeSearch: SearchHandle | null = null;
  private onPageChange: (() => void) | null = null;

  constructor(private readonly host: PanelHost) {
    const titleId = uniqueId("flipdocs-panel");
    this.title = el("h2", "flipdocs__panel-title", { id: titleId });
    this.body = el("div", "flipdocs__panel-body");
    const close = button("flipdocs__button flipdocs__panel-close", host.strings().close, ICONS.close, () => host.onClose());
    this.element = el(
      "aside",
      "flipdocs__panel",
      { role: "dialog", "aria-modal": "false", "aria-labelledby": titleId, hidden: true },
      el("div", "flipdocs__panel-header", undefined, this.title, close),
      this.body,
    );
  }

  get current(): PanelKind | null {
    return this.kind;
  }

  open(kind: PanelKind): void {
    this.closeContent();
    this.kind = kind;
    this.element.hidden = false;
    this.element.dataset.kind = kind;
    const strings = this.host.strings();
    this.title.textContent = kind === "thumbnails" ? strings.thumbnails : kind === "outline" ? strings.outline : strings.search;
    if (kind === "thumbnails") this.buildThumbnails();
    else if (kind === "outline") this.buildOutline();
    else this.buildSearch();
  }

  close(): void {
    this.closeContent();
    this.kind = null;
    this.element.hidden = true;
  }

  /** The document changed: nothing cached still applies. */
  reset(): void {
    this.activeSearch?.cancel();
    this.activeSearch = null;
    this.searchState = { query: "", options: {}, progress: null, current: null };
    this.clearThumbs();
    if (this.kind) this.open(this.kind);
  }

  pageChanged(): void {
    this.onPageChange?.();
  }

  private closeContent(): void {
    this.cleanup?.();
    this.cleanup = null;
    this.onPageChange = null;
    this.body.replaceChildren();
  }

  private clearThumbs(): void {
    for (const node of this.thumbs.values()) {
      if (node instanceof HTMLCanvasElement) {
        node.width = 0;
        node.height = 0;
      }
    }
    this.thumbs.clear();
  }

  /* -------------------------------------------------------------- */
  /* Thumbnails                                                       */
  /* -------------------------------------------------------------- */

  private thumbnailNode(page: number, height: number, onReady: () => void): HTMLElement | null {
    const generation = this.host.engine.state.generation;
    if (generation !== this.thumbGeneration) {
      this.thumbGeneration = generation;
      this.clearThumbs();
    }
    const cached = this.thumbs.get(page);
    if (cached) return cached;
    const store = this.host.engine.pages;
    if (!store) return null;
    store.thumbnail(page, height).then(
      (result: ThumbnailResult | null) => {
        if (!result || this.host.engine.state.generation !== generation) {
          if (result?.owned) closeImage(result.image);
          return;
        }
        let node: HTMLElement;
        if (result.url) {
          const image = el("img", "flipdocs__thumb-image", { alt: "", loading: "lazy", decoding: "async" });
          image.src = result.url;
          node = image;
        } else if (result.image) {
          const canvas = el("canvas", "flipdocs__thumb-image");
          const source = result.image as CanvasImageSource & { width: number; height: number };
          const scale = Math.min(1, (height * 2) / Math.max(1, source.height));
          canvas.width = Math.max(1, Math.round(source.width * scale));
          canvas.height = Math.max(1, Math.round(source.height * scale));
          canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height);
          if (result.owned) closeImage(result.image);
          node = canvas;
        } else {
          return;
        }
        this.thumbs.set(page, node);
        if (this.thumbs.size > THUMB_CACHE) {
          const oldest = this.thumbs.keys().next().value as number;
          const dropped = this.thumbs.get(oldest);
          this.thumbs.delete(oldest);
          if (dropped instanceof HTMLCanvasElement) {
            dropped.width = 0;
            dropped.height = 0;
          }
        }
        onReady();
      },
      (error) => {
        if (!isCancellation(error)) this.thumbs.delete(page);
      },
    );
    return null;
  }

  private buildThumbnails(): void {
    const engine = this.host.engine;
    const scroller = el("div", "flipdocs__thumbs", { role: "list" });
    const spacer = el("div", "flipdocs__thumbs-spacer");
    scroller.append(spacer);
    this.body.append(scroller);

    const aspect = engine.pageSource?.pageAspect ?? 0.72;
    const cellHeight = Math.round(THUMB_WIDTH / aspect) + 26;
    const rendered = new Map<number, HTMLElement>();
    let frame = 0;

    const layout = () => {
      frame = 0;
      const count = engine.state.pageCount;
      const width = Math.max(THUMB_WIDTH, scroller.clientWidth - 2 * THUMB_GAP);
      const columns = Math.max(1, Math.floor((width + THUMB_GAP) / (THUMB_WIDTH + THUMB_GAP)));
      const rows = Math.ceil(count / columns);
      const rowHeight = cellHeight + THUMB_GAP;
      spacer.style.height = `${rows * rowHeight + THUMB_GAP}px`;
      const first = Math.max(0, Math.floor(scroller.scrollTop / rowHeight) - 2);
      const last = Math.min(rows - 1, Math.ceil((scroller.scrollTop + scroller.clientHeight) / rowHeight) + 2);
      const keep = new Set<number>();
      const offset = Math.max(THUMB_GAP, (scroller.clientWidth - columns * THUMB_WIDTH - (columns - 1) * THUMB_GAP) / 2);
      for (let row = first; row <= last; row++) {
        for (let column = 0; column < columns; column++) {
          const page = row * columns + column + 1;
          if (page > count) break;
          keep.add(page);
          let cell = rendered.get(page);
          if (!cell) {
            cell = el("button", "flipdocs__thumb", { type: "button", role: "listitem" });
            cell.addEventListener("click", () => this.host.goToPage(page));
            cell.append(el("span", "flipdocs__thumb-frame"), el("span", "flipdocs__thumb-label", undefined, this.host.pageLabel(page)));
            cell.setAttribute("aria-label", format(this.host.strings().pageOf, { page: this.host.pageLabel(page), count }));
            rendered.set(page, cell);
            spacer.append(cell);
          }
          cell.style.transform = `translate(${offset + column * (THUMB_WIDTH + THUMB_GAP)}px, ${THUMB_GAP + row * rowHeight}px)`;
          cell.style.width = `${THUMB_WIDTH}px`;
          cell.style.height = `${cellHeight}px`;
          const frameNode = cell.firstElementChild as HTMLElement;
          if (!frameNode.firstChild) {
            const image = this.thumbnailNode(page, Math.round(THUMB_WIDTH / aspect), schedule);
            // One node cannot sit in two cells; a cached thumbnail belongs to its page.
            if (image && !image.isConnected) frameNode.append(image);
          }
          cell.dataset.current = engine.state.visiblePages.includes(page) ? "true" : "false";
        }
      }
      for (const [page, cell] of rendered) {
        if (!keep.has(page)) {
          cell.remove();
          rendered.delete(page);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(layout);
    };
    const reveal = () => {
      const count = engine.state.pageCount;
      const width = Math.max(THUMB_WIDTH, scroller.clientWidth - 2 * THUMB_GAP);
      const columns = Math.max(1, Math.floor((width + THUMB_GAP) / (THUMB_WIDTH + THUMB_GAP)));
      const row = Math.floor((Math.min(count, engine.state.page) - 1) / columns);
      const top = row * (cellHeight + THUMB_GAP);
      if (top < scroller.scrollTop || top + cellHeight > scroller.scrollTop + scroller.clientHeight) {
        scroller.scrollTop = Math.max(0, top - scroller.clientHeight / 3);
      }
      schedule();
    };

    scroller.addEventListener("scroll", schedule, { passive: true });
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(scroller);
    this.onPageChange = reveal;
    this.cleanup = () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      scroller.removeEventListener("scroll", schedule);
    };
    reveal();
  }

  /* -------------------------------------------------------------- */
  /* Outline                                                          */
  /* -------------------------------------------------------------- */

  private buildOutline(): void {
    const source = this.host.engine.pageSource;
    const generation = this.host.engine.state.generation;
    const empty = () => this.body.replaceChildren(el("p", "flipdocs__panel-note", undefined, this.host.strings().noOutline));
    if (!source?.getOutline) {
      empty();
      return;
    }
    let budget = OUTLINE_LIMIT;
    const render = (nodes: OutlineNode[], depth: number): HTMLElement => {
      const list = el("ul", "flipdocs__outline", { role: depth === 0 ? "tree" : "group" });
      for (const node of nodes) {
        if (budget-- <= 0) break;
        const item = el("li", "flipdocs__outline-item", { role: "treeitem" });
        const link = el(
          "button",
          "flipdocs__outline-link",
          { type: "button" },
          el("span", "flipdocs__outline-title", undefined, node.title),
          el("span", "flipdocs__outline-page", undefined, this.host.pageLabel(node.page)),
        );
        link.style.paddingInlineStart = `${12 + depth * 14}px`;
        link.addEventListener("click", () => this.host.goToPage(node.page));
        item.append(link);
        if (node.children?.length && depth < 12) item.append(render(node.children, depth + 1));
        list.append(item);
      }
      return list;
    };
    source.getOutline().then(
      (outline) => {
        if (this.kind !== "outline" || this.host.engine.state.generation !== generation) return;
        if (!outline.length) empty();
        else this.body.replaceChildren(render(outline, 0));
      },
      () => {
        if (this.kind === "outline") empty();
      },
    );
  }

  /* -------------------------------------------------------------- */
  /* Search                                                           */
  /* -------------------------------------------------------------- */

  private buildSearch(): void {
    const strings = this.host.strings();
    const source = this.host.engine.pageSource;
    if (!source?.capabilities.search) {
      this.body.append(el("p", "flipdocs__panel-note", undefined, strings.searchUnavailable));
      return;
    }
    const state = this.searchState;
    const input = el("input", "flipdocs__search-input", {
      type: "search",
      placeholder: strings.searchPlaceholder,
      "aria-label": strings.search,
      autocomplete: "off",
      spellcheck: "false",
    });
    input.value = state.query;
    const option = (label: string, key: "matchCase" | "matchDiacritics") => {
      const box = el("input", undefined, { type: "checkbox" });
      box.checked = !!state.options[key];
      box.addEventListener("change", () => {
        state.options = { ...state.options, [key]: box.checked };
        run();
      });
      return el("label", "flipdocs__search-option", undefined, box, el("span", undefined, undefined, label));
    };
    const status = el("p", "flipdocs__search-status", { role: "status", "aria-live": "polite" });
    const results = el("ol", "flipdocs__search-results");
    this.body.append(
      el("div", "flipdocs__search-form", undefined, input, option(strings.searchMatchCase, "matchCase"), option(strings.searchMatchDiacritics, "matchDiacritics")),
      status,
      results,
    );

    let renderedCount = -1;
    const show = (progress: SearchProgress | null) => {
      state.progress = progress;
      if (!progress || !progress.query.trim()) {
        status.textContent = "";
        results.replaceChildren();
        renderedCount = -1;
        this.host.showMatches([], null);
        return;
      }
      const accounted = progress.indexedPages + progress.failedPages.length;
      const parts: string[] = [];
      if (progress.matches.length > 0) parts.push(format(strings.results, { count: progress.matches.length }));
      else parts.push(progress.complete ? strings.searchNoMatches : strings.searchPartial);
      // Until every page is accounted for, say how far the scan has got.
      if (!progress.complete) parts.push(format(strings.searchProgress, { done: accounted, total: progress.totalPages }));
      status.textContent = parts.join(" · ");
      if (progress.matches.length !== renderedCount) {
        renderedCount = progress.matches.length;
        results.replaceChildren();
        for (const match of progress.matches.slice(0, RESULT_LIMIT)) {
          const excerpt = el("span", "flipdocs__result-text", { dir: "auto" });
          excerpt.append(
            match.excerpt.slice(0, match.excerptStart),
            el("mark", undefined, undefined, match.excerpt.slice(match.excerptStart, match.excerptEnd)),
            match.excerpt.slice(match.excerptEnd),
          );
          const row = el(
            "button",
            "flipdocs__result",
            { type: "button" },
            el("span", "flipdocs__result-page", undefined, this.host.pageLabel(match.page)),
            excerpt,
          );
          row.addEventListener("click", () => {
            state.current = match;
            this.host.showMatches(progress.matches, match);
            this.host.goToPage(match.page);
          });
          results.append(el("li", undefined, undefined, row));
        }
      }
      this.host.showMatches(progress.matches, state.current);
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    const run = () => {
      if (timer) clearTimeout(timer);
      timer = null;
      state.query = input.value;
      state.current = null;
      this.activeSearch?.cancel();
      renderedCount = -1;
      this.activeSearch = this.host.search(state.query, state.options, show);
    };
    input.addEventListener("input", () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(run, 220);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        run();
      }
    });
    if (state.progress) show(state.progress);
    this.cleanup = () => {
      if (timer) clearTimeout(timer);
    };
    queueMicrotask(() => input.focus({ preventScroll: true }));
  }

  destroy(): void {
    this.activeSearch?.cancel();
    this.closeContent();
    this.clearThumbs();
    this.element.remove();
  }
}
