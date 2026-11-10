import { FlipBookError } from "../errors";
import type {
  ManifestImageVariant,
  NormalizedRect,
  OutlineNode,
  PageLink,
  PageText,
  PageTextRun,
  ReadingDirection,
} from "../types";

export const MANIFEST_LIMITS = {
  maxBytes: 8 * 1024 * 1024,
  maxPages: 20000,
  maxOutlineNodes: 20000,
  maxOutlineDepth: 16,
  maxVariantsPerPage: 12,
  maxStringLength: 2048,
  maxRunsPerPage: 20000,
  maxLinksPerPage: 2000,
  maxTextLength: 2_000_000,
};

export interface ResolvedManifestPage {
  number: number;
  label?: string;
  width: number;
  height: number;
  /** width / height */
  aspect: number;
  preview?: string;
  /** absolute `src`, sorted by ascending height */
  variants: ManifestImageVariant[];
  thumbnail?: string;
  text?: string;
  links?: string;
}

export interface ResolvedManifest {
  schemaVersion: 1;
  id: string;
  revision: string;
  title?: string;
  language?: string;
  direction?: ReadingDirection;
  pages: ResolvedManifestPage[];
  outline: OutlineNode[];
  baseUrl: string;
}

const invalid = (message: string) => new FlipBookError("INVALID_MANIFEST", message);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasControlChars = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    if (c <= 0x20 || c === 0x7f) return true;
  }
  return false;
};

/** Throws when a manifest document is larger than the limit. Call before JSON.parse. */
export function assertManifestSize(byteLength: number, maxBytes: number = MANIFEST_LIMITS.maxBytes): void {
  if (!Number.isFinite(byteLength) || byteLength < 0) {
    throw invalid("Manifest size is not a valid byte length");
  }
  if (byteLength > maxBytes) {
    throw invalid(`Manifest is ${byteLength} bytes, larger than the ${maxBytes} byte limit`);
  }
}

/** Resolve a resource reference to a safe absolute URL. */
export function resolveResourceUrl(reference: unknown, baseUrl: string): string {
  if (typeof reference !== "string" || reference.length === 0) {
    throw invalid("Resource reference must be a non-empty string");
  }
  if (reference.length > MANIFEST_LIMITS.maxStringLength) {
    throw invalid("Resource reference is too long");
  }
  // Control characters and whitespace inside a reference are never legitimate here.
  for (let i = 0; i < reference.length; i++) {
    const c = reference.charCodeAt(i);
    if (c < 0x20 || c === 0x7f) throw new FlipBookError("UNSAFE_URL", "Resource reference contains control characters");
  }
  const trimmed = reference.trim();
  if (trimmed.length === 0) throw invalid("Resource reference must be a non-empty string");
  let url: URL;
  try {
    url = new URL(trimmed, baseUrl);
  } catch (cause) {
    throw new FlipBookError("UNSAFE_URL", `Resource reference "${trimmed.slice(0, 80)}" is not a valid URL`, { cause });
  }
  const protocol = url.protocol;
  if (protocol === "http:" || protocol === "https:" || protocol === "blob:") return url.href;
  if (protocol === "data:" && /^data:image\//i.test(url.href)) return url.href;
  throw new FlipBookError("UNSAFE_URL", `Resource reference uses a disallowed scheme (${protocol})`);
}

/** Normalized URL for http, https, mailto, tel; otherwise null. Never throws. */
export function safeExternalUrl(value: unknown, baseUrl?: string): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > MANIFEST_LIMITS.maxStringLength) {
    return null;
  }
  if (hasControlChars(value) && value.trim() !== value) return null;
  if (/[\u0000-\u001f\u007f]/.test(value)) return null;
  if (value !== value.trim()) return null;
  try {
    const url = baseUrl !== undefined ? new URL(value, baseUrl) : new URL(value);
    const p = url.protocol;
    if (p === "http:" || p === "https:" || p === "mailto:" || p === "tel:") return url.href;
    return null;
  } catch {
    return null;
  }
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Clamp a rect into 0-1; null when invalid or zero area. */
function cleanRect(value: unknown): NormalizedRect | null {
  if (!isObject(value)) return null;
  const { x, y, width, height } = value;
  if (
    typeof x !== "number" || typeof y !== "number" ||
    typeof width !== "number" || typeof height !== "number" ||
    !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height)
  ) {
    return null;
  }
  if (width <= 0 || height <= 0) return null;
  const x0 = clamp01(x);
  const y0 = clamp01(y);
  // Keep in-range values exact; only recompute the extent when clipped.
  const w = x >= 0 && x + width <= 1 ? width : clamp01(x + width) - x0;
  const h = y >= 0 && y + height <= 1 ? height : clamp01(y + height) - y0;
  if (!(w > 0) || !(h > 0)) return null;
  return { x: x0, y: y0, width: w, height: h };
}

