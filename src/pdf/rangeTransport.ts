import { FlipBookError, cancelled } from "../errors";
import { Semaphore, linkSignals, resolveHeaders } from "../source/pageSource";
import type { SourceRequestOptions } from "../types";

/**
 * Byte-range access to a PDF on the network.
 *
 * The reader probes with `Range: bytes=0-0` and only trusts what comes back:
 * explicit range mode needs HTTP 206, `Content-Range: bytes 0-0/N` with a
 * positive N, and exactly one byte of body. An `Accept-Ranges` header on its
 * own proves nothing. If the server answers with the whole file, the body is
 * cancelled as soon as that is known; nothing is buffered to find out.
 *
 * In range mode every response is checked again (offsets, byte count, total
 * length, and the validators when the server exposes them), so chunks from
 * two revisions of an asset are never combined.
 */

export const RANGE_CHUNK_SIZE = 256 * 1024;

export interface RangeValidators {
  etag: string | null;
  lastModified: string | null;
}

export type RangeProbe =
  | { mode: "range"; url: string; length: number; validators: RangeValidators }
  | { mode: "stream"; url: string; reason: string };

export interface ContentRange {
  first: number;
  last: number;
  /** Null for `bytes 0-0/*`. */
  total: number | null;
}

/** Parse `bytes first-last/total`. Returns null for anything else. */
export function parseContentRange(value: string | null | undefined): ContentRange | null {
  if (!value) return null;
  const match = /^\s*bytes\s+(\d+)\s*-\s*(\d+)\s*\/\s*(\d+|\*)\s*$/i.exec(value);
  if (!match) return null;
  const first = Number(match[1]);
  const last = Number(match[2]);
  const total = match[3] === "*" ? null : Number(match[3]);
  if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last) || last < first) return null;
  if (total !== null && (!Number.isSafeInteger(total) || total <= last)) return null;
  return { first, last, total };
}

/** Read at most `limit` + 1 bytes, then cancel. Returns how many arrived. */
async function countBytes(response: Response, limit: number): Promise<number> {
  const reader = response.body?.getReader();
  if (!reader) {
    const buffer = await response.arrayBuffer();
    return buffer.byteLength;
  }
  let received = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value?.byteLength ?? 0;
      if (received > limit) break;
    }
  } finally {
    void reader.cancel().catch(() => {});
  }
  return received;
}

const discard = (response: Response) => {
  void response.body?.cancel().catch(() => {});
};

export interface TransportOptions {
  request?: SourceRequestOptions;
  signal?: AbortSignal;
  /** Injected for tests. */
  fetch?: typeof fetch;
}

async function send(
  url: string,
  range: string,
  options: TransportOptions,
): Promise<{ response: Response; aborted: () => boolean }> {
  const linked = linkSignals(options.signal, options.request?.signal);
  const doFetch = options.fetch ?? fetch;
  try {
    const response = await doFetch(url, {
      headers: { ...(await resolveHeaders(options.request)), Range: range },
      credentials: options.request?.credentials ?? "same-origin",
      signal: linked.signal,
    });
    return { response, aborted: () => linked.signal.aborted };
  } catch (error) {
    if (linked.signal.aborted) throw cancelled("Loading");
    throw new FlipBookError("NETWORK", "The PDF could not be requested", { cause: error });
  } finally {
    linked.dispose();
  }
}

/**
 * Decide how a PDF URL will be read. Never throws for a server that simply
 * ignores ranges; that is the `stream` answer. A refused request (401/403)
 * gets one renewal attempt through the host's `renew` hook.
 */
export async function probeRange(url: string, options: TransportOptions = {}): Promise<RangeProbe> {
  let current = url;
  for (let attempt = 0; ; attempt++) {
    let response: Response;
    try {
      ({ response } = await send(current, "bytes=0-0", options));
    } catch (error) {
      if (error instanceof FlipBookError && error.code === "CANCELLED") throw error;
      // A failed probe (often CORS on the Range header) still leaves ordinary loading.
      return { mode: "stream", url: current, reason: "probe request failed" };
    }

    if ((response.status === 401 || response.status === 403) && attempt === 0 && options.request?.renew) {
      discard(response);
      const renewed = await options.request.renew({ url: current, status: response.status, reason: "unauthorized" });
      if (renewed) {
        current = renewed;
        continue;
      }
      return { mode: "stream", url: current, reason: `status ${response.status}` };
    }

    if (response.status !== 206) {
      discard(response);
      return { mode: "stream", url: current, reason: `status ${response.status}` };
    }
    const range = parseContentRange(response.headers.get("content-range"));
    if (!range || range.first !== 0 || range.last !== 0 || range.total === null || range.total <= 0) {
      discard(response);
      return { mode: "stream", url: current, reason: "missing or invalid Content-Range" };
    }
    const received = await countBytes(response, 1);
    if (received !== 1) {
      return { mode: "stream", url: current, reason: `probe returned ${received} bytes` };
    }
    return {
      mode: "range",
      url: current,
      length: range.total,
      validators: {
        etag: response.headers.get("etag"),
        lastModified: response.headers.get("last-modified"),
      },
    };
  }
}

/** Do the validators a response exposes contradict the ones from the probe? */
export function validatorsChanged(expected: RangeValidators, response: Response): boolean {
  const etag = response.headers.get("etag");
  const lastModified = response.headers.get("last-modified");
  if (expected.etag !== null && etag !== null && etag !== expected.etag) return true;
  if (expected.lastModified !== null && lastModified !== null && lastModified !== expected.lastModified) return true;
  return false;
}

