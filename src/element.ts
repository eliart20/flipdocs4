/**
 * Script-tag entry point. Loading this module defines `<flip-book>` and puts
 * the framework-neutral API on `window.Flipdocs`:
 *
 *   <script type="module" src="/vendor/flipdocs4/element.js"></script>
 *   <flip-book src="/books/sample.pdf" direction="rtl" style="height: 80vh"></flip-book>
 *
 * The stylesheet next to this file is added to the page once.
 */
import * as api from "./core";
import type { FlipBookSource, FlipbookCreateOptions, FlipbookInstance, ReadingDirection } from "./types";

const STYLE_ID = "flipdocs-style";

function ensureStyles(): void {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const link = document.createElement("link");
  link.id = STYLE_ID;
  link.rel = "stylesheet";
  link.href = new URL(/* @vite-ignore */ "./flipdocs.css", import.meta.url).href;
  document.head.append(link);
}

const flag = (value: string | null, fallback: boolean) => (value === null ? fallback : value !== "false");

class FlipBookElement extends HTMLElement {
  static observedAttributes = ["src", "manifest", "pages", "direction", "controls", "fullscreen", "interactive", "layout"];
  private instance: FlipbookInstance | null = null;
  private pendingSource: FlipBookSource | null = null;

  /** The live reader, once connected. */
  get flipbook(): FlipbookInstance | null {
    return this.instance;
  }

  /** Set a source object directly instead of using attributes. */
  set source(value: FlipBookSource | null) {
    this.pendingSource = value;
    if (value && this.instance) this.instance.load(value).catch(() => {});
  }

  get source(): FlipBookSource | null {
    return this.pendingSource ?? this.sourceFromAttributes();
  }

  private sourceFromAttributes(): FlipBookSource | null {
    const manifest = this.getAttribute("manifest");
    if (manifest) return { type: "manifest", manifest };
    const pages = this.getAttribute("pages");
    if (pages) {
      const list = pages
        .split(/[\s,]+/)
        .map((entry) => entry.trim())
        .filter(Boolean);
      if (list.length) return { type: "images", pages: list };
    }
    const src = this.getAttribute("src");
    return src ? { type: "pdf", src } : null;
  }

  private options(): FlipbookCreateOptions {
    const direction = this.getAttribute("direction");
    const layout = this.getAttribute("layout");
    const startPage = Number.parseInt(this.getAttribute("start-page") ?? "", 10);
    return {
      direction: direction === "rtl" || direction === "ltr" ? (direction as ReadingDirection) : undefined,
      startPage: Number.isFinite(startPage) ? startPage : undefined,
      showControls: flag(this.getAttribute("controls"), true),
      showFullscreen: flag(this.getAttribute("fullscreen"), true),
      interactive: flag(this.getAttribute("interactive"), true),
      layoutPolicy: layout === "container" || layout === "single" || layout === "double" ? layout : undefined,
      onReady: (detail) => this.dispatchEvent(new CustomEvent("ready", { detail })),
      onPageChange: (detail) => this.dispatchEvent(new CustomEvent("pagechange", { detail })),
      onZoomChange: (detail) => this.dispatchEvent(new CustomEvent("zoomchange", { detail })),
      onError: (detail) => this.dispatchEvent(new CustomEvent("error", { detail })),
    };
  }

  connectedCallback(): void {
    ensureStyles();
    if (!this.style.display) this.style.display = "block";
    if (this.instance) return;
    const source = this.source;
    this.instance = api.createFlipbook(this, { ...this.options(), source: source ?? undefined });
  }

  disconnectedCallback(): void {
    this.instance?.destroy();
    this.instance = null;
  }

  attributeChangedCallback(name: string, previous: string | null, next: string | null): void {
    if (!this.instance || previous === next) return;
    if (name === "src" || name === "manifest" || name === "pages") {
      this.pendingSource = null;
      const source = this.sourceFromAttributes();
      if (source) this.instance.load(source).catch(() => {});
      return;
    }
    const { onReady, onPageChange, onZoomChange, onError, startPage, ...rest } = this.options();
    void onReady;
    void onPageChange;
    void onZoomChange;
    void onError;
    void startPage;
    this.instance.update(rest);
  }
}

if (typeof window !== "undefined") {
  (window as unknown as { Flipdocs: typeof api }).Flipdocs = api;
  if (typeof customElements !== "undefined" && !customElements.get("flip-book")) {
    customElements.define("flip-book", FlipBookElement);
  }
}

export * from "./core";
export { FlipBookElement };
