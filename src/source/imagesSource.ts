import { FlipBookError, cancelled } from "../errors";
import type { ImagesSource } from "../types";
import { closeImage, decodeBlob, fitBitmap } from "./decode";
import type { DecodedImage } from "./decode";
import { NO_CAPABILITIES, Semaphore, fetchResource, throwIfAborted } from "./pageSource";
import type { PageSource, RasterRequest, RasterResult, SourceOpenContext, ThumbnailResult } from "./pageSource";

/**
 * An ordered list of page images: URLs, Blobs or ImageBitmaps. PDF.js is
 * never loaded for this source. Caller-owned ImageBitmaps are used as they
 * are and never closed, unless the caller handed them over with
 * `transferBitmaps`, in which case they are closed when the source ends.
 */

const isBitmap = (value: unknown): value is ImageBitmap =>
  typeof ImageBitmap !== "undefined" && value instanceof ImageBitmap;
const isBlob = (value: unknown): value is Blob => typeof Blob !== "undefined" && value instanceof Blob;

const MAX_THUMBNAIL_URLS = 96;

export async function openImagesSource(source: ImagesSource, context: SourceOpenContext): Promise<PageSource> {
  const pages = source.pages;
  if (!Array.isArray(pages) || pages.length === 0) {
    throw new FlipBookError("EMPTY_SOURCE", "An image book needs at least one page");
  }
  pages.forEach((entry, index) => {
    if (!(typeof entry === "string" && entry.length > 0) && !isBlob(entry) && !isBitmap(entry)) {
      throw new FlipBookError("INVALID_SOURCE", `Page ${index + 1} is not an image URL, Blob or ImageBitmap`);
    }
  });

  const network = new Semaphore(4);
  const natural = new Map<number, { width: number; height: number }>();
  const thumbnailUrls = new Map<number, string>();
  let destroyed = false;

  const fetchBlob = async (url: string, signal: AbortSignal, page: number): Promise<Blob> =>
    network.run(async () => {
      throwIfAborted(signal);
      const { response } = await fetchResource(url, source.request, signal, `page ${page}`);
      return response.blob();
    });

  const decode = async (page: number, request: Omit<RasterRequest, "page" | "preview">): Promise<RasterResult> => {
    const entry = pages[page - 1];
    const target = { height: request.height, maxWidth: request.maxWidth, maxDimension: context.maxTextureSize };
    let decoded: DecodedImage;
    let owned = true;
    if (isBitmap(entry)) {
      if (entry.width === 0 || entry.height === 0) {
        throw new FlipBookError("INVALID_SOURCE", `The ImageBitmap for page ${page} has been closed`);
      }
      const fitted = await fitBitmap(entry, target, false);
      decoded = fitted;
      owned = fitted.copied;
    } else {
      const blob = isBlob(entry) ? entry : await fetchBlob(entry, request.signal, page);
      throwIfAborted(request.signal);
      decoded = await decodeBlob(blob, target, natural.get(page));
    }
    natural.set(page, { width: decoded.naturalWidth, height: decoded.naturalHeight });
    if (request.signal.aborted || destroyed) {
      if (owned) closeImage(decoded.image);
      throw cancelled("Page preparation");
    }
    return { image: decoded.image, width: decoded.width, height: decoded.height, owned, final: decoded.final };
  };

  // The first page fixes the aspect, and is what the reader shows first.
  const opening = new AbortController();
  const abortOpening = () => opening.abort();
  context.signal.addEventListener("abort", abortOpening, { once: true });
  let first: RasterResult | null;
  try {
    first = await decode(1, { height: Math.min(context.maxTextureSize, 1600), signal: opening.signal });
  } finally {
    context.signal.removeEventListener("abort", abortOpening);
  }
  const pageAspect = first.width / first.height;
  context.onProgress(1, 1);

  return {
    kind: "images",
    pageCount: pages.length,
    pageAspect,
    concurrency: pages.some((entry) => typeof entry === "string") ? 3 : 1,
    previewHeight: 0,
    capabilities: { ...NO_CAPABILITIES, thumbnails: true },
    rasterMode: "image",
    transportMode: "image",
    originalUrl: source.originalUrl,

    async render(request) {
      if (destroyed) throw cancelled("Page preparation");
      if (request.page === 1 && first) {
        const primed = first;
        // Reuse the opening decode once if it is sharp enough for this request.
        if (primed.final || primed.height >= request.height * 0.87) {
          first = null;
          return primed;
        }
        if (primed.owned) closeImage(primed.image);
        first = null;
      }
      return decode(request.page, request);
    },

    async getThumbnail(page): Promise<ThumbnailResult | null> {
      const entry = pages[page - 1];
      if (typeof entry === "string") return { url: entry };
      if (isBitmap(entry)) return { image: entry, width: entry.width, height: entry.height, owned: false };
      let url = thumbnailUrls.get(page);
      if (!url) {
        url = URL.createObjectURL(entry);
        thumbnailUrls.set(page, url);
        if (thumbnailUrls.size > MAX_THUMBNAIL_URLS) {
          const [oldest, oldUrl] = thumbnailUrls.entries().next().value as [number, string];
          thumbnailUrls.delete(oldest);
          URL.revokeObjectURL(oldUrl);
        }
      }
      return { url };
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (first?.owned) closeImage(first.image);
      first = null;
      for (const url of thumbnailUrls.values()) URL.revokeObjectURL(url);
      thumbnailUrls.clear();
      if (source.transferBitmaps) {
        for (const entry of pages) if (isBitmap(entry)) closeImage(entry);
      }
    },
  };
}
