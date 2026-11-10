import { describe, expect, it } from "vitest";
import { FlipBookError } from "../src/errors";
import {
  MANIFEST_LIMITS,
  assertManifestSize,
  parseLinksSidecar,
  parseManifest,
  parseTextSidecar,
  pickVariant,
  resolveResourceUrl,
  safeExternalUrl,
} from "../src/source/manifest";

const BASE = "https://cdn.example.com/books/brooklyn/manifest.json";

const page = (n: number, extra: Record<string, unknown> = {}) => ({
  number: n,
  width: 1300,
  height: 2000,
  variants: [{ src: `pages/${n}.jpg`, width: 1300, height: 2000, mime: "image/jpeg" }],
  ...extra,
});

const manifest = (extra: Record<string, unknown> = {}) => ({
  schemaVersion: 1,
  id: "brooklyn-directory",
  revision: "2026-01",
  title: "Brooklyn Directory",
  language: "en",
  direction: "ltr",
  pages: [
    page(1, {
      label: "Cover",
      preview: "pages/1-small.jpg",
      thumbnail: "thumbs/1.jpg",
      text: "text/1.json",
      links: "links/1.json",
    }),
    page(2),
  ],
  outline: [{ title: "Cover", page: 1 }],
  ...extra,
});

const fails = (fn: () => unknown, code: string, message?: RegExp) => {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(FlipBookError);
    expect((error as FlipBookError).code).toBe(code);
    if (message) expect((error as FlipBookError).message).toMatch(message);
    return;
  }
  throw new Error("expected function to throw");
};

