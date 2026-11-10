import type { NormalizedRect, PageText, SearchMatch, SearchOptions } from "../types";
import { normalizeQuery, normalizeText, toOriginalRange } from "./normalize";
import type { NormalizedText } from "./normalize";

export interface ResolvedSearchOptions {
  matchCase: boolean;
  matchDiacritics: boolean;
  limit: number;
}

const DEFAULT_LIMIT = 500;
const MAX_LIMIT = 10000;
const CONTEXT = 40;
const MAX_EXTEND = 20;

export function resolveSearchOptions(options?: SearchOptions): ResolvedSearchOptions {
  const raw = options?.limit;
  const limit =
    typeof raw === "number" && Number.isFinite(raw)
      ? Math.min(MAX_LIMIT, Math.max(1, Math.floor(raw)))
      : DEFAULT_LIMIT;
  return {
    matchCase: options?.matchCase === true,
    matchDiacritics: options?.matchDiacritics === true,
    limit,
  };
}

/** Rectangles covering original range [start, end), or undefined when no positioned run overlaps. */
export function rectsForRange(text: PageText, start: number, end: number): NormalizedRect[] | undefined {
  if (!text.runs || end <= start) return undefined;
  const result: NormalizedRect[] = [];
  for (const run of text.runs) {
    if (run.start >= end || run.end <= start) continue;
    const runLength = run.end - run.start;
    const partial = start > run.start || end < run.end;
    if (run.rects.length === 1 && partial && runLength > 0) {
      const r = run.rects[0];
      const from = (Math.max(start, run.start) - run.start) / runLength;
      const to = (Math.min(end, run.end) - run.start) / runLength;
      const rtl = (run.dir ?? text.dir) === "rtl";
      const x = rtl ? r.x + r.width * (1 - to) : r.x + r.width * from;
      result.push({ x, y: r.y, width: r.width * (to - from), height: r.height });
    } else {
      for (const r of run.rects) result.push({ ...r });
    }
  }
  return result.length > 0 ? result : undefined;
}

interface PageEntry {
  text: PageText;
  cache: Map<string, NormalizedText>;
}

const WHITESPACE_RUN = /\s+/g;

function collapse(s: string): string {
  return s.replace(WHITESPACE_RUN, " ");
}

function isSpaceAt(s: string, i: number): boolean {
  return /\s/u.test(s[i]);
}

function buildExcerpt(original: string, start: number, end: number): Pick<SearchMatch, "excerpt" | "excerptStart" | "excerptEnd"> {
  let s = Math.max(0, start - CONTEXT);
  let e = Math.min(original.length, end + CONTEXT);
  // Extend to a word boundary when one is close.
  for (let k = 0; k < MAX_EXTEND && s > 0 && !isSpaceAt(original, s - 1); k++) s--;
  for (let k = 0; k < MAX_EXTEND && e < original.length && !isSpaceAt(original, e); k++) e++;
  // Do not cut a surrogate pair.
  const lowSurrogate = (c: number) => c >= 0xdc00 && c <= 0xdfff;
  const highSurrogate = (c: number) => c >= 0xd800 && c <= 0xdbff;
  if (s > 0 && lowSurrogate(original.charCodeAt(s))) s--;
  if (e < original.length && highSurrogate(original.charCodeAt(e - 1))) e++;
  const before = collapse(original.slice(s, start)).replace(/^ /, "");
  const matched = collapse(original.slice(start, end));
  const after = collapse(original.slice(end, e)).replace(/ $/, "");
  const prefix = s > 0 ? "…" : "";
  const suffix = e < original.length ? "…" : "";
  const excerptStart = prefix.length + before.length;
  return {
    excerpt: prefix + before + matched + after + suffix,
    excerptStart,
    excerptEnd: excerptStart + matched.length,
  };
}

export class SearchIndex {
  private readonly pages = new Map<number, PageEntry>();

  get size(): number {
    return this.pages.size;
  }

  setPage(page: number, text: PageText): void {
    this.pages.set(page, { text, cache: new Map() });
  }

  hasPage(page: number): boolean {
    return this.pages.has(page);
  }

  searchPage(page: number, query: string, options: ResolvedSearchOptions, maxMatches?: number): SearchMatch[] {
    const entry = this.pages.get(page);
    if (!entry) return [];
    const q = normalizeQuery(query, options);
    if (q.length === 0) return [];
    const max = maxMatches ?? options.limit;
    const key = `${options.matchCase ? 1 : 0}${options.matchDiacritics ? 1 : 0}`;
    let normalized = entry.cache.get(key);
    if (!normalized) {
      normalized = normalizeText(entry.text.text, options);
      entry.cache.set(key, normalized);
    }
    const matches: SearchMatch[] = [];
    let pos = 0;
    while (matches.length < max) {
      const from = normalized.text.indexOf(q, pos);
      if (from < 0) break;
      const to = from + q.length;
      // A match must start and end on a cluster boundary of the original.
      const { starts, ends } = normalized;
      if ((from > 0 && starts[from] === starts[from - 1]) || (to < starts.length && ends[to - 1] === ends[to])) {
        pos = from + 1;
        continue;
      }
      const { start, end } = toOriginalRange(normalized, from, to);
      const match: SearchMatch = {
        page,
        start,
        end,
        ...buildExcerpt(entry.text.text, start, end),
      };
      const rects = rectsForRange(entry.text, start, end);
      if (rects) match.rects = rects;
      matches.push(match);
      pos = to;
    }
    return matches;
  }

  clear(): void {
    this.pages.clear();
  }
}
