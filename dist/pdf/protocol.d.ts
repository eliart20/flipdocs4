import type { FlipBookErrorCode, OutlineNode, PageText, PdfAssetOptions } from "../types";
/**
 * Messages between the main thread and the raster worker. The same host
 * class (pdfHost.ts) answers them in the worker and, when the worker cannot
 * be used, directly on the main thread.
 */
export type HostTransport = 
/** Explicit ranges; bytes arrive through the `readRange` callback. */
{
    kind: "range";
    length: number;
}
/** A File or Blob, sliced where the document lives. */
 | {
    kind: "blob";
    blob: Blob;
}
/** Ordinary PDF.js URL loading, for servers without usable ranges. */
 | {
    kind: "url";
    url: string;
    headers: Record<string, string>;
    withCredentials: boolean;
};
export interface HostOpenParams {
    transport: HostTransport;
    /** Absolute URL of the PDF.js parser worker. */
    parserWorkerUrl: string;
    pdfAssets?: PdfAssetOptions;
}
export interface HostDocumentInfo {
    pageCount: number;
    firstPage: {
        width: number;
        height: number;
    };
    /** Where PDF parsing runs. */
    parser: "worker" | "same-thread";
    hasOutline: boolean;
    /** Raw /ViewerPreferences /Direction ("R2L", "L2R") or null. */
    viewerDirection: string | null;
}
export interface HostRenderParams {
    page: number;
    height: number;
    maxWidth?: number;
    /** Device ceiling for either dimension. */
    maxDimension: number;
    /** Keep the page's parsed data for the sharper pass that follows. */
    keepPageData: boolean;
}
export interface HostRenderResult {
    image: ImageBitmap | HTMLCanvasElement;
    width: number;
    height: number;
}
/** A link as PDF.js reports it, before the main thread sanitizes it. */
export interface RawLink {
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    url?: string;
    page?: number;
}
export interface HostErrorPayload {
    code: FlipBookErrorCode | "ENVIRONMENT";
    message: string;
}
export interface HostCallbacks {
    readRange(begin: number, end: number): Promise<Uint8Array>;
    /** Resolves with a password, or null to cancel. Rejects when the host has no callback. */
    password(reason: "required" | "incorrect", attempt: number): Promise<string | null>;
    progress(loaded: number, total: number | null): void;
    /** The document became unusable after opening (a failed range read). */
    fatal(error: HostErrorPayload): void;
}
export type WorkerRequest = {
    id: number;
    method: "open";
    params: HostOpenParams;
} | {
    id: number;
    method: "render";
    params: HostRenderParams;
} | {
    id: number;
    method: "cancelRender";
    params: {
        requestId: number;
    };
} | {
    id: number;
    method: "text";
    params: {
        page: number;
    };
} | {
    id: number;
    method: "links";
    params: {
        page: number;
    };
} | {
    id: number;
    method: "outline";
    params: Record<string, never>;
} | {
    id: number;
    method: "labels";
    params: Record<string, never>;
} | {
    id: number;
    method: "destroy";
    params: Record<string, never>;
};
export type WorkerMessage = {
    type: "ready";
    offscreenCanvas: boolean;
    fonts: boolean;
} | {
    type: "result";
    id: number;
    value: unknown;
} | {
    type: "error";
    id: number;
    error: HostErrorPayload;
} | {
    type: "progress";
    loaded: number;
    total: number | null;
} | {
    type: "fatal";
    error: HostErrorPayload;
} | {
    type: "call";
    callId: number;
    name: "readRange";
    args: [number, number];
} | {
    type: "call";
    callId: number;
    name: "password";
    args: ["required" | "incorrect", number];
};
export type MainReply = {
    type: "reply";
    callId: number;
    value: unknown;
} | {
    type: "replyError";
    callId: number;
    error: HostErrorPayload;
};
export type { OutlineNode, PageText };