describe("parseManifest", () => {
  it("resolves relative URLs against the manifest URL", () => {
    const m = parseManifest(manifest(), { baseUrl: BASE });
    expect(m.id).toBe("brooklyn-directory");
    expect(m.revision).toBe("2026-01");
    expect(m.title).toBe("Brooklyn Directory");
    expect(m.direction).toBe("ltr");
    expect(m.baseUrl).toBe(BASE);
    const p = m.pages[0];
    expect(p.aspect).toBeCloseTo(0.65);
    expect(p.label).toBe("Cover");
    expect(p.preview).toBe("https://cdn.example.com/books/brooklyn/pages/1-small.jpg");
    expect(p.thumbnail).toBe("https://cdn.example.com/books/brooklyn/thumbs/1.jpg");
    expect(p.text).toBe("https://cdn.example.com/books/brooklyn/text/1.json");
    expect(p.links).toBe("https://cdn.example.com/books/brooklyn/links/1.json");
    expect(p.variants[0]).toEqual({
      src: "https://cdn.example.com/books/brooklyn/pages/1.jpg",
      width: 1300,
      height: 2000,
      mime: "image/jpeg",
    });
    expect(m.outline).toEqual([{ title: "Cover", page: 1 }]);
  });

  it("uses an explicit baseUrl for in-memory manifests and defaults outline to []", () => {
    const input = manifest();
    delete (input as Record<string, unknown>).outline;
    const m = parseManifest(input, { baseUrl: "https://other.example/x/" });
    expect(m.outline).toEqual([]);
    expect(m.pages[1].variants[0].src).toBe("https://other.example/x/pages/2.jpg");
  });

  it("ignores unknown fields and does not copy them", () => {
    const input = manifest({ evil: "<script>", extra: { a: 1 } });
    (input.pages[0] as Record<string, unknown>).html = "<b>x</b>";
    (input.pages[0].variants[0] as Record<string, unknown>).onload = "alert(1)";
    (input.outline[0] as Record<string, unknown>).action = "launch";
    const m = parseManifest(input, { baseUrl: BASE });
    expect(m).not.toHaveProperty("evil");
    expect(m).not.toHaveProperty("extra");
    expect(m.pages[0]).not.toHaveProperty("html");
    expect(m.pages[0].variants[0]).not.toHaveProperty("onload");
    expect(m.outline[0]).not.toHaveProperty("action");
  });

  it("does not mutate its input", () => {
    const input = manifest();
    input.pages[0].variants.push({ src: "pages/1-big.jpg", width: 2600, height: 4000, mime: "image/jpeg" });
    input.pages[0].variants.unshift({ src: "pages/1-s.jpg", width: 650, height: 1000 } as never);
    const copy = JSON.parse(JSON.stringify(input));
    parseManifest(input, { baseUrl: BASE });
    expect(input).toEqual(copy);
  });

  it("sorts variants by ascending height", () => {
    const input = manifest();
    input.pages[0].variants = [
      { src: "b.jpg", width: 2600, height: 4000 },
      { src: "a.jpg", width: 650, height: 1000 },
      { src: "c.jpg", width: 1300, height: 2000 },
    ] as never;
    const m = parseManifest(input, { baseUrl: BASE });
    expect(m.pages[0].variants.map((v) => v.height)).toEqual([1000, 2000, 4000]);
  });

  it("rejects non-objects", () => {
    for (const bad of [null, undefined, 5, "x", []]) {
      fails(() => parseManifest(bad, { baseUrl: BASE }), "INVALID_MANIFEST");
    }
  });

  it("rejects unknown or missing schemaVersion", () => {
    fails(() => parseManifest(manifest({ schemaVersion: 2 }), { baseUrl: BASE }), "INVALID_MANIFEST", /schemaVersion/);
    fails(() => parseManifest(manifest({ schemaVersion: "1" }), { baseUrl: BASE }), "INVALID_MANIFEST", /Unsupported/);
    const input = manifest() as Record<string, unknown>;
    delete input.schemaVersion;
    fails(() => parseManifest(input, { baseUrl: BASE }), "INVALID_MANIFEST", /Unsupported/);
  });

  it("requires id and revision", () => {
    fails(() => parseManifest(manifest({ id: "" }), { baseUrl: BASE }), "INVALID_MANIFEST", /id/);
    fails(() => parseManifest(manifest({ revision: 3 }), { baseUrl: BASE }), "INVALID_MANIFEST", /revision/);
  });

  it("drops non-string title and language", () => {
    const m = parseManifest(manifest({ title: 5, language: {} }), { baseUrl: BASE });
    expect(m.title).toBeUndefined();
    expect(m.language).toBeUndefined();
  });

  it("rejects a bad direction and accepts rtl", () => {
    fails(() => parseManifest(manifest({ direction: "up" }), { baseUrl: BASE }), "INVALID_MANIFEST", /direction/);
    expect(parseManifest(manifest({ direction: "rtl" }), { baseUrl: BASE }).direction).toBe("rtl");
  });

  it("rejects empty or missing pages", () => {
    fails(() => parseManifest(manifest({ pages: [] }), { baseUrl: BASE }), "INVALID_MANIFEST", /pages/);
    fails(() => parseManifest(manifest({ pages: "x" }), { baseUrl: BASE }), "INVALID_MANIFEST", /pages/);
  });

  it("enforces the page limit and honours the maxPages option", () => {
    fails(() => parseManifest(manifest(), { baseUrl: BASE, maxPages: 1 }), "INVALID_MANIFEST", /limit/);
    expect(parseManifest(manifest(), { baseUrl: BASE, maxPages: 2 }).pages).toHaveLength(2);
  });

  it("rejects duplicate page numbers", () => {
    fails(
      () => parseManifest(manifest({ pages: [page(1), page(1)] }), { baseUrl: BASE }),
      "INVALID_MANIFEST",
      /Duplicate page/,
    );
  });

  it("rejects gaps, out-of-order pages and a wrong start", () => {
    fails(() => parseManifest(manifest({ pages: [page(1), page(3)] }), { baseUrl: BASE }), "INVALID_MANIFEST", /contiguous/);
    fails(() => parseManifest(manifest({ pages: [page(2), page(1)] }), { baseUrl: BASE }), "INVALID_MANIFEST", /contiguous/);
    fails(() => parseManifest(manifest({ pages: [page(0), page(1)] }), { baseUrl: BASE }), "INVALID_MANIFEST", /contiguous/);
    fails(() => parseManifest(manifest({ pages: [page(1.5)] }), { baseUrl: BASE }), "INVALID_MANIFEST", /integer/);
  });

  it("rejects non-positive or non-finite dimensions", () => {
    for (const bad of [0, -5, NaN, Infinity, "10"]) {
      fails(() => parseManifest(manifest({ pages: [page(1, { width: bad })] }), { baseUrl: BASE }), "INVALID_MANIFEST", /width/);
      fails(() => parseManifest(manifest({ pages: [page(1, { height: bad })] }), { baseUrl: BASE }), "INVALID_MANIFEST", /height/);
    }
    fails(
      () => parseManifest(manifest({ pages: [page(1, { variants: [{ src: "a.jpg", width: 0, height: 2000 }] })] }), { baseUrl: BASE }),
      "INVALID_MANIFEST",
      /variant 1 width/,
    );
  });

  it("rejects missing, empty or too many variants, and missing src", () => {
    fails(() => parseManifest(manifest({ pages: [page(1, { variants: [] })] }), { baseUrl: BASE }), "INVALID_MANIFEST", /variants/);
    fails(() => parseManifest(manifest({ pages: [page(1, { variants: [{ width: 1, height: 1 }] })] }), { baseUrl: BASE }), "INVALID_MANIFEST", /src/);
    const many = Array.from({ length: MANIFEST_LIMITS.maxVariantsPerPage + 1 }, (_, i) => ({
      src: `${i}.jpg`, width: 1300, height: 2000,
    }));
    fails(() => parseManifest(manifest({ pages: [page(1, { variants: many })] }), { baseUrl: BASE }), "INVALID_MANIFEST", /variants/);
  });

  it("rejects variant aspect mismatch above 1% and accepts within 1%", () => {
    const withVariant = (width: number, height: number) =>
      manifest({ pages: [page(1, { variants: [{ src: "a.jpg", width, height }] })] });
    fails(() => parseManifest(withVariant(1300 * 1.02, 2000), { baseUrl: BASE }), "INVALID_MANIFEST", /aspect/);
    fails(() => parseManifest(withVariant(1300, 2000 * 1.03), { baseUrl: BASE }), "INVALID_MANIFEST", /aspect/);
    expect(() => parseManifest(withVariant(1300 * 1.005, 2000), { baseUrl: BASE })).not.toThrow();
    expect(() => parseManifest(withVariant(650, 1001), { baseUrl: BASE })).not.toThrow();
  });

  it("rejects unsafe URLs with UNSAFE_URL", () => {
    fails(
      () => parseManifest(manifest({ pages: [page(1, { variants: [{ src: "javascript:alert(1)", width: 1300, height: 2000 }] })] }), { baseUrl: BASE }),
      "UNSAFE_URL",
    );
    fails(() => parseManifest(manifest({ pages: [page(1, { preview: "javascript:alert(1)" })] }), { baseUrl: BASE }), "UNSAFE_URL", /page 1 preview/);
    fails(() => parseManifest(manifest({ pages: [page(1, { thumbnail: "data:text/html,<b>x</b>" })] }), { baseUrl: BASE }), "UNSAFE_URL");
    fails(() => parseManifest(manifest({ pages: [page(1, { text: "file:///etc/passwd" })] }), { baseUrl: BASE }), "UNSAFE_URL");
    fails(() => parseManifest(manifest({ pages: [page(1, { links: "vbscript:x" })] }), { baseUrl: BASE }), "UNSAFE_URL");
  });

  it("accepts data:image variants", () => {
    const src = "data:image/png;base64,AAAA";
    const m = parseManifest(manifest({ pages: [page(1, { variants: [{ src, width: 1300, height: 2000 }] })] }), { baseUrl: BASE });
    expect(m.pages[0].variants[0].src).toBe(src);
  });

  it("validates outline destinations", () => {
    fails(() => parseManifest(manifest({ outline: [{ title: "X", page: 3 }] }), { baseUrl: BASE }), "INVALID_MANIFEST", /destination/);
    fails(() => parseManifest(manifest({ outline: [{ title: "X", page: 0 }] }), { baseUrl: BASE }), "INVALID_MANIFEST", /destination/);
    fails(() => parseManifest(manifest({ outline: [{ title: "X", page: 1.5 }] }), { baseUrl: BASE }), "INVALID_MANIFEST", /destination/);
    fails(
      () => parseManifest(manifest({ outline: [{ title: "A", page: 1, children: [{ title: "B", page: 9 }] }] }), { baseUrl: BASE }),
      "INVALID_MANIFEST",
      /destination/,
    );
    fails(() => parseManifest(manifest({ outline: [{ title: "", page: 1 }] }), { baseUrl: BASE }), "INVALID_MANIFEST", /title/);
  });

  it("keeps nested outline children", () => {
    const m = parseManifest(
      manifest({ outline: [{ title: "A", page: 1, children: [{ title: "B", page: 2 }] }] }),
      { baseUrl: BASE },
    );
    expect(m.outline).toEqual([{ title: "A", page: 1, children: [{ title: "B", page: 2 }] }]);
  });

  it("enforces outline depth and node limits", () => {
    const nest = (depth: number): unknown => {
      let node: Record<string, unknown> = { title: "leaf", page: 1 };
      for (let i = 1; i < depth; i++) node = { title: `n${i}`, page: 1, children: [node] };
      return node;
    };
    expect(() => parseManifest(manifest({ outline: [nest(MANIFEST_LIMITS.maxOutlineDepth)] }), { baseUrl: BASE })).not.toThrow();
    fails(
      () => parseManifest(manifest({ outline: [nest(MANIFEST_LIMITS.maxOutlineDepth + 1)] }), { baseUrl: BASE }),
      "INVALID_MANIFEST",
      /deeper/,
    );
    const flat = Array.from({ length: MANIFEST_LIMITS.maxOutlineNodes + 1 }, () => ({ title: "t", page: 1 }));
    fails(() => parseManifest(manifest({ outline: flat }), { baseUrl: BASE }), "INVALID_MANIFEST", /nodes/);
  });

  it("validates a generated 2,000-page manifest quickly", () => {
    const pages = Array.from({ length: 2000 }, (_, i) =>
      page(i + 1, { preview: `p/${i + 1}-s.jpg`, text: `t/${i + 1}.json`, links: `l/${i + 1}.json` }),
    );
    const outline = Array.from({ length: 2000 }, (_, i) => ({ title: `Ch ${i + 1}`, page: i + 1 }));
    const start = performance.now();
    const m = parseManifest(manifest({ pages, outline }), { baseUrl: BASE });
    const elapsed = performance.now() - start;
    expect(m.pages).toHaveLength(2000);
    expect(m.outline).toHaveLength(2000);
    expect(elapsed).toBeLessThan(1000);
  });
});

