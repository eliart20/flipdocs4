import type { SurfaceImage } from "../cache/surfaceCache";
import type { OutlineNode, PageLink, PageText, ReadingDirection, SourceCapabilities, SourceRequestOptions } from "../types";
/**
 * What the engine needs from a document, whatever it is made of. A source
 * only produces rasters and metadata; scheduling, caching and ownership of
 * the results belong to the engine.
 */
export interface RasterRequest {
    page: number;
    /** Wanted raster height in device pixels. */
    height: number;
    /** When set, also fit inside this width (per-page sizing). */
    maxWidth?: number;
    /** A fast bounded pass; a full one follows. */
    preview: boolean;
    signal: AbortSignal;
}
export interface RasterResult {
    image: SurfaceImage;
    width: number;
    height: number;
    /** False for caller-owned ImageBitmaps the reader must not close. */
    owned: boolean;
    /** Nothing sharper can be produced for this page. */
    final: boolean;
}
export interface ThumbnailResult {
    /** A URL an <img> can load directly, when one exists. */
    url?: string;
    image?: SurfaceImage;
    width?: number;
    height?: number;
    owned?: boolean;
}
export interface PageSource {
    readonly kind: "pdf" | "images" | "manifest";
    readonly pageCount: number;
    /** Width / height of the first page. */
    readonly pageAspect: number;
    /** Jobs that may run at once. PDF rasterization is 1. */
    readonly concurrency: number;
    /** Largest useful preview height, or 0 when previews are not cheaper. */
    readonly previewHeight: number;
    readonly capabilities: SourceCapabilities;
    readonly rasterMode: "worker" | "main" | "image";
    readonly transportMode: "range" | "stream" | "blob" | "image";
    /** Direction declared by the content itself (manifest only). */
    readonly direction?: ReadingDirection;
    readonly language?: string;
    readonly originalUrl?: string;
    render(request: RasterRequest): Promise<RasterResult>;
    getText?(page: number, signal?: AbortSignal): Promise<PageText | null>;
    getLinks?(page: number, signal?: AbortSignal): Promise<PageLink[]>;
    getOutline?(): Promise<OutlineNode[]>;
    getLabel?(page: number): string | null;
    getThumbnail?(page: number, height: number, signal: AbortSignal): Promise<ThumbnailResult | null>;
    destroy(): void;
}
export interface SourceOpenContext {
    generation: number;
    signal: AbortSignal;
    /** loaded / total bytes; total is null when unknown. */
    onProgress: (loaded: number, total: number | null) => void;
    /** Device ceiling for a raster dimension. */
    maxTextureSize: number;
}
export declare const NO_CAPABILITIES: SourceCapabilities;
export declare function throwIfAborted(signal: AbortSignal | undefined, what?: string): void;
/** Abort when either signal aborts. Returns the combined signal and a cleanup. */
export declare function linkSignals(a: AbortSignal | undefined, b: AbortSignal | undefined): {
    signal: AbortSignal;
    dispose: () => void;
};
export declare function resolveHeaders(request: SourceRequestOptions | undefined): Promise<Record<string, string>>;
/** Counting semaphore: bounds concurrent network requests. */
export declare class Semaphore {
    private readonly limit;
    private readonly waiting;
    private active;
    constructor(limit: number);
    run<T>(task: () => Promise<T>): Promise<T>;
}
/**
 * fetch with the host's headers and credentials, one renewal attempt after a
 * 401/403, and errors mapped to FlipBookError.
 */
export declare function fetchResource(url: string, request: SourceRequestOptions | undefined, signal: AbortSignal | undefined, what: string, extraHeaders?: Record<string, string>): Promise<{
    response: Response;
    url: string;
}>;
