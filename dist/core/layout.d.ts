import type { PageDims } from "./fold.js";
import type { ViewMode } from "./spreads.js";
/**
 * Where the book sits in the reader, in one place, so the WebGL renderer, the
 * non-curl reader, pointer mapping and the DOM overlays all agree.
 *
 * World units: a page is 1 wide and 1/aspect tall. The binding is the line
 * x = 0; the right page spans x in [0, 1], the left page [-1, 0]. The camera
 * looks straight down the z axis from `cameraDistance`, so the resting pages
 * project to exact rectangles and zoom is a plain scale.
 */
/**
 * Vertical field of view, degrees. Narrow on purpose: lifted paper comes a
 * little toward the viewer, enough to read as depth, without a hand-held
 * page ballooning as it bows.
 */
export declare const CAMERA_FOV = 22;
export interface ViewLayout {
    mode: ViewMode;
    cssWidth: number;
    cssHeight: number;
    page: PageDims;
    /** CSS pixels per world unit at 1× zoom. */
    pxPerWorld: number;
    /** World units visible at 1× zoom. */
    viewWidth: number;
    viewHeight: number;
    cameraDistance: number;
    /** Mobile: |camera x| when one page is focused. 0 on desktop. */
    focusTravel: number;
}
export interface Camera {
    x: number;
    y: number;
    zoom: number;
}
export declare function computeLayout(cssWidth: number, cssHeight: number, pageAspect: number, mode: ViewMode, mobilePeek: number): ViewLayout;
/** World position under a CSS-pixel point, on the plane at height `z`. */
export declare function pointerToWorld(layout: ViewLayout, camera: Camera, cssX: number, cssY: number, z?: number): {
    x: number;
    y: number;
};
/** CSS-pixel position of a world point on the resting plane. */
export declare function worldToCss(layout: ViewLayout, camera: Camera, x: number, y: number): {
    x: number;
    y: number;
};
export interface CssRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** CSS rectangle of a resting page slot. */
export declare function slotRect(layout: ViewLayout, camera: Camera, side: "left" | "right"): CssRect;
/** Furthest the camera may pan from its base position at this zoom. */
export declare function panLimits(layout: ViewLayout, zoom: number): {
    x: number;
    y: number;
};
/** Zoom at which one page (mobile) or the spread (desktop) fills the width. */
export declare function fitWidthZoom(layout: ViewLayout): number;
/** Height in CSS pixels of a page at 1× zoom. */
export declare const pageCssHeight: (layout: ViewLayout) => number;
