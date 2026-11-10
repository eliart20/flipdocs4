/**
 * Pointer gesture classification, kept free of DOM and engine state so the
 * rules can be unit tested.
 *
 * A press stays `pending` until it moves farther than the slop. Then:
 *   - above 1× zoom every drag pans;
 *   - a mostly vertical touch movement is left to the browser (page scroll);
 *   - a drag toward the binding that began on the outer half of a page takes
 *     hold of that page directly (`drag`);
 *   - any other mostly horizontal movement is a `flick`: the canonical
 *     automatic turn (or, on mobile, a focus slide) in the swipe direction.
 * A press released inside the slop is a `tap`.
 */
export type GestureKind = "pending" | "pan" | "scroll" | "drag" | "flick";
export interface GestureInput {
    /** Movement since the press, CSS pixels. */
    dx: number;
    dy: number;
    slop: number;
    pointerType: string;
    zoomed: boolean;
    /**
     * Side of the binding the press landed on (+1 right, -1 left), or 0 when it
     * missed both pages.
     */
    pressSide: 1 | -1 | 0;
    /** Distance of the press from the binding, in page widths (0…1). */
    pressDepth: number;
    /** A sheet on the pressed side can be turned. */
    sideCanTurn: boolean;
}
export interface GestureResult {
    kind: GestureKind;
    /** For `flick`: +1 swipe to the right, -1 swipe to the left. */
    swipe: 1 | -1 | 0;
}
export declare function classifyGesture(input: GestureInput): GestureResult;
/**
 * Decide what a release does to a held sheet. Progress past the threshold
 * completes the turn; a quick movement in either direction overrides it.
 * `velocity` is progress per second, positive toward completion.
 */
export declare function releaseCompletes(progress: number, velocity: number, threshold: number): boolean;
/** Fraction of a page's width, measured from its outer edge, where a tap turns. */
export declare const TAP_EDGE_ZONE = 0.16;
/** Reach of the hover preview around an outer corner, in page widths. */
export declare const HOVER_CORNER_ZONE = 0.14;
