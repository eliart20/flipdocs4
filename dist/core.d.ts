/**
 * Framework-neutral entry point. No React; usable from a bundler or straight
 * from a `<script type="module">` that imports this file out of `dist`.
 */
import type { FlipbookCreateOptions, FlipbookInstance } from "./types.js";
/**
 * Mount a reader inside `container`. The container must have a size; the
 * reader fills it. Call `destroy()` to remove everything the reader added.
 */
export declare function createFlipbook(container: HTMLElement, options?: FlipbookCreateOptions): FlipbookInstance;
export { FlipBookError, isFlipBookError } from "./errors.js";
export { configureAssets } from "./runtimeAssets.js";
export type { AssetOverrides } from "./runtimeAssets.js";
export { TUNING_DEFAULTS, TUNING_RANGES } from "./tuning.js";
export { DIAGNOSTIC_POSE_NAMES } from "./core/poses.js";
export { DEFAULT_STRINGS } from "./ui/strings.js";
export { detectPdfDirection, directionFromViewerPreference } from "./host/direction.js";
export type * from "./types.js";
