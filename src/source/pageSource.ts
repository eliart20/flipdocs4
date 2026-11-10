import { FlipBookError, cancelled } from "../errors";
import type { SurfaceImage } from "../cache/surfaceCache";
import type {
  OutlineNode,
  PageLink,
  PageText,
  ReadingDirection,
  SourceCapabilities,
  SourceRequestOptions,
} from "../types";

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

export const NO_CAPABILITIES: SourceCapabilities = Object.freeze({
  text: false,
  links: false,
  outline: false,
  thumbnails: false,
  search: false,
  labels: false,
});

export function throwIfAborted(signal: AbortSignal | undefined, what = "Loading"): void {
  if (signal?.aborted) throw cancelled(what);
}

/** Abort when either signal aborts. Returns the combined signal and a cleanup. */
export function linkSignals(a: AbortSignal | undefined, b: AbortSignal | undefined): { signal: AbortSignal; dispose: () => void } {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const sources = [a, b].filter((s): s is AbortSignal => !!s);
  for (const source of sources) {
    if (source.aborted) controller.abort();
    else source.addEventListener("abort", abort, { once: true });
  }
  return {
    signal: controller.signal,
    dispose: () => {
      for (const source of sources) source.removeEventListener("abort", abort);
    },
  };
}

export async function resolveHeaders(request: SourceRequestOptions | undefined): Promise<Record<string, string>> {
  const headers = request?.headers;
  if (!headers) return {};
  const value = typeof headers === "function" ? await headers() : headers;
  return { ...value };
}

/** Counting semaphore: bounds concurrent network requests. */
export class Semaphore {
  private readonly waiting: Array<() => void> = [];
  private active = 0;

  constructor(private readonly limit: number) {}

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.active >= this.limit) {
      await new Promise<void>((resolve) => this.waiting.push(resolve));
    }
    this.active++;
    try {
      return await task();
    } finally {
      this.active--;
      this.waiting.shift()?.();
    }
  }
}

/**
 * fetch with the host's headers and credentials, one renewal attempt after a
 * 401/403, and errors mapped to FlipBookError.
 */
export async function fetchResource(
  url: string,
  request: SourceRequestOptions | undefined,
  signal: AbortSignal | undefined,
  what: string,
  extraHeaders?: Record<string, string>,
): Promise<{ response: Response; url: string }> {
  let current = url;
  for (let attempt = 0; ; attempt++) {
    const linked = linkSignals(signal, request?.signal);
    let response: Response;
    try {
      response = await fetch(current, {
        headers: { ...(await resolveHeaders(request)), ...extraHeaders },
        credentials: request?.credentials ?? "same-origin",
        signal: linked.signal,
      });
    } catch (error) {
      if (linked.signal.aborted) throw cancelled(what);
      throw new FlipBookError("NETWORK", `Could not load ${what}`, { cause: error });
    } finally {
      linked.dispose();
    }
    if ((response.status === 401 || response.status === 403) && attempt === 0 && request?.renew) {
      void response.body?.cancel().catch(() => {});
      const renewed = await request.renew({ url: current, status: response.status, reason: "unauthorized" });
      if (renewed) {
        current = renewed;
        continue;
      }
    }
    if (!response.ok) {
      void response.body?.cancel().catch(() => {});
      throw new FlipBookError("NETWORK", `Could not load ${what} (${response.status})`, {
        detail: { status: response.status },
      });
    }
    return { response, url: current };
  }
}
