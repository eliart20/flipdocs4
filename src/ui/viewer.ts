import { FlipEngine } from "../engine/engine";
import type { EngineOptions } from "../engine/engine";
import { FlipBookError, isCancellation, toFlipBookError } from "../errors";
import { SearchService } from "../search/searchSession";
import { safeExternalUrl } from "../source/manifest";
import { NO_CAPABILITIES } from "../source/pageSource";
import type {
  BenchmarkMode,
  BenchmarkResult,
  DiagnosticPose,
  FlipBookSnapshot,
  FlipBookSource,
  FlipBookStrings,
  FlipBookTuning,
  FlipbookCreateOptions,
  FlipbookEventMap,
  FlipbookInstance,
  FlipbookState,
  NavigationResult,
  OutlineNode,
  PageText,
  ReadyEvent,
  SearchHandle,
  SearchMatch,
  SearchOptions,
  SearchProgress,
  ToolbarItem,
} from "../types";
import { ICONS, button, el, icon, ownsKeys, uniqueId } from "./dom";
import { PageOverlay } from "./overlay";
import { SidePanel } from "./panels";
import type { PanelKind } from "./panels";
import { ReadingView } from "./reading";
import { format, resolveStrings } from "./strings";

/**
 * The reader as plain DOM: the engine's canvas plus the toolbar, status and
 * alert regions, overlays, the side panel and the text view. It implements
 * the framework-neutral FlipbookInstance; the React component is a thin
 * wrapper around it. Everything it adds lives inside its own root element.
 */

const DEFAULT_TOOLBAR: ToolbarItem[] = ["previous", "page", "zoomOut", "zoom", "zoomIn", "fullscreen", "next"];

const ENGINE_KEYS = [
  "direction",
  "preloadRadius",
  "cacheSize",
  "maxPixelRatio",
  "maxTextureHeight",
  "interactive",
  "spine",
  "layoutPolicy",
  "pageSizing",
  "transition",
  "reducedMotion",
  "surfaceByteTarget",
] as const;

const same = (a: unknown, b: unknown): boolean =>
  a === b || (typeof a === "object" && typeof b === "object" && JSON.stringify(a) === JSON.stringify(b));

type FullscreenRoot = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};

export class FlipbookViewer implements FlipbookInstance {
  readonly element: HTMLElement;
  private readonly adopted: boolean;
  private readonly engine: FlipEngine;
  private readonly search_: SearchService;
  private readonly overlay: PageOverlay;
  private readonly panel: SidePanel;
  private readonly reading: ReadingView;

  private options: FlipbookCreateOptions;
  private text: FlipBookStrings;
  private readonly listeners = new Map<keyof FlipbookEventMap, Set<(payload: never) => void>>();

  private readonly main: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly status: HTMLElement;
  private readonly statusText: HTMLElement;
  private readonly alert: HTMLElement;
  private readonly notice: HTMLElement;
  private readonly fps: HTMLElement;
  private readonly toolbar: HTMLElement;
  private readonly progress: HTMLElement;
  private readonly progressBar: HTMLElement;
  private readonly live: HTMLElement;

  private wingLeft: HTMLButtonElement | null = null;
  private wingRight: HTMLButtonElement | null = null;
  private pageInput: HTMLInputElement | null = null;
  private pageCount: HTMLElement | null = null;
  private zoomLabel: HTMLButtonElement | null = null;
  private fullscreenButton: HTMLButtonElement | null = null;
  private readonly toggles = new Map<string, HTMLButtonElement>();

  private loadFraction: number | null = 0;
  private error: Error | null = null;
  private selectText = false;
  private lastPanelButton: HTMLElement | null = null;
  private fpsTimer: ReturnType<typeof setInterval> | null = null;
  private noticeTimer: ReturnType<typeof setTimeout> | null = null;
  private liveTimer: ReturnType<typeof setTimeout> | null = null;
  private stateQueued = false;
  private pendingLoad: { resolve(event: ReadyEvent): void; reject(error: unknown): void } | null = null;
  private destroyed = false;
  private readonly addedAttributes: string[] = [];