/*
 * A small, short-lived memory of ranges already fetched, keyed by URL and
 * tied to the asset's validators. A host that reads a PDF's direction and
 * then opens it, or a reader that is remounted, asks for the same first
 * chunks twice within moments; the second time they come from here. Nothing
 * is kept for an asset that exposes no validator, since a changed file could
 * not be told apart.
 */
const RANGE_CACHE_BYTES = 4 * 1024 * 1024;
const RANGE_CACHE_TTL = 120_000;
const RANGE_CACHE_ASSETS = 3;

interface CachedAsset {
  length: number;
  validators: RangeValidators;
  chunks: Map<string, Uint8Array>;
  bytes: number;
  touched: number;
}

const rangeCache = new Map<string, CachedAsset>();

function cachedAsset(probe: Extract<RangeProbe, { mode: "range" }>): CachedAsset | null {
  const { etag, lastModified } = probe.validators;
  if (etag === null && lastModified === null) return null;
  const now = Date.now();
  for (const [url, asset] of rangeCache) {
    if (now - asset.touched > RANGE_CACHE_TTL) rangeCache.delete(url);
  }
  let asset = rangeCache.get(probe.url);
  if (
    asset &&
    (asset.length !== probe.length || asset.validators.etag !== etag || asset.validators.lastModified !== lastModified)
  ) {
    // A different revision: nothing remembered applies to it.
    rangeCache.delete(probe.url);
    asset = undefined;
  }
  if (!asset) {
    asset = { length: probe.length, validators: { etag, lastModified }, chunks: new Map(), bytes: 0, touched: now };
    rangeCache.set(probe.url, asset);
    while (rangeCache.size > RANGE_CACHE_ASSETS) rangeCache.delete(rangeCache.keys().next().value as string);
  }
  asset.touched = now;
  return asset;
}

/** Forget every remembered range. For tests and for hosts that replace files in place. */
export function clearRangeCache(): void {
  rangeCache.clear();
}

export interface RangeReader {
  readonly length: number;
  /** Bytes [begin, end). */
  read(begin: number, end: number): Promise<Uint8Array>;
  /** Number of range requests issued and bytes received, for diagnostics. */
  readonly stats: { requests: number; bytes: number };
}

/** Explicit range requests against a URL that passed the probe. */
export function createUrlRangeReader(
  probe: Extract<RangeProbe, { mode: "range" }>,
  options: TransportOptions = {},
): RangeReader {
  const network = new Semaphore(4);
  const stats = { requests: 0, bytes: 0 };
  const remembered = cachedAsset(probe);
  let url = probe.url;

  const mismatch = (message: string) => new FlipBookError("RANGE_MISMATCH", message);

  const readOnce = async (begin: number, end: number): Promise<Uint8Array> => {
    const { response } = await send(url, `bytes=${begin}-${end - 1}`, options);
    stats.requests++;
    if (response.status === 401 || response.status === 403) {
      discard(response);
      throw new FlipBookError("NETWORK", `The PDF request was refused (${response.status})`, {
        detail: { status: response.status },
      });
    }
    if (response.status !== 206) {
      discard(response);
      throw mismatch(`Expected a partial response, got status ${response.status}`);
    }
    const range = parseContentRange(response.headers.get("content-range"));
    if (!range || range.first !== begin || range.last !== end - 1) {
      discard(response);
      throw mismatch("The server returned a different byte range than requested");
    }
    if (range.total !== probe.length) {
      discard(response);
      throw mismatch("The PDF changed length while it was being read");
    }
    if (validatorsChanged(probe.validators, response)) {
      discard(response);
      throw mismatch("The PDF changed while it was being read");
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength !== end - begin) {
      throw mismatch(`Expected ${end - begin} bytes, received ${bytes.byteLength}`);
    }
    stats.bytes += bytes.byteLength;
    return bytes;
  };

  return {
    length: probe.length,
    stats,
    read(begin, end) {
      if (!(begin >= 0) || !(end > begin) || end > probe.length) {
        return Promise.reject(new FlipBookError("INVALID_ARGUMENT", "Byte range out of bounds"));
      }
      const key = `${begin}-${end}`;
      const hit = remembered?.chunks.get(key);
      // Callers may transfer what they are given, so hand out a copy.
      if (hit) return Promise.resolve(hit.slice());
      const remember = (bytes: Uint8Array): Uint8Array => {
        if (remembered && remembered.bytes + bytes.byteLength <= RANGE_CACHE_BYTES && !remembered.chunks.has(key)) {
          remembered.chunks.set(key, bytes.slice());
          remembered.bytes += bytes.byteLength;
        }
        return bytes;
      };
      return network.run(async () => {
        try {
          return remember(await readOnce(begin, end));
        } catch (error) {
          const refused =
            error instanceof FlipBookError &&
            error.code === "NETWORK" &&
            [401, 403].includes((error.detail as { status?: number } | undefined)?.status ?? 0);
          if (!refused || !options.request?.renew) throw error;
          const status = (error.detail as { status: number }).status;
          const renewed = await options.request.renew({ url, status, reason: "unauthorized" });
          if (!renewed) throw error;
          url = renewed;
          return remember(await readOnce(begin, end));
        }
      });
    },
  };
}

/** Range reads from a File or Blob. The file is never read whole. */
export function createBlobRangeReader(blob: Blob): RangeReader {
  const stats = { requests: 0, bytes: 0 };
  return {
    length: blob.size,
    stats,
    async read(begin, end) {
      stats.requests++;
      const bytes = new Uint8Array(await blob.slice(begin, end).arrayBuffer());
      stats.bytes += bytes.byteLength;
      return bytes;
    },
  };
}
