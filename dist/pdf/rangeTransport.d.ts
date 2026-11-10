import type { SourceRequestOptions } from "../types.js";
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
export declare const RANGE_CHUNK_SIZE: number;
export interface RangeValidators {
    etag: string | null;
    lastModified: string | null;
}
export type RangeProbe = {
    mode: "range";
    url: string;
    length: number;
    validators: RangeValidators;
} | {
    mode: "stream";
    url: string;
    reason: string;
};
export interface ContentRange {
    first: number;
    last: number;
    /** Null for `bytes 0-0/*`. */
    total: number | null;
}
/** Parse `bytes first-last/total`. Returns null for anything else. */
export declare function parseContentRange(value: string | null | undefined): ContentRange | null;
export interface TransportOptions {
    request?: SourceRequestOptions;
    signal?: AbortSignal;
    /** Injected for tests. */
    fetch?: typeof fetch;
}
/**
 * Decide how a PDF URL will be read. Never throws for a server that simply
 * ignores ranges; that is the `stream` answer. A refused request (401/403)
 * gets one renewal attempt through the host's `renew` hook.
 */
export declare function probeRange(url: string, options?: TransportOptions): Promise<RangeProbe>;
/** Do the validators a response exposes contradict the ones from the probe? */
export declare function validatorsChanged(expected: RangeValidators, response: Response): boolean;
/** Forget every remembered range. For tests and for hosts that replace files in place. */
export declare function clearRangeCache(): void;
export interface RangeReader {
    readonly length: number;
    /** Bytes [begin, end). */
    read(begin: number, end: number): Promise<Uint8Array>;
    /** Number of range requests issued and bytes received, for diagnostics. */
    readonly stats: {
        requests: number;
        bytes: number;
    };
}
/** Explicit range requests against a URL that passed the probe. */
export declare function createUrlRangeReader(probe: Extract<RangeProbe, {
    mode: "range";
}>, options?: TransportOptions): RangeReader;
/** Range reads from a File or Blob. The file is never read whole. */
export declare function createBlobRangeReader(blob: Blob): RangeReader;