  constructor(target: HTMLElement, options: FlipbookCreateOptions, adopt: boolean) {
    this.adopted = adopt;
    this.options = { ...options };
    this.text = resolveStrings(options.strings);

    if (adopt) {
      this.element = target;
    } else {
      this.element = el("div", "flipdocs");
      if (options.className) this.element.className = `flipdocs ${options.className}`;
      target.append(this.element);
    }
    const root = this.element;
    this.setRootAttribute("tabindex", "0");
    this.setRootAttribute("role", "region");
    this.setRootAttribute("dir", "ltr");
    this.setRootAttribute("aria-label", options.label ?? this.text.reader);
    this.setRootAttribute("data-flipdocs", uniqueId("reader"));
    if (options.locale) this.setRootAttribute("lang", options.locale);

    this.stage = el("div", "flipdocs__stage");
    this.statusText = el("span", "flipdocs__status-text");
    this.status = el(
      "div",
      "flipdocs__status",
      { role: "status", "aria-live": "polite" },
      el("span", "flipdocs__spinner", { "aria-hidden": "true" }),
      this.statusText,
    );
    this.alert = el("div", "flipdocs__alert", { role: "alert", hidden: true });
    this.notice = el("div", "flipdocs__notice", { role: "status", hidden: true });
    this.fps = el("div", "flipdocs__fps", { "aria-hidden": "true", hidden: true });
    this.live = el("span", "flipdocs__visually-hidden", { "aria-live": "polite" });
    this.progressBar = el("div", "flipdocs__progress-bar");
    this.progress = el("div", "flipdocs__progress", { role: "progressbar", "aria-valuemin": 1 }, this.progressBar);
    this.toolbar = el("div", "flipdocs__toolbar", { role: "toolbar", "aria-label": this.text.reader });

    const deepLinkPage = this.readDeepLink();
    const engineOptions: EngineOptions = {
      ...this.pickEngineOptions(this.options),
      startPage: deepLinkPage ?? options.startPage,
      renderer: options.renderer,
      tuning: options.tuning,
    };
    this.engine = new FlipEngine(this.stage, engineOptions, {
      onReady: (event) => {
        this.error = null;
        this.sync();
        this.pendingLoad?.resolve(event);
        this.pendingLoad = null;
        this.options.onReady?.(event);
        this.emit("ready", event);
      },
      onPageChange: (event) => {
        this.sync();
        this.announcePage();
        this.panel.pageChanged();
        this.reading.refresh();
        this.writeDeepLink(event.page);
        this.options.onPageChange?.(event);
        this.emit("pagechange", event);
      },
      onZoomChange: (zoom) => {
        this.sync();
        this.options.onZoomChange?.(zoom);
        this.emit("zoomchange", zoom);
      },
      onError: (error) => {
        this.error = error;
        this.sync();
        this.options.onError?.(error);
        this.emit("error", error);
      },
      onWarning: (error) => this.warn(error),
      onLoading: (_loading, fraction) => {
        this.loadFraction = fraction;
        this.sync();
      },
      onView: () => this.overlay.schedule(),
      onBoundary: (side) => this.bounce(side === "left" ? this.wingLeft : this.wingRight),
      onRendererChange: (kind) => {
        if (kind === "fallback" && this.options.renderer !== "fallback") this.showNotice(this.text.fallbackNotice);
        this.queueState();
      },
      onFocusRequest: () => {
        if (!root.contains(document.activeElement) || document.activeElement === document.body) {
          root.focus({ preventScroll: true });
        }
      },
      onRender: () => this.startFpsTimer(),
    });

    this.overlay = new PageOverlay(this.engine, (page) => void this.goToPage(page).catch(() => {}));
    this.search_ = new SearchService(
      () => this.engine.pages,
      () => this.engine.state.visiblePages,
    );
    this.panel = new SidePanel({
      engine: this.engine,
      strings: () => this.text,
      goToPage: (page) => void this.goToPage(page).catch(() => {}),
      search: (query, searchOptions, onProgress) => this.search(query, searchOptions, onProgress),
      showMatches: (matches, current) => this.overlay.setMatches(matches, current),
      pageLabel: (page) => this.getPageLabel(page) ?? String(page),
      onClose: () => this.closePanel(),
    });
    this.reading = new ReadingView({
      strings: () => this.text,
      visiblePages: () => this.engine.state.visiblePages,
      pageCount: () => this.engine.state.pageCount,
      pageLabel: (page) => this.getPageLabel(page) ?? String(page),
      pageText: (page) => this.overlay.pageText(page),
      step: (direction) => void (direction === 1 ? this.next() : this.previous()),
      canStep: (direction) => this.engine.canStep(direction),
      onClose: () => this.setReading(false),
    });

    this.stage.append(this.overlay.element, this.status, this.alert, this.notice, this.fps);
    this.main = el("div", "flipdocs__main", undefined, this.stage, this.reading.element, this.panel.element);
    root.append(this.main, this.progress, this.toolbar, this.live);

    this.buildToolbar();
    root.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
    window.addEventListener("hashchange", this.onHashChange);
    this.sync();

    if (options.source) this.load(options.source).catch(() => {});
  }

