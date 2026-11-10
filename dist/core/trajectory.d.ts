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
export declare const cornerGrab: (dims: PageDims, corner: Corner) => {
    u: number;
    v: number;
};
/** Where the grab ends up: mirrored across the binding, or back at rest. */
export declare const pathEnd: (grab: {
    u: number;
    v: number;
}, complete: boolean) => PathPoint;
/**
 * The canonical turn: the outer corner sweeps across the spread while a
 * smooth bell lifts it toward the middle of the page by cornerPull × height.
 */
export declare function canonicalPath(dims: PageDims, cornerPull: number, corner: Corner): TurnPath;
/** Straight run from a held pose to an end point. Starts exactly at `from`. */
export declare function settlePath(from: PathPoint, to: PathPoint): TurnPath;
export declare const TRAVEL_SAMPLE_COUNT: number;
/** Positions of the travel sample points under a fold, as a flat xyz array. */
export declare function samplePose(fold: FoldState, dims: PageDims, out?: Float64Array): Float64Array;
/** Largest distance any sample point moved between two poses, in page widths. */
export declare function poseTravel(a: Float64Array, b: Float64Array, dims: PageDims): number;
export interface TravelTable {
    /** cumulative[i] is the travel from τ = 0 to τ = i / (length - 1). */
    cumulative: Float64Array;
    total: number;
}
export declare function buildTravelTable(dims: PageDims, tuning: FoldTuning, grab: {
    u: number;
    v: number;
}, path: TurnPath, steps?: number): TravelTable;
/** Path parameter at which a fraction of the total travel has been covered. */
export declare function tauForFraction(table: TravelTable, fraction: number): number;
/**
 * Travel fraction against normalized time: linear with short quadratic ramps
 * at both ends (C1 throughout), so a turn starts and stops softly without
 * hiding its motion in the middle frames.
 */
export declare function timingRamp(t: number, ramp?: number): number;
/**
 * Animation time that limits how far a single late frame may advance a turn.
 * On a steadily slow display the turn keeps real-time pacing: the allowance
 * follows the display's own cadence. Only an isolated hitch is cut short, so
 * the sheet resumes from where it was instead of leaping ahead.
 * `minimumTurnFrames` sets the allowance on fast displays; it never makes a
 * turn wait in order to reach a pose count.
 */
export declare class TurnClock {
    private readonly recent;
    private steady;
    /** Record a frame interval observed while animating. */
    observe(deltaMs: number): void;
    get steadyInterval(): number;
    /** Time to advance for a frame that arrived `deltaMs` after the last one. */
    advance(deltaMs: number, durationMs: number, minimumTurnFrames: number): number;
}