describe("assertManifestSize", () => {
  it("accepts sizes up to the limit and rejects larger ones", () => {
    expect(() => assertManifestSize(1024)).not.toThrow();
    expect(() => assertManifestSize(MANIFEST_LIMITS.maxBytes)).not.toThrow();
    fails(() => assertManifestSize(MANIFEST_LIMITS.maxBytes + 1), "INVALID_MANIFEST");
    fails(() => assertManifestSize(11, 10), "INVALID_MANIFEST");
    expect(() => assertManifestSize(10, 10)).not.toThrow();
  });
});

describe("resolveResourceUrl", () => {
  it("resolves relative and absolute references", () => {
    expect(resolveResourceUrl("a/b.jpg", BASE)).toBe("https://cdn.example.com/books/brooklyn/a/b.jpg");
    expect(resolveResourceUrl("/root.jpg", BASE)).toBe("https://cdn.example.com/root.jpg");
    expect(resolveResourceUrl("https://x.test/y.jpg", BASE)).toBe("https://x.test/y.jpg");
    expect(resolveResourceUrl("blob:https://cdn.example.com/abc", BASE)).toMatch(/^blob:/);
  });

  it("rejects unsafe schemes", () => {
    for (const bad of ["javascript:alert(1)", "vbscript:x", "file:///x", "ftp://x/y", "data:text/html,<b>", "data:application/json,{}", "java\nscript:alert(1)"]) {
      fails(() => resolveResourceUrl(bad, BASE), "UNSAFE_URL");
    }
  });

  it("rejects empty and non-string input", () => {
    for (const bad of ["", "   ", null, undefined, 5, {}]) {
      fails(() => resolveResourceUrl(bad, BASE), "INVALID_MANIFEST");
    }
  });
});

