import type { CacheSnapshot } from "../types";

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

export const surfaceBytes = (width: number, height: number) => width * height * 4;
/** A full mip chain adds one third. */
export const textureBytes = (width: number, height: number) => Math.ceil((width * height * 4 * 4) / 3);

export function createSurface(
  init: Pick<PageSurface, "page" | "image" | "width" | "height" | "generation"> &
    Partial<Pick<PageSurface, "preview" | "final" | "owned">>,
): PageSurface {
  const owned = init.owned ?? true;
  return {
    page: init.page,
    image: init.image,
    width: init.width,
    height: init.height,
    preview: init.preview ?? false,
    final: init.final ?? false,
    owned,
    generation: init.generation,
    cpuBytes: owned ? surfaceBytes(init.width, init.height) : 0,
    gpuBytes: 0,
    disposed: false,
  };
}

function releaseImage(surface: PageSurface): void {
  const image = surface.image;
  surface.image = null;
  surface.cpuBytes = 0;
  if (!image || !surface.owned) return;
  try {
    if (typeof (image as ImageBitmap).close === "function") {
      (image as ImageBitmap).close();
    } else if ("width" in image && !("naturalWidth" in image)) {
      // Canvases give their memory back when resized to nothing.
      (image as HTMLCanvasElement).width = 0;
      (image as HTMLCanvasElement).height = 0;
    }
  } catch {
    // Releasing is best effort; a detached bitmap is already gone.
  }
}

export interface SurfaceCacheOptions {
  entryTarget: number;
  byteTarget?: number | null;
  /** Called once per surface as it leaves the cache, before its pixels go. */
  onDispose?: (surface: PageSurface) => void;
}

export class SurfaceCache {
  private readonly entries = new Map<number, PageSurface>();
  private pinned = new Set<number>();
  private entryTarget: number;
  private byteTarget: number | null;
  private readonly onDispose?: (surface: PageSurface) => void;

  constructor(options: SurfaceCacheOptions) {
    this.entryTarget = Math.max(1, options.entryTarget);
    this.byteTarget = options.byteTarget ?? null;
    this.onDispose = options.onDispose;
  }

  get size(): number {
    return this.entries.size;
  }

  /** Current surface without touching recency. */
  peek(page: number): PageSurface | undefined {
    return this.entries.get(page);
  }

  /** Current surface, marked most recently used. */
  get(page: number): PageSurface | undefined {
    const surface = this.entries.get(page);
    if (surface) this.touch(page);
    return surface;
  }

  touch(page: number): void {
    const surface = this.entries.get(page);
    if (!surface) return;
    this.entries.delete(page);
    this.entries.set(page, surface);
  }

  /**
   * Store a surface, replacing and disposing the page's previous one. Returns
   * false (and disposes the newcomer) when it is not an improvement.
   */
  put(surface: PageSurface): boolean {
    const previous = this.entries.get(surface.page);
    if (previous === surface) return true;
    if (previous && !isBetter(surface, previous)) {
      this.dispose(surface);
      return false;
    }
    this.entries.delete(surface.page);
    this.entries.set(surface.page, surface);
    if (previous) this.dispose(previous);
    this.trim();
    return true;
  }

  /** Replace the pinned set, then evict whatever the change freed. */
  setPinned(pages: Iterable<number>): void {
    this.pinned = new Set(pages);
    this.trim();
  }

  isPinned(page: number): boolean {
    return this.pinned.has(page);
  }

  setTargets(entryTarget: number, byteTarget: number | null): void {
    this.entryTarget = Math.max(1, entryTarget);
    this.byteTarget = byteTarget;
    this.trim();
  }

  /** The renderer uploaded this surface to the GPU. */
  noteUploaded(surface: PageSurface, releaseCpu: boolean): void {
    if (surface.disposed) return;
    surface.gpuBytes = textureBytes(surface.width, surface.height);
    if (releaseCpu && surface.owned) releaseImage(surface);
    this.trim();
  }

  /** The GPU copy is gone (context lost or texture dropped). */
  noteGpuReleased(surface: PageSurface): void {
    surface.gpuBytes = 0;
  }

  delete(page: number): void {
    const surface = this.entries.get(page);
    if (!surface) return;
    this.entries.delete(page);
    this.dispose(surface);
  }

  clear(): void {
    const all = [...this.entries.values()];
    this.entries.clear();
    this.pinned.clear();
    for (const surface of all) this.dispose(surface);
  }

  /** True when owned bytes exceed the byte target. */
  overByteTarget(): boolean {
    return this.byteTarget !== null && this.totalBytes() > this.byteTarget;
  }

  stats(): CacheSnapshot {
    let cpuBytes = 0;
    let gpuBytes = 0;
    let pinnedBytes = 0;
    let pinnedEntries = 0;
    for (const surface of this.entries.values()) {
      cpuBytes += surface.cpuBytes;
      gpuBytes += surface.gpuBytes;
      if (this.pinned.has(surface.page)) {
        pinnedEntries++;
        pinnedBytes += surface.cpuBytes + surface.gpuBytes;
      }
    }
    return {
      entries: this.entries.size,
      entryTarget: this.entryTarget,
      pinnedEntries,
      cpuBytes,
      gpuBytes,
      pinnedBytes,
      byteTarget: this.byteTarget,
      pinnedOverage: this.byteTarget === null ? 0 : Math.max(0, pinnedBytes - this.byteTarget),
    };
  }

  pages(): number[] {
    return [...this.entries.keys()];
  }

  private totalBytes(): number {
    let total = 0;
    for (const surface of this.entries.values()) total += surface.cpuBytes + surface.gpuBytes;
    return total;
  }

  private trim(): void {
    const over = () =>
      this.entries.size > this.entryTarget || (this.byteTarget !== null && this.totalBytes() > this.byteTarget);
    if (!over()) return;
    for (const [page, surface] of [...this.entries]) {
      if (!over()) break;
      if (this.pinned.has(page)) continue;
      this.entries.delete(page);
      this.dispose(surface);
    }
  }

  private dispose(surface: PageSurface): void {
    if (surface.disposed) return;
    surface.disposed = true;
    try {
      this.onDispose?.(surface);
    } finally {
      surface.gpuBytes = 0;
      releaseImage(surface);
    }
  }
}

/** Is `candidate` worth replacing `current` with? */
export function isBetter(candidate: PageSurface, current: PageSurface): boolean {
  if (candidate.generation !== current.generation) return candidate.generation > current.generation;
  if (current.preview && !candidate.preview) return candidate.height >= current.height * 0.9;
  if (!current.preview && candidate.preview) return false;
  return candidate.height > current.height;
}
