import type { FlipEngine } from "../engine/engine";
import { isCancellation } from "../errors";
import type { NormalizedRect, PageLink, PageText, SearchMatch } from "../types";
import { el, setAttributes, svg } from "./dom";

/**
 * DOM layers that sit exactly on the settled, flat pages: links, search
 * highlights and (in select-text mode) selectable text. They are positioned
 * from the same layout the renderer uses, hidden while paper is bent or a
 * transition runs, and placed above the canvas, so a link or a text selection
 * always wins over a page-turn gesture.
 */

const percent = (value: number) => `${(value * 100).toFixed(4)}%`;

function place(node: HTMLElement | SVGElement, rect: NormalizedRect): void {
  const style = (node as HTMLElement).style;
  style.left = percent(rect.x);
  style.top = percent(rect.y);
  style.width = percent(rect.width);
  style.height = percent(rect.height);
}

interface PageLayer {
  page: number;
  root: HTMLDivElement;
  links: HTMLDivElement;
  hits: HTMLDivElement;
  text: HTMLDivElement;
  linksLoaded: boolean;
  textLoaded: boolean;
  hitsKey: string;
}

const CACHE_LIMIT = 12;

export class PageOverlay {
  readonly element: HTMLDivElement;
  private readonly layers = new Map<number, PageLayer>();
  private readonly linkCache = new Map<number, Promise<PageLink[]>>();
  private readonly textCache = new Map<number, Promise<PageText | null>>();
  private matches: SearchMatch[] = [];
  private currentMatch: SearchMatch | null = null;
  private selectText = false;
  private scheduled = 0;
  private generation = -1;
  private destroyed = false;

  constructor(
    private readonly engine: FlipEngine,
    private readonly goToPage: (page: number) => void,
  ) {
    this.element = el("div", "flipdocs__overlay");
  }

  /** Coalesce view changes into one update. Never keeps a frame loop alive. */
  schedule(): void {
    if (this.scheduled || this.destroyed) return;
    this.scheduled = requestAnimationFrame(() => {
      this.scheduled = 0;
      this.update();
    });
  }

  setMatches(matches: SearchMatch[], current: SearchMatch | null): void {
    this.matches = matches;
    this.currentMatch = current;
    this.schedule();
  }

  setSelectText(enabled: boolean): void {
    if (this.selectText === enabled) return;
    this.selectText = enabled;
    this.element.dataset.selectText = enabled ? "true" : "false";
    if (!enabled) window.getSelection()?.removeAllRanges();
    this.schedule();
  }

  /** Drop everything cached for the previous document. */
  reset(): void {
    this.linkCache.clear();
    this.textCache.clear();
    this.matches = [];
    this.currentMatch = null;
    for (const layer of this.layers.values()) layer.root.remove();
    this.layers.clear();
  }

