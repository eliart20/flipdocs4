/**
 * Framework-neutral entry point. No React; usable from a bundler or straight
 * from a `<script type="module">` that imports this file out of `dist`.
 */
import "./style.css";
import type { FlipbookCreateOptions, FlipbookInstance } from "./types";
import { FlipbookViewer } from "./ui/viewer";

/**
 * Mount a reader inside `container`. The container must have a size; the
 * reader fills it. Call `destroy()` to remove everything the reader added.
 */
export function createFlipbook(container: HTMLElement, options: FlipbookCreateOptions = {}): FlipbookInstance {
  if (!(container instanceof HTMLElement)) {
    throw new TypeError("createFlipbook needs an HTMLElement to mount into");
  }
  return new FlipbookViewer(container, options, false);
}

export { FlipBookError, isFlipBookError } from "./errors";
export { configureAssets } from "./runtimeAssets";
export type { AssetOverrides } from "./runtimeAssets";
export { TUNING_DEFAULTS, TUNING_RANGES } from "./tuning";
export { DIAGNOSTIC_POSE_NAMES } from "./core/poses";
export { DEFAULT_STRINGS } from "./ui/strings";
export { detectPdfDirection, directionFromViewerPreference } from "./host/direction";
export type * from "./types";
