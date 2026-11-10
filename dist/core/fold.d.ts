/**
 * The page fold. One solver serves hover, dragging, automatic turns and
 * diagnostics; the vertex shader in render/foldGlsl.ts repeats `foldPoint`
 * line for line.
 *
 * Frame: the sheet is described in material coordinates (u, v). u runs from
 * the binding edge (u = 0) to the free edge (u = w); v runs from -h/2 to
 * +h/2. At rest a material point sits at (u, v, 0); fully turned it sits at
 * (-u, v, 0). A sheet that rests on the left side of the book is the same
 * thing mirrored in x by the renderer.
 *
 * Model: a developable cylindrical fold. A fold line { m : n·m = d } splits
 * the sheet. Material on the binding side (s = n·m - d ≤ 0) does not move.
 * Material past the line wraps a half cylinder of radius r lying on the page
 * (0 < s < πr), and whatever is left continues flat at height 2r, reflected
 * back over the fixed part (s ≥ πr). The map is an isometry, so the paper
 * never stretches, and because the whole binding edge is kept on the fixed
 * side of the line it stays put analytically; nothing is blended or corrected
 * afterwards.
 *
 * Solving: the caller names a material point (the grab) and where it should
 * be (the target). The fold normal is the direction from target to grab. Let
 * L be their distance and S = n·g - |n_y|·h/2 the room between the grab and
 * the nearest binding corner, measured along n. The grab reaches the target
 * exactly when it sits s past the fold line, where
 *
 *   L = s - r·sin(s/r)   (grab still on the cylinder, L < s)
 *   L = 2s - πr          (grab on the reflected flap, L ≥ s)
 *
 * and the binding stays fixed exactly when s ≤ S. That leaves one free
 * choice. At the nominal radius the fold hugs the grab (a corner peel). When
 * the sheet overhangs the grab along n (an interior grab), a tight fold would
 * throw that overhang across the page for an infinitesimal pull, so the
 * solver slides s toward S instead, which is the same as growing the radius:
 * the sheet first bends gently from the binding and tightens as the pull
 * grows. Past the nominal fold's reach (s would exceed S) the line stays at
 * the binding corner and the radius shrinks, reaching zero exactly on the
 * boundary L = 2S, which is where taut paper would stop. That boundary is the
 * intersection of two discs centred on the binding corners; targets outside
 * it are pulled back along the ray from the binding point level with the
 * grab, which is continuous and leaves reachable targets untouched.
 */
export interface PageDims {
    /** Page width in world units. */
    w: number;
    /** Page height in world units. */
    h: number;
}
export interface FoldTuning {
    /** Nominal fold radius, world units (curlRadius × w). */
    radius: number;
    /** Minimum mid-turn lift 2r, world units (minimumLift × w). */
    minLift: number;
    /** Peak sag depth before the progress envelope, world units. */
    sagDepth: number;
}
export interface FoldState {
    /** False when the sheet is flat at rest. */
    active: boolean;
    nx: number;
    ny: number;
    d: number;
    r: number;
    grabU: number;
    grabV: number;
    /** Where the grab actually is, after reach clamping. */
    targetX: number;
    targetY: number;
    /** Height of the grab point above the page. */
    grabZ: number;
    /** 0 at rest, 1 fully turned. */
    progress: number;
    /** Sag depth with its envelope applied. */
    sag: number;
    /** 0…1 gate for every turn-only shading effect; 0 at both ends. */
    envelope: number;
    /** True when the requested target was out of reach. */
    clamped: boolean;
    /**
     * 0 for a fold at the nominal radius (a peel), up to 1 for a gentle bend
     * hinged at the binding (a grab with paper overhanging it, barely pulled).
     */
    bend: number;
}
export declare const SAG_MAX_DEPTH = 0.03;
/** Sag never removes more than this share of a point's height. */
export declare const SAG_FLOOR = 0.6;
export declare function flatFold(grabU?: number, grabV?: number): FoldState;
/** Shading gate: rises over the first 6% of a turn, falls over the last 14%. */
export declare function turnEnvelope(progress: number): number;
/**
 * Place the grabbed material point as close to `target` as the paper allows
 * and return the fold that does it. Pure: equal inputs give equal folds, so
 * reversing a drag retraces the same shapes.
 */
export declare function solveFold(dims: PageDims, tuning: FoldTuning, grab: {
    u: number;
    v: number;
}, target: {
    x: number;
    y: number;
}): FoldState;
/** Position of material point (u, v) under a fold. Writes into `out`. */
export declare function foldPoint(fold: FoldState, dims: PageDims, u: number, v: number, out?: [number, number, number]): [number, number, number];
/**
 * Largest ratio of deformed to rest length over the edges and diagonals of a
 * sampling grid. 1 means no stretch anywhere. Used by the geometry tests and
 * by diagnostics.
 */
export declare function sampleStretch(fold: FoldState, dims: PageDims, columns?: number, rows?: number): number;
/** Fold tuning in world units for a page of the given width. */
export declare function foldTuning(values: {
    curlRadius: number;
    minimumLift: number;
    cornerSag: number;
}, dims: PageDims): FoldTuning;
