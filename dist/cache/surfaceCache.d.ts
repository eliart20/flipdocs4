import type { CacheSnapshot } from "../types.js";
/**
 * Rendered page surfaces: a bounded LRU with pinning and byte accounting.
 *
 * A surface is one raster of one page. The cache keeps at most one per page
 * (the best one so far). Anything mapped onto a resting page or the turning
 * sheet is pinned and can never be evicted, so eviction cannot dispose
 * visible content; that is why the entry target is a target and not a limit.
 * Each surface is disposed exactly once.
 */
export type SurfaceImage = ImageBitmap | HTMLCanvasElement | OffscreenCanvas | HTMLImageElement;
export interface PageSurface {
    page: number;
    /** Null once the pixels live only on the GPU. */
    image: SurfaceImage | null;
    width: number;
    height: number;
    /** A bounded first pass; a sharper one is expected. */
    preview: boolean;
    /** No sharper raster exists (for example an image at its natural size). */
    final: boolean;
    /** The library created it and must release it. */
    owned: boolean;
    generation: number;
    /** Bytes of library-owned CPU pixels still held. */
    cpuBytes: number;
    /** Estimated bytes of its GPU texture, mipmaps included; 0 until uploaded. */
    gpuBytes: number;
    disposed: boolean;
}
export declare const surfaceBytes: (width: number, height: number) => number;
/** A full mip chain adds one third. */
export declare const textureBytes: (width: number, height: number) => number;
export declare function createSurface(init: Pick<PageSurface, "page" | "image" | "width" | "height" | "generation"> & Partial<Pick<PageSurface, "preview" | "final" | "owned">>): PageSurface;
export interface SurfaceCacheOptions {
    entryTarget: number;
    byteTarget?: number | null;
    /** Called once per surface as it leaves the cache, before its pixels go. */
    onDispose?: (surface: PageSurface) => void;
}
export declare class SurfaceCache {
    private readonly entries;
    private pinned;
    private entryTarget;
    private byteTarget;
    private readonly onDispose?;
    constructor(options: SurfaceCacheOptions);
    get size(): number;
    /** Current surface without touching recency. */
    peek(page: number): PageSurface | undefined;
    /** Current surface, marked most recently used. */
    get(page: number): PageSurface | undefined;
    touch(page: number): void;
    /**
     * Store a surface, replacing and disposing the page's previous one. Returns
     * false (and disposes the newcomer) when it is not an improvement.
     */
    put(surface: PageSurface): boolean;
    /** Replace the pinned set, then evict whatever the change freed. */
    setPinned(pages: Iterable<number>): void;
    isPinned(page: number): boolean;
    setTargets(entryTarget: number, byteTarget: number | null): void;
    /** The renderer uploaded this surface to the GPU. */
    noteUploaded(surface: PageSurface, releaseCpu: boolean): void;
    /** The GPU copy is gone (context lost or texture dropped). */
    noteGpuReleased(surface: PageSurface): void;
    delete(page: number): void;
    clear(): void;
    /** True when owned bytes exceed the byte target. */
    overByteTarget(): boolean;
    stats(): CacheSnapshot;
    pages(): number[];
    private totalBytes;
    private trim;
    private dispose;
}
/** Is `candidate` worth replacing `current` with? */
export declare function isBetter(candidate: PageSurface, current: PageSurface): boolean;
