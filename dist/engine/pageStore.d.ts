import type { RasterQueue } from "../cache/rasterQueue";
import type { PageSurface, SurfaceCache } from "../cache/surfaceCache";
import type { PageSource, ThumbnailResult } from "../source/pageSource";
import type { PageText } from "../types";
export interface PageStoreHooks {
    /** A new or sharper surface for `page` is in the cache. */
    onSurface(page: number): void;
    onError(page: number, error: unknown): void;
}
export declare class PageStore {
    private readonly generation;
    readonly source: PageSource;
    private readonly cache;
    private readonly queue;
    private readonly hooks;
    private readonly wanted;
    private readonly inflight;
    private stamp;
    private readonly idleCancels;
    private destroyed;
    /** Milliseconds spent preparing pages, for benchmarks. */
    preparationMs: number;
    preparedPages: number;
    constructor(generation: number, source: PageSource, cache: SurfaceCache, queue: RasterQueue<unknown>, hooks: PageStoreHooks);
    peek(page: number): PageSurface | null;
    /** Is `page` cached at least this sharp? */
    has(page: number, height: number): boolean;
    /**
     * Ask for `page` at `height` device pixels. Returns at once; `onSurface`
     * reports each improvement.
     */
    want(page: number, height: number, priority: number, maxWidth?: number): void;
    private schedule;
    private enqueue;
    /** Resolve once `page` is cached at `height` (or cannot be). */
    prepare(page: number, height: number, priority: number, maxWidth?: number): Promise<void>;
    /** Text of a page, queued behind navigation work. */
    text(page: number, priority?: number): Promise<PageText | null>;
    thumbnail(page: number, height: number): Promise<ThumbnailResult | null>;
    /** Forget pending wishes for pages outside `keep`. */
    forgetExcept(keep: Set<number>): void;
    get pending(): number;
    destroy(): void;
}
