import type { PageDims } from "./fold";
import type { ViewMode } from "./spreads";

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
export const CAMERA_FOV = 22;

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

export function computeLayout(
  cssWidth: number,
  cssHeight: number,
  pageAspect: number,
  mode: ViewMode,
  mobilePeek: number,
): ViewLayout {
  const page: PageDims = { w: 1, h: 1 / pageAspect };
  const contentWidth = mode === "mobile" ? page.w * (1 + mobilePeek) : 2 * page.w;
  const padding = Math.max(6, Math.min(cssWidth, cssHeight) * 0.022);
  const availableWidth = Math.max(1, cssWidth - 2 * padding);
  const availableHeight = Math.max(1, cssHeight - 2 * padding);
  const pxPerWorld = Math.max(1e-3, Math.min(availableWidth / contentWidth, availableHeight / page.h));
  const viewHeight = cssHeight / pxPerWorld;
  return {
    mode,
    cssWidth,
    cssHeight,
    page,
    pxPerWorld,
    viewWidth: cssWidth / pxPerWorld,
    viewHeight,
    cameraDistance: viewHeight / 2 / Math.tan((CAMERA_FOV * Math.PI) / 360),
    focusTravel: mode === "mobile" ? (page.w * (1 - mobilePeek)) / 2 : 0,
  };
}

/** World position under a CSS-pixel point, on the plane at height `z`. */
export function pointerToWorld(
  layout: ViewLayout,
  camera: Camera,
  cssX: number,
  cssY: number,
  z = 0,
): { x: number; y: number } {
  const depth = (layout.cameraDistance - z) / layout.cameraDistance;
  const scale = depth / (layout.pxPerWorld * camera.zoom);
  return {
    x: camera.x + (cssX - layout.cssWidth / 2) * scale,
    y: camera.y - (cssY - layout.cssHeight / 2) * scale,
  };
}

/** CSS-pixel position of a world point on the resting plane. */
export function worldToCss(layout: ViewLayout, camera: Camera, x: number, y: number): { x: number; y: number } {
  const scale = layout.pxPerWorld * camera.zoom;
  return {
    x: layout.cssWidth / 2 + (x - camera.x) * scale,
    y: layout.cssHeight / 2 - (y - camera.y) * scale,
  };
}

export interface CssRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** CSS rectangle of a resting page slot. */
export function slotRect(layout: ViewLayout, camera: Camera, side: "left" | "right"): CssRect {
  const { w, h } = layout.page;
  const topLeft = worldToCss(layout, camera, side === "left" ? -w : 0, h / 2);
  const scale = layout.pxPerWorld * camera.zoom;
  return { x: topLeft.x, y: topLeft.y, width: w * scale, height: h * scale };
}

/** Furthest the camera may pan from its base position at this zoom. */
export function panLimits(layout: ViewLayout, zoom: number): { x: number; y: number } {
  if (zoom <= 1) return { x: 0, y: 0 };
  const { w, h } = layout.page;
  const margin = 0.04 * w;
  const halfContentWidth = layout.mode === "mobile" ? w / 2 : w;
  return {
    x: Math.max(0, halfContentWidth + margin - layout.viewWidth / (2 * zoom)),
    y: Math.max(0, h / 2 + margin - layout.viewHeight / (2 * zoom)),
  };
}

/** Zoom at which one page (mobile) or the spread (desktop) fills the width. */
export function fitWidthZoom(layout: ViewLayout): number {
  const contentWidth = layout.mode === "mobile" ? layout.page.w : 2 * layout.page.w;
  return layout.viewWidth / contentWidth;
}

/** Height in CSS pixels of a page at 1× zoom. */
export const pageCssHeight = (layout: ViewLayout): number => layout.page.h * layout.pxPerWorld;
