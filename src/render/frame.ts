import type { PageSurface } from "../cache/surfaceCache";
import type { FoldState } from "../core/fold";
import type { Camera, ViewLayout } from "../core/layout";

/** Everything a renderer needs to draw one frame. Built by the engine. */

export interface SlotFrame {
  /** A page belongs in this slot (it may still be loading). */
  exists: boolean;
  surface: PageSurface | null;
}

export interface SheetFrame {
  /** +1: the sheet rests on the right and turns left. -1: mirrored. */
  side: 1 | -1;
  fold: FoldState;
  rest: SlotFrame;
  turned: SlotFrame;
}

/** Non-curl transition: the old spread leaves as the new one arrives. */
export interface SlideFrame {
  /** World-unit x offset of the outgoing spread. */
  outgoingOffset: number;
  outgoingOpacity: number;
  incomingOffset: number;
  incomingOpacity: number;
  incomingLeft: SlotFrame;
  incomingRight: SlotFrame;
}

export interface FrameState {
  layout: ViewLayout;
  camera: Camera;
  left: SlotFrame;
  right: SlotFrame;
  sheet: SheetFrame | null;
  slide: SlideFrame | null;
  seam: { visible: boolean; cssWidth: number; color: string };
  shadowOpacity: number;
  /** Per-page sizing: fit each image inside its slot instead of filling it. */
  contain: boolean;
  meshQuality: number;
  /** World x extent of the book, for its drop shadow. */
  bookLeft: number;
  bookRight: number;
}

export interface RendererHooks {
  /** A surface's pixels are now on the GPU. */
  onUploaded(surface: PageSurface): void;
  onContextLost(): void;
  onContextRestored(): void;
}

export interface FlipRenderer {
  readonly kind: "webgl" | "fallback";
  readonly canvas: HTMLCanvasElement;
  readonly maxTextureSize: number;
  /** Whether surfaces may give up their CPU pixels once drawn. */
  readonly releasesCpuAfterUpload: boolean;
  resize(cssWidth: number, cssHeight: number, pixelRatio: number): void;
  /** Draw one frame, synchronously. */
  render(frame: FrameState): void;
  /** Forget everything held for a surface that is being disposed. */
  dropSurface(surface: PageSurface): void;
  /** Block until the GPU has finished submitted work. Benchmarks only. */
  finish(): void;
  dispose(): void;
}

export const EMPTY_SLOT: SlotFrame = Object.freeze({ exists: false, surface: null });

/** UV scale that fits an image inside a slot without distortion. */
export function containFit(surface: PageSurface | null, slotAspect: number, contain: boolean): [number, number] {
  if (!contain || !surface || surface.height <= 0) return [1, 1];
  const imageAspect = surface.width / surface.height;
  if (Math.abs(imageAspect - slotAspect) < 1e-4 * slotAspect) return [1, 1];
  return imageAspect < slotAspect ? [slotAspect / imageAspect, 1] : [1, imageAspect / slotAspect];
}
