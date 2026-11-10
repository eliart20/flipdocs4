var N = Object.defineProperty;
var R = (t, e, s) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var S = (t, e, s) => R(t, typeof e != "symbol" ? e + "" : e, s);
const $ = /^\p{M}$/u, T = /^\s$/u, D = /\p{M}/gu;
function F(t) {
  return t === 173 || t === 8203 || t === 8204 || t === 8205 || t === 8288 || t === 65279 || t === 8206 || t === 8207 || t >= 8234 && t <= 8238 || t >= 8294 && t <= 8297;
}
function L(t, e) {
  let s;
  return e.matchDiacritics ? s = t.normalize("NFC") : s = t.normalize("NFD").replace(D, "").normalize("NFC"), e.matchCase ? s : s.toLowerCase();
}
function b(t, e) {
  const s = t.length, c = [], n = [];
  let h = "", u = !1, r = 0;
  for (; r < s; ) {
    const f = t.codePointAt(r), l = String.fromCodePoint(f);
    let a = r + l.length;
    for (; a < s; ) {
      const i = String.fromCodePoint(t.codePointAt(a));
      if (!$.test(i)) break;
      a += i.length;
    }
    if (F(f)) {
      r = a;
      continue;
    }
    if (T.test(l)) {
      u ? n[n.length - 1] = a : (h += " ", c.push(r), n.push(a), u = !0), r = a;
      continue;
    }
    const g = L(t.slice(r, a), e);
    if (g.length > 0) {
      u = !1, h += g;
      for (let i = 0; i < g.length; i++)
        c.push(r), n.push(a);
    }
    r = a;
  }
  return { text: h, starts: Uint32Array.from(c), ends: Uint32Array.from(n) };
}
function O(t, e) {
  return b(t, e).text.replace(/^ +| +$/g, "");
}
function q(t, e, s) {
  return { start: t.starts[e], end: t.ends[s - 1] };
}
const P = 40, k = 20;
function v(t, e, s) {
  if (!t.runs || s <= e) return;
  const c = [];
  for (const n of t.runs) {
    if (n.start >= s || n.end <= e) continue;
    const h = n.end - n.start, u = e > n.start || s < n.end;
    if (n.rects.length === 1 && u && h > 0) {
      const r = n.rects[0], f = (Math.max(e, n.start) - n.start) / h, l = (Math.min(s, n.end) - n.start) / h, g = (n.dir ?? t.dir) === "rtl" ? r.x + r.width * (1 - l) : r.x + r.width * f;
      c.push({ x: g, y: r.y, width: r.width * (l - f), height: r.height });
    } else
      for (const r of n.rects) c.push({ ...r });
  }
  return c.length > 0 ? c : void 0;
}
const U = /\s+/g;
function x(t) {
  return t.replace(U, " ");
}
function E(t, e) {
  return /\s/u.test(t[e]);
}
function X(t, e, s) {
  let c = Math.max(0, e - P), n = Math.min(t.length, s + P);
  for (let o = 0; o < k && c > 0 && !E(t, c - 1); o++) c--;
  for (let o = 0; o < k && n < t.length && !E(t, n); o++) n++;
  const h = (o) => o >= 56320 && o <= 57343, u = (o) => o >= 55296 && o <= 56319;
  c > 0 && h(t.charCodeAt(c)) && c--, n < t.length && u(t.charCodeAt(n - 1)) && n++;
  const r = x(t.slice(c, e)).replace(/^ /, ""), f = x(t.slice(e, s)), l = x(t.slice(s, n)).replace(/ $/, ""), a = c > 0 ? "…" : "", g = n < t.length ? "…" : "", i = a.length + r.length;
  return {
    excerpt: a + r + f + l + g,
    excerptStart: i,
    excerptEnd: i + f.length
  };
}
class _ {
  constructor() {
    S(this, "pages", /* @__PURE__ */ new Map());
  }
  get size() {
    return this.pages.size;
  }
  setPage(e, s) {
    this.pages.set(e, { text: s, cache: /* @__PURE__ */ new Map() });
  }
  hasPage(e) {
    return this.pages.has(e);
  }
  searchPage(e, s, c, n) {
    const h = this.pages.get(e);
    if (!h) return [];
    const u = O(s, c);
    if (u.length === 0) return [];
    const r = n ?? c.limit, f = `${c.matchCase ? 1 : 0}${c.matchDiacritics ? 1 : 0}`;
    let l = h.cache.get(f);
    l || (l = b(h.text.text, c), h.cache.set(f, l));
    const a = [];
    let g = 0;
    for (; a.length < r; ) {
      const i = l.text.indexOf(u, g);
      if (i < 0) break;
      const o = i + u.length, { starts: d, ends: A } = l;
      if (i > 0 && d[i] === d[i - 1] || o < d.length && A[o - 1] === A[o]) {
        g = i + 1;
        continue;
      }
      const { start: m, end: p } = q(l, i, o), C = {
        page: e,
        start: m,
        end: p,
        ...X(h.text.text, m, p)
      }, M = v(h.text, m, p);
      M && (C.rects = M), a.push(C), g = o;
    }
    return a;
  }
  clear() {
    this.pages.clear();
  }
}
const z = self, y = new _();
function w(t) {
  z.postMessage(t);
}
z.onmessage = (t) => {
  const e = t.data;
  switch (e.type) {
    case "index":
      y.setPage(e.page, e.text);
      break;
    case "clear":
      y.clear();
      break;
    case "search":
      try {
        const s = y.searchPage(e.page, e.query, e.options, e.maxMatches);
        w({ type: "matches", id: e.id, page: e.page, matches: s });
      } catch (s) {
        w({
          type: "error",
          id: e.id,
          page: e.page,
          message: s instanceof Error ? s.message : String(s)
        });
      }
      break;
  }
};
w({ type: "ready" });
