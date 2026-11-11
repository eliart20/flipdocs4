var q = Object.defineProperty;
var $ = (a, e, t) => e in a ? q(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var y = (a, e, t) => $(a, typeof e != "symbol" ? e + "" : e, t);
import { F as w, S as W, l as H, r as C, j as k, t as F, p as B, s as j, k as _, m as G, n as z } from "./flipdocs-core-BWCZhjD2.js";
const ie = 256 * 1024;
function O(a) {
  if (!a) return null;
  const e = /^\s*bytes\s+(\d+)\s*-\s*(\d+)\s*\/\s*(\d+|\*)\s*$/i.exec(a);
  if (!e) return null;
  const t = Number(e[1]), n = Number(e[2]), r = e[3] === "*" ? null : Number(e[3]);
  return !Number.isSafeInteger(t) || !Number.isSafeInteger(n) || n < t || r !== null && (!Number.isSafeInteger(r) || r <= n) ? null : { first: t, last: n, total: r };
}
async function K(a, e) {
  const t = a.body?.getReader();
  if (!t)
    return (await a.arrayBuffer()).byteLength;
  let n = 0;
  try {
    for (; ; ) {
      const { done: r, value: o } = await t.read();
      if (r || (n += o?.byteLength ?? 0, n > e)) break;
    }
  } finally {
    t.cancel().catch(() => {
    });
  }
  return n;
}
const P = (a) => {
  a.body?.cancel().catch(() => {
  });
};
async function U(a, e, t) {
  const n = H(t.signal, t.request?.signal), r = t.fetch ?? fetch;
  try {
    return { response: await r(a, {
      headers: { ...await C(t.request), Range: e },
      credentials: t.request?.credentials ?? "same-origin",
      signal: n.signal
    }), aborted: () => n.signal.aborted };
  } catch (o) {
    throw n.signal.aborted ? k("Loading") : new w("NETWORK", "The PDF could not be requested", { cause: o });
  } finally {
    n.dispose();
  }
}
async function V(a, e = {}) {
  let t = a;
  for (let n = 0; ; n++) {
    let r;
    try {
      ({ response: r } = await U(t, "bytes=0-0", e));
    } catch (c) {
      if (c instanceof w && c.code === "CANCELLED") throw c;
      return { mode: "stream", url: t, reason: "probe request failed" };
    }
    if ((r.status === 401 || r.status === 403) && n === 0 && e.request?.renew) {
      P(r);
      const c = await e.request.renew({ url: t, status: r.status, reason: "unauthorized" });
      if (c) {
        t = c;
        continue;
      }
      return { mode: "stream", url: t, reason: `status ${r.status}` };
    }
    if (r.status !== 206)
      return P(r), { mode: "stream", url: t, reason: `status ${r.status}` };
    const o = O(r.headers.get("content-range"));
    if (!o || o.first !== 0 || o.last !== 0 || o.total === null || o.total <= 0)
      return P(r), { mode: "stream", url: t, reason: "missing or invalid Content-Range" };
    const l = await K(r, 1);
    return l !== 1 ? { mode: "stream", url: t, reason: `probe returned ${l} bytes` } : {
      mode: "range",
      url: t,
      length: o.total,
      validators: {
        etag: r.headers.get("etag"),
        lastModified: r.headers.get("last-modified")
      }
    };
  }
}
function Y(a, e) {
  const t = e.headers.get("etag"), n = e.headers.get("last-modified");
  return a.etag !== null && t !== null && t !== a.etag || a.lastModified !== null && n !== null && n !== a.lastModified;
}
const Q = 4 * 1024 * 1024, Z = 12e4, J = 3, R = /* @__PURE__ */ new Map();
function X(a) {
  const { etag: e, lastModified: t } = a.validators;
  if (e === null && t === null) return null;
  const n = Date.now();
  for (const [o, l] of R)
    n - l.touched > Z && R.delete(o);
  let r = R.get(a.url);
  if (r && (r.length !== a.length || r.validators.etag !== e || r.validators.lastModified !== t) && (R.delete(a.url), r = void 0), !r)
    for (r = { length: a.length, validators: { etag: e, lastModified: t }, chunks: /* @__PURE__ */ new Map(), bytes: 0, touched: n }, R.set(a.url, r); R.size > J; ) R.delete(R.keys().next().value);
  return r.touched = n, r;
}
function ee(a, e = {}) {
  const t = new W(4), n = { requests: 0, bytes: 0 }, r = X(a);
  let o = a.url;
  const l = (u) => new w("RANGE_MISMATCH", u), c = async (u, h) => {
    const { response: d } = await U(o, `bytes=${u}-${h - 1}`, e);
    if (n.requests++, d.status === 401 || d.status === 403)
      throw P(d), new w("NETWORK", `The PDF request was refused (${d.status})`, {
        detail: { status: d.status }
      });
    if (d.status !== 206)
      throw P(d), l(`Expected a partial response, got status ${d.status}`);
    const m = O(d.headers.get("content-range"));
    if (!m || m.first !== u || m.last !== h - 1)
      throw P(d), l("The server returned a different byte range than requested");
    if (m.total !== a.length)
      throw P(d), l("The PDF changed length while it was being read");
    if (Y(a.validators, d))
      throw P(d), l("The PDF changed while it was being read");
    const b = new Uint8Array(await d.arrayBuffer());
    if (b.byteLength !== h - u)
      throw l(`Expected ${h - u} bytes, received ${b.byteLength}`);
    return n.bytes += b.byteLength, b;
  };
  return {
    length: a.length,
    stats: n,
    read(u, h) {
      if (!(u >= 0) || !(h > u) || h > a.length)
        return Promise.reject(new w("INVALID_ARGUMENT", "Byte range out of bounds"));
      const d = `${u}-${h}`, m = r?.chunks.get(d);
      if (m) return Promise.resolve(m.slice());
      const b = (f) => (r && r.bytes + f.byteLength <= Q && !r.chunks.has(d) && (r.chunks.set(d, f.slice()), r.bytes += f.byteLength), f);
      return t.run(async () => {
        try {
          return b(await c(u, h));
        } catch (f) {
          if (!(f instanceof w && f.code === "NETWORK" && [401, 403].includes(f.detail?.status ?? 0)) || !e.request?.renew) throw f;
          const I = f.detail.status, v = await e.request.renew({ url: o, status: I, reason: "unauthorized" });
          if (!v) throw f;
          return o = v, b(await c(u, h));
        }
      });
    }
  };
}
const te = 512, re = 12e3, D = (a) => new w(a.code === "ENVIRONMENT" ? "RENDER_FAILED" : a.code, a.message);
class T extends Error {
}
class N {
  constructor(e, t) {
    y(this, "worker");
    y(this, "callbacks");
    y(this, "mode", "worker");
    y(this, "nextId", 1);
    y(this, "pending", /* @__PURE__ */ new Map());
    y(this, "dead", !1);
    this.worker = e, this.callbacks = t, e.onmessage = (n) => this.receive(n.data), e.onerror = (n) => {
      n.preventDefault?.(), this.crash(new T("The raster worker stopped"));
    };
  }
  static start(e, t) {
    return new Promise((n, r) => {
      let o;
      try {
        o = j();
      } catch (h) {
        r(new T(String(h)));
        return;
      }
      const l = (h) => {
        clearTimeout(u), t.removeEventListener("abort", c), o.onmessage = null, o.onerror = null, o.terminate(), r(h);
      }, c = () => l(k("Loading")), u = setTimeout(() => l(new T("The raster worker did not start")), re);
      t.addEventListener("abort", c, { once: !0 }), o.onerror = (h) => {
        h.preventDefault?.(), l(new T("The raster worker could not be loaded"));
      }, o.onmessage = (h) => {
        const d = h.data;
        if (d.type === "ready") {
          if (!d.offscreenCanvas || !d.fonts) {
            l(new T("This browser cannot draw PDF pages in a worker"));
            return;
          }
          clearTimeout(u), t.removeEventListener("abort", c), n(new N(o, e));
        }
      };
    });
  }
  send(e, t = []) {
    const n = this.nextId++, r = new Promise((o, l) => {
      if (this.dead) {
        l(k("PDF work"));
        return;
      }
      this.pending.set(n, { resolve: o, reject: l }), this.worker.postMessage({ ...e, id: n }, t);
    });
    return { id: n, promise: r };
  }
  receive(e) {
    switch (e.type) {
      case "result": {
        const t = this.pending.get(e.id);
        if (this.pending.delete(e.id), !t || t.abandoned) {
          _(e.value?.image ?? null);
          return;
        }
        t.resolve(e.value);
        return;
      }
      case "error": {
        const t = this.pending.get(e.id);
        if (this.pending.delete(e.id), !t || t.abandoned) return;
        t.reject(e.error.code === "ENVIRONMENT" ? new T(e.error.message) : D(e.error));
        return;
      }
      case "progress":
        this.callbacks.progress(e.loaded, e.total);
        return;
      case "fatal":
        this.callbacks.fatal(e.error);
        return;
      case "call": {
        const t = (r, o = []) => this.post({ type: "reply", callId: e.callId, value: r }, o), n = (r) => this.post({
          type: "replyError",
          callId: e.callId,
          error: {
            code: r instanceof w ? r.code : "NETWORK",
            message: r instanceof Error ? r.message : String(r)
          }
        });
        e.name === "readRange" ? this.callbacks.readRange(e.args[0], e.args[1]).then((r) => t(r, [r.buffer]), n) : this.callbacks.password(e.args[0], e.args[1]).then((r) => t(r), n);
        return;
      }
      case "ready":
        return;
    }
  }
  post(e, t = []) {
    this.dead || this.worker.postMessage(e, t);
  }
  crash(e) {
    if (this.dead) return;
    const t = [...this.pending.values()];
    this.pending.clear();
    for (const n of t) n.abandoned || n.reject(e);
  }
  open(e) {
    return this.send({ method: "open", params: e }).promise;
  }
  render(e, t) {
    if (t.aborted) return Promise.reject(k("Page preparation"));
    const { id: n, promise: r } = this.send({ method: "render", params: e });
    return new Promise((o, l) => {
      const c = () => {
        const u = this.pending.get(n);
        u && (u.abandoned = !0), this.dead || this.worker.postMessage({ id: this.nextId++, method: "cancelRender", params: { requestId: n } }), l(k("Page preparation"));
      };
      t.addEventListener("abort", c, { once: !0 }), r.then(
        (u) => {
          t.removeEventListener("abort", c), o(u);
        },
        (u) => {
          t.removeEventListener("abort", c), l(u);
        }
      );
    });
  }
  text(e) {
    return this.send({ method: "text", params: { page: e } }).promise;
  }
  links(e) {
    return this.send({ method: "links", params: { page: e } }).promise;
  }
  outline() {
    return this.send({ method: "outline", params: {} }).promise;
  }
  labels() {
    return this.send({ method: "labels", params: {} }).promise;
  }
  destroy() {
    if (this.dead) return;
    const e = [...this.pending.values()];
    this.pending.clear();
    for (const t of e) t.abandoned || t.reject(k("PDF work"));
    try {
      this.worker.postMessage({ id: this.nextId++, method: "destroy", params: {} });
    } catch {
    }
    this.dead = !0, setTimeout(() => this.worker.terminate(), 250);
  }
}
class S {
  constructor(e) {
    y(this, "host");
    y(this, "mode", "main");
    y(this, "nextId", 1);
    this.host = e;
  }
  static async start(e) {
    const t = await import("./flipdocs-pdfHost-CwyRMmVh.js");
    return new S(new t.PdfHost(e));
  }
  async guard(e, t) {
    try {
      return await e;
    } catch (n) {
      if (n instanceof w) throw n;
      const r = await import("./flipdocs-pdfHost-CwyRMmVh.js");
      throw D(r.describeHostError(n, t));
    }
  }
  open(e) {
    return this.guard(this.host.open(e), "open");
  }
  render(e, t) {
    if (t.aborted) return Promise.reject(k("Page preparation"));
    const n = this.nextId++, r = () => this.host.cancelRender(n);
    return t.addEventListener("abort", r, { once: !0 }), this.guard(this.host.render(n, e), "render").finally(
      () => t.removeEventListener("abort", r)
    );
  }
  text(e) {
    return this.guard(this.host.getText(e), "render");
  }
  links(e) {
    return this.guard(this.host.getLinks(e), "render");
  }
  outline() {
    return this.guard(this.host.getOutline(), "render");
  }
  labels() {
    return this.guard(this.host.getLabels(), "render");
  }
  destroy() {
    this.host.destroy();
  }
}
async function ne(a, e) {
  const t = a.src;
  let n, r, o = null;
  if (typeof t == "string") {
    if (!t) throw new w("INVALID_SOURCE", "The PDF URL is empty");
    const s = await V(t, { request: a.request, signal: e.signal });
    F(e.signal), s.mode === "range" ? (o = ee(s, { request: a.request, signal: e.signal }), n = { kind: "range", length: s.length }, r = "range") : (n = {
      kind: "url",
      url: new URL(s.url, document.baseURI).href,
      headers: await C(a.request),
      withCredentials: a.request?.credentials === "include"
    }, r = "stream");
  } else if (typeof Blob < "u" && t instanceof Blob)
    n = { kind: "blob", blob: t }, r = "blob";
  else if (t instanceof Uint8Array)
    n = { kind: "blob", blob: new Blob([t], { type: "application/pdf" }) }, r = "blob";
  else
    throw new w("INVALID_SOURCE", "A PDF source needs a URL, File, Blob or Uint8Array");
  let l = !1, c = null, u = null, h = null;
  const d = {}, m = {
    readRange: (s, i) => o ? o.read(s, i) : Promise.reject(new w("LOAD_FAILED", "No range reader for this document")),
    password: async (s, i) => {
      if (!a.onPassword) throw new w("PASSWORD_REQUIRED", "This PDF needs a password");
      return a.onPassword({ reason: s, attempt: i });
    },
    progress: (s, i) => {
      l || e.onProgress(s, i);
    },
    fatal: (s) => {
      l || c || (c = D(s), d.onFatal?.(c));
    }
  }, b = { transport: n, parserWorkerUrl: B(), pdfAssets: a.pdfAssets };
  let f, p;
  const I = async () => {
    const s = await S.start(m);
    try {
      return { backend: s, info: await s.open(b) };
    } catch (i) {
      throw s.destroy(), i;
    }
  };
  if (a.rasterWorker === !1)
    h = "raster worker disabled by the source", { backend: f, info: p } = await I();
  else {
    let s = null;
    try {
      s = await N.start(m, e.signal), p = await s.open(b), f = s;
    } catch (i) {
      if (s?.destroy(), !(i instanceof T)) throw i;
      h = `raster worker unavailable: ${i.message}`, F(e.signal), { backend: f, info: p } = await I();
    }
  }
  if (e.signal.aborted)
    throw f.destroy(), k("Loading");
  let v = null;
  const x = () => (v || (v = (async () => {
    const s = f;
    f = (await I()).backend, s.destroy();
  })()), v), L = async (s) => {
    if (l) throw k("PDF work");
    if (c) throw c;
    v && await v;
    try {
      return await s(f);
    } catch (i) {
      if (!(i instanceof T) || l) throw i;
      if (f.mode === "main") throw new w("RENDER_FAILED", i.message);
      return h = `raster worker failed: ${i.message}`, await x(), s(f);
    }
  }, M = {
    text: !0,
    links: !0,
    outline: p.hasOutline,
    thumbnails: !0,
    search: !0,
    labels: !1
  };
  return L((s) => s.labels()).then(
    (s) => {
      u = s, s && s.some((i, E) => i !== String(E + 1)) && (M.labels = !0);
    },
    () => {
    }
  ), {
    kind: "pdf",
    pageCount: p.pageCount,
    pageAspect: p.firstPage.width / p.firstPage.height,
    concurrency: 1,
    previewHeight: te,
    capabilities: M,
    get rasterMode() {
      return f.mode;
    },
    transportMode: r,
    originalUrl: a.originalUrl ?? (typeof t == "string" ? t : void 0),
    get transportStats() {
      return o ? o.stats : null;
    },
    viewerDirection: p.viewerDirection,
    parserMode: p.parser,
    get rasterNote() {
      return h;
    },
    set onFatal(s) {
      d.onFatal = s;
    },
    get onFatal() {
      return d.onFatal;
    },
    async render(s) {
      const i = await L(
        (E) => E.render(
          {
            page: s.page,
            height: s.height,
            maxWidth: s.maxWidth,
            maxDimension: e.maxTextureSize,
            keepPageData: s.preview
          },
          s.signal
        )
      );
      if (s.signal.aborted || l)
        throw _(i.image), k("Page preparation");
      return { image: i.image, width: i.width, height: i.height, owned: !0, final: !1 };
    },
    getText(s) {
      return L((i) => i.text(s));
    },
    async getLinks(s) {
      const i = await L((g) => g.links(s)), E = [];
      for (const g of i)
        if (typeof g.page == "number" && g.page >= 1 && g.page <= p.pageCount)
          E.push({ rect: g.rect, label: `Page ${g.page}`, page: g.page });
        else if (g.url) {
          const A = z(g.url);
          A && E.push({ rect: g.rect, label: A, url: A });
        }
      return E;
    },
    getOutline() {
      return L((s) => s.outline());
    },
    getLabel(s) {
      return u?.[s - 1] ?? null;
    },
    async getThumbnail(s, i, E) {
      try {
        const g = await L(
          (A) => A.render({ page: s, height: i, maxDimension: e.maxTextureSize, keepPageData: !1 }, E)
        );
        return { image: g.image, width: g.width, height: g.height, owned: !0 };
      } catch (g) {
        if (G(g)) throw g;
        return null;
      }
    },
    destroy() {
      l || (l = !0, f.destroy());
    }
  };
}
const le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  openPdfSource: ne
}, Symbol.toStringTag, { value: "Module" }));
export {
  ie as R,
  le as p
};
