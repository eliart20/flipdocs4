import type { PdfSource, ReadingDirection, SourceRequestOptions } from "../types";

/**
 * Optional host logic: reading direction from a PDF's own metadata.
 *
 * FlipBook never guesses a PDF's direction; it uses the `direction` it is
 * given and defaults to LTR. A host that wants books to open the right way
 * round can ask the file first and pass the answer in:
 *
 *   const direction = await detectPdfDirection(url);
 *   <FlipBook source={source} direction={direction} />
 *
 * The check opens the document through the same transport as the reader, so
 * for a URL on a range-capable server it reads a few byte ranges, not the
 * whole file.
 */

/** `/ViewerPreferences /Direction`: R2L means RTL; anything else means LTR. */
export function directionFromViewerPreference(value: unknown): ReadingDirection {
  const name = typeof value === "string" ? value.replace(/^\//, "") : "";
  return name === "R2L" ? "rtl" : "ltr";
}

export interface DetectDirectionOptions {
  request?: SourceRequestOptions;
  signal?: AbortSignal;
  /** Returned when the file cannot be read or says nothing. Default "ltr". */
  fallback?: ReadingDirection;
  onPassword?: PdfSource["onPassword"];
  /** Called with loaded / total bytes while the document opens. */
  onProgress?: (loaded: number, total: number | null) => void;
}

/**
 * Resolve the reading direction a PDF declares. Never rejects: any failure
 * (network, password, damaged file, cancellation) resolves to the fallback.
 */
export async function detectPdfDirection(
  src: string | File | Blob | Uint8Array,
  options: DetectDirectionOptions = {},
): Promise<ReadingDirection> {
  const fallback = options.fallback ?? "ltr";
  const controller = new AbortController();
  const abort = () => controller.abort();
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted) controller.abort();
  try {
    const module = await import("../pdf/pdfSource");
    const source = await module.openPdfSource(
      { type: "pdf", src, request: options.request, onPassword: options.onPassword },
      {
        generation: 0,
        signal: controller.signal,
        maxTextureSize: 2048,
        onProgress: (loaded, total) => options.onProgress?.(loaded, total),
      },
    );
    try {
      return source.viewerDirection === null ? fallback : directionFromViewerPreference(source.viewerDirection);
    } finally {
      source.destroy();
    }
  } catch {
    return fallback;
  } finally {
    options.signal?.removeEventListener("abort", abort);
  }
}