const cleanLang = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 && value.length <= 64 ? value : undefined;

const cleanDir = (value: unknown): ReadingDirection | undefined =>
  value === "ltr" || value === "rtl" ? value : undefined;

/** Sanitize a text sidecar into plain data. */
export function parseTextSidecar(input: unknown): PageText {
  if (!isObject(input) || typeof input.text !== "string") {
    throw invalid("Text sidecar must be an object with a string `text`");
  }
  const text = input.text;
  if (text.length > MANIFEST_LIMITS.maxTextLength) {
    throw invalid(`Text sidecar exceeds ${MANIFEST_LIMITS.maxTextLength} characters`);
  }
  const out: PageText = { text };
  const lang = cleanLang(input.lang);
  if (lang) out.lang = lang;
  const dir = cleanDir(input.dir);
  if (dir) out.dir = dir;

  if (Array.isArray(input.runs)) {
    const runs: PageTextRun[] = [];
    const limit = Math.min(input.runs.length, MANIFEST_LIMITS.maxRunsPerPage);
    for (let i = 0; i < limit; i++) {
      const raw: unknown = input.runs[i];
      if (!isObject(raw)) continue;
      const { start, end } = raw;
      if (
        typeof start !== "number" || typeof end !== "number" ||
        !Number.isInteger(start) || !Number.isInteger(end) ||
        start < 0 || end > text.length || end <= start
      ) {
        continue;
      }
      const candidates: unknown[] = Array.isArray(raw.rects) ? raw.rects : raw.rect !== undefined ? [raw.rect] : [];
      const rects: NormalizedRect[] = [];
      for (const candidate of candidates) {
        const rect = cleanRect(candidate);
        if (rect) rects.push(rect);
      }
      if (rects.length === 0) continue;
      const run: PageTextRun = { start, end, rects };
      const runLang = cleanLang(raw.lang);
      if (runLang) run.lang = runLang;
      const runDir = cleanDir(raw.dir);
      if (runDir) run.dir = runDir;
      runs.push(run);
    }
    if (runs.length > 0) out.runs = runs;
  }
  return out;
}

/** Sanitize a links sidecar. Invalid links are dropped silently. */
export function parseLinksSidecar(input: unknown, pageCount: number, baseUrl?: string): PageLink[] {
  let list: unknown[];
  if (Array.isArray(input)) list = input;
  else if (isObject(input) && Array.isArray(input.links)) list = input.links;
  else throw invalid("Links sidecar must be an array or an object with a `links` array");

  const out: PageLink[] = [];
  const limit = Math.min(list.length, MANIFEST_LIMITS.maxLinksPerPage);
  for (let i = 0; i < limit; i++) {
    const raw = list[i];
    if (!isObject(raw)) continue;
    const rect = cleanRect(raw.rect);
    if (!rect) continue;
    const hasPage = raw.page !== undefined && raw.page !== null;
    const hasUrl = raw.url !== undefined && raw.url !== null;
    if (hasPage === hasUrl) continue;

    let label = typeof raw.label === "string" ? raw.label.trim().slice(0, 300) : "";
    if (hasPage) {
      const page = raw.page;
      if (typeof page !== "number" || !Number.isInteger(page) || page < 1 || page > pageCount) continue;
      out.push({ rect, label: label || `Page ${page}`, page });
    } else {
      const url = safeExternalUrl(raw.url, baseUrl);
      if (!url) continue;
      if (!label) label = url.slice(0, 300);
      out.push({ rect, label, url });
    }
  }
  return out;
}

