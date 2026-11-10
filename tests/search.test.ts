import { describe, expect, it } from "vitest";
import { normalizeQuery, normalizeText, toOriginalRange } from "../src/search/normalize";
import { SearchIndex, rectsForRange, resolveSearchOptions } from "../src/search/searchIndex";
import type { PageText } from "../src/types";

const DEFAULTS = resolveSearchOptions();
const opts = (o: Partial<{ matchCase: boolean; matchDiacritics: boolean; limit: number }> = {}) => ({
  ...DEFAULTS,
  ...o,
});

function find(text: string, query: string, o: Parameters<typeof opts>[0] = {}) {
  const index = new SearchIndex();
  index.setPage(1, { text });
  return index.searchPage(1, query, opts(o));
}

describe("normalizeText", () => {
  it("keeps one-to-one offsets for plain ASCII", () => {
    const n = normalizeText("Hello", { matchCase: true, matchDiacritics: false });
    expect(n.text).toBe("Hello");
    expect(Array.from(n.starts)).toEqual([0, 1, 2, 3, 4]);
    expect(Array.from(n.ends)).toEqual([1, 2, 3, 4, 5]);
    expect(toOriginalRange(n, 1, 4)).toEqual({ start: 1, end: 4 });
  });

  it("collapses whitespace runs and maps the space to the whole run", () => {
    const n = normalizeText("a \n\t b", { matchCase: false, matchDiacritics: false });
    expect(n.text).toBe("a b");
    expect(n.starts[1]).toBe(1);
    expect(n.ends[1]).toBe(5);
    const m = find("a \n\t b", "a b");
    expect(m).toHaveLength(1);
    expect([m[0].start, m[0].end]).toEqual([0, 6]);
  });

  it("keeps a leading space but trims queries", () => {
    expect(normalizeText("  x", { matchCase: false, matchDiacritics: false }).text).toBe(" x");
    expect(normalizeQuery("  x \n", { matchCase: false, matchDiacritics: false })).toBe("x");
    expect(normalizeQuery(" ­ ", { matchCase: false, matchDiacritics: false })).toBe("");
  });

  it("removes soft hyphens and zero-width characters", () => {
    const m = find("exam­ple", "example");
    expect(m).toHaveLength(1);
    expect([m[0].start, m[0].end]).toEqual([0, 8]);
    expect(normalizeText("a​b﻿c‏d", { matchCase: true, matchDiacritics: true }).text).toBe("abcd");
  });

  it("folds case by default and respects matchCase", () => {
    expect(find("Hello HELLO", "hello")).toHaveLength(2);
    expect(find("Hello HELLO", "Hello", { matchCase: true })).toHaveLength(1);
    expect(find("Hello", "hello", { matchCase: true })).toHaveLength(0);
  });

  it("ignores Latin diacritics by default and covers the combining mark", () => {
    for (const text of ["café", "café"]) {
      const m = find(text, "cafe");
      expect(m).toHaveLength(1);
      expect([m[0].start, m[0].end]).toEqual([0, text.length]);
      expect(find(text, "café")).toHaveLength(1);
      expect(find(text, "café")).toHaveLength(1);
    }
  });

  it("matches diacritics when asked", () => {
    expect(find("café", "cafe", { matchDiacritics: true })).toHaveLength(0);
    expect(find("café", "cafe", { matchDiacritics: true })).toHaveLength(0);
    expect(find("café", "café", { matchDiacritics: true })).toHaveLength(1);
    expect(find("café", "café", { matchDiacritics: true })).toHaveLength(1);
  });

  it("ignores niqqud by default for Hebrew", () => {
    const text = "בְּרֵאשִׁית בָּרָא";
    const plain = find(text, "בראשית ברא");
    expect(plain).toHaveLength(1);
    expect([plain[0].start, plain[0].end]).toEqual([0, text.length]);
    expect(find(text, text)).toHaveLength(1);
    expect(find(text, text, { matchDiacritics: true })).toHaveLength(1);
    expect(find(text, "בראשית ברא", { matchDiacritics: true })).toHaveLength(0);
  });

  it("ignores cantillation by default", () => {
    expect(find("בְּרֵאשִׁ֑ית", "בראשית")).toHaveLength(1);
  });

  it("keeps Hebrew final letters distinct", () => {
    expect(find("מלך", "מלכ")).toHaveLength(0);
    expect(find("מלכ", "מלך")).toHaveLength(0);
    expect(find("מלך", "מלך")).toHaveLength(1);
  });

  it("keeps offsets right around surrogate pairs", () => {
    const text = "😀 abc 😀 abc";
    const abc = find(text, "abc");
    expect(abc.map((m) => [m.start, m.end])).toEqual([
      [3, 6],
      [10, 13],
    ]);
    const emoji = find(text, "😀");
    expect(emoji.map((m) => [m.start, m.end])).toEqual([
      [0, 2],
      [7, 9],
    ]);
  });
});

