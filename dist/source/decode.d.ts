import type { SurfaceImage } from "../cache/surfaceCache.js";
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
export declare function fitScale(naturalWidth: number, naturalHeight: number, target: DecodeTarget): number;
/**
 * Decode a Blob. When the natural size is already known (a manifest variant,
 * or a page decoded before) a single decode-and-resize pass is used.
 */
export declare function decodeBlob(blob: Blob, target: DecodeTarget, known?: {
    width: number;
    height: number;
}): Promise<DecodedImage>;
/** Scale an existing bitmap down if needed. Closes `bitmap` when it makes a copy and `closeSource` is set. */
export declare function fitBitmap(bitmap: ImageBitmap, target: DecodeTarget, closeSource: boolean): Promise<DecodedImage & {
    copied: boolean;
}>;
export declare function closeImage(image: SurfaceImage | null | undefined): void;