const requireString = (value: unknown, field: string, max: number): string => {
  if (typeof value !== "string" || value.length === 0) throw invalid(`${field} must be a non-empty string`);
  if (value.length > max) throw invalid(`${field} is longer than ${max} characters`);
  return value;
};

const requirePositive = (value: unknown, field: string): number => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw invalid(`${field} must be a finite number greater than 0`);
  }
  return value;
};

function parseOutline(input: unknown, pageCount: number): OutlineNode[] {
  if (input === undefined || input === null) return [];
  if (!Array.isArray(input)) throw invalid("outline must be an array");
  let count = 0;
  const walk = (nodes: unknown[], depth: number): OutlineNode[] => {
    if (depth > MANIFEST_LIMITS.maxOutlineDepth) {
      throw invalid(`outline is nested deeper than ${MANIFEST_LIMITS.maxOutlineDepth} levels`);
    }
    return nodes.map((raw, index) => {
      count++;
      if (count > MANIFEST_LIMITS.maxOutlineNodes) {
        throw invalid(`outline has more than ${MANIFEST_LIMITS.maxOutlineNodes} nodes`);
      }
      if (!isObject(raw)) throw invalid(`outline node ${index + 1} must be an object`);
      const title = requireString(raw.title, `outline node ${index + 1} title`, MANIFEST_LIMITS.maxStringLength);
      const page = raw.page;
      if (typeof page !== "number" || !Number.isInteger(page) || page < 1 || page > pageCount) {
        throw invalid(`outline node "${title.slice(0, 60)}" has an invalid destination page (expected 1-${pageCount})`);
      }
      const node: OutlineNode = { title, page };
      if (raw.children !== undefined && raw.children !== null) {
        if (!Array.isArray(raw.children)) throw invalid(`outline node "${title.slice(0, 60)}" children must be an array`);
        if (raw.children.length > 0) node.children = walk(raw.children, depth + 1);
      }
      return node;
    });
  };
  return walk(input, 1);
}

