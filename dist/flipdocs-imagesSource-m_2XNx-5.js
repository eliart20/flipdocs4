import { F as p, N as S, k as c, j as B, o as E, t as U, q as v, S as M, u as O } from "./flipdocs-core-BWCZhjD2.js";
const d = (o) => typeof ImageBitmap < "u" && o instanceof ImageBitmap, I = (o) => typeof Blob < "u" && o instanceof Blob, k = 96;
async function C(o, g) {
  const r = o.pages;
  if (!Array.isArray(r) || r.length === 0)
    throw new p("EMPTY_SOURCE", "An image book needs at least one page");
  r.forEach((e, t) => {
    if (!(typeof e == "string" && e.length > 0) && !I(e) && !d(e))
      throw new p("INVALID_SOURCE", `Page ${t + 1} is not an image URL, Blob or ImageBitmap`);
  });
  const L = new M(4), w = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  let h = !1;
  const A = async (e, t, i) => L.run(async () => {
    U(t);
    const { response: l } = await O(e, o.request, t, `page ${i}`);
    return l.blob();
  }), u = async (e, t) => {
    const i = r[e - 1], l = { height: t.height, maxWidth: t.maxWidth, maxDimension: g.maxTextureSize };
    let a, m = !0;
    if (d(i)) {
      if (i.width === 0 || i.height === 0)
        throw new p("INVALID_SOURCE", `The ImageBitmap for page ${e} has been closed`);
      const f = await E(i, l, !1);
      a = f, m = f.copied;
    } else {
      const f = I(i) ? i : await A(i, t.signal, e);
      U(t.signal), a = await v(f, l, w.get(e));
    }
    if (w.set(e, { width: a.naturalWidth, height: a.naturalHeight }), t.signal.aborted || h)
      throw m && c(a.image), B("Page preparation");
    return { image: a.image, width: a.width, height: a.height, owned: m, final: a.final };
  }, b = new AbortController(), y = () => b.abort();
  g.signal.addEventListener("abort", y, { once: !0 });
  let n;
  try {
    n = await u(1, { height: Math.min(g.maxTextureSize, 1600), signal: b.signal });
  } finally {
    g.signal.removeEventListener("abort", y);
  }
  const R = n.width / n.height;
  return g.onProgress(1, 1), {
    kind: "images",
    pageCount: r.length,
    pageAspect: R,
    concurrency: r.some((e) => typeof e == "string") ? 3 : 1,
    previewHeight: 0,
    capabilities: { ...S, thumbnails: !0 },
    rasterMode: "image",
    transportMode: "image",
    originalUrl: o.originalUrl,
    async render(e) {
      if (h) throw B("Page preparation");
      if (e.page === 1 && n) {
        const t = n;
        if (t.final || t.height >= e.height * 0.87)
          return n = null, t;
        t.owned && c(t.image), n = null;
      }
      return u(e.page, e);
    },
    async getThumbnail(e) {
      const t = r[e - 1];
      if (typeof t == "string") return { url: t };
      if (d(t)) return { image: t, width: t.width, height: t.height, owned: !1 };
      let i = s.get(e);
      if (!i && (i = URL.createObjectURL(t), s.set(e, i), s.size > k)) {
        const [l, a] = s.entries().next().value;
        s.delete(l), URL.revokeObjectURL(a);
      }
      return { url: i };
    },
    destroy() {
      if (!h) {
        h = !0, n?.owned && c(n.image), n = null;
        for (const e of s.values()) URL.revokeObjectURL(e);
        if (s.clear(), o.transferBitmaps)
          for (const e of r) d(e) && c(e);
      }
    }
  };
}
export {
  C as openImagesSource
};
