import { FlipBookError } from "../errors";
import type { SurfaceImage } from "../cache/surfaceCache";

/**
 * Image decoding to bounded surfaces. Pages are decoded with
 * createImageBitmap, which runs off the main thread, and are scaled down to
 * the size the viewer needs so a large scan never becomes a large texture.
 */

export interface DecodedImage {
  image: SurfaceImage;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  /** The image is at its natural size or at the device limit. */
  final: boolean;
}

export interface DecodeTarget {
  /** Wanted height in device pixels. */
  height: number;
  /** Optional width to fit inside as well. */
  maxWidth?: number;
  /** Device ceiling for either dimension. */
  maxDimension: number;
}

/** Scale to apply to a natural size; never above 1. */
export function fitScale(naturalWidth: number, naturalHeight: number, target: DecodeTarget): number {
  let scale = Math.min(1, target.height / naturalHeight);
  if (target.maxWidth) scale = Math.min(scale, target.maxWidth / naturalWidth);
  scale = Math.min(scale, target.maxDimension / naturalWidth, target.maxDimension / naturalHeight);
  // Resampling for a few percent costs time and sharpness for nothing.
  const limit = Math.min(1, target.maxDimension / naturalWidth, target.maxDimension / naturalHeight);
  return scale > 0.87 * limit ? limit : scale;
}

const isFinal = (scale: number, naturalWidth: number, naturalHeight: number, target: DecodeTarget) =>
  scale >= Math.min(1, target.maxDimension / naturalWidth, target.maxDimension / naturalHeight) - 1e-9;

async function resizeBitmap(
  source: ImageBitmap | Blob,
  width: number,
  height: number,
): Promise<ImageBitmap> {
  return createImageBitmap(source, {
    resizeWidth: Math.max(1, Math.round(width)),
    resizeHeight: Math.max(1, Math.round(height)),
    resizeQuality: "high",
  });
}

/**
 * Decode a Blob. When the natural size is already known (a manifest variant,
 * or a page decoded before) a single decode-and-resize pass is used.
 */
export async function decodeBlob(
  blob: Blob,
  target: DecodeTarget,
  known?: { width: number; height: number },
): Promise<DecodedImage> {
  if (typeof createImageBitmap !== "function") return decodeViaElement(blob, target);
  try {
    if (known) {
      const scale = fitScale(known.width, known.height, target);
      const bitmap =
        scale < 1
          ? await resizeBitmap(blob, known.width * scale, known.height * scale)
          : await createImageBitmap(blob);
      return {
        image: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        naturalWidth: known.width,
        naturalHeight: known.height,
        final: isFinal(scale, known.width, known.height, target),
      };
    }
    const full = await createImageBitmap(blob);
    return await fitBitmap(full, target, true);
  } catch (error) {
    // Some formats (SVG among them) decode through an element but not here.
    try {
      return await decodeViaElement(blob, target);
    } catch {
      throw new FlipBookError("RENDER_FAILED", "A page image could not be decoded", { cause: error });
    }
  }
}

/** Scale an existing bitmap down if needed. Closes `bitmap` when it makes a copy and `closeSource` is set. */
export async function fitBitmap(
  bitmap: ImageBitmap,
  target: DecodeTarget,
  closeSource: boolean,
): Promise<DecodedImage & { copied: boolean }> {
  const naturalWidth = bitmap.width;
  const naturalHeight = bitmap.height;
  const scale = fitScale(naturalWidth, naturalHeight, target);
  if (scale >= 1) {
    return {
      image: bitmap,
      width: naturalWidth,
      height: naturalHeight,
      naturalWidth,
      naturalHeight,
      final: true,
      copied: false,
    };
  }
  const resized = await resizeBitmap(bitmap, naturalWidth * scale, naturalHeight * scale);
  if (closeSource) bitmap.close();
  return {
    image: resized,
    width: resized.width,
    height: resized.height,
    naturalWidth,
    naturalHeight,
    final: isFinal(scale, naturalWidth, naturalHeight, target),
    copied: true,
  };
}

async function decodeViaElement(blob: Blob, target: DecodeTarget): Promise<DecodedImage> {
  if (typeof document === "undefined") {
    throw new FlipBookError("RENDER_FAILED", "A page image could not be decoded");
  }
  const url = URL.createObjectURL(blob);
  try {
    const element = new Image();
    element.decoding = "async";
    element.src = url;
    await element.decode();
    const naturalWidth = element.naturalWidth || 1;
    const naturalHeight = element.naturalHeight || 1;
    const scale = fitScale(naturalWidth, naturalHeight, target);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new FlipBookError("RENDER_FAILED", "A page image could not be drawn");
    context.imageSmoothingQuality = "high";
    context.drawImage(element, 0, 0, canvas.width, canvas.height);
    return {
      image: canvas,
      width: canvas.width,
      height: canvas.height,
      naturalWidth,
      naturalHeight,
      final: isFinal(scale, naturalWidth, naturalHeight, target),
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function closeImage(image: SurfaceImage | null | undefined): void {
  if (!image) return;
  try {
    if (typeof (image as ImageBitmap).close === "function") (image as ImageBitmap).close();
    else if (!("naturalWidth" in image)) {
      (image as HTMLCanvasElement).width = 0;
      (image as HTMLCanvasElement).height = 0;
    }
  } catch {
    // already released
  }
}