describe("safeExternalUrl", () => {
  it("accepts safe schemes", () => {
    expect(safeExternalUrl("http://example.com")).toBe("http://example.com/");
    expect(safeExternalUrl("https://example.com/a?b=1")).toBe("https://example.com/a?b=1");
    expect(safeExternalUrl("mailto:a@example.com")).toBe("mailto:a@example.com");
    expect(safeExternalUrl("tel:+15551234567")).toBe("tel:+15551234567");
  });

  it("rejects unsafe or malformed values", () => {
    const bad: unknown[] = [
      "javascript:alert(1)",
      "data:text/html,<b>",
      "data:image/png;base64,AAAA",
      "vbscript:x",
      "file:///etc/passwd",
      "blob:https://example.com/x",
      "java\tscript:alert(1)",
      "java\nscript:alert(1)",
      " javascript:alert(1)",
      " https://example.com",
      "https://example.com ",
      "",
      null,
      undefined,
      42,
      {},
    ];
    for (const value of bad) expect(safeExternalUrl(value)).toBeNull();
  });

  it("handles relative URLs with and without a base", () => {
    expect(safeExternalUrl("/x/y")).toBeNull();
    expect(safeExternalUrl("x.html")).toBeNull();
    expect(safeExternalUrl("x.html", "https://example.com/a/")).toBe("https://example.com/a/x.html");
    expect(safeExternalUrl("javascript:alert(1)", "https://example.com/")).toBeNull();
    expect(safeExternalUrl("x", "not a url")).toBeNull();
  });
});

