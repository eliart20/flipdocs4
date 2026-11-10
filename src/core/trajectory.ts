import { foldPoint, solveFold } from "./fold";
import type { FoldState, FoldTuning, PageDims } from "./fold";

/**
 * Automatic turns. A path says where the grabbed point is for a path
 * parameter τ in [0, 1]; the fold solver does the rest, so toolbar turns,
 * keyboard turns, flicks and the settle after a release all go through the
 * same geometry as a drag.
 *
 * Timing is weighted by how far the sheet actually moves. A travel table
 * records, for evenly spaced τ, the cumulative distance covered by the
 * fastest of a set of sample points. Playback asks for a fraction of the
 * total travel and reads τ back out of the table, so no stretch of the turn
 * packs most of its motion into a few poses.
 */

export interface PathPoint {
  x: number;
  y: number;
}

export type TurnPath = (tau: number) => PathPoint;

export type Corner = "top" | "bottom";

export const cornerGrab = (dims: PageDims, corner: Corner) => ({
  u: dims.w,
  v: corner === "bottom" ? -dims.h / 2 : dims.h / 2,
});

/** Where the grab ends up: mirrored across the binding, or back at rest. */
export const pathEnd = (grab: { u: number; v: number }, complete: boolean): PathPoint => ({
  x: complete ? -grab.u : grab.u,
  y: grab.v,
});

/**
 * The canonical turn: the outer corner sweeps across the spread while a
 * smooth bell lifts it toward the middle of the page by cornerPull × height.
 */
export function canonicalPath(dims: PageDims, cornerPull: number, corner: Corner): TurnPath {
  const grab = cornerGrab(dims, corner);
  const lift = (corner === "bottom" ? 1 : -1) * cornerPull * dims.h;
  return (tau) => {
    const sine = Math.sin(Math.PI * tau);
    return { x: grab.u * Math.cos(Math.PI * tau), y: grab.v + lift * sine * sine };
  };
}

/** Straight run from a held pose to an end point. Starts exactly at `from`. */
export function settlePath(from: PathPoint, to: PathPoint): TurnPath {
  return (tau) => ({ x: from.x + (to.x - from.x) * tau, y: from.y + (to.y - from.y) * tau });
}

const SAMPLE_U = [0.2, 0.4, 0.6, 0.8, 1];
const SAMPLE_V = [-0.5, -0.25, 0, 0.25, 0.5];
export const TRAVEL_SAMPLE_COUNT = SAMPLE_U.length * SAMPLE_V.length;

/** Positions of the travel sample points under a fold, as a flat xyz array. */
export function samplePose(fold: FoldState, dims: PageDims, out?: Float64Array): Float64Array {
  const result = out ?? new Float64Array(TRAVEL_SAMPLE_COUNT * 3);
  const point: [number, number, number] = [0, 0, 0];
  let k = 0;
  for (const fv of SAMPLE_V) {
    for (const fu of SAMPLE_U) {
      foldPoint(fold, dims, fu * dims.w, fv * dims.h, point);
      result[k++] = point[0];
      result[k++] = point[1];
      result[k++] = point[2];
    }
  }
  return result;
}

/** Largest distance any sample point moved between two poses, in page widths. */
export function poseTravel(a: Float64Array, b: Float64Array, dims: PageDims): number {
  let worst = 0;
  for (let i = 0; i < a.length; i += 3) {
    const distance = Math.hypot(a[i] - b[i], a[i + 1] - b[i + 1], a[i + 2] - b[i + 2]);
    if (distance > worst) worst = distance;
  }
  return worst / dims.w;
}

export interface TravelTable {
  /** cumulative[i] is the travel from τ = 0 to τ = i / (length - 1). */
  cumulative: Float64Array;
  total: number;
}

export function buildTravelTable(
  dims: PageDims,
  tuning: FoldTuning,
  grab: { u: number; v: number },
  path: TurnPath,
  steps = 72,
): TravelTable {
  const cumulative = new Float64Array(steps + 1);
  let previous = samplePose(solveFold(dims, tuning, grab, path(0)), dims);
  let current: Float64Array = new Float64Array(previous.length);
  for (let i = 1; i <= steps; i++) {
    samplePose(solveFold(dims, tuning, grab, path(i / steps)), dims, current);
    cumulative[i] = cumulative[i - 1] + poseTravel(previous, current, dims);
    const swap = previous;
    previous = current;
    current = swap;
  }
  return { cumulative, total: cumulative[steps] };
}

/** Path parameter at which a fraction of the total travel has been covered. */
export function tauForFraction(table: TravelTable, fraction: number): number {
  const steps = table.cumulative.length - 1;
  if (fraction <= 0 || table.total <= 0) return fraction <= 0 ? 0 : Math.min(1, fraction);
  if (fraction >= 1) return 1;
  const wanted = fraction * table.total;
  let lo = 0;
  let hi = steps;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (table.cumulative[mid] <= wanted) lo = mid;
    else hi = mid;
  }
  const span = table.cumulative[hi] - table.cumulative[lo];
  const within = span > 0 ? (wanted - table.cumulative[lo]) / span : 0;
  return (lo + within) / steps;
}

/**
 * Travel fraction against normalized time: linear with short quadratic ramps
 * at both ends (C1 throughout), so a turn starts and stops softly without
 * hiding its motion in the middle frames.
 */
export function timingRamp(t: number, ramp = 0.12): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const scale = 1 / (1 - ramp);
  if (t < ramp) return (t * t * scale) / (2 * ramp);
  if (t > 1 - ramp) {
    const rest = 1 - t;
    return 1 - (rest * rest * scale) / (2 * ramp);
  }
  return (t - ramp / 2) * scale;
}

/**
 * Animation time that limits how far a single late frame may advance a turn.
 * On a steadily slow display the turn keeps real-time pacing: the allowance
 * follows the display's own cadence. Only an isolated hitch is cut short, so
 * the sheet resumes from where it was instead of leaping ahead.
 * `minimumTurnFrames` sets the allowance on fast displays; it never makes a
 * turn wait in order to reach a pose count.
 */
export class TurnClock {
  private readonly recent: number[] = [];
  private steady = 1000 / 60;

  /** Record a frame interval observed while animating. */
  observe(deltaMs: number): void {
    if (!(deltaMs > 0) || deltaMs > 1000) return;
    this.recent.push(deltaMs);
    if (this.recent.length > 9) this.recent.shift();
    if (this.recent.length >= 3) {
      const sorted = [...this.recent].sort((a, b) => a - b);
      this.steady = sorted[sorted.length >> 1];
    }
  }

  get steadyInterval(): number {
    return this.steady;
  }

  /** Time to advance for a frame that arrived `deltaMs` after the last one. */
  advance(deltaMs: number, durationMs: number, minimumTurnFrames: number): number {
    if (!(deltaMs > 0)) return 0;
    const allowance = Math.max(durationMs / Math.max(1, minimumTurnFrames), this.steady * 1.35);
    return Math.min(deltaMs, allowance);
  }
}
