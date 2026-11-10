var p = Object.defineProperty;
var f = (e, i, t) => i in e ? p(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var r = (e, i, t) => f(e, typeof i != "symbol" ? i + "" : i, t);
import { a as g, c as m } from "./flipdocs-core-TaQJCRCq.js";
import { D as k, b as w, F as N, T as P, d as T, e as I, f as D, g as _, i as G } from "./flipdocs-core-TaQJCRCq.js";
const l = "flipdocs-style";
function b() {
  if (typeof document > "u" || document.getElementById(l)) return;
  const e = document.createElement("link");
  e.id = l, e.rel = "stylesheet", e.href = new URL(
    /* @vite-ignore */
    "./flipdocs.css",
    import.meta.url
  ).href, document.head.append(e);
}
const c = (e, i) => e === null ? i : e !== "false";
class d extends HTMLElement {
  constructor() {
    super(...arguments);
    r(this, "instance", null);
    r(this, "pendingSource", null);
  }
  /** The live reader, once connected. */
  get flipbook() {
    return this.instance;
  }
  /** Set a source object directly instead of using attributes. */
  set source(t) {
    this.pendingSource = t, t && this.instance && this.instance.load(t).catch(() => {
    });
  }
  get source() {
    return this.pendingSource ?? this.sourceFromAttributes();
  }
  sourceFromAttributes() {
    const t = this.getAttribute("manifest");
    if (t) return { type: "manifest", manifest: t };
    const n = this.getAttribute("pages");
    if (n) {
      const s = n.split(/[\s,]+/).map((a) => a.trim()).filter(Boolean);
      if (s.length) return { type: "images", pages: s };
    }
    const o = this.getAttribute("src");
    return o ? { type: "pdf", src: o } : null;
  }
  options() {
    const t = this.getAttribute("direction"), n = this.getAttribute("layout"), o = Number.parseInt(this.getAttribute("start-page") ?? "", 10);
    return {
      direction: t === "rtl" || t === "ltr" ? t : void 0,
      startPage: Number.isFinite(o) ? o : void 0,
      showControls: c(this.getAttribute("controls"), !0),
      showFullscreen: c(this.getAttribute("fullscreen"), !0),
      interactive: c(this.getAttribute("interactive"), !0),
      layoutPolicy: n === "container" || n === "single" || n === "double" ? n : void 0,
      onReady: (s) => this.dispatchEvent(new CustomEvent("ready", { detail: s })),
      onPageChange: (s) => this.dispatchEvent(new CustomEvent("pagechange", { detail: s })),
      onZoomChange: (s) => this.dispatchEvent(new CustomEvent("zoomchange", { detail: s })),
      onError: (s) => this.dispatchEvent(new CustomEvent("error", { detail: s }))
    };
  }
  connectedCallback() {
    if (b(), this.style.display || (this.style.display = "block"), this.instance) return;
    const t = this.source;
    this.instance = m(this, { ...this.options(), source: t ?? void 0 });
  }
  disconnectedCallback() {
    this.instance?.destroy(), this.instance = null;
  }
  attributeChangedCallback(t, n, o) {
    if (!this.instance || n === o) return;
    if (t === "src" || t === "manifest" || t === "pages") {
      this.pendingSource = null;
      const u = this.sourceFromAttributes();
      u && this.instance.load(u).catch(() => {
      });
      return;
    }
    const { onReady: s, onPageChange: a, onZoomChange: E, onError: y, startPage: A, ...h } = this.options();
    this.instance.update(h);
  }
}
r(d, "observedAttributes", ["src", "manifest", "pages", "direction", "controls", "fullscreen", "interactive", "layout"]);
typeof window < "u" && (window.Flipdocs = g, typeof customElements < "u" && !customElements.get("flip-book") && customElements.define("flip-book", d));
export {
  k as DEFAULT_STRINGS,
  w as DIAGNOSTIC_POSE_NAMES,
  d as FlipBookElement,
  N as FlipBookError,
  P as TUNING_DEFAULTS,
  T as TUNING_RANGES,
  I as configureAssets,
  m as createFlipbook,
  D as detectPdfDirection,
  _ as directionFromViewerPreference,
  G as isFlipBookError
};
