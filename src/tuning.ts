import { FlipBookError } from "./errors";
import type { FlipBookTuning } from "./types";

interface Range {
  min: number;
  max: number;
  integer?: boolean;
}

export const TUNING_DEFAULTS: Readonly<FlipBookTuning> = Object.freeze({
  curlRadius: 0.085,
  cornerSag: 0.72,
  minimumLift: 0.018,
  cornerPull: 0.2,
  shadowOpacity: 0.42,
  turnDuration: 620,
  minimumTurnFrames: 38,
  gestureSlop: 6,
  releaseThreshold: 0.34,
  mobilePeek: 0.075,
  qualityScale: 1.08,
  meshQuality: 1,
});

export const TUNING_RANGES: Readonly<Record<keyof FlipBookTuning, Range>> = Object.freeze({
  curlRadius: { min: 0.025, max: 0.22 },
  cornerSag: { min: 0, max: 1 },
  minimumLift: { min: 0, max: 0.08 },
  cornerPull: { min: 0.02, max: 0.45 },
  shadowOpacity: { min: 0, max: 0.8 },
  turnDuration: { min: 180, max: 1600 },
  minimumTurnFrames: { min: 12, max: 60, integer: true },
  gestureSlop: { min: 2, max: 24 },
  releaseThreshold: { min: 0.15, max: 0.8 },
  mobilePeek: { min: 0.02, max: 0.2 },
  qualityScale: { min: 0.6, max: 2 },
  meshQuality: { min: 0.5, max: 1.5 },
});

const KEYS = Object.keys(TUNING_DEFAULTS) as Array<keyof FlipBookTuning>;

/**
 * Merge a partial update into a tuning object. Finite values are clamped to
 * their documented range and integer settings are rounded; NaN and infinity
 * are rejected; unknown keys and undefined values are ignored.
 */
export function applyTuning(current: FlipBookTuning, update: Partial<FlipBookTuning> | undefined): FlipBookTuning {
  const next = { ...current };
  if (!update) return next;
  for (const key of KEYS) {
    const value = update[key];
    if (value === undefined) continue;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new FlipBookError("INVALID_ARGUMENT", `Tuning value "${key}" must be a finite number`);
    }
    const range = TUNING_RANGES[key];
    let normalized = Math.min(range.max, Math.max(range.min, value));
    if (range.integer) normalized = Math.round(normalized);
    next[key] = normalized;
  }
  return next;
}

export const defaultTuning = (): FlipBookTuning => ({ ...TUNING_DEFAULTS });

/* Option normalization shared by the React wrapper and the adapter. */

export const ZOOM_MIN = 0.75;
export const ZOOM_MAX = 4;
export const ZOOM_STEP = 0.25;
export const MOBILE_BREAKPOINT = 760;

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const clampZoom = (zoom: number) => clamp(zoom, ZOOM_MIN, ZOOM_MAX);

export function normalizePreloadRadius(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 2;
  return Math.max(0, Math.round(value));
}

export function normalizeCacheSize(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 8;
  return Math.max(4, Math.round(value));
}

export function normalizeMaxPixelRatio(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 2;
  return Math.max(1, value);
}

export function normalizeMaxTextureHeight(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 4096;
  return Math.max(512, Math.round(value));
}