describe("SearchIndex", () => {
  it("finds non-overlapping matches", () => {
    expect(find("aaaa", "aa")).toHaveLength(2);
    expect(find("aaaa", "aa").map((m) => m.start)).toEqual([0, 2]);
  });

  it("respects limit and maxMatches", () => {
    const index = new SearchIndex();
    index.setPage(1, { text: "a a a a a" });
    expect(index.searchPage(1, "a", opts(), 2)).toHaveLength(2);
    expect(index.searchPage(1, "a", opts({ limit: 3 }))).toHaveLength(3);
    expect(index.searchPage(1, "a", opts())).toHaveLength(5);
  });

  it("returns [] for unknown pages and empty queries", () => {
    const index = new SearchIndex();
    expect(index.searchPage(4, "a", opts())).toEqual([]);
    index.setPage(1, { text: "abc" });
    expect(index.hasPage(1)).toBe(true);
    expect(index.hasPage(2)).toBe(false);
    expect(index.size).toBe(1);
    expect(index.searchPage(1, "", opts())).toEqual([]);
    expect(index.searchPage(1, " \n\t ", opts())).toEqual([]);
    index.clear();
    expect(index.size).toBe(0);
  });

  it("replacing a page invalidates the cache", () => {
    const index = new SearchIndex();
    index.setPage(1, { text: "one two" });
    expect(index.searchPage(1, "one", opts())).toHaveLength(1);
    index.setPage(1, { text: "three four" });
    expect(index.searchPage(1, "one", opts())).toHaveLength(0);
    expect(index.searchPage(1, "four", opts())).toHaveLength(1);
  });

  it("does not join words across pages", () => {
    const index = new SearchIndex();
    index.setPage(1, { text: "hel" });
    index.setPage(2, { text: "lo" });
    expect(index.searchPage(1, "hello", opts())).toEqual([]);
    expect(index.searchPage(2, "hello", opts())).toEqual([]);
  });

  it("reports the page number and omits rects without runs", () => {
    const index = new SearchIndex();
    index.setPage(7, { text: "find me" });
    const [m] = index.searchPage(7, "me", opts());
    expect(m.page).toBe(7);
    expect("rects" in m).toBe(false);
  });

  it("attaches rects when runs exist", () => {
    const index = new SearchIndex();
    index.setPage(1, {
      text: "abcd",
      runs: [{ start: 0, end: 4, rects: [{ x: 0, y: 0, width: 0.4, height: 0.1 }] }],
    });
    const [m] = index.searchPage(1, "bc", opts());
    expect(m.rects).toHaveLength(1);
    expect(m.rects?.[0].x).toBeCloseTo(0.1);
    expect(m.rects?.[0].width).toBeCloseTo(0.2);
  });
});

describe("excerpts", () => {
  it("adds ellipses when the page text is cut", () => {
    const text = "x".repeat(100) + " needle " + "y".repeat(100);
    const [m] = find(text, "needle");
    expect(m.excerpt.startsWith("…")).toBe(true);
    expect(m.excerpt.endsWith("…")).toBe(true);
    expect(m.excerpt.slice(m.excerptStart, m.excerptEnd)).toBe("needle");
  });

  it("has no ellipses when the whole text fits", () => {
    const [m] = find("a needle here", "needle");
    expect(m.excerpt).toBe("a needle here");
    expect(m.excerpt.slice(m.excerptStart, m.excerptEnd)).toBe("needle");
  });

  it("collapses whitespace inside the excerpt and match", () => {
    const text = "foo   bar\n\nneedle  baz\tqux";
    const [m] = find(text, "needle baz");
    expect(m.start).toBe(text.indexOf("needle"));
    expect(m.end).toBe(text.indexOf("needle") + "needle  baz".length);
    expect(m.excerpt).toBe("foo bar needle baz qux");
    expect(m.excerpt.slice(m.excerptStart, m.excerptEnd)).toBe("needle baz");
  });

  it("never splits a surrogate pair", () => {
    const text = "😀".repeat(60) + "needle" + "😀".repeat(60);
    const [m] = find(text, "needle");
    expect(m.excerpt.slice(m.excerptStart, m.excerptEnd)).toBe("needle");
    for (const ch of m.excerpt.replace(/…/g, "")) {
      expect(ch === "needle"[0] || /[needl]/.test(ch) || ch === "😀").toBe(true);
    }
  });
});

