import type { PageSurface } from "../cache/surfaceCache";
import { worldToCss } from "../core/layout";
import { containFit } from "./frame";
import type { FlipRenderer, FrameState, SlotFrame } from "./frame";

/**
 * The non-curl reader: the same layout, zoom and pan drawn with Canvas 2D.
 * It is used when WebGL is unavailable or its context is lost, and can be
 * chosen outright. Pages change instantly or slide; there is no sheet.
 */
export class CanvasFlipRenderer implements FlipRenderer {
  readonly kind = "fallback" as const;
  readonly releasesCpuAfterUpload = false;
  readonly maxTextureSize = 4096;
  readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private pixelRatio = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas 2D is not available");
    this.context = context;
  }

  resize(cssWidth: number, cssHeight: number, pixelRatio: number): void {
    this.pixelRatio = pixelRatio;
    const width = Math.max(1, Math.round(cssWidth * pixelRatio));
    const height = Math.max(1, Math.round(cssHeight * pixelRatio));
    if (this.canvas.width !== width) this.canvas.width = width;
    if (this.canvas.height !== height) this.canvas.height = height;
  }

  private drawSlot(frame: FrameState, slot: SlotFrame, side: "left" | "right", offset: number, opacity: number): void {
    if (!slot.exists || opacity <= 0.001) return;
    const { layout, camera } = frame;
    const { w, h } = layout.page;
    const origin = worldToCss(layout, camera, (side === "left" ? -w : 0) + offset, h / 2);
    const scale = layout.pxPerWorld * camera.zoom;
    const width = w * scale;
    const height = h * scale;
    const ctx = this.context;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#fdfcf9";
    ctx.fillRect(origin.x, origin.y, width, height);
    const surface: PageSurface | null = slot.surface;
    if (surface?.image && !surface.disposed) {
      const [fitX, fitY] = containFit(surface, w / h, frame.contain);
      const drawWidth = width / fitX;
      const drawHeight = height / fitY;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        surface.image as CanvasImageSource,
        origin.x + (width - drawWidth) / 2,
        origin.y + (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
    }
    ctx.globalAlpha = 1;
  }

  render(frame: FrameState): void {
    const ctx = this.context;
    const { layout, camera } = frame;
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, layout.cssWidth, layout.cssHeight);

    const slide = frame.slide;
    if (!slide && frame.bookRight > frame.bookLeft) {
      const { h } = layout.page;
      const topLeft = worldToCss(layout, camera, frame.bookLeft, h / 2);
      const scale = layout.pxPerWorld * camera.zoom;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 0.05 * scale;
      ctx.shadowOffsetY = 0.012 * scale;
      ctx.fillStyle = "#fdfcf9";
      ctx.fillRect(topLeft.x, topLeft.y, (frame.bookRight - frame.bookLeft) * scale, h * scale);
      ctx.restore();
    }

    this.drawSlot(frame, frame.left, "left", slide?.outgoingOffset ?? 0, slide?.outgoingOpacity ?? 1);
    this.drawSlot(frame, frame.right, "right", slide?.outgoingOffset ?? 0, slide?.outgoingOpacity ?? 1);
    if (slide) {
      this.drawSlot(frame, slide.incomingLeft, "left", slide.incomingOffset, slide.incomingOpacity);
      this.drawSlot(frame, slide.incomingRight, "right", slide.incomingOffset, slide.incomingOpacity);
    }

    if (frame.seam.visible && !slide) {
      const { h } = layout.page;
      const top = worldToCss(layout, camera, 0, h / 2);
      const width = frame.seam.cssWidth * camera.zoom;
      ctx.fillStyle = frame.seam.color;
      ctx.fillRect(top.x - width / 2, top.y, width, h * layout.pxPerWorld * camera.zoom);
    }
  }

  dropSurface(): void {}

  finish(): void {}

  dispose(): void {
    this.canvas.width = 0;
    this.canvas.height = 0;
  }
}
