/**
 * Text normalization for search. Every output code unit keeps the original
 * range it came from, so matches map back to the untouched page text.
 */

export interface NormalizeOptions {
  matchCase: boolean;
  matchDiacritics: boolean;
}

export interface NormalizedText {
  /** Normalized string that matching runs on. */
  text: string;
  /** For each UTF-16 code unit i of `text`: offset in the original where its source begins. */
  starts: Uint32Array;
  /** For each UTF-16 code unit i of `text`: offset in the original just past its source. */
  ends: Uint32Array;
}

const MARK = /^\p{M}$/u;
const SPACE = /^\s$/u;
const MARKS_GLOBAL = /\p{M}/gu;

/** Soft hyphen, zero-width characters and bidi controls are dropped. */
function isRemoved(cp: number): boolean {
  return (
    cp === 0xad ||
    cp === 0x200b ||
    cp === 0x200c ||
    cp === 0x200d ||
    cp === 0x2060 ||
    cp === 0xfeff ||
    cp === 0x200e ||
    cp === 0x200f ||
    (cp >= 0x202a && cp <= 0x202e) ||
    (cp >= 0x2066 && cp <= 0x2069)
  );
}

function normalizeCluster(cluster: string, options: NormalizeOptions): string {
  let out: string;
  if (options.matchDiacritics) {
    out = cluster.normalize("NFC");
  } else {
    out = cluster.normalize("NFD").replace(MARKS_GLOBAL, "").normalize("NFC");
  }
  return options.matchCase ? out : out.toLowerCase();
}

export function normalizeText(original: string, options: NormalizeOptions): NormalizedText {
  const n = original.length;
  const starts: number[] = [];
  const ends: number[] = [];
  let text = "";
  let inSpace = false;
  let i = 0;
  while (i < n) {
    const cp = original.codePointAt(i) as number;
    const base = String.fromCodePoint(cp);
    let j = i + base.length;
    while (j < n) {
      const next = String.fromCodePoint(original.codePointAt(j) as number);
      if (!MARK.test(next)) break;
      j += next.length;
    }
    if (isRemoved(cp)) {
      i = j;
      continue;
    }
    if (SPACE.test(base)) {
      if (inSpace) {
        ends[ends.length - 1] = j;
      } else {
        text += " ";
        starts.push(i);
        ends.push(j);
        inSpace = true;
      }
      i = j;
      continue;
    }
    const out = normalizeCluster(original.slice(i, j), options);
    if (out.length > 0) {
      inSpace = false;
      text += out;
      for (let k = 0; k < out.length; k++) {
        starts.push(i);
        ends.push(j);
      }
    }
    i = j;
  }
  return { text, starts: Uint32Array.from(starts), ends: Uint32Array.from(ends) };
}

/** Same pipeline as normalizeText, trimmed of leading and trailing spaces. */
export function normalizeQuery(query: string, options: NormalizeOptions): string {
  return normalizeText(query, options).text.replace(/^ +| +$/g, "");
}

/** Map a match [from, to) in normalized.text back to original offsets. */
export function toOriginalRange(
  normalized: NormalizedText,
  from: number,
  to: number,
): { start: number; end: number } {
  return { start: normalized.starts[from], end: normalized.ends[to - 1] };
}
