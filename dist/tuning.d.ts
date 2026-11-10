import type { FlipBookTuning } from "./types";
interface Range {
    min: number;
    max: number;
    integer?: boolean;
}
export declare const TUNING_DEFAULTS: Readonly<FlipBookTuning>;
export declare const TUNING_RANGES: Readonly<Record<keyof FlipBookTuning, Range>>;
/**
 * Merge a partial update into a tuning object. Finite values are clamped to
 * their documented range and integer settings are rounded; NaN and infinity
 * are rejected; unknown keys and undefined values are ignored.
 */
export declare function applyTuning(current: FlipBookTuning, update: Partial<FlipBookTuning> | undefined): FlipBookTuning;
export declare const defaultTuning: () => FlipBookTuning;
export declare const ZOOM_MIN = 0.75;
export declare const ZOOM_MAX = 4;
export declare const ZOOM_STEP = 0.25;
export declare const MOBILE_BREAKPOINT = 760;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const clampZoom: (zoom: number) => number;
export declare function normalizePreloadRadius(value: number | undefined): number;
export declare function normalizeCacheSize(value: number | undefined): number;
export declare function normalizeMaxPixelRatio(value: number | undefined): number;
export declare function normalizeMaxTextureHeight(value: number | undefined): number;
export {};