describe("rectsForRange", () => {
  const rect = { x: 0.1, y: 0.2, width: 0.4, height: 0.05 };

  it("returns undefined without runs or overlap", () => {
    expect(rectsForRange({ text: "abcd" }, 0, 2)).toBeUndefined();
    const t: PageText = { text: "abcdefgh", runs: [{ start: 0, end: 4, rects: [rect] }] };
    expect(rectsForRange(t, 4, 8)).toBeUndefined();
    expect(rectsForRange(t, 2, 2)).toBeUndefined();
  });

  it("returns the run rects for a fully covered run", () => {
    const t: PageText = { text: "abcd", runs: [{ start: 0, end: 4, rects: [rect] }] };
    expect(rectsForRange(t, 0, 4)).toEqual([rect]);
    expect(rectsForRange(t, 0, 10)).toEqual([rect]);
  });

  it("shrinks a partial single-rect run left to right", () => {
    const t: PageText = { text: "abcd", runs: [{ start: 0, end: 4, rects: [rect] }] };
    const [r] = rectsForRange(t, 1, 3) as [typeof rect];
    expect(r.x).toBeCloseTo(0.1 + 0.4 * 0.25);
    expect(r.width).toBeCloseTo(0.2);
    expect(r.y).toBe(0.2);
    expect(r.height).toBe(0.05);
  });

  it("shrinks a partial single-rect run right to left for rtl", () => {
    const t: PageText = { text: "abcd", runs: [{ start: 0, end: 4, dir: "rtl", rects: [rect] }] };
    const [r] = rectsForRange(t, 0, 1) as [typeof rect];
    expect(r.x).toBeCloseTo(0.1 + 0.4 * 0.75);
    expect(r.width).toBeCloseTo(0.1);
    const t2: PageText = { text: "abcd", dir: "rtl", runs: [{ start: 0, end: 4, rects: [rect] }] };
    const [r2] = rectsForRange(t2, 3, 4) as [typeof rect];
    expect(r2.x).toBeCloseTo(0.1);
  });

  it("includes all rects of a multi-rect run", () => {
    const rect2 = { x: 0.1, y: 0.3, width: 0.2, height: 0.05 };
    const t: PageText = { text: "abcdef", runs: [{ start: 0, end: 6, rects: [rect, rect2] }] };
    expect(rectsForRange(t, 1, 2)).toEqual([rect, rect2]);
  });

  it("collects rects across runs", () => {
    const t: PageText = {
      text: "abcdefgh",
      runs: [
        { start: 0, end: 4, rects: [rect] },
        { start: 4, end: 8, rects: [{ ...rect, y: 0.5 }] },
      ],
    };
    expect(rectsForRange(t, 2, 6)).toHaveLength(2);
  });
});

describe("normalization property", () => {
  function rng(seed: number) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const alphabet = ["a", "b", "A", " ", "\n", "­", "́", "בְ", "א"];

  it("every match slice normalizes to the normalized query", () => {
    const rand = rng(12345);
    const pick = () => alphabet[Math.floor(rand() * alphabet.length)];
    const combos = [
      { matchCase: false, matchDiacritics: false },
      { matchCase: true, matchDiacritics: false },
      { matchCase: false, matchDiacritics: true },
      { matchCase: true, matchDiacritics: true },
    ];
    let checked = 0;
    for (let round = 0; round < 300; round++) {
      let text = "";
      const len = 1 + Math.floor(rand() * 30);
      for (let i = 0; i < len; i++) text += pick();
      const o = combos[round % combos.length];
      let query = "";
      if (rand() < 0.6 && text.length > 0) {
        const a = Math.floor(rand() * text.length);
        query = text.slice(a, a + 1 + Math.floor(rand() * 6));
      } else {
        const qlen = 1 + Math.floor(rand() * 3);
        for (let i = 0; i < qlen; i++) query += pick();
      }
      const index = new SearchIndex();
      index.setPage(1, { text });
      const matches = index.searchPage(1, query, opts(o));
      const nq = normalizeQuery(query, o);
      let last = 0;
      for (const m of matches) {
        expect(m.start).toBeGreaterThanOrEqual(last);
        last = m.end;
        expect(normalizeQuery(text.slice(m.start, m.end), o)).toBe(nq);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(100);
  });
});