  private setRootAttribute(name: string, value: string): void {
    // On an adopted root (the React component's own element) an attribute
    // that is already there belongs to the host: it is neither replaced nor
    // taken away again on destroy.
    if (this.adopted && !this.addedAttributes.includes(name) && this.element.hasAttribute(name)) return;
    if (!this.addedAttributes.includes(name)) this.addedAttributes.push(name);
    this.element.setAttribute(name, value);
  }

  private pickEngineOptions(options: Partial<FlipbookCreateOptions>): EngineOptions {
    const picked: Record<string, unknown> = {};
    for (const key of ENGINE_KEYS) if (key in options) picked[key] = options[key];
    return picked as EngineOptions;
  }

  /* ---------------------------------------------------------------- */
  /* Toolbar                                                            */
  /* ---------------------------------------------------------------- */

  private fullscreenAvailable(): boolean {
    const doc = document as FullscreenDocument;
    const root = this.element as FullscreenRoot;
    return (
      (doc.fullscreenEnabled || doc.webkitFullscreenEnabled === true) &&
      (typeof root.requestFullscreen === "function" || typeof root.webkitRequestFullscreen === "function")
    );
  }

  private buildToolbar(): void {
    const t = this.text;
    const items = this.options.toolbar ?? DEFAULT_TOOLBAR;
    const has = (item: ToolbarItem) => items.includes(item);
    this.toolbar.replaceChildren();
    this.toggles.clear();
    this.wingLeft = this.wingRight = null;
    this.pageInput = null;
    this.pageCount = null;
    this.zoomLabel = null;
    this.fullscreenButton = null;

    const middle = el("div", "flipdocs__tools");
    const toggle = (name: string, label: string, paths: readonly string[], action: () => void) => {
      const node = button("flipdocs__button", label, paths, action);
      node.setAttribute("aria-pressed", "false");
      this.toggles.set(name, node);
      return node;
    };

    for (const item of items) {
      switch (item) {
        case "page": {
          const input = el("input", "flipdocs__page-input", {
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": t.goToPage,
          });
          input.addEventListener("focus", () => {
            input.value = String(this.engine.state.page);
            input.select();
          });
          input.addEventListener("blur", () => this.sync());
          input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const page = Number.parseInt(input.value, 10);
              if (Number.isFinite(page)) void this.goToPage(page).catch(() => {});
              input.blur();
              this.element.focus({ preventScroll: true });
            } else if (event.key === "Escape") {
              event.stopPropagation();
              input.blur();
              this.element.focus({ preventScroll: true });
            }
          });
          this.pageInput = input;
          this.pageCount = el("span", "flipdocs__page-count");
          middle.append(el("span", "flipdocs__pages", undefined, input, this.pageCount));
          break;
        }
        case "zoomOut":
          middle.append(button("flipdocs__button", t.zoomOut, ICONS.minus, () => this.zoomOut()));
          break;
        case "zoom": {
          const label = el("button", "flipdocs__button flipdocs__zoom", { type: "button", "aria-label": t.resetZoom, title: t.resetZoom });
          label.addEventListener("click", () => this.resetZoom());
          this.zoomLabel = label;
          middle.append(label);
          break;
        }
        case "zoomIn":
          middle.append(button("flipdocs__button", t.zoomIn, ICONS.plus, () => this.zoomIn()));
          break;
        case "fitWidth":
          middle.append(button("flipdocs__button", t.fitWidth, ICONS.fit, () => this.fitWidth()));
          break;
        case "fullscreen":
          if (this.options.showFullscreen !== false && this.fullscreenAvailable()) {
            this.fullscreenButton = button("flipdocs__button", t.enterFullscreen, ICONS.expand, () => {
              this.toggleFullscreen().catch((error) => this.warn(toFlipBookError(error, "FULLSCREEN_FAILED", "Full screen is not available")));
            });
            middle.append(this.fullscreenButton);
          }
          break;
        case "thumbnails":
          middle.append(toggle("thumbnails", t.thumbnails, ICONS.grid, () => this.togglePanel("thumbnails")));
          break;
        case "outline":
          middle.append(toggle("outline", t.outline, ICONS.list, () => this.togglePanel("outline")));
          break;
        case "search":
          middle.append(toggle("search", t.search, ICONS.search, () => this.togglePanel("search")));
          break;
        case "selectText":
          middle.append(toggle("selectText", t.selectText, ICONS.cursor, () => this.setSelectText(!this.selectText)));
          break;
        case "reading":
          middle.append(toggle("reading", t.readingMode, ICONS.text, () => this.setReading(!this.reading.isOpen)));
          break;
        case "openOriginal": {
          const link = el("a", "flipdocs__button", { target: "_blank", rel: "noopener noreferrer", "aria-label": t.openOriginal, title: t.openOriginal });
          link.append(icon([...ICONS.external]));
          link.dataset.role = "original";
          middle.append(link);
          break;
        }
        default:
          break;
      }
    }

    if (has("previous") || has("next")) {
      // Wings are physical: the left one goes toward the left of the book.
      this.wingLeft = button("flipdocs__button flipdocs__wing", "", ICONS.left, () => void this.stepSide("left"));
      this.wingRight = button("flipdocs__button flipdocs__wing", "", ICONS.right, () => void this.stepSide("right"));
      this.toolbar.append(this.wingLeft, middle, this.wingRight);
    } else {
      this.toolbar.append(middle);
    }
    this.sync();
  }

  /** Which logical step a physical side means in the current direction. */
  private sideStep(side: "left" | "right"): 1 | -1 {
    const ltr = this.engine.state.direction === "ltr";
    return (side === "right") === ltr ? 1 : -1;
  }

  private stepSide(side: "left" | "right"): Promise<NavigationResult> {
    return this.sideStep(side) === 1 ? this.next() : this.previous();
  }

  private bounce(wing: HTMLElement | null): void {
    if (!wing) return;
    wing.removeAttribute("data-bounce");
    // Restart the animation even when it is already running.
    void wing.offsetWidth;
    wing.setAttribute("data-bounce", "true");
    setTimeout(() => wing.removeAttribute("data-bounce"), 420);
  }

  /* ---------------------------------------------------------------- */
  /* State → DOM                                                        */
  /* ---------------------------------------------------------------- */

  private originalUrl(): string | null {
    const source = this.options.source;
    const declared = this.engine.pageSource?.originalUrl ?? source?.originalUrl ?? (source?.type === "pdf" && typeof source.src === "string" ? source.src : undefined);
    return declared ? safeExternalUrl(declared, document.baseURI) : null;
  }

  private sync(): void {
    if (this.destroyed) return;
    const state = this.engine.state;
    const t = this.text;
    const root = this.element;
    root.dataset.direction = state.direction;
    root.dataset.mode = state.mode;
    root.dataset.ready = state.ready ? "true" : "false";
    root.dataset.controls = this.options.showControls === false ? "false" : "true";
    root.dataset.fullscreen = this.isFullscreen() ? "true" : "false";
    root.dataset.renderer = this.engine.rendererKind;

    this.toolbar.hidden = this.options.showControls === false;
    this.progress.hidden = this.options.showControls === false || !state.ready;

    // Loading and failure
    const failed = !!this.error && !state.ready;
    this.status.hidden = !state.loading || failed;
    if (state.loading) {
      this.statusText.textContent =
        this.loadFraction === null || this.loadFraction <= 0
          ? t.loading
          : format(t.loadingPercent, { percent: Math.round(this.loadFraction * 100) });
    }
    if (failed) {
      const message = el("p", "flipdocs__alert-text", undefined, this.error?.message || t.loadFailed);
      const url = this.originalUrl();
      this.alert.replaceChildren(message);
      if (url) {
        this.alert.append(
          el("a", "flipdocs__alert-link", { href: url, target: "_blank", rel: "noopener noreferrer" }, t.openOriginal),
        );
      }
    }
    this.alert.hidden = !failed;

    // Wings
    for (const [wing, side] of [
      [this.wingLeft, "left"],
      [this.wingRight, "right"],
    ] as const) {
      if (!wing) continue;
      const step = this.sideStep(side);
      const label = step === 1 ? t.nextPage : t.previousPage;
      wing.setAttribute("aria-label", label);
      wing.title = label;
      wing.dataset.action = step === 1 ? "next" : "previous";
      wing.setAttribute("aria-disabled", this.engine.canStep(step) ? "false" : "true");
      wing.disabled = !state.ready;
    }

    // Page indicator
    if (this.pageInput && document.activeElement !== this.pageInput) {
      const visible = state.visiblePages.slice().sort((a, b) => a - b);
      this.pageInput.value = !state.ready ? "" : visible.length > 1 ? `${visible[0]}–${visible[visible.length - 1]}` : String(state.page);
      this.pageInput.disabled = !state.ready;
      this.pageInput.style.width = `${Math.max(2, this.pageInput.value.length) + 1.2}ch`;
    }
    if (this.pageCount) this.pageCount.textContent = state.ready ? ` / ${state.pageCount}` : "";

    // Zoom
    if (this.zoomLabel) {
      this.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
      this.zoomLabel.disabled = !state.ready;
    }

    // Progress runs from the start of the book: from the right in RTL.
    if (state.ready && state.pageCount > 0) {
      const fraction = state.pageCount <= 1 ? 1 : (Math.max(...state.visiblePages, state.page) - 1) / (state.pageCount - 1);
      this.progressBar.style.width = `${(fraction * 100).toFixed(3)}%`;
      this.progress.setAttribute("aria-valuemax", String(state.pageCount));
      this.progress.setAttribute("aria-valuenow", String(state.page));
      this.progress.setAttribute("aria-valuetext", format(t.pageOf, { page: state.page, count: state.pageCount }));
    }

    if (this.fullscreenButton) {
      const active = this.isFullscreen();
      const label = active ? t.exitFullscreen : t.enterFullscreen;
      this.fullscreenButton.setAttribute("aria-label", label);
      this.fullscreenButton.title = label;
      this.fullscreenButton.replaceChildren(icon([...(active ? ICONS.shrink : ICONS.expand)]));
    }

    const capabilities = this.engine.pageSource?.capabilities ?? NO_CAPABILITIES;
    const enabled: Record<string, boolean> = {
      thumbnails: state.ready && capabilities.thumbnails,
      outline: state.ready && capabilities.outline,
      search: state.ready && capabilities.search,
      selectText: state.ready && capabilities.text,
      reading: state.ready && capabilities.text,
    };
    const pressed: Record<string, boolean> = {
      thumbnails: this.panel.current === "thumbnails",
      outline: this.panel.current === "outline",
      search: this.panel.current === "search",
      selectText: this.selectText,
      reading: this.reading.isOpen,
    };
    for (const [name, node] of this.toggles) {
      node.disabled = !enabled[name];
      node.setAttribute("aria-pressed", pressed[name] ? "true" : "false");
    }
    const original = this.toolbar.querySelector<HTMLAnchorElement>('[data-role="original"]');
    if (original) {
      const url = this.originalUrl();
      original.hidden = !url;
      if (url) original.href = url;
    }

    this.fps.hidden = this.options.showFps !== true;
    this.overlay.schedule();
    this.queueState();
  }

  private announcePage(): void {
    if (this.liveTimer) clearTimeout(this.liveTimer);
    this.liveTimer = setTimeout(() => {
      this.liveTimer = null;
      const state = this.engine.state;
      if (!state.ready || this.destroyed) return;
      const visible = state.visiblePages.slice().sort((a, b) => a - b);
      this.live.textContent = format(this.text.pageOf, {
        page: visible.length > 1 ? `${visible[0]}–${visible[visible.length - 1]}` : state.page,
        count: state.pageCount,
      });
    }, 350);
  }

  private showNotice(message: string): void {
    this.notice.textContent = message;
    this.notice.hidden = false;
    if (this.noticeTimer) clearTimeout(this.noticeTimer);
    this.noticeTimer = setTimeout(() => {
      this.notice.hidden = true;
      this.noticeTimer = null;
    }, 5000);
  }

  /** The badge samples the render counter; it never asks for a frame itself. */
  private startFpsTimer(): void {
    if (this.options.showFps !== true || this.fpsTimer || this.destroyed) return;
    const tick = () => {
      const rate = this.engine.getSnapshot().renderRate;
      this.fps.textContent = rate > 0 ? `${rate} fps` : this.text.idle;
      if (rate === 0 && this.fpsTimer) {
        clearInterval(this.fpsTimer);
        this.fpsTimer = null;
      }
    };
    tick();
    this.fpsTimer = setInterval(tick, 500);
  }

  private warn(error: FlipBookError): void {
    this.options.onWarning?.(error);
    this.emit("warning", error);
  }

  /* ---------------------------------------------------------------- */
  /* Keyboard                                                           */
  /* ---------------------------------------------------------------- */

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Escape") {
      if (this.reading.isOpen) {
        event.preventDefault();
        this.setReading(false);
      } else if (this.panel.current) {
        event.preventDefault();
        this.closePanel();
      }
      return;
    }
    if (this.options.interactive === false) return;
    // A field, the panel or the text view owns its own keys.
    if (ownsKeys(event.target, this.element) || this.reading.element.contains(event.target as Node)) return;
    const onButton = event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement;
    let handled = true;
    switch (event.key) {
      case "ArrowRight":
        void this.stepSide("right");
        break;
      case "ArrowLeft":
        void this.stepSide("left");
        break;
      case "PageDown":
        void this.next();
        break;
      case "PageUp":
        void this.previous();
        break;
      case " ":
      case "Spacebar":
        // Space on a focused button presses that button.
        if (onButton) handled = false;
        else void this.next();
        break;
      case "+":
      case "=":
        this.zoomIn();
        break;
      case "-":
      case "_":
        this.zoomOut();
        break;
      case "0":
        this.resetZoom();
        break;
      case "Home":
        void this.goToPage(1).catch(() => {});
        break;
      case "End":
        void this.goToPage(this.engine.state.pageCount).catch(() => {});
        break;
      default:
        handled = false;
    }
    if (handled) event.preventDefault();
  };

  /* ---------------------------------------------------------------- */
  /* Panels, text view, text selection                                  */
  /* ---------------------------------------------------------------- */

  private togglePanel(kind: PanelKind): void {
    if (this.panel.current === kind) {
      this.closePanel();
      return;
    }
    this.lastPanelButton = this.toggles.get(kind) ?? null;
    this.panel.open(kind);
    if (kind !== "search") this.panel.element.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    this.sync();
  }

  private closePanel(): void {
    const hadFocus = this.panel.element.contains(document.activeElement);
    this.panel.close();
    this.sync();
    // Focus goes back to whatever opened the panel.
    if (hadFocus) (this.lastPanelButton ?? this.element).focus({ preventScroll: true });
  }

  private setSelectText(enabled: boolean): void {
    this.selectText = enabled;
    this.overlay.setSelectText(enabled);
    this.sync();
  }

  private setReading(open: boolean): void {
    if (open === this.reading.isOpen) return;
    if (open) {
      this.reading.show();
      // One representation at a time for assistive technology.
      this.stage.setAttribute("aria-hidden", "true");
      this.stage.setAttribute("inert", "");
    } else {
      const hadFocus = this.reading.element.contains(document.activeElement);
      this.reading.hide();
      this.stage.removeAttribute("aria-hidden");
      this.stage.removeAttribute("inert");
      if (hadFocus) (this.toggles.get("reading") ?? this.element).focus({ preventScroll: true });
    }
    this.element.dataset.reading = open ? "true" : "false";
    this.sync();
  }

  /* ---------------------------------------------------------------- */
  /* Deep links                                                         */
  /* ---------------------------------------------------------------- */

  private hashPage(): number | null {
    const key = this.options.deepLink?.hashKey;
    if (!key) return null;
    const params = new URLSearchParams(location.hash.replace(/^#/, ""));
    const value = Number.parseInt(params.get(key) ?? "", 10);
    return Number.isFinite(value) && value >= 1 ? value : null;
  }

  private readDeepLink(): number | null {
    const link = this.options.deepLink;
    if (!link) return null;
    const read = link.read?.();
    if (typeof read === "number" && Number.isFinite(read) && read >= 1) return Math.round(read);
    return this.hashPage();
  }

  private writeDeepLink(page: number): void {
    const link = this.options.deepLink;
    if (!link) return;
    link.write?.(page);
    const key = link.hashKey;
    if (!key || this.hashPage() === page) return;
    const params = new URLSearchParams(location.hash.replace(/^#/, ""));
    params.set(key, String(page));
    // replaceState adds no history entry and fires no hashchange: no loops.
    history.replaceState(history.state, "", `${location.pathname}${location.search}#${params.toString()}`);
  }

  private onHashChange = () => {
    const page = this.hashPage();
    if (page !== null && this.engine.state.ready && page !== this.engine.state.page) {
      void this.goToPage(page).catch(() => {});
    }
  };

  /* ---------------------------------------------------------------- */
  /* Fullscreen                                                         */
  /* ---------------------------------------------------------------- */

  private isFullscreen(): boolean {
    const doc = document as FullscreenDocument;
    return (doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null) === this.element;
  }

  private onFullscreenChange = () => this.sync();

  async toggleFullscreen(): Promise<void> {
    const doc = document as FullscreenDocument;
    const root = this.element as FullscreenRoot;
    try {
      if (this.isFullscreen()) {
        if (doc.exitFullscreen) await doc.exitFullscreen();
        else await doc.webkitExitFullscreen?.();
      } else if (root.requestFullscreen) {
        await root.requestFullscreen();
      } else if (root.webkitRequestFullscreen) {
        await root.webkitRequestFullscreen();
      } else {
        throw new Error("Fullscreen is not supported here");
      }
    } catch (error) {
      throw new FlipBookError("FULLSCREEN_FAILED", "Full screen is not available", { cause: error });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Public API                                                         */
  /* ---------------------------------------------------------------- */

  load(source: FlipBookSource): Promise<ReadyEvent> {
    if (this.destroyed) return Promise.reject(new FlipBookError("DESTROYED", "The reader was destroyed"));
    this.options.source = source;
    this.error = null;
    this.loadFraction = 0;
    this.search_.reset();
    this.overlay.reset();
    if (this.reading.isOpen) this.setReading(false);
    const promise = this.engine.load(source);
    this.panel.reset();
    this.sync();
    promise.then(
      () => this.sync(),
      (error) => {
        if (!isCancellation(error)) this.sync();
      },
    );
    return promise;
  }

  update(next: Partial<FlipbookCreateOptions>): void {
    if (this.destroyed) return;
    const previous = this.options;
    this.options = { ...previous, ...next };
    const changed = (key: keyof FlipbookCreateOptions) => key in next && !same(previous[key], next[key]);

    const engineChanges: Record<string, unknown> = {};
    for (const key of ENGINE_KEYS) if (changed(key)) engineChanges[key] = next[key];
    if (Object.keys(engineChanges).length > 0) this.engine.update(engineChanges as EngineOptions);

    if (changed("strings")) this.text = resolveStrings(this.options.strings);
    if (changed("strings") || changed("toolbar") || changed("showFullscreen")) this.buildToolbar();
    if (changed("label") || changed("strings")) this.setRootAttribute("aria-label", this.options.label ?? this.text.reader);
    if (changed("locale") && this.options.locale) this.setRootAttribute("lang", this.options.locale);
    if (!this.adopted && changed("className")) {
      this.element.className = this.options.className ? `flipdocs ${this.options.className}` : "flipdocs";
    }
    if (changed("showFps") && this.options.showFps === true) this.startFpsTimer();
    if ("source" in next && next.source && next.source !== previous.source) {
      this.load(next.source).catch(() => {});
    } else {
      this.sync();
    }
  }

  next(): Promise<NavigationResult> {
    return this.engine.next();
  }

  previous(): Promise<NavigationResult> {
    return this.engine.previous();
  }

  goToPage(page: number): Promise<NavigationResult> {
    try {
      return Promise.resolve(this.engine.goToPage(page));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Synchronous jump for the React handle: throws on NaN and infinity. */
  jumpTo(page: number): void {
    this.engine.goToPage(page);
  }

  zoomIn(): void {
    this.engine.zoomIn();
  }

  zoomOut(): void {
    this.engine.zoomOut();
  }

  resetZoom(): void {
    this.engine.resetZoom();
  }

  setZoom(zoom: number): void {
    this.engine.setZoom(zoom);
  }

  fitWidth(): void {
    this.engine.fitWidth();
  }

  setTuning(values: Partial<FlipBookTuning>): void {
    this.engine.setTuning(values);
  }

  getTuning(): FlipBookTuning {
    return this.engine.getTuning();
  }

  setDiagnosticPose(pose: DiagnosticPose): void {
    this.engine.setDiagnosticPose(pose);
  }

  resetPose(): void {
    this.engine.resetPose();
  }

  runBenchmark(durationMs?: number, mode?: BenchmarkMode): Promise<BenchmarkResult> {
    return this.engine.runBenchmark(durationMs, mode);
  }

  capturePng(): Promise<Blob> {
    return this.engine.capturePng();
  }

  async downloadPng(filename?: string): Promise<void> {
    const blob = await this.capturePng();
    const url = URL.createObjectURL(blob);
    const link = el("a", undefined, { href: url, download: filename || `flipdocs-page-${this.engine.state.page}.png` });
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }

  /** Fire-and-forget download for the React handle; failures become warnings. */
  downloadPngQuietly(filename?: string): void {
    this.downloadPng(filename).catch((error) =>
      this.warn(toFlipBookError(error, "CAPTURE_FAILED", "The reader could not be captured as an image")),
    );
  }

  getSnapshot(): FlipBookSnapshot {
    return this.engine.getSnapshot();
  }

  getState(): FlipbookState {
    const state = this.engine.state;
    return {
      ready: state.ready,
      loading: state.loading,
      loadProgress: state.loading ? this.loadFraction : state.ready ? 1 : null,
      error: this.error,
      page: state.page,
      pageCount: state.pageCount,
      visiblePages: state.visiblePages,
      direction: state.direction,
      mode: state.mode,
      zoom: state.zoom,
      fullscreen: this.isFullscreen(),
      rendererMode: this.engine.rendererKind,
      capabilities: { ...(this.engine.pageSource?.capabilities ?? NO_CAPABILITIES) },
    };
  }

  search(query: string, options?: SearchOptions, onProgress?: (progress: SearchProgress) => void): SearchHandle {
    return this.search_.search(query, options, (progress) => {
      onProgress?.(progress);
      this.emit("searchprogress", progress);
    });
  }

  /** Show search matches on the pages, with one marked as current. */
  highlight(matches: SearchMatch[], current: SearchMatch | null = null): void {
    this.overlay.setMatches(matches, current);
  }

  async getOutline(): Promise<OutlineNode[]> {
    return (await this.engine.pageSource?.getOutline?.()) ?? [];
  }

  getPageText(page: number): Promise<PageText | null> {
    return this.overlay.pageText(page);
  }

  getPageLabel(page: number): string | null {
    return this.engine.pageSource?.getLabel?.(page) ?? null;
  }

  on<K extends keyof FlipbookEventMap>(event: K, listener: (payload: FlipbookEventMap[K]) => void): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as (payload: never) => void);
    return () => {
      this.listeners.get(event)?.delete(listener as (payload: never) => void);
    };
  }

  private emit<K extends keyof FlipbookEventMap>(event: K, payload: FlipbookEventMap[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const listener of [...set]) {
      try {
        (listener as (value: FlipbookEventMap[K]) => void)(payload);
      } catch (error) {
        console.error(error);
      }
    }
  }

  private queueState(): void {
    if (this.stateQueued || this.destroyed || !this.listeners.get("statechange")?.size) return;
    this.stateQueued = true;
    queueMicrotask(() => {
      this.stateQueued = false;
      if (!this.destroyed) this.emit("statechange", this.getState());
    });
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.fpsTimer) clearInterval(this.fpsTimer);
    if (this.noticeTimer) clearTimeout(this.noticeTimer);
    if (this.liveTimer) clearTimeout(this.liveTimer);
    this.element.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
    window.removeEventListener("hashchange", this.onHashChange);
    this.pendingLoad = null;
    this.search_.destroy();
    this.panel.destroy();
    this.reading.destroy();
    this.overlay.destroy();
    this.engine.destroy();
    this.listeners.clear();
    if (this.adopted) {
      // Leave the host's element as it was found.
      for (const node of [this.main, this.progress, this.toolbar, this.live]) node.remove();
      for (const name of this.addedAttributes) this.element.removeAttribute(name);
      for (const key of Object.keys(this.element.dataset)) {
        if (["direction", "mode", "ready", "controls", "fullscreen", "renderer", "reading"].includes(key)) {
          delete this.element.dataset[key];
        }
      }
    } else {
      this.element.remove();
    }
  }
}