/** Validate a parsed manifest object and resolve its resources. */
export function parseManifest(input: unknown, options: { baseUrl: string; maxPages?: number }): ResolvedManifest {
  const { baseUrl } = options;
  const maxPages = options.maxPages ?? MANIFEST_LIMITS.maxPages;
  const maxStr = MANIFEST_LIMITS.maxStringLength;

  if (!isObject(input)) throw invalid("Manifest must be a JSON object");
  if (input.schemaVersion !== 1) {
    throw invalid(`Unsupported manifest schemaVersion ${JSON.stringify(input.schemaVersion)}; expected 1`);
  }
  const id = requireString(input.id, "id", maxStr);
  const revision = requireString(input.revision, "revision", maxStr);

  let direction: ReadingDirection | undefined;
  if (input.direction !== undefined) {
    if (input.direction !== "ltr" && input.direction !== "rtl") {
      throw invalid('direction must be "ltr" or "rtl"');
    }
    direction = input.direction;
  }

  if (!Array.isArray(input.pages) || input.pages.length === 0) throw invalid("pages must be a non-empty array");
  if (input.pages.length > maxPages) {
    throw invalid(`Manifest has ${input.pages.length} pages, more than the ${maxPages} page limit`);
  }

  const seen = new Set<number>();
  const pages: ResolvedManifestPage[] = [];
  const optionalRef = (value: unknown, label: string): string | undefined => {
    if (value === undefined || value === null) return undefined;
    try {
      return resolveResourceUrl(value, baseUrl);
    } catch (error) {
      if (error instanceof FlipBookError && error.code === "INVALID_MANIFEST") {
        throw invalid(`${label}: ${error.message}`);
      }
      if (error instanceof FlipBookError) {
        throw new FlipBookError(error.code, `${label}: ${error.message}`, { cause: error });
      }
      throw error;
    }
  };

  for (let i = 0; i < input.pages.length; i++) {
    const raw: unknown = input.pages[i];
    const where = `page ${i + 1}`;
    if (!isObject(raw)) throw invalid(`${where} must be an object`);
    const number = raw.number;
    if (typeof number !== "number" || !Number.isInteger(number)) {
      throw invalid(`${where} number must be an integer`);
    }
    if (seen.has(number)) throw invalid(`Duplicate page number ${number}`);
    seen.add(number);
    if (number !== i + 1) {
      throw invalid(`Page numbers are not contiguous: expected ${i + 1} at position ${i + 1}, found ${number}`);
    }
    const width = requirePositive(raw.width, `${where} width`);
    const height = requirePositive(raw.height, `${where} height`);
    const aspect = width / height;

    if (!Array.isArray(raw.variants) || raw.variants.length === 0) {
      throw invalid(`${where} variants must be a non-empty array`);
    }
    if (raw.variants.length > MANIFEST_LIMITS.maxVariantsPerPage) {
      throw invalid(`${where} has more than ${MANIFEST_LIMITS.maxVariantsPerPage} variants`);
    }
    const variants: ManifestImageVariant[] = raw.variants.map((v: unknown, j: number) => {
      const vw = `${where} variant ${j + 1}`;
      if (!isObject(v)) throw invalid(`${vw} must be an object`);
      if (v.src === undefined || v.src === null) throw invalid(`${vw} src is required`);
      const src = optionalRef(v.src, `${vw} src`) as string;
      const w = requirePositive(v.width, `${vw} width`);
      const h = requirePositive(v.height, `${vw} height`);
      if (Math.abs(w / h - aspect) / aspect > 0.01) {
        throw invalid(`${vw} aspect ratio differs from the page's by more than 1%`);
      }
      const out: ManifestImageVariant = { src, width: w, height: h };
      if (typeof v.mime === "string") out.mime = v.mime.slice(0, 255);
      return out;
    });
    variants.sort((a, b) => a.height - b.height);

    const page: ResolvedManifestPage = { number, width, height, aspect, variants };
    if (typeof raw.label === "string") page.label = raw.label.slice(0, maxStr);
    const preview = optionalRef(raw.preview, `${where} preview`);
    if (preview) page.preview = preview;
    const thumbnail = optionalRef(raw.thumbnail, `${where} thumbnail`);
    if (thumbnail) page.thumbnail = thumbnail;
    const text = optionalRef(raw.text, `${where} text`);
    if (text) page.text = text;
    const links = optionalRef(raw.links, `${where} links`);
    if (links) page.links = links;
    pages.push(page);
  }

  const resolved: ResolvedManifest = {
    schemaVersion: 1,
    id,
    revision,
    pages,
    outline: parseOutline(input.outline, pages.length),
    baseUrl,
  };
  if (typeof input.title === "string") resolved.title = input.title.slice(0, maxStr);
  if (typeof input.language === "string") resolved.language = input.language.slice(0, 64);
  if (direction) resolved.direction = direction;
  return resolved;
}

/** Smallest variant with height >= targetHeight, else the largest. */
export function pickVariant(page: ResolvedManifestPage, targetHeight: number): ManifestImageVariant {
  const variants = page.variants;
  for (const variant of variants) {
    if (variant.height >= targetHeight) return variant;
  }
  return variants[variants.length - 1];
}
