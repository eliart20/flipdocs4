import { PRIORITY } from "../cache/rasterQueue";
import type { RasterQueue } from "../cache/rasterQueue";
import { createSurface } from "../cache/surfaceCache";
import type { PageSurface, SurfaceCache } from "../cache/surfaceCache";
import { cancelled, isCancellation } from "../errors";
import { closeImage } from "../source/decode";
import type { PageSource, ThumbnailResult } from "../source/pageSource";
import type { PageText } from "../types";

/**
 * Decides which raster of which page to prepare next, and keeps the best one
 * per page in the cache.
 *
 * A page with nothing cached gets a bounded preview first and a full-quality
 * pass afterwards, in an idle window. A sharper request that arrives while a
 * softer render is in flight is remembered and issued when that render ends,
 * so a page can never be stranded at low resolution. The texture already on
 * screen stays until its replacement is ready.
 */

const whenIdle = (work: () => void): (() => void) => {
  const scope = globalThis as unknown as {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  if (typeof scope.requestIdleCallback === "function") {
    const handle = scope.requestIdleCallback(work, { timeout: 450 });
    return () => scope.cancelIdleCallback?.(handle);
  }
  const handle = setTimeout(work, 60);
  return () => clearTimeout(handle);
};

const sharpEnough = (surface: PageSurface, height: number) =>
  surface.final || (!surface.preview && surface.height >= height * 0.9);

const upgradeOf = (priority: number) =>
  priority <= PRIORITY.VISIBLE_UPGRADE ? PRIORITY.VISIBLE_UPGRADE : PRIORITY.PRELOAD_UPGRADE;

export interface PageStoreHooks {
  /** A new or sharper surface for `page` is in the cache. */
  onSurface(page: number): void;
  onError(page: number, error: unknown): void;
}

export class PageStore {
  private readonly wanted = new Map<number, { height: number; maxWidth?: number; priority: number; stamp: number }>();
  private readonly inflight = new Map<number, { key: string; height: number }>();
  private stamp = 0;
  private readonly idleCancels = new Map<number, () => void>();
  private destroyed = false;
  /** Milliseconds spent preparing pages, for benchmarks. */
  preparationMs = 0;
  preparedPages = 0;

  constructor(
    private readonly generation: number,
    readonly source: PageSource,
    private readonly cache: SurfaceCache,
    private readonly queue: RasterQueue<unknown>,
    private readonly hooks: PageStoreHooks,
  ) {}

  peek(page: number): PageSurface | null {
    const surface = this.cache.peek(page);
    return surface && surface.generation === this.generation && !surface.disposed ? surface : null;
  }

  /** Is `page` cached at least this sharp? */
  has(page: number, height: number): boolean {
    const surface = this.peek(page);
    return !!surface && sharpEnough(surface, height);
  }

  /**
   * Ask for `page` at `height` device pixels. Returns at once; `onSurface`
   * reports each improvement.
   */
  want(page: number, height: number, priority: number, maxWidth?: number): void {
    if (this.destroyed || page < 1 || page > this.source.pageCount) return;
    const have = this.peek(page);
    if (have && sharpEnough(have, height)) {
      this.cache.touch(page);
      return;
    }
    const previous = this.wanted.get(page);
    this.wanted.set(page, {
      height,
      maxWidth,
      priority: previous ? Math.min(previous.priority, priority) : priority,
      stamp: ++this.stamp,
    });
    this.schedule(page);
  }

  private schedule(page: number): void {
    const want = this.wanted.get(page);
    if (!want || this.destroyed) return;
    const running = this.inflight.get(page);
    if (running) {
      // Already in hand; make it as urgent as the newest request.
      if (this.queue.has(running.key)) {
        void this.queue.request({
          key: running.key,
          page,
          priority: want.priority,
          label: "",
          run: () => Promise.reject(cancelled("Page preparation")),
        });
      }
      return;
    }
    const have = this.peek(page);
    if (have) {
      // An upgrade: nothing is waiting on it, so it yields to everything else.
      if (this.idleCancels.has(page)) return;
      if (want.priority >= PRIORITY.PRELOAD && this.cache.overByteTarget()) return;
      this.idleCancels.set(
        page,
        whenIdle(() => {
          this.idleCancels.delete(page);
          const latest = this.wanted.get(page);
          if (latest) this.enqueue(page, latest.height, latest.maxWidth, upgradeOf(latest.priority), false);
        }),
      );
      return;
    }
    const preview = this.source.previewHeight;
    const usePreview = preview > 0 && want.height > preview * 1.35;
    this.enqueue(page, usePreview ? preview : want.height, want.maxWidth, want.priority, usePreview);
  }

  private enqueue(
    page: number,
    height: number,
    maxWidth: number | undefined,
    priority: number,
    preview: boolean,
  ): void {
    if (this.destroyed || this.inflight.has(page)) return;
    const key = `${this.generation}:page:${page}:${height}:${preview ? "p" : "f"}`;
    this.inflight.set(page, { key, height });
    const issued = this.stamp;
    const scaledWidth = maxWidth && preview ? (maxWidth * height) / (this.wanted.get(page)?.height ?? height) : maxWidth;
    const job = this.queue.request({
      key,
      page,
      priority,
      label: `page ${page} @${height}${preview ? " preview" : ""}`,
      run: async (signal) => {
        const started = performance.now();
        const result = await this.source.render({ page, height, maxWidth: scaledWidth, preview, signal });
        if (signal.aborted || this.destroyed) {
          if (result.owned) closeImage(result.image);
          throw cancelled("Page preparation");
        }
        this.preparationMs += performance.now() - started;
        this.preparedPages++;
        return createSurface({
          page,
          image: result.image,
          width: result.width,
          height: result.height,
          generation: this.generation,
          preview,
          final: result.final,
          owned: result.owned,
        });
      },
    }) as Promise<PageSurface>;

    job.then(
      (surface) => {
        this.inflight.delete(page);
        if (this.destroyed) {
          if (surface.owned) closeImage(surface.image);
          return;
        }
        if (this.cache.put(surface)) this.hooks.onSurface(page);
        const want = this.wanted.get(page);
        if (!want) return;
        const now = this.peek(page);
        if (now && sharpEnough(now, want.height)) this.wanted.delete(page);
        else this.schedule(page);
      },
      (error) => {
        this.inflight.delete(page);
        if (this.destroyed) return;
        if (isCancellation(error)) {
          // Cancelled (a turn raised the bar, or the page left the window).
          // If it was asked for again meanwhile, that request still stands.
          const latest = this.wanted.get(page);
          if (latest && latest.stamp > issued) this.schedule(page);
          else this.wanted.delete(page);
          return;
        }
        this.wanted.delete(page);
        this.hooks.onError(page, error);
      },
    );
  }

  /** Resolve once `page` is cached at `height` (or cannot be). */
  prepare(page: number, height: number, priority: number, maxWidth?: number): Promise<void> {
    return new Promise<void>((resolve) => {
      const check = () => {
        if (this.destroyed || this.has(page, height) || (!this.wanted.has(page) && !this.inflight.has(page))) {
          resolve();
          return true;
        }
        return false;
      };
      this.want(page, height, priority, maxWidth);
      if (check()) return;
      const timer = setInterval(() => {
        if (check()) clearInterval(timer);
      }, 30);
    });
  }

  /** Text of a page, queued behind navigation work. */
  text(page: number, priority: number = PRIORITY.BACKGROUND): Promise<PageText | null> {
    if (this.destroyed || !this.source.getText) return Promise.resolve(null);
    return this.queue.request({
      key: `${this.generation}:text:${page}`,
      page,
      priority,
      label: `text ${page}`,
      run: (signal) => this.source.getText!(page, signal),
    }) as Promise<PageText | null>;
  }

  thumbnail(page: number, height: number): Promise<ThumbnailResult | null> {
    if (this.destroyed || !this.source.getThumbnail) return Promise.resolve(null);
    return this.queue.request({
      key: `${this.generation}:thumb:${page}:${height}`,
      page,
      priority: PRIORITY.BACKGROUND,
      label: `thumbnail ${page}`,
      run: (signal) => this.source.getThumbnail!(page, height, signal),
    }) as Promise<ThumbnailResult | null>;
  }

  /** Forget pending wishes for pages outside `keep`. */
  forgetExcept(keep: Set<number>): void {
    for (const page of [...this.wanted.keys()]) {
      if (keep.has(page)) continue;
      this.wanted.delete(page);
      this.idleCancels.get(page)?.();
      this.idleCancels.delete(page);
    }
    this.queue.cancel((job) => job.key.startsWith(`${this.generation}:page:`) && !keep.has(job.page));
  }

  get pending(): number {
    return this.wanted.size + this.inflight.size;
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    for (const cancel of this.idleCancels.values()) cancel();
    this.idleCancels.clear();
    this.wanted.clear();
    this.queue.cancel((job) => job.key.startsWith(`${this.generation}:`));
  }
}
