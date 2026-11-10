import type { FlipRenderer, FrameState } from "./frame";
/**
 * The non-curl reader: the same layout, zoom and pan drawn with Canvas 2D.
 * It is used when WebGL is unavailable or its context is lost, and can be
 * chosen outright. Pages change instantly or slide; there is no sheet.
 */
export declare class CanvasFlipRenderer implements FlipRenderer {
    readonly kind: "fallback";
    readonly releasesCpuAfterUpload = false;
    readonly maxTextureSize = 4096;
    readonly canvas: HTMLCanvasElement;
    private readonly context;
    private pixelRatio;
    constructor(canvas: HTMLCanvasElement);
    resize(cssWidth: number, cssHeight: number, pixelRatio: number): void;
    private drawSlot;
    render(frame: FrameState): void;
    dropSurface(): void;
    finish(): void;
    dispose(): void;
}