describe("parseTextSidecar", () => {
  const rect = { x: 0.1, y: 0.1, width: 0.2, height: 0.05 };

  it("accepts rect and rects and always outputs rects", () => {
    const out = parseTextSidecar({
      text: "hello world",
      lang: "en",
      dir: "ltr",
      runs: [
        { start: 0, end: 5, rect },
        { start: 6, end: 11, rects: [rect, { x: 0.5, y: 0.5, width: 0.1, height: 0.1 }], lang: "en", dir: "rtl" },
      ],
    });
    expect(out.text).toBe("hello world");
    expect(out.lang).toBe("en");
    expect(out.dir).toBe("ltr");
    expect(out.runs).toHaveLength(2);
    expect(out.runs![0].rects).toEqual([rect]);
    expect(out.runs![0]).not.toHaveProperty("rect");
    expect(out.runs![1].rects).toHaveLength(2);
    expect(out.runs![1].dir).toBe("rtl");
  });

  it("drops runs with invalid offsets or no valid rect", () => {
    const out = parseTextSidecar({
      text: "abcdef",
      runs: [
        { start: 0, end: 3, rect },
        { start: -1, end: 3, rect },
        { start: 0, end: 7, rect },
        { start: 3, end: 3, rect },
        { start: 4, end: 2, rect },
        { start: 0.5, end: 3, rect },
        { start: "0", end: 3, rect },
        { start: 0, end: 3 },
        { start: 0, end: 3, rect: { x: 0.1, y: 0.1, width: 0, height: 0.1 } },
        { start: 0, end: 3, rects: [] },
        "junk",
        null,
      ],
    });
    expect(out.runs).toHaveLength(1);
    expect(out.runs![0].start).toBe(0);
  });

  it("clamps rects into 0-1 and drops zero-area ones", () => {
    const out = parseTextSidecar({
      text: "abc",
      runs: [
        { start: 0, end: 1, rect: { x: -0.2, y: 0.9, width: 0.6, height: 0.5 } },
        { start: 1, end: 2, rect: { x: 1.5, y: 0.1, width: 0.2, height: 0.2 } },
        { start: 2, end: 3, rects: [{ x: 0.1, y: 0.1, width: 0.1, height: 0.1 }, { x: 0.2, y: 0.2, width: 0, height: 0.1 }] },
      ],
    });
    expect(out.runs).toHaveLength(2);
    const r = out.runs![0].rects[0];
    expect(r.x).toBe(0);
    expect(r.width).toBeCloseTo(0.4);
    expect(r.y).toBeCloseTo(0.9);
    expect(r.height).toBeCloseTo(0.1);
    expect(out.runs![1].rects).toHaveLength(1);
  });

  it("omits runs when none survive and ignores unknown fields", () => {
    const out = parseTextSidecar({ text: "abc", html: "<b>", runs: [{ start: 9, end: 10, rect }] });
    expect(out).toEqual({ text: "abc" });
  });

  it("throws only for a missing or oversized text", () => {
    fails(() => parseTextSidecar(null), "INVALID_MANIFEST");
    fails(() => parseTextSidecar({}), "INVALID_MANIFEST");
    fails(() => parseTextSidecar({ text: 5 }), "INVALID_MANIFEST");
    fails(() => parseTextSidecar({ text: "x".repeat(MANIFEST_LIMITS.maxTextLength + 1) }), "INVALID_MANIFEST");
    expect(parseTextSidecar({ text: "" })).toEqual({ text: "" });
  });
});

