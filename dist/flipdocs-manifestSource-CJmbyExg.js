import { u as m, v as k, F as M, t as p, j as I, w as T, S as N, q as L, k as C, x as S, M as b, y as E, z as F } from "./flipdocs-core-TaQJCRCq.js";
const P = 24;
async function v(a, l, i) {
  const n = Number(a.headers.get("content-length"));
  Number.isFinite(n) && n > 0 && S(n, i);
  const g = await a.text();
  S(g.length, i);
  try {
    return JSON.parse(g);
  } catch (h) {
    throw new M("INVALID_MANIFEST", `${l} is not valid JSON`, { cause: h });
  }
}
async function R(a, l) {
  let i;
  if (typeof a.manifest == "string") {
    const { response: e, url: t } = await m(a.manifest, a.request, l.signal, "the manifest"), s = new URL(e.url || t, typeof document < "u" ? document.baseURI : void 0).href;
    i = k(await v(e, "The manifest", b.maxBytes), {
      baseUrl: a.baseUrl ?? s
    });
  } else {
    const e = a.baseUrl ?? (typeof document < "u" ? document.baseURI : "");
    if (!e) throw new M("INVALID_MANIFEST", "An in-memory manifest needs a baseUrl");
    i = k(a.manifest, { baseUrl: e });
  }
  p(l.signal), l.onProgress(1, 1);
  const n = i.pages, g = new N(4), h = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
  let u = !1;
  const x = (e, t, s) => {
    const r = e.get(t);
    if (r)
      return e.delete(t), e.set(t, r), r;
    const o = s();
    return e.set(t, o), o.catch(() => e.delete(t)), e.size > P && e.delete(e.keys().next().value), o;
  }, U = n.some((e) => !!e.preview || e.variants.length > 1);
  return {
    kind: "manifest",
    pageCount: n.length,
    pageAspect: n[0].aspect,
    concurrency: 3,
    previewHeight: U ? 640 : 0,
    capabilities: {
      text: n.some((e) => !!e.text),
      links: n.some((e) => !!e.links),
      outline: i.outline.length > 0,
      thumbnails: !0,
      search: n.some((e) => !!e.text),
      labels: n.some((e) => e.label !== void 0)
    },
    rasterMode: "image",
    transportMode: "image",
    direction: i.direction,
    language: i.language,
    originalUrl: a.originalUrl,
    async render(e) {
      if (u) throw I("Page preparation");
      const t = n[e.page - 1], s = t.variants[0], r = t.variants[t.variants.length - 1];
      let o, f, w;
      if (e.preview && (t.preview || t.variants.length > 1))
        o = t.preview ?? s.src, f = t.preview ? void 0 : { width: s.width, height: s.height }, w = !1;
      else {
        const d = T(t, e.height);
        o = d.src, f = { width: d.width, height: d.height }, w = d === r;
      }
      const A = await g.run(async () => {
        p(e.signal);
        const { response: d } = await m(o, a.request, e.signal, `page ${e.page}`);
        return d.blob();
      });
      p(e.signal);
      const c = await L(
        A,
        { height: e.height, maxWidth: e.maxWidth, maxDimension: l.maxTextureSize },
        f
      );
      if (e.signal.aborted || u)
        throw C(c.image), I("Page preparation");
      return {
        image: c.image,
        width: c.width,
        height: c.height,
        owned: !0,
        final: w && c.final
      };
    },
    getText(e, t) {
      const s = n[e - 1]?.text;
      return s ? x(h, e, async () => {
        const { response: r } = await m(s, a.request, t, `text for page ${e}`);
        return F(await v(r, `Text for page ${e}`, b.maxBytes));
      }) : Promise.resolve(null);
    },
    getLinks(e, t) {
      const s = n[e - 1]?.links;
      return s ? x(y, e, async () => {
        const { response: r } = await m(s, a.request, t, `links for page ${e}`);
        return E(
          await v(r, `Links for page ${e}`, b.maxBytes),
          n.length,
          i.baseUrl
        );
      }) : Promise.resolve([]);
    },
    async getOutline() {
      return i.outline;
    },
    getLabel(e) {
      return n[e - 1]?.label ?? null;
    },
    async getThumbnail(e) {
      const t = n[e - 1];
      return t ? { url: t.thumbnail ?? t.preview ?? t.variants[0].src } : null;
    },
    destroy() {
      u = !0, h.clear(), y.clear();
    }
  };
}
export {
  R as openManifestSource
};