  private remember<T>(cache: Map<number, Promise<T>>, page: number, load: () => Promise<T>): Promise<T> {
    const cached = cache.get(page);
    if (cached) return cached;
    const pending = load();
    cache.set(page, pending);
    pending.catch(() => cache.delete(page));
    if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value as number);
    return pending;
  }

  /** Text of a page, shared with the reading view. */
  pageText(page: number): Promise<PageText | null> {
    const store = this.engine.pages;
    if (!store || !store.source.capabilities.text) return Promise.resolve(null);
    return this.remember(this.textCache, page, () => store.text(page, 2));
  }

  private update(): void {
    if (this.destroyed) return;
    const state = this.engine.state;
    if (state.generation !== this.generation) {
      this.generation = state.generation;
      this.reset();
    }
    const rects = this.engine.getPageRects();
    const source = this.engine.pageSource;
    const wanted = new Set(rects.map((entry) => entry.page));
    for (const [page, layer] of this.layers) {
      if (!wanted.has(page)) {
        layer.root.remove();
        this.layers.delete(page);
      }
    }
    this.element.hidden = rects.length === 0;
    if (!source) return;

    for (const { page, rect } of rects) {
      let layer = this.layers.get(page);
      if (!layer) {
        layer = this.createLayer(page);
        this.layers.set(page, layer);
        this.element.append(layer.root);
      }
      const style = layer.root.style;
      style.left = `${rect.x}px`;
      style.top = `${rect.y}px`;
      style.width = `${rect.width}px`;
      style.height = `${rect.height}px`;

      if (source.capabilities.links && !layer.linksLoaded) {
        layer.linksLoaded = true;
        this.loadLinks(layer);
      }
      this.renderHits(layer);
      if (this.selectText && source.capabilities.text && !layer.textLoaded) {
        layer.textLoaded = true;
        this.loadText(layer);
      }
      layer.text.hidden = !this.selectText;
    }
  }

  private createLayer(page: number): PageLayer {
    const root = el("div", "flipdocs__page-layer", { "data-page": page });
    const hits = el("div", "flipdocs__hits", { "aria-hidden": "true" });
    const text = el("div", "flipdocs__text-layer");
    const links = el("div", "flipdocs__links");
    text.hidden = true;
    root.append(hits, text, links);
    return { page, root, links, hits, text, linksLoaded: false, textLoaded: false, hitsKey: "" };
  }

  private loadLinks(layer: PageLayer): void {
    const source = this.engine.pageSource;
    if (!source?.getLinks) return;
    const generation = this.generation;
    this.remember(this.linkCache, layer.page, () => source.getLinks!(layer.page))
      .then((links) => {
        if (this.destroyed || generation !== this.generation || this.layers.get(layer.page) !== layer) return;
        layer.links.replaceChildren();
        for (const link of links) {
          const anchor = el("a", "flipdocs__link", { "aria-label": link.label, title: link.label });
          if (link.url) {
            // External targets open in an isolated tab and never see this page.
            setAttributes(anchor, { href: link.url, target: "_blank", rel: "noopener noreferrer nofollow" });
          } else if (link.page) {
            const target = link.page;
            anchor.setAttribute("href", `#page-${target}`);
            anchor.addEventListener("click", (event) => {
              event.preventDefault();
              this.goToPage(target);
            });
          } else {
            continue;
          }
          place(anchor, link.rect);
          layer.links.append(anchor);
        }
      })
      .catch((error) => {
        if (!isCancellation(error)) layer.linksLoaded = false;
      });
  }

  private renderHits(layer: PageLayer): void {
    const mine = this.matches.filter((match) => match.page === layer.page && match.rects?.length);
    const current = this.currentMatch;
    const key = `${mine.length}:${mine[0]?.start ?? ""}:${mine[mine.length - 1]?.end ?? ""}:${
      current && current.page === layer.page ? current.start : ""
    }`;
    if (key === layer.hitsKey) return;
    layer.hitsKey = key;
    layer.hits.replaceChildren();
    for (const match of mine) {
      const active = current !== null && current.page === match.page && current.start === match.start;
      for (const rect of match.rects!) {
        const mark = el("div", active ? "flipdocs__hit flipdocs__hit--current" : "flipdocs__hit");
        place(mark, rect);
        layer.hits.append(mark);
      }
    }
  }

  /**
   * Selectable text as one SVG per page. Each run is stretched to its
   * rectangle with textLength, so the layer scales with the page and needs no
   * font measurement.
   */
  private loadText(layer: PageLayer): void {
    const generation = this.generation;
    this.pageText(layer.page)
      .then((text) => {
        if (this.destroyed || generation !== this.generation || this.layers.get(layer.page) !== layer) return;
        layer.text.replaceChildren();
        if (!text?.runs?.length) return;
        const aspect = this.engine.getPageRects().find((entry) => entry.page === layer.page);
        const height = 1000;
        const width = aspect ? (1000 * aspect.rect.width) / aspect.rect.height : 720;
        const root = svg("svg", {
          class: "flipdocs__text-svg",
          viewBox: `0 0 ${width.toFixed(2)} ${height}`,
          preserveAspectRatio: "none",
        });
        if (text.lang) root.setAttribute("lang", text.lang);
        for (const run of text.runs) {
          const rect = run.rects[0];
          const content = text.text.slice(run.start, run.end);
          if (!rect || !content.trim()) continue;
          const rtl = (run.dir ?? text.dir) === "rtl";
          const node = svg("text", {
            x: ((rtl ? rect.x + rect.width : rect.x) * width).toFixed(2),
            y: ((rect.y + rect.height * 0.8) * height).toFixed(2),
            "font-size": (rect.height * height * 0.92).toFixed(2),
            textLength: (rect.width * width).toFixed(2),
            lengthAdjust: "spacingAndGlyphs",
          });
          if (rtl) setAttributes(node, { direction: "rtl", "unicode-bidi": "plaintext" });
          node.textContent = content;
          root.append(node);
        }
        layer.text.append(root);
      })
      .catch((error) => {
        if (!isCancellation(error)) layer.textLoaded = false;
      });
  }

  destroy(): void {
    this.destroyed = true;
    if (this.scheduled) cancelAnimationFrame(this.scheduled);
    this.scheduled = 0;
    this.reset();
    this.element.remove();
  }
}