describe("parseLinksSidecar", () => {
  const rect = { x: 0.1, y: 0.1, width: 0.2, height: 0.05 };

  it("accepts both input shapes", () => {
    const list = [
      { rect, label: "Site", url: "https://example.com/" },
      { rect, page: 2 },
    ];
    const a = parseLinksSidecar({ links: list }, 3);
    const b = parseLinksSidecar(list, 3);
    expect(a).toEqual(b);
    expect(a).toEqual([
      { rect, label: "Site", url: "https://example.com/" },
      { rect, label: "Page 2", page: 2 },
    ]);
  });

  it("defaults the label to the URL and trims and caps labels", () => {
    const out = parseLinksSidecar(
      [
        { rect, url: "https://example.com/a" },
        { rect, url: "https://example.com/b", label: "  spaced  " },
        { rect, url: "https://example.com/c", label: "x".repeat(500) },
      ],
      1,
    );
    expect(out[0].label).toBe("https://example.com/a");
    expect(out[1].label).toBe("spaced");
    expect(out[2].label).toHaveLength(300);
  });

  it("drops links with both or neither destination", () => {
    const out = parseLinksSidecar(
      [
        { rect, url: "https://example.com", page: 1 },
        { rect },
        { rect, label: "only label" },
      ],
      3,
    );
    expect(out).toEqual([]);
  });

  it("drops out-of-range or non-integer pages", () => {
    const out = parseLinksSidecar(
      [{ rect, page: 0 }, { rect, page: 4 }, { rect, page: 1.5 }, { rect, page: "2" }, { rect, page: 3 }],
      3,
    );
    expect(out).toEqual([{ rect, label: "Page 3", page: 3 }]);
  });

  it("drops unsafe URLs and invalid rects", () => {
    const out = parseLinksSidecar(
      [
        { rect, url: "javascript:alert(1)" },
        { rect, url: "data:text/html,x" },
        { rect, url: "java\tscript:alert(1)" },
        { rect: { x: 0, y: 0, width: 0, height: 1 }, url: "https://example.com" },
        { url: "https://example.com" },
        { rect, url: "mailto:a@example.com" },
      ],
      1,
    );
    expect(out).toHaveLength(1);
    expect(out[0].url).toBe("mailto:a@example.com");
  });

  it("resolves relative URLs only when a base is given", () => {
    expect(parseLinksSidecar([{ rect, url: "rel.html" }], 1)).toEqual([]);
    const out = parseLinksSidecar([{ rect, url: "rel.html" }], 1, "https://example.com/dir/");
    expect(out[0].url).toBe("https://example.com/dir/rel.html");
  });

  it("clamps link rects", () => {
    const out = parseLinksSidecar([{ rect: { x: 0.9, y: 0.9, width: 0.5, height: 0.5 }, page: 1 }], 1);
    expect(out[0].rect.width).toBeCloseTo(0.1);
    expect(out[0].rect.height).toBeCloseTo(0.1);
  });

  it("throws only for a bad top-level shape", () => {
    fails(() => parseLinksSidecar(null, 1), "INVALID_MANIFEST");
    fails(() => parseLinksSidecar({}, 1), "INVALID_MANIFEST");
    fails(() => parseLinksSidecar({ links: "x" }, 1), "INVALID_MANIFEST");
    fails(() => parseLinksSidecar("x", 1), "INVALID_MANIFEST");
    expect(parseLinksSidecar([], 1)).toEqual([]);
  });
});

describe("pickVariant", () => {
  const m = parseManifest(
    manifest({
      pages: [
        page(1, {
          variants: [
            { src: "c.jpg", width: 1950, height: 3000 },
            { src: "a.jpg", width: 650, height: 1000 },
            { src: "b.jpg", width: 1300, height: 2000 },
          ],
        }),
      ],
    }),
    { baseUrl: BASE },
  );
  const p = m.pages[0];

  it("picks the smallest variant at least as tall as the target", () => {
    expect(pickVariant(p, 500).height).toBe(1000);
    expect(pickVariant(p, 1000).height).toBe(1000);
    expect(pickVariant(p, 1001).height).toBe(2000);
    expect(pickVariant(p, 3000).height).toBe(3000);
  });

  it("falls back to the largest variant", () => {
    expect(pickVariant(p, 5000).height).toBe(3000);
  });
});
