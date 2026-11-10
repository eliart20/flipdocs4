import type { CssRect } from "../core/layout.js";
import type { Side, ViewMode } from "../core/spreads.js";
import type { Corner } from "../core/trajectory.js";
import { FlipBookError } from "../errors.js";
import type { PageSource } from "../source/pageSource.js";
import type { BenchmarkMode, BenchmarkResult, DiagnosticPose, FlipBookSnapshot, FlipBookSource, FlipBookTuning, LayoutPolicy, NavigationResult, PageChangeEvent, PageSizing, ReadingDirection, ReadyEvent, ReducedMotionPolicy, SpineOptions, TransitionKind } from "../types.js";
import { PageStore } from "./pageStore.js";
/**
 * The reader's engine: owns the canvas, the document, the page caches and all
 * motion. It has no toolbar and no framework; the viewer wraps it with
 * controls, and the React component and the adapter wrap the viewer.
 */
export interface EngineOptions {
    direction?: ReadingDirection;
    startPage?: number;
    preloadRadius?: number;
    cacheSize?: number;
    maxPixelRatio?: number;
    maxTextureHeight?: number;
    interactive?: boolean;
    spine?: boolean | SpineOptions;
    layoutPolicy?: LayoutPolicy;
    pageSizing?: PageSizing;
    transition?: TransitionKind;
    reducedMotion?: ReducedMotionPolicy;
    surfaceByteTarget?: number;
    renderer?: "auto" | "webgl" | "fallback";
    tuning?: Partial<FlipBookTuning>;
}
export interface EngineEvents {
    onReady?(event: ReadyEvent): void;
    onPageChange?(event: PageChangeEvent): void;
    onZoomChange?(zoom: number): void;
    /** The document cannot be shown. */
    onError?(error: FlipBookError): void;
    /** Something went wrong that the reader carries on from. */
    onWarning?(error: FlipBookError): void;
    /** A frame was drawn. */
    onRender?(): void;
    /** fraction is null when the total is unknown. */
    onLoading?(loading: boolean, fraction: number | null): void;
    /** Page rectangles, zoom, pan or turn state changed. */
    onView?(): void;
    /** next()/previous() hit the end of the book on this physical side. */
    onBoundary?(side: Side): void;
    onRendererChange?(kind: "webgl" | "fallback"): void;
    /** The canvas was pressed; the viewer should take keyboard focus. */
    onFocusRequest?(): void;
}
export declare class FlipEngine {
    private readonly stage;
    private readonly events;
    private canvasElement;
    private renderer;
    private webglRetry;
    private webglAttempts;
    private readonly cache;
    private readonly queue;
    private store;
    private source;
    private sourceInput;
    private generation;
    private loadAbort;
    private restartedForRevision;
    /** Reopens the current load's document; its promise follows the restart. */
    private retryLoad;
    private options;
    private tuning;
    private spine;
    private readonly startPage;
    private pageCount;
    private pageAspect;
    private page;
    private ready;
    private loading;
    private error;
    private direction;
    private mode;
    private layout;
    private foldTuning;
    private pixelRatio;
    private zoom;
    private panX;
    private panY;
    private zoomAnim;
    private activity;
    private diagnostic;
    private readonly clock;
    private readonly travelTables;
    private frameHandle;
    private needsDraw;
    private renderCount;
    private callbackCount;
    private readonly renderTimes;
    private lastTurn;
    private lastVisible;
    private lastPinned;
    private press;
    private readonly touches;
    private pinch;
    private hoverPointer;
    private resizeObserver;
    private motionQuery;
    private reducedMotion;
    private rasterTimer;
    private benchmark;
    private destroyed;
    constructor(stage: HTMLElement, options: EngineOptions, events: EngineEvents);
    get canvas(): HTMLCanvasElement;
    private createCanvas;
    private listen;
    private createWebGL;
    private createRenderer;
    /**
     * Replace the renderer and its canvas. The logical state (page, zoom, pan,
     * direction) is untouched; rasters are prepared again for the new renderer.
     */
    private swapRenderer;
    /** The WebGL context went away: keep reading in the non-curl reader. */
    private handleContextLost;
    private scheduleWebGLRetry;
    /** Try to bring the curl renderer back after a context loss. */
    private restoreWebGL;
    private onVisibility;
    get rendererKind(): "webgl" | "fallback";
    update(options: Partial<EngineOptions>): void;
    private applyDirection;
    setTuning(values: Partial<FlipBookTuning>): void;
    getTuning(): FlipBookTuning;
    /** Open a document. The promise settles when the first page is readable. */
    load(source: FlipBookSource): Promise<ReadyEvent>;
    private open;
    /** The open document broke (for example its bytes changed mid-read). */
    private handleFatal;
    private setLoading;
    private report;
    private warn;
    private onWindowResize;
    private onMotionChange;
    private resolveMode;
    /** Read the stage size and rebuild the layout when anything changed. */
    private measure;
    private afterPlacementChange;
    private focusX;
    private baseCameraX;
    private camera;
    private clampPan;
    getZoom(): number;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    fitWidth(): void;
    /**
     * Change zoom, keeping the point under `anchor` (CSS pixels in the stage)
     * where it is. Zoom changes the camera only; the fold model never sees it.
     */
    setZoom(value: number, anchor?: {
        x: number;
        y: number;
    } | null, animate?: boolean): void;
    private applyZoom;
    private updateTouchAction;
    private rasterTarget;
    private scheduleRaster;
    /** Pages a frame draws right now. */
    private shownPages;
    /** Request what is on screen, then what is near, and pin what is drawn. */
    private ensurePages;
    private handleSurface;
    private slot;
    private result;
    private effectiveTransition;
    next(corner?: Corner): Promise<NavigationResult>;
    previous(corner?: Corner): Promise<NavigationResult>;
    /** Physical side that next() (step 1) or previous() (-1) turns toward. */
    private stepSide;
    private step;
    private afterActivityStart;
    /** Jump straight to a page. Throws INVALID_ARGUMENT for NaN or infinity. */
    goToPage(page: number): NavigationResult;
    private setPage;
    private emitPageChange;
    private beginSheet;
    private setFold;
    /** Re-solve a held sheet after tuning or layout changed. */
    private resolveSheet;
    private travelTable;
    private animateSheet;
    /** Animate from the held pose to completion or back to rest. */
    private settleSheet;
    private finishMeasure;
    private releaseTurnWork;
    private commitSheet;
    private cancelSheet;
    /** Bring whatever is in flight to its natural end immediately. */
    private finishActivity;
    /** Drop whatever is in flight without changing the page. */
    private abortActivity;
    private clearDiagnostic;
    private applyPose;
    /** Hold a named pose. Returns false when that sheet does not exist here. */
    setDiagnosticPose(name: DiagnosticPose): boolean;
    /** Back to the stable spread, without advancing. */
    resetPose(): void;
    getSnapshot(): FlipBookSnapshot;
    /** Draw a fresh frame and encode it. Rejects with CAPTURE_FAILED. */
    capturePng(): Promise<Blob>;
    invalidate(): void;
    private onFrame;
    /** Step every running animation. Returns true while any is still running. */
    private advance;
    private advanceSheet;
    private advanceHover;
    /**
     * Pose the hover preview: the corner eases toward the pointer and, at full
     * strength, sits exactly under it. The corner is lifted off the page, so
     * the pointer is read on the plane at the corner's own height; pressing
     * then takes over this very pose with nothing left to correct.
     */
    private applyHover;
    private buildFrame;
    private draw;
    /**
     * CSS rectangles of the pages that are settled and flat, relative to the
     * stage. Empty while a sheet is bent or a transition runs, so overlays hide
     * instead of drifting off the paper.
     */
    getPageRects(): Array<{
        page: number;
        rect: CssRect;
        side: Side;
    }>;
    private pointerPosition;
    private get interactive();
    /** Which page side a world point is over, and how far from the binding. */
    private locate;
    private planForSide;
    private onPointerDown;
    /** Hold a live sheet with the pointer, from its current pose, with no jump. */
    private claimSheet;
    /** Pointer position in the sheet's frame, on the plane at height z. */
    private pointerLocal;
    /**
     * Move the held sheet so its grabbed point sits under the pointer. On a
     * phone the view slides as the sheet turns, so progress, camera and target
     * are solved together: progress follows directly from where the pointer is,
     * with no feedback from the previous frame.
     */
    private dragSheet;
    private onPointerMove;
    private classifyPress;
    private onPointerUp;
    private onPointerCancel;
    private onPointerLeave;
    private releaseCapture;
    private endPress;
    private handleTap;
    private updateHover;
    private endHover;
    private onWheel;
    private finishZoomAnimation;
    get pageSource(): PageSource | null;
    get pages(): PageStore | null;
    get state(): {
        ready: boolean;
        loading: boolean;
        error: FlipBookError | null;
        page: number;
        pageCount: number;
        direction: ReadingDirection;
        mode: ViewMode;
        zoom: number;
        visiblePages: number[];
        turning: boolean;
        generation: number;
    };
    canStep(step: 1 | -1): boolean;
    runBenchmark(durationMs?: number, mode?: BenchmarkMode): Promise<BenchmarkResult>;
    /** Idempotent. Safe during loading, dragging, animation or a benchmark. */
    destroy(): void;
}
