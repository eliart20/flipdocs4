import { PRIORITY, RasterQueue } from "../cache/rasterQueue";
import { SurfaceCache } from "../cache/surfaceCache";
import type { PageSurface } from "../cache/surfaceCache";
import { flatFold, foldTuning, solveFold } from "../core/fold";
import type { FoldState, FoldTuning } from "../core/fold";
import { HOVER_CORNER_ZONE, TAP_EDGE_ZONE, classifyGesture, releaseCompletes } from "../core/gestures";
import { computeLayout, fitWidthZoom, pageCssHeight, panLimits, pointerToWorld, slotRect } from "../core/layout";
import type { Camera, CssRect, ViewLayout } from "../core/layout";
import { DIAGNOSTIC_POSES, isDiagnosticPose } from "../core/poses";
import {
  clampPage,
  crossesSpread,
  normalizePageArgument,
  planTurn,
  sequentialTarget,
  sideOfPage,
  spreadOfPage,
  spreadSides,
  visiblePages,
} from "../core/spreads";
import type { Side, TurnPlan, ViewMode } from "../core/spreads";
import {
  TurnClock,
  buildTravelTable,
  canonicalPath,
  cornerGrab,
  pathEnd,
  poseTravel,
  samplePose,
  settlePath,
  tauForFraction,
  timingRamp,
} from "../core/trajectory";
import type { Corner, TravelTable, TurnPath } from "../core/trajectory";
import { FlipBookError, cancelled, isCancellation, toFlipBookError } from "../errors";
import { CanvasFlipRenderer } from "../render/canvasRenderer";
import { EMPTY_SLOT } from "../render/frame";
import type { FlipRenderer, FrameState, SlideFrame, SlotFrame } from "../render/frame";
import { WebGLFlipRenderer } from "../render/webglRenderer";
import { openSource } from "../source/openSource";
import type { PageSource } from "../source/pageSource";
import {
  MOBILE_BREAKPOINT,
  ZOOM_STEP,
  applyTuning,
  clamp,
  clampZoom,
  defaultTuning,
  normalizeCacheSize,
  normalizeMaxPixelRatio,
  normalizeMaxTextureHeight,
  normalizePreloadRadius,
} from "../tuning";
import type {
  BenchmarkMode,
  BenchmarkResult,
  DiagnosticPose,
  FlipBookSnapshot,
  FlipBookSource,
  FlipBookTuning,
  LayoutPolicy,
  NavigationResult,
  PageChangeEvent,
  PageSizing,
  ReadingDirection,
  ReadyEvent,
  ReducedMotionPolicy,
  SpineOptions,
  TransitionKind,
  TurnMeasurement,
} from "../types";
import { PageStore } from "./pageStore";

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

interface NavWaiter {
  resolve(result: NavigationResult): void;
}

interface TurnMeasure {
  startedAt: number;
  renders: number;
  callbacks: number;
  firstRenderAt: number;
  lastRenderAt: number;
  worstGap: number;
  submit: number;
  travels: number[];
  lastPose: Float64Array | null;
}

interface SheetAnimation {
  path: TurnPath;
  table: TravelTable;
  duration: number;
  elapsed: number;
  complete: boolean;
  cameraStart: number;
  cameraEnd: number;
  lastTime: number | null;
}

interface SheetActivity {
  kind: "sheet";
  plan: TurnPlan;
  side: 1 | -1;
  phase: "hover" | "drag" | "anim" | "pose";
  grab: { u: number; v: number };
  fold: FoldState;
  /** World x of the camera at the start and end of this turn (mobile focus). */
  cameraFrom: number;
  cameraTo: number;
  cameraX: number;
  /** Share of the focus slide a drag may consume; the settle does the rest. */
  kappa: number;
  /** Camera x a drag starts from, and the share of the slide it uses. */
  dragFrom: number;
  dragKappa: number;
  targetPage: number;
  hoverStrength: number;
  hoverGoal: 0 | 1;
  /** Pointer position of the hover preview, CSS pixels in the stage. */
  hoverPoint: { x: number; y: number };
  hoverLastTime: number | null;
  dragOffset: { x: number; y: number };
  anim: SheetAnimation | null;
  /** Set while a press holds a sheet that was animating. */
  resume: { complete: boolean } | null;
  waiters: NavWaiter[];
  measure: TurnMeasure | null;
}

interface FocusActivity {
  kind: "focus";
  from: number;
  to: number;
  elapsed: number;
  duration: number;
  lastTime: number | null;
  targetPage: number;
  waiters: NavWaiter[];
}

interface SlideActivity {
  kind: "slide";
  direction: 1 | -1;
  elapsed: number;
  duration: number;
  lastTime: number | null;
  targetPage: number;
  waiters: NavWaiter[];
}

type Activity = { kind: "idle" } | SheetActivity | FocusActivity | SlideActivity;

interface PressState {
  id: number;
  type: string;
  startX: number;
  startY: number;
  x: number;
  y: number;
  kind: "pending" | "pan" | "drag" | "done";
  side: 1 | -1 | 0;
  depth: number;
  world: { x: number; y: number };
  panStart: { x: number; y: number };
  samples: Array<{ time: number; progress: number }>;
}

const IDLE: Activity = Object.freeze({ kind: "idle" }) as Activity;
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sideSign = (side: Side): 1 | -1 => (side === "right" ? 1 : -1);
const now = () => performance.now();

function resolveSpine(spine: boolean | SpineOptions | undefined): Required<SpineOptions> {
  const options = typeof spine === "object" && spine !== null ? spine : {};
  return {
    visible: spine === false ? false : options.visible !== false,
    width: Number.isFinite(options.width) ? Math.max(0, options.width as number) : 3,
    color: typeof options.color === "string" && options.color ? options.color : "#222a35",
  };
}

export class FlipEngine {
  private canvasElement: HTMLCanvasElement;
  private renderer: FlipRenderer;
  private webglRetry: ReturnType<typeof setTimeout> | null = null;
  private webglAttempts = 0;
  private readonly cache: SurfaceCache;
  private readonly queue = new RasterQueue<unknown>(1);
  private store: PageStore | null = null;
  private source: PageSource | null = null;
  private sourceInput: FlipBookSource | null = null;
  private generation = 0;
  private loadAbort: AbortController | null = null;
  private restartedForRevision = false;
  /** Reopens the current load's document; its promise follows the restart. */
  private retryLoad: ((source: FlipBookSource) => void) | null = null;

  private options: EngineOptions;
  private tuning: FlipBookTuning = defaultTuning();
  private spine: Required<SpineOptions>;
  private readonly startPage: number;

  private pageCount = 0;
  private pageAspect = 0.72;
  private page = 1;
  private ready = false;
  private loading = false;
  private error: FlipBookError | null = null;
  private direction: ReadingDirection = "ltr";
  private mode: ViewMode = "desktop";
  private layout: ViewLayout | null = null;
  private foldTuning: FoldTuning | null = null;
  private pixelRatio = 1;

  private zoom = 1;
  private panX = 0;
  private panY = 0;
  private zoomAnim: { from: number; to: number; elapsed: number; duration: number; anchor: { x: number; y: number } | null; lastTime: number | null } | null = null;

  private activity: Activity = IDLE;
  private diagnostic: DiagnosticPose | null = null;
  private readonly clock = new TurnClock();
  private readonly travelTables = new Map<string, TravelTable>();

  private frameHandle = 0;
  private needsDraw = false;
  private renderCount = 0;
  private callbackCount = 0;
  private readonly renderTimes: number[] = [];
  private lastTurn: TurnMeasurement | null = null;
  private lastVisible = "";
  private lastPinned = "";

  private press: PressState | null = null;
  private readonly touches = new Map<number, { x: number; y: number }>();
  private pinch: { distance: number; zoom: number } | null = null;
  private hoverPointer: { x: number; y: number } | null = null;

  private resizeObserver: ResizeObserver | null = null;
  private motionQuery: MediaQueryList | null = null;
  private reducedMotion = false;
  private rasterTimer: ReturnType<typeof setTimeout> | null = null;
  private benchmark: { cancel(): void } | null = null;
  private destroyed = false;

  constructor(
    private readonly stage: HTMLElement,
    options: EngineOptions,
    private readonly events: EngineEvents,
  ) {
    this.options = { ...options };
    this.startPage = Number.isFinite(options.startPage) ? Math.max(1, Math.round(options.startPage as number)) : 1;
    this.spine = resolveSpine(options.spine);
    this.direction = options.direction === "rtl" ? "rtl" : "ltr";
    this.tuning = applyTuning(this.tuning, options.tuning);

    this.canvasElement = this.createCanvas();
    stage.append(this.canvasElement);

    this.cache = new SurfaceCache({
      entryTarget: normalizeCacheSize(options.cacheSize),
      byteTarget: options.surfaceByteTarget ?? null,
      onDispose: (surface) => this.renderer.dropSurface(surface),
    });
    this.renderer = this.createRenderer(this.canvasElement, options.renderer ?? "auto");
    this.listen(this.canvasElement, true);
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("visibilitychange", this.onVisibility);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.measure());
      this.resizeObserver.observe(stage);
    }
    if (typeof matchMedia === "function") {
      this.motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
      this.motionQuery.addEventListener?.("change", this.onMotionChange);
      this.onMotionChange();
    }
    this.measure();
    this.updateTouchAction();
  }

  /* ---------------------------------------------------------------- */
  /* Renderer                                                           */
  /* ---------------------------------------------------------------- */

  get canvas(): HTMLCanvasElement {
    return this.canvasElement;
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.className = "flipdocs__canvas";
    canvas.setAttribute("aria-hidden", "true");
    return canvas;
  }

  private listen(canvas: HTMLCanvasElement, on: boolean): void {
    const change = on ? canvas.addEventListener.bind(canvas) : canvas.removeEventListener.bind(canvas);
    change("pointerdown", this.onPointerDown as EventListener);
    change("pointermove", this.onPointerMove as EventListener);
    change("pointerup", this.onPointerUp as EventListener);
    change("pointercancel", this.onPointerCancel as EventListener);
    change("pointerleave", this.onPointerLeave as EventListener);
    if (on) canvas.addEventListener("wheel", this.onWheel, { passive: false });
    else canvas.removeEventListener("wheel", this.onWheel);
  }

  private createWebGL(canvas: HTMLCanvasElement): FlipRenderer {
    return new WebGLFlipRenderer(canvas, {
      onUploaded: (surface) => this.cache.noteUploaded(surface, true),
      onContextLost: () => this.handleContextLost(),
      onContextRestored: () => {},
    });
  }

  private createRenderer(canvas: HTMLCanvasElement, preference: "auto" | "webgl" | "fallback"): FlipRenderer {
    if (preference !== "fallback") {
      try {
        return this.createWebGL(canvas);
      } catch (error) {
        if (preference === "webgl") {
          queueMicrotask(() => this.warn(toFlipBookError(error, "WEBGL_UNAVAILABLE", "WebGL is not available")));
        }
      }
    }
    // A canvas that was refused a WebGL context can still give a 2D one.
    return new CanvasFlipRenderer(canvas);
  }

  /**
   * Replace the renderer and its canvas. The logical state (page, zoom, pan,
   * direction) is untouched; rasters are prepared again for the new renderer.
   */
  private swapRenderer(make: (canvas: HTMLCanvasElement) => FlipRenderer): boolean {
    const canvas = this.createCanvas();
    let next: FlipRenderer;
    try {
      next = make(canvas);
    } catch {
      return false;
    }
    this.abortActivity();
    this.endPress();
    // Surfaces that handed their pixels to the old context cannot be reused.
    this.cache.clear();
    this.lastPinned = "";
    const previous = this.renderer;
    const old = this.canvasElement;
    this.listen(old, false);
    this.renderer = next;
    this.canvasElement = canvas;
    old.replaceWith(canvas);
    previous.dispose();
    this.listen(canvas, true);
    this.updateTouchAction();
    if (this.layout) next.resize(this.layout.cssWidth, this.layout.cssHeight, this.pixelRatio);
    this.events.onRendererChange?.(next.kind);
    this.ensurePages();
    this.events.onView?.();
    this.invalidate();
    return true;
  }

  /** The WebGL context went away: keep reading in the non-curl reader. */
  private handleContextLost(): void {
    if (this.destroyed) return;
    this.swapRenderer((canvas) => new CanvasFlipRenderer(canvas));
    this.webglAttempts = 0;
    this.scheduleWebGLRetry(1500);
  }

  private scheduleWebGLRetry(delay: number): void {
    if (this.webglRetry) clearTimeout(this.webglRetry);
    this.webglRetry = setTimeout(() => {
      this.webglRetry = null;
      this.restoreWebGL();
    }, delay);
  }

  /** Try to bring the curl renderer back after a context loss. */
  private restoreWebGL(): void {
    if (this.destroyed || this.renderer.kind === "webgl" || this.options.renderer === "fallback") return;
    if (this.webglAttempts >= 6) return;
    if (document.visibilityState === "hidden") return; // retried when the page is shown again
    this.webglAttempts++;
    if (!this.swapRenderer((canvas) => this.createWebGL(canvas))) {
      this.scheduleWebGLRetry(2000 * this.webglAttempts);
    }
  }

  private onVisibility = () => {
    if (document.visibilityState === "visible" && this.webglRetry === null && this.renderer.kind !== "webgl") {
      this.scheduleWebGLRetry(300);
    }
  };

  get rendererKind(): "webgl" | "fallback" {
    return this.renderer.kind;
  }

  /* ---------------------------------------------------------------- */
  /* Options                                                            */
  /* ---------------------------------------------------------------- */

  update(options: Partial<EngineOptions>): void {
    if (this.destroyed) return;
    const previous = this.options;
    this.options = { ...previous, ...options };
    if ("direction" in options) this.applyDirection();
    if ("spine" in options) this.spine = resolveSpine(this.options.spine);
    if ("cacheSize" in options || "surfaceByteTarget" in options) {
      this.cache.setTargets(normalizeCacheSize(this.options.cacheSize), this.options.surfaceByteTarget ?? null);
    }
    if ("interactive" in options && this.options.interactive === false) {
      this.endPress();
      if (this.activity.kind === "sheet" && (this.activity.phase === "hover" || this.activity.phase === "drag")) {
        this.cancelSheet();
      }
    }
    if ("reducedMotion" in options) this.onMotionChange();
    this.measure(true);
    this.ensurePages();
    this.invalidate();
  }

  private applyDirection(): void {
    const explicit = this.options.direction;
    const next: ReadingDirection = explicit === "rtl" || explicit === "ltr" ? explicit : (this.source?.direction ?? "ltr");
    if (next === this.direction) return;
    this.abortActivity();
    this.direction = next;
    this.travelTables.clear();
    this.afterPlacementChange();
  }

  setTuning(values: Partial<FlipBookTuning>): void {
    const next = applyTuning(this.tuning, values);
    const rasterChanged = next.qualityScale !== this.tuning.qualityScale;
    const layoutChanged = next.mobilePeek !== this.tuning.mobilePeek;
    this.tuning = next;
    this.travelTables.clear();
    if (this.layout) this.foldTuning = foldTuning(next, this.layout.page);
    if (layoutChanged) this.measure(true);
    // A held or diagnostic sheet takes the new shape at once.
    if (this.activity.kind === "sheet" && this.activity.phase !== "anim") this.resolveSheet(this.activity);
    if (rasterChanged) this.scheduleRaster();
    this.invalidate();
  }

  getTuning(): FlipBookTuning {
    return { ...this.tuning };
  }

  /* ---------------------------------------------------------------- */
  /* Loading                                                            */
  /* ---------------------------------------------------------------- */

  /** Open a document. The promise settles when the first page is readable. */
  load(source: FlipBookSource): Promise<ReadyEvent> {
    this.restartedForRevision = false;
    return new Promise<ReadyEvent>((resolve, reject) => {
      let restarted = false;
      const attempt = (input: FlipBookSource) => {
        this.open(input).then(resolve, (error) => {
          // An attempt cancelled by its own restart is not the outcome.
          if (restarted && isCancellation(error)) {
            restarted = false;
            return;
          }
          reject(error);
        });
      };
      this.retryLoad = (input) => {
        restarted = true;
        attempt(input);
      };
      attempt(source);
    });
  }

  private open(source: FlipBookSource): Promise<ReadyEvent> {
    if (this.destroyed) return Promise.reject(new FlipBookError("DESTROYED", "The reader was destroyed"));
    const generation = ++this.generation;
    this.sourceInput = source;
    this.benchmark?.cancel();
    this.loadAbort?.abort();
    const abort = new AbortController();
    this.loadAbort = abort;

    // Everything belonging to the previous document stops here.
    this.abortActivity();
    this.endPress();
    this.store?.destroy();
    this.store = null;
    this.source?.destroy();
    this.source = null;
    this.queue.cancelAll();
    this.queue.setCeiling(PRIORITY.BACKGROUND);
    this.cache.clear();
    this.lastPinned = "";
    this.diagnostic = null;
    this.ready = false;
    this.error = null;
    this.pageCount = 0;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.zoomAnim = null;
    this.setLoading(true, 0);
    this.updateTouchAction();
    this.invalidate();

    const current = () => generation === this.generation && !this.destroyed;

    return (async () => {
      let opened: PageSource | null = null;
      try {
        opened = await openSource(source, {
          generation,
          signal: abort.signal,
          maxTextureSize: Math.min(this.renderer.maxTextureSize, 8192),
          onProgress: (loaded, total) => {
            if (current() && !this.ready) this.setLoading(true, total && total > 0 ? Math.min(1, loaded / total) : null);
          },
        });
        if (!current()) {
          opened.destroy();
          throw cancelled("Loading");
        }
        if (!(opened.pageCount >= 1) || !(opened.pageAspect > 0)) {
          opened.destroy();
          throw new FlipBookError("LOAD_FAILED", "The document has no readable pages");
        }
        this.source = opened;
        this.pageCount = opened.pageCount;
        this.pageAspect = opened.pageAspect;
        this.queue.setConcurrency(opened.concurrency);
        const fatal = opened as PageSource & { onFatal?: (error: FlipBookError) => void };
        if ("onFatal" in fatal) fatal.onFatal = (error) => this.handleFatal(generation, error);

        let firstError: unknown = null;
        this.store = new PageStore(generation, opened, this.cache, this.queue, {
          onSurface: (page) => this.handleSurface(page),
          onError: (page, error) => {
            if (!this.ready && page === this.page) firstError = error;
            else if (current()) this.warn(toFlipBookError(error, "RENDER_FAILED", `Page ${page} could not be drawn`));
          },
        });

        const explicit = this.options.direction;
        this.direction = explicit === "rtl" || explicit === "ltr" ? explicit : (opened.direction ?? "ltr");
        this.page = clampPage(this.startPage, this.pageCount);
        this.travelTables.clear();
        this.measure(true);
        this.ensurePages();
        this.invalidate();

        // Ready means the first page can be read, not merely that the file opened.
        await new Promise<void>((resolve, reject) => {
          const check = () => {
            if (!current()) reject(cancelled("Loading"));
            else if (firstError) reject(firstError);
            else if (this.store?.peek(this.page)) resolve();
            else setTimeout(check, 16);
          };
          check();
        });

        this.ready = true;
        this.setLoading(false, 1);
        const event: ReadyEvent = { pageCount: this.pageCount, pageAspect: this.pageAspect, direction: this.direction };
        this.events.onReady?.(event);
        this.lastVisible = "";
        this.emitPageChange();
        this.events.onView?.();
        this.invalidate();
        return event;
      } catch (raw) {
        if (current() && opened && this.source === opened) {
          this.store?.destroy();
          this.store = null;
          opened.destroy();
          this.source = null;
          this.pageCount = 0;
        }
        const error = isCancellation(raw)
          ? cancelled("Loading")
          : toFlipBookError(raw, "LOAD_FAILED", "The document could not be opened");
        if (current()) {
          this.setLoading(false, null);
          if (error.code !== "CANCELLED") this.report(error);
        }
        throw error;
      }
    })();
  }

  /** The open document broke (for example its bytes changed mid-read). */
  private handleFatal(generation: number, error: FlipBookError): void {
    if (generation !== this.generation || this.destroyed || !this.sourceInput) return;
    if (error.code === "RANGE_MISMATCH" && !this.restartedForRevision) {
      // Restart cleanly once: a new probe reads the new revision from scratch.
      this.restartedForRevision = true;
      const input = this.sourceInput;
      const renew = input.type === "pdf" && typeof input.src === "string" ? input.request?.renew : undefined;
      void (async () => {
        let next = input;
        if (renew && input.type === "pdf" && typeof input.src === "string") {
          const url = await renew({ url: input.src, status: 0, reason: "revision-changed" });
          if (url) next = { ...input, src: url };
        }
        if (generation !== this.generation || this.destroyed) return;
        if (this.retryLoad) this.retryLoad(next);
        else this.open(next).catch(() => {});
      })();
      return;
    }
    this.abortActivity();
    this.report(error);
  }

  private setLoading(loading: boolean, fraction: number | null): void {
    this.loading = loading;
    this.events.onLoading?.(loading, fraction);
  }

  private report(error: FlipBookError): void {
    if (this.destroyed || error.code === "CANCELLED") return;
    this.error = error;
    this.events.onError?.(error);
  }

  private warn(error: FlipBookError): void {
    if (this.destroyed || error.code === "CANCELLED") return;
    this.events.onWarning?.(error);
  }

  /* ---------------------------------------------------------------- */
  /* Layout                                                             */
  /* ---------------------------------------------------------------- */

  private onWindowResize = () => {
    if ((this.options.layoutPolicy ?? "viewport") === "viewport") this.measure();
  };

  private onMotionChange = () => {
    this.reducedMotion = (this.options.reducedMotion ?? "auto") === "auto" && !!this.motionQuery?.matches;
  };

  private resolveMode(width: number): ViewMode {
    const policy = this.options.layoutPolicy ?? "viewport";
    if (policy === "single") return "mobile";
    if (policy === "double") return "desktop";
    const measured = policy === "container" ? width : window.innerWidth;
    return measured <= MOBILE_BREAKPOINT ? "mobile" : "desktop";
  }

  /** Read the stage size and rebuild the layout when anything changed. */
  private measure(force = false): void {
    if (this.destroyed) return;
    const width = this.stage.clientWidth;
    const height = this.stage.clientHeight;
    // A hidden or collapsed container: wait until it has a size.
    if (!(width > 0) || !(height > 0)) {
      this.layout = null;
      return;
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, normalizeMaxPixelRatio(this.options.maxPixelRatio));
    const mode = this.resolveMode(width);
    const previous = this.layout;
    if (
      !force &&
      previous &&
      previous.cssWidth === width &&
      previous.cssHeight === height &&
      previous.mode === mode &&
      this.pixelRatio === pixelRatio &&
      Math.abs(previous.page.h - 1 / this.pageAspect) < 1e-9
    ) {
      return;
    }
    const modeChanged = !previous || previous.mode !== mode;
    if (modeChanged || (previous && Math.abs(previous.page.h - 1 / this.pageAspect) > 1e-9)) this.abortActivity();
    this.pixelRatio = pixelRatio;
    this.mode = mode;
    this.layout = computeLayout(width, height, this.pageAspect, mode, this.tuning.mobilePeek);
    this.foldTuning = foldTuning(this.tuning, this.layout.page);
    this.travelTables.clear();
    this.renderer.resize(width, height, pixelRatio);
    this.clampPan();
    if (this.activity.kind === "sheet") this.resolveSheet(this.activity);
    if (modeChanged) this.emitPageChange();
    this.scheduleRaster();
    this.events.onView?.();
    this.needsDraw = true;
    // Draw in this task: a resized canvas is blank until the next render.
    if (this.ready || this.source) this.draw();
    else this.invalidate();
  }

  private afterPlacementChange(): void {
    this.emitPageChange();
    this.ensurePages();
    this.events.onView?.();
    this.invalidate();
  }

  /* ---------------------------------------------------------------- */
  /* Camera                                                             */
  /* ---------------------------------------------------------------- */

  private focusX(page: number): number {
    if (!this.layout || this.mode !== "mobile") return 0;
    return sideSign(sideOfPage(page, this.direction)) * this.layout.focusTravel;
  }

  private baseCameraX(): number {
    const activity = this.activity;
    if (activity.kind === "sheet") return activity.cameraX;
    if (activity.kind === "focus") return lerp(activity.from, activity.to, smooth(clamp(activity.elapsed / activity.duration, 0, 1)));
    return this.focusX(this.page);
  }

  private camera(): Camera {
    return { x: this.baseCameraX() + this.panX, y: this.panY, zoom: this.zoom };
  }

  private clampPan(): void {
    if (!this.layout) return;
    const limits = panLimits(this.layout, this.zoom);
    this.panX = clamp(this.panX, -limits.x, limits.x);
    this.panY = clamp(this.panY, -limits.y, limits.y);
  }

  /* ---------------------------------------------------------------- */
  /* Zoom                                                               */
  /* ---------------------------------------------------------------- */

  getZoom(): number {
    return this.zoomAnim ? this.zoomAnim.to : this.zoom;
  }

  zoomIn(): void {
    this.setZoom(Math.round((this.getZoom() + ZOOM_STEP) / ZOOM_STEP) * ZOOM_STEP);
  }

  zoomOut(): void {
    this.setZoom(Math.round((this.getZoom() - ZOOM_STEP) / ZOOM_STEP) * ZOOM_STEP);
  }

  resetZoom(): void {
    this.setZoom(1);
  }

  fitWidth(): void {
    if (this.layout) this.setZoom(fitWidthZoom(this.layout));
  }

  /**
   * Change zoom, keeping the point under `anchor` (CSS pixels in the stage)
   * where it is. Zoom changes the camera only; the fold model never sees it.
   */
  setZoom(value: number, anchor: { x: number; y: number } | null = null, animate = true): void {
    if (this.destroyed || !Number.isFinite(value)) return;
    const target = clampZoom(value);
    if (target === this.getZoom()) return;
    // A held or turning sheet is finished first; zooming never bends paper.
    if (this.activity.kind !== "idle") this.finishActivity();
    if (animate && !this.reducedMotion && this.layout) {
      this.zoomAnim = { from: this.zoom, to: target, elapsed: 0, duration: 170, anchor, lastTime: null };
    } else {
      this.zoomAnim = null;
      this.applyZoom(target, anchor);
    }
    this.events.onZoomChange?.(target);
    this.updateTouchAction(target);
    this.scheduleRaster();
    this.invalidate();
  }

  private applyZoom(value: number, anchor: { x: number; y: number } | null): void {
    const layout = this.layout;
    if (layout && anchor) {
      const before = pointerToWorld(layout, this.camera(), anchor.x, anchor.y);
      this.zoom = value;
      const after = pointerToWorld(layout, this.camera(), anchor.x, anchor.y);
      this.panX += before.x - after.x;
      this.panY += before.y - after.y;
    } else {
      this.zoom = value;
    }
    if (this.zoom <= 1) {
      this.panX = 0;
      this.panY = 0;
    }
    this.clampPan();
    this.events.onView?.();
  }

  private updateTouchAction(zoom = this.getZoom()): void {
    // Up to 1× a vertical swipe scrolls the host page; zoomed in, the reader pans.
    this.canvas.style.touchAction = this.options.interactive === false ? "auto" : zoom > 1 ? "none" : "pan-y";
  }

  /* ---------------------------------------------------------------- */
  /* Pages and textures                                                 */
  /* ---------------------------------------------------------------- */

  private rasterTarget(zoomed: boolean): { height: number; maxWidth?: number } {
    const layout = this.layout;
    if (!layout) return { height: 512 };
    const limit = Math.min(normalizeMaxTextureHeight(this.options.maxTextureHeight), this.renderer.maxTextureSize);
    const zoom = zoomed ? Math.max(1, this.getZoom()) : 1;
    let height = pageCssHeight(layout) * zoom * this.pixelRatio * this.tuning.qualityScale;
    height = Math.min(height, limit, this.renderer.maxTextureSize / Math.max(this.pageAspect, 1e-3));
    // Step the target so small resizes do not start new rasters.
    height = Math.max(256, Math.ceil(height / 64) * 64);
    height = Math.min(height, limit);
    return this.options.pageSizing === "per-page" ? { height, maxWidth: Math.round(height * this.pageAspect) } : { height };
  }

  private scheduleRaster(): void {
    if (this.rasterTimer) clearTimeout(this.rasterTimer);
    this.rasterTimer = setTimeout(() => {
      this.rasterTimer = null;
      this.ensurePages();
    }, 180);
  }

  /** Pages a frame draws right now. */
  private shownPages(): number[] {
    const pages: number[] = [];
    const add = (page: number | null) => {
      if (page !== null && page >= 1 && page <= this.pageCount && !pages.includes(page)) pages.push(page);
    };
    const sides = spreadSides(spreadOfPage(this.page), this.pageCount, this.direction);
    add(sides.left);
    add(sides.right);
    const activity = this.activity;
    if (activity.kind === "sheet") {
      add(activity.plan.restPage);
      add(activity.plan.turnedPage);
      add(activity.plan.underPage);
      add(activity.plan.landingPage);
    } else if (activity.kind === "slide" || activity.kind === "focus") {
      const target = spreadSides(spreadOfPage(activity.targetPage), this.pageCount, this.direction);
      add(target.left);
      add(target.right);
    }
    return pages;
  }

  /** Request what is on screen, then what is near, and pin what is drawn. */
  private ensurePages(): void {
    const store = this.store;
    if (!store || this.destroyed) return;
    if (!this.layout) {
      // Not laid out yet (hidden or zero-sized): still prepare the opening
      // page so the document can report ready before it is shown.
      store.want(this.page, 1024, PRIORITY.VISIBLE);
      return;
    }
    const shown = this.shownPages();
    const turning = this.activity.kind === "sheet" && this.activity.phase !== "hover";
    const sharp = this.rasterTarget(true);
    const base = this.rasterTarget(false);
    const keep = new Set<number>(shown);

    const centre = this.page;
    this.queue.setOrder((page) => {
      const distance = page - centre;
      // Pages ahead are slightly more likely to be wanted than pages behind.
      return distance >= 0 ? distance : -distance + 0.5;
    });

    for (const page of shown) {
      store.want(page, sharp.height, turning ? PRIORITY.TURN : PRIORITY.VISIBLE, sharp.maxWidth);
    }
    const radius = normalizePreloadRadius(this.options.preloadRadius);
    if (radius > 0 && shown.length > 0) {
      const low = Math.min(...shown);
      const high = Math.max(...shown);
      for (let step = 1; step <= radius; step++) {
        for (const page of [high + step, low - step]) {
          if (page < 1 || page > this.pageCount) continue;
          keep.add(page);
          if (!turning) store.want(page, base.height, PRIORITY.PRELOAD, base.maxWidth);
        }
      }
    }
    store.forgetExcept(keep);

    const pinned = shown.slice().sort((a, b) => a - b).join(",");
    if (pinned !== this.lastPinned) {
      this.lastPinned = pinned;
      this.cache.setPinned(shown);
    }
    for (const page of keep) this.cache.touch(page);
  }

  private handleSurface(page: number): void {
    if (this.shownPages().includes(page)) this.invalidate();
  }

  private slot(page: number | null): SlotFrame {
    if (page === null || page < 1 || page > this.pageCount) return EMPTY_SLOT;
    return { exists: true, surface: this.store?.peek(page) ?? null };
  }

  /* ---------------------------------------------------------------- */
  /* Navigation                                                         */
  /* ---------------------------------------------------------------- */

  private result(status: NavigationResult["status"]): NavigationResult {
    return { status, page: this.page };
  }

  private effectiveTransition(): TransitionKind {
    if (this.reducedMotion) return "none";
    const wanted = this.options.transition ?? "curl";
    if (wanted === "curl" && this.renderer.kind !== "webgl") return "slide";
    return wanted;
  }

  next(corner?: Corner): Promise<NavigationResult> {
    return this.step(1, corner);
  }

  previous(corner?: Corner): Promise<NavigationResult> {
    return this.step(-1, corner);
  }

  /** Physical side that next() (step 1) or previous() (-1) turns toward. */
  private stepSide(step: 1 | -1): Side {
    return (step === 1) === (this.direction === "ltr") ? "right" : "left";
  }

  private step(step: 1 | -1, corner: Corner = "bottom"): Promise<NavigationResult> {
    if (this.destroyed || !this.ready || !this.layout) return Promise.resolve(this.result("cancelled"));
    this.clearDiagnostic();

    // A hover preview of the same sheet simply carries on from where it is.
    const held = this.activity;
    if (
      held.kind === "sheet" &&
      held.phase === "hover" &&
      held.plan.forward === (step === 1) &&
      this.effectiveTransition() === "curl"
    ) {
      return new Promise((resolve) => {
        held.waiters.push({ resolve });
        this.settleSheet(held, true);
      });
    }

    // Anything else in flight is finished at once: no queue of turns builds up.
    this.finishActivity();
    if (this.zoom !== 1 && this.zoomAnim) this.finishZoomAnimation();

    const target = sequentialTarget(this.page, this.pageCount, this.mode, step);
    if (target === null) {
      if (!this.reducedMotion) this.events.onBoundary?.(this.stepSide(step));
      return Promise.resolve(this.result("boundary"));
    }

    const transition = this.effectiveTransition();
    if (transition === "none") {
      this.setPage(target);
      return Promise.resolve(this.result("completed"));
    }

    return new Promise<NavigationResult>((resolve) => {
      const waiter: NavWaiter = { resolve };
      if (this.mode === "mobile" && !crossesSpread(this.page, target)) {
        this.activity = {
          kind: "focus",
          from: this.focusX(this.page),
          to: this.focusX(target),
          elapsed: 0,
          duration: this.tuning.turnDuration * 0.6,
          lastTime: null,
          targetPage: target,
          waiters: [waiter],
        };
        this.afterActivityStart();
        return;
      }
      if (transition === "slide") {
        this.activity = {
          kind: "slide",
          direction: this.stepSide(step) === "right" ? 1 : -1,
          elapsed: 0,
          duration: Math.min(420, this.tuning.turnDuration * 0.6),
          lastTime: null,
          targetPage: target,
          waiters: [waiter],
        };
        this.afterActivityStart();
        return;
      }
      const plan = planTurn(spreadOfPage(this.page), step === 1, this.pageCount, this.direction);
      if (!plan) {
        resolve(this.result("boundary"));
        return;
      }
      const sheet = this.beginSheet(plan, "anim", cornerGrab(this.layout!.page, corner), target);
      sheet.waiters.push(waiter);
      this.animateSheet(sheet, canonicalPath(this.layout!.page, this.tuning.cornerPull, corner), true, `canonical:${corner}`);
    });
  }

  private afterActivityStart(): void {
    this.ensurePages();
    this.events.onView?.();
    this.invalidate();
  }

  /** Jump straight to a page. Throws INVALID_ARGUMENT for NaN or infinity. */
  goToPage(page: number): NavigationResult {
    const target = normalizePageArgument(page, Math.max(1, this.pageCount));
    if (this.destroyed || !this.ready) return this.result("cancelled");
    this.clearDiagnostic();
    this.abortActivity();
    this.setPage(target);
    return this.result("completed");
  }

  private setPage(page: number): void {
    this.page = clampPage(page, this.pageCount);
    this.afterPlacementChange();
  }

  private emitPageChange(): void {
    if (!this.ready) return;
    const visible = visiblePages(this.page, this.pageCount, this.direction, this.mode);
    const key = `${this.page}|${visible.join(",")}|${this.pageCount}`;
    if (key === this.lastVisible) return;
    this.lastVisible = key;
    this.events.onPageChange?.({ page: this.page, pageCount: this.pageCount, visiblePages: visible });
  }

  /* ---------------------------------------------------------------- */
  /* Sheet lifecycle                                                    */
  /* ---------------------------------------------------------------- */

  private beginSheet(
    plan: TurnPlan,
    phase: SheetActivity["phase"],
    grab: { u: number; v: number },
    targetPage: number,
  ): SheetActivity {
    const cameraFrom = this.focusX(this.page);
    const cameraTo = this.focusX(targetPage);
    const layout = this.layout!;
    // On a phone a drag would otherwise cross the whole turn in a few
    // pixels when the grab is near mid-page, because the view slides the
    // other way under the finger. Let the drag use only part of the slide.
    const travel = Math.abs(cameraTo - cameraFrom);
    const kappa = travel > 0 ? clamp((2 * grab.u - 0.6 * layout.page.w) / travel, 0, 1) : 1;
    const sheet: SheetActivity = {
      kind: "sheet",
      plan,
      side: sideSign(plan.restSide),
      phase,
      grab: { ...grab },
      fold: flatFold(grab.u, grab.v),
      cameraFrom,
      cameraTo,
      cameraX: cameraFrom,
      kappa,
      dragFrom: cameraFrom,
      dragKappa: kappa,
      targetPage,
      hoverStrength: 0,
      hoverGoal: 1,
      hoverPoint: { x: 0, y: 0 },
      hoverLastTime: null,
      dragOffset: { x: 0, y: 0 },
      anim: null,
      resume: null,
      waiters: [],
      measure: null,
    };
    this.activity = sheet;
    if (phase !== "hover") this.queue.setCeiling(PRIORITY.VISIBLE);
    this.ensurePages();
    this.events.onView?.();
    this.invalidate();
    return sheet;
  }

  private setFold(sheet: SheetActivity, target: { x: number; y: number }): void {
    sheet.fold = solveFold(this.layout!.page, this.foldTuning!, sheet.grab, target);
  }

  /** Re-solve a held sheet after tuning or layout changed. */
  private resolveSheet(sheet: SheetActivity): void {
    if (!this.layout || !this.foldTuning) return;
    if (sheet.phase === "pose" && this.diagnostic) {
      this.applyPose(sheet, this.diagnostic);
      return;
    }
    if (sheet.fold.active) this.setFold(sheet, { x: sheet.fold.targetX, y: sheet.fold.targetY });
  }

  private travelTable(key: string, grab: { u: number; v: number }, path: TurnPath): TravelTable {
    const cached = this.travelTables.get(key);
    if (cached) return cached;
    const table = buildTravelTable(this.layout!.page, this.foldTuning!, grab, path);
    if (key) this.travelTables.set(key, table);
    return table;
  }

  private animateSheet(sheet: SheetActivity, path: TurnPath, complete: boolean, cacheKey: string): void {
    const table = cacheKey ? this.travelTable(cacheKey, sheet.grab, path) : buildTravelTable(this.layout!.page, this.foldTuning!, sheet.grab, path, 40);
    // A settle covers less ground than a full turn and takes less time.
    const share = cacheKey ? 1 : clamp(table.total / 2.2, 0.28, 1);
    sheet.phase = "anim";
    sheet.resume = null;
    sheet.anim = {
      path,
      table,
      duration: this.tuning.turnDuration * share,
      elapsed: 0,
      complete,
      cameraStart: sheet.cameraX,
      cameraEnd: complete ? sheet.cameraTo : sheet.cameraFrom,
      lastTime: null,
    };
    sheet.measure = {
      startedAt: now(),
      renders: 0,
      callbacks: 0,
      firstRenderAt: 0,
      lastRenderAt: 0,
      worstGap: 0,
      submit: 0,
      travels: [],
      lastPose: null,
    };
    this.queue.setCeiling(PRIORITY.VISIBLE);
    this.ensurePages();
    this.invalidate();
  }

  /** Animate from the held pose to completion or back to rest. */
  private settleSheet(sheet: SheetActivity, complete: boolean): void {
    const from = sheet.fold.active
      ? { x: sheet.fold.targetX, y: sheet.fold.targetY }
      : { x: sheet.grab.u, y: sheet.grab.v };
    this.animateSheet(sheet, settlePath(from, pathEnd(sheet.grab, complete)), complete, "");
  }

  private finishMeasure(sheet: SheetActivity): void {
    const m = sheet.measure;
    if (!m || m.renders === 0) return;
    const travels = m.travels;
    this.lastTurn = {
      renders: m.renders,
      callbacks: m.callbacks,
      firstRenderMs: m.firstRenderAt - m.startedAt,
      spanMs: m.lastRenderAt - m.firstRenderAt,
      worstGapMs: m.worstGap,
      worstTravel: travels.length ? Math.max(...travels) : 0,
      meanTravel: travels.length ? travels.reduce((sum, value) => sum + value, 0) / travels.length : 0,
      submitMs: m.submit,
    };
  }

  private releaseTurnWork(): void {
    this.queue.setCeiling(PRIORITY.BACKGROUND);
    this.ensurePages();
  }

  private commitSheet(sheet: SheetActivity): void {
    this.finishMeasure(sheet);
    this.activity = IDLE;
    this.page = clampPage(sheet.targetPage, this.pageCount);
    this.releaseTurnWork();
    this.emitPageChange();
    this.events.onView?.();
    this.invalidate();
    for (const waiter of sheet.waiters) waiter.resolve(this.result("completed"));
  }

  private cancelSheet(sheet: SheetActivity | null = this.activity.kind === "sheet" ? this.activity : null): void {
    if (!sheet) return;
    if (this.activity === sheet) this.activity = IDLE;
    this.releaseTurnWork();
    this.events.onView?.();
    this.invalidate();
    for (const waiter of sheet.waiters) waiter.resolve(this.result("cancelled"));
  }

  /** Bring whatever is in flight to its natural end immediately. */
  private finishActivity(): void {
    const activity = this.activity;
    if (activity.kind === "sheet") {
      if (activity.phase === "anim" && activity.anim?.complete) this.commitSheet(activity);
      else this.cancelSheet(activity);
      if (this.press?.kind === "drag") this.press.kind = "done";
    } else if (activity.kind === "focus" || activity.kind === "slide") {
      this.activity = IDLE;
      this.page = clampPage(activity.targetPage, this.pageCount);
      this.emitPageChange();
      this.ensurePages();
      this.events.onView?.();
      for (const waiter of activity.waiters) waiter.resolve(this.result("completed"));
    }
  }

  /** Drop whatever is in flight without changing the page. */
  private abortActivity(): void {
    const activity = this.activity;
    if (activity.kind === "idle") return;
    this.activity = IDLE;
    if (activity.kind === "sheet") this.queue.setCeiling(PRIORITY.BACKGROUND);
    if (this.press?.kind === "drag") this.press.kind = "done";
    this.events.onView?.();
    this.invalidate();
    for (const waiter of activity.waiters) waiter.resolve(this.result("cancelled"));
  }

  /* ---------------------------------------------------------------- */
  /* Diagnostics                                                        */
  /* ---------------------------------------------------------------- */

  private clearDiagnostic(): void {
    if (!this.diagnostic) return;
    this.diagnostic = null;
    if (this.activity.kind === "sheet" && this.activity.phase === "pose") this.cancelSheet(this.activity);
  }

  private applyPose(sheet: SheetActivity, name: DiagnosticPose): void {
    const spec = DIAGNOSTIC_POSES[name];
    const { w, h } = this.layout!.page;
    sheet.grab = { u: spec.grab[0] * w, v: spec.grab[1] * h };
    this.setFold(sheet, { x: spec.target[0] * w, y: spec.target[1] * h });
    sheet.cameraX = lerp(sheet.cameraFrom, sheet.cameraTo, sheet.fold.progress);
  }

  /** Hold a named pose. Returns false when that sheet does not exist here. */
  setDiagnosticPose(name: DiagnosticPose): boolean {
    if (!isDiagnosticPose(name)) {
      throw new FlipBookError("INVALID_ARGUMENT", `Unknown diagnostic pose "${String(name)}"`);
    }
    if (this.destroyed || !this.ready || !this.layout || this.renderer.kind !== "webgl") return false;
    this.abortActivity();
    this.diagnostic = null;
    if (this.zoom !== 1) this.setZoom(1, null, false);
    const spec = DIAGNOSTIC_POSES[name];
    const plan = planTurn(spreadOfPage(this.page), spec.forward, this.pageCount, this.direction);
    if (!plan) return false;
    const target = sequentialTarget(this.page, this.pageCount, "desktop", spec.forward ? 1 : -1) ?? this.page;
    const sheet = this.beginSheet(plan, "pose", { u: 0, v: 0 }, this.mode === "mobile" ? plan.turnedPage : target);
    this.diagnostic = name;
    this.applyPose(sheet, name);
    this.invalidate();
    return true;
  }

  /** Back to the stable spread, without advancing. */
  resetPose(): void {
    this.diagnostic = null;
    this.abortActivity();
  }

  getSnapshot(): FlipBookSnapshot {
    const activity = this.activity;
    const time = now();
    const recent = this.renderTimes.filter((value) => time - value <= 1000).length;
    const textures: FlipBookSnapshot["textures"] = [];
    for (const page of this.cache.pages()) {
      const surface = this.cache.peek(page);
      if (surface) textures.push({ page, width: surface.width, height: surface.height, preview: surface.preview });
    }
    textures.sort((a, b) => a.page - b.page);
    const layout = this.layout;
    return {
      page: this.page,
      pageCount: this.pageCount,
      direction: this.direction,
      visiblePages: visiblePages(this.page, this.pageCount, this.direction, this.mode),
      mode: this.mode,
      zoom: this.zoom,
      pan: [this.panX, this.panY],
      diagnostic: this.diagnostic,
      turnProgress: activity.kind === "sheet" ? activity.fold.progress : 0,
      state: activity.kind === "sheet" ? activity.phase : activity.kind,
      sheet:
        activity.kind === "sheet"
          ? {
              forward: activity.plan.forward,
              side: activity.plan.restSide,
              grab: [activity.fold.grabU, activity.fold.grabV],
              target: [activity.fold.targetX, activity.fold.targetY],
              lift: activity.fold.grabZ,
              clamped: activity.fold.clamped,
            }
          : null,
      view: layout
        ? {
            pageWidth: layout.page.w * layout.pxPerWorld,
            pageHeight: layout.page.h * layout.pxPerWorld,
            cameraX: this.baseCameraX(),
            cameraDistance: layout.cameraDistance,
          }
        : null,
      renderCount: this.renderCount,
      renderRate: recent,
      lastTurn: this.lastTurn,
      sourceGeneration: this.generation,
      rendererMode: this.renderer.kind,
      rasterMode: this.source?.rasterMode ?? "none",
      rasterNote: (this.source as { rasterNote?: string | null } | null)?.rasterNote ?? null,
      transportMode: this.source?.transportMode ?? "none",
      effectiveRasterScale: layout ? this.rasterTarget(true).height / Math.max(1, pageCssHeight(layout)) : 0,
      effectivePixelRatio: this.pixelRatio,
      textures,
      activeWork: { running: this.queue.runningLabel, queued: this.queue.queued },
      cache: this.cache.stats(),
      ready: this.ready,
    };
  }

  /** Draw a fresh frame and encode it. Rejects with CAPTURE_FAILED. */
  capturePng(): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const fail = (cause?: unknown) =>
        reject(new FlipBookError("CAPTURE_FAILED", "The reader could not be captured as an image", { cause }));
      if (this.destroyed || !this.layout) {
        fail();
        return;
      }
      try {
        // The drawing buffer is not preserved, so draw and read in one task.
        this.draw();
        this.canvas.toBlob((blob) => (blob ? resolve(blob) : fail()), "image/png");
      } catch (error) {
        fail(error);
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Frames                                                             */
  /* ---------------------------------------------------------------- */

  invalidate(): void {
    this.needsDraw = true;
    if (this.frameHandle || this.destroyed) return;
    this.frameHandle = requestAnimationFrame(this.onFrame);
  }

  private onFrame = (time: number) => {
    this.frameHandle = 0;
    if (this.destroyed) return;
    this.callbackCount++;
    const animating = this.advance(time);
    if (this.needsDraw) this.draw();
    if (animating) {
      this.needsDraw = true;
      this.frameHandle = requestAnimationFrame(this.onFrame);
    }
  };

  /** Step every running animation. Returns true while any is still running. */
  private advance(time: number): boolean {
    let running = false;

    const zoomAnim = this.zoomAnim;
    if (zoomAnim) {
      const delta = zoomAnim.lastTime === null ? 0 : time - zoomAnim.lastTime;
      zoomAnim.lastTime = time;
      zoomAnim.elapsed += Math.min(delta, 50);
      const t = clamp(zoomAnim.elapsed / zoomAnim.duration, 0, 1);
      this.applyZoom(lerp(zoomAnim.from, zoomAnim.to, smooth(t)), zoomAnim.anchor);
      if (t >= 1) this.zoomAnim = null;
      else running = true;
    }

    const activity = this.activity;
    if (activity.kind === "sheet") {
      if (activity.measure) activity.measure.callbacks++;
      if (activity.phase === "anim" && activity.anim) {
        running = this.advanceSheet(activity, activity.anim, time) || running;
      } else if (activity.phase === "hover") {
        running = this.advanceHover(activity, time) || running;
      }
    } else if (activity.kind === "focus" || activity.kind === "slide") {
      const delta = activity.lastTime === null ? 0 : time - activity.lastTime;
      activity.lastTime = time;
      if (delta > 0) this.clock.observe(delta);
      activity.elapsed += this.clock.advance(delta, activity.duration, this.tuning.minimumTurnFrames);
      if (activity.elapsed >= activity.duration) this.finishActivity();
      else running = true;
      this.events.onView?.();
    }
    return running;
  }

  private advanceSheet(sheet: SheetActivity, anim: SheetAnimation, time: number): boolean {
    const delta = anim.lastTime === null ? 0 : time - anim.lastTime;
    anim.lastTime = time;
    if (delta > 0) this.clock.observe(delta);
    anim.elapsed += this.clock.advance(delta, anim.duration, this.tuning.minimumTurnFrames);
    const t = clamp(anim.elapsed / anim.duration, 0, 1);
    const fraction = timingRamp(t);
    const tau = tauForFraction(anim.table, fraction);
    this.setFold(sheet, anim.path(tau));
    sheet.cameraX = lerp(anim.cameraStart, anim.cameraEnd, fraction);
    if (t >= 1) {
      if (anim.complete) this.commitSheet(sheet);
      else this.cancelSheet(sheet);
      return false;
    }
    return true;
  }

  private advanceHover(sheet: SheetActivity, time: number): boolean {
    const delta = sheet.hoverLastTime === null ? 16 : Math.min(50, time - sheet.hoverLastTime);
    sheet.hoverLastTime = time;
    const rate = delta / 130;
    const before = sheet.hoverStrength;
    sheet.hoverStrength = clamp(before + (sheet.hoverGoal === 1 ? rate : -rate), 0, 1);
    this.applyHover(sheet);
    if (sheet.hoverGoal === 0 && sheet.hoverStrength <= 0) {
      this.cancelSheet(sheet);
      return false;
    }
    return sheet.hoverStrength !== sheet.hoverGoal;
  }

  /**
   * Pose the hover preview: the corner eases toward the pointer and, at full
   * strength, sits exactly under it. The corner is lifted off the page, so
   * the pointer is read on the plane at the corner's own height; pressing
   * then takes over this very pose with nothing left to correct.
   */
  private applyHover(sheet: SheetActivity): void {
    const strength = smooth(sheet.hoverStrength);
    let z = sheet.fold.active ? sheet.fold.grabZ : 0;
    for (let pass = 0; pass < 3; pass++) {
      const pointer = this.pointerLocal(sheet, sheet.hoverPoint.x, sheet.hoverPoint.y, z, sheet.cameraX);
      this.setFold(sheet, {
        x: lerp(sheet.grab.u, pointer.x, strength),
        y: lerp(sheet.grab.v, pointer.y, strength),
      });
      const next = sheet.fold.active ? sheet.fold.grabZ : 0;
      if (Math.abs(next - z) < 1e-5) break;
      z = next;
    }
  }

  private buildFrame(): FrameState | null {
    const layout = this.layout;
    if (!layout) return null;
    const { w } = layout.page;
    const activity = this.activity;
    const current = spreadSides(spreadOfPage(this.page), this.pageCount, this.direction);
    let left = this.slot(current.left);
    let right = this.slot(current.right);
    let sheetFrame: FrameState["sheet"] = null;
    let slide: SlideFrame | null = null;
    let bookLeft = current.left !== null ? -w : 0;
    let bookRight = current.right !== null ? w : 0;
    let seamVisible = this.spine.visible && current.left !== null && current.right !== null;

    if (activity.kind === "sheet") {
      const { plan } = activity;
      const under = this.slot(plan.underPage);
      const landing = this.slot(plan.landingPage);
      if (plan.restSide === "right") {
        right = under;
        left = landing;
      } else {
        left = under;
        right = landing;
      }
      sheetFrame = {
        side: activity.side,
        fold: activity.fold,
        rest: this.slot(plan.restPage),
        turned: this.slot(plan.turnedPage),
      };
      const after = spreadSides(plan.toSpread, this.pageCount, this.direction);
      // The shadow under the book follows the paper: it grows onto an empty
      // side only once the sheet is over it, and leaves a side early.
      const progress = activity.fold.progress;
      const grow = smooth(clamp((progress - 0.7) / 0.3, 0, 1));
      const shrink = smooth(clamp(progress / 0.6, 0, 1));
      const edge = (from: number, to: number) => lerp(from, to, Math.abs(to) > Math.abs(from) ? grow : shrink);
      bookLeft = edge(bookLeft, after.left !== null ? -w : 0);
      bookRight = edge(bookRight, after.right !== null ? w : 0);
      seamVisible = this.spine.visible;
    } else if (activity.kind === "slide") {
      const t = smooth(clamp(activity.elapsed / activity.duration, 0, 1));
      const next = spreadSides(spreadOfPage(activity.targetPage), this.pageCount, this.direction);
      const distance = 0.32 * w;
      slide = {
        outgoingOffset: -activity.direction * distance * t,
        outgoingOpacity: 1 - t,
        incomingOffset: activity.direction * distance * (1 - t),
        incomingOpacity: t,
        incomingLeft: this.slot(next.left),
        incomingRight: this.slot(next.right),
      };
    }

    return {
      layout,
      camera: this.camera(),
      left,
      right,
      sheet: sheetFrame,
      slide,
      seam: { visible: seamVisible, cssWidth: this.spine.width, color: this.spine.color },
      shadowOpacity: this.tuning.shadowOpacity,
      contain: this.options.pageSizing === "per-page",
      meshQuality: this.tuning.meshQuality,
      bookLeft,
      bookRight,
    };
  }

  private draw(): void {
    this.needsDraw = false;
    if (this.destroyed) return;
    const frame = this.buildFrame();
    if (!frame) return;
    const started = now();
    this.renderer.render(frame);
    const finished = now();
    this.renderCount++;
    this.renderTimes.push(finished);
    if (this.renderTimes.length > 240) this.renderTimes.splice(0, this.renderTimes.length - 240);
    this.events.onRender?.();

    const activity = this.activity;
    if (activity.kind === "sheet" && activity.measure) {
      const m = activity.measure;
      if (m.renders === 0) m.firstRenderAt = finished;
      else m.worstGap = Math.max(m.worstGap, finished - m.lastRenderAt);
      m.lastRenderAt = finished;
      m.renders++;
      m.submit += finished - started;
      const pose = samplePose(activity.fold, frame.layout.page);
      if (m.lastPose) m.travels.push(poseTravel(m.lastPose, pose, frame.layout.page));
      m.lastPose = pose;
    }
  }

  /* ---------------------------------------------------------------- */
  /* Overlay geometry                                                   */
  /* ---------------------------------------------------------------- */

  /**
   * CSS rectangles of the pages that are settled and flat, relative to the
   * stage. Empty while a sheet is bent or a transition runs, so overlays hide
   * instead of drifting off the paper.
   */
  getPageRects(): Array<{ page: number; rect: CssRect; side: Side }> {
    const layout = this.layout;
    if (!layout || !this.ready || this.activity.kind !== "idle" || this.zoomAnim) return [];
    const camera = this.camera();
    const sides = spreadSides(spreadOfPage(this.page), this.pageCount, this.direction);
    const out: Array<{ page: number; rect: CssRect; side: Side }> = [];
    for (const side of ["left", "right"] as const) {
      const page = sides[side];
      if (page === null) continue;
      if (this.mode === "mobile" && page !== this.page) continue;
      out.push({ page, rect: slotRect(layout, camera, side), side });
    }
    return out;
  }

  /* ---------------------------------------------------------------- */
  /* Pointer input                                                      */
  /* ---------------------------------------------------------------- */

  private pointerPosition(event: PointerEvent | WheelEvent): { x: number; y: number } {
    const bounds = this.canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  }

  private get interactive(): boolean {
    return this.options.interactive !== false && this.ready && !!this.layout;
  }

  /** Which page side a world point is over, and how far from the binding. */
  private locate(world: { x: number; y: number }): { side: 1 | -1 | 0; depth: number } {
    const { w, h } = this.layout!.page;
    if (Math.abs(world.y) > h / 2 || Math.abs(world.x) > w) return { side: 0, depth: 0 };
    return { side: world.x >= 0 ? 1 : -1, depth: Math.abs(world.x) / w };
  }

  private planForSide(side: 1 | -1): TurnPlan | null {
    const spread = spreadOfPage(this.page);
    for (const forward of [true, false]) {
      const plan = planTurn(spread, forward, this.pageCount, this.direction);
      if (plan && sideSign(plan.restSide) === side) {
        // On a phone only the focused page can be picked up.
        if (this.mode === "mobile" && plan.restPage !== this.page) return null;
        return plan;
      }
    }
    return null;
  }

  private onPointerDown = (event: PointerEvent) => {
    if (!this.interactive) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.events.onFocusRequest?.();
    const position = this.pointerPosition(event);

    if (event.pointerType === "touch") {
      this.touches.set(event.pointerId, position);
      if (this.touches.size === 2) {
        // Two fingers: pinch. Whatever one finger had started is dropped.
        if (this.press?.kind === "drag" && this.activity.kind === "sheet") this.settleSheet(this.activity, false);
        this.press = null;
        const [a, b] = [...this.touches.values()];
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: this.getZoom() };
        return;
      }
      if (this.touches.size > 2) return;
    }
    if (this.press) return;

    try {
      this.canvas.setPointerCapture(event.pointerId);
    } catch {
      // capture is a convenience, not a requirement
    }
    const layout = this.layout!;
    const world = pointerToWorld(layout, this.camera(), position.x, position.y);
    const located = this.locate(world);
    const press: PressState = {
      id: event.pointerId,
      type: event.pointerType,
      startX: position.x,
      startY: position.y,
      x: position.x,
      y: position.y,
      kind: "pending",
      side: located.side,
      depth: located.depth,
      world,
      panStart: { x: this.panX, y: this.panY },
      samples: [],
    };
    this.press = press;

    const activity = this.activity;
    if (activity.kind === "sheet" && this.zoom <= 1) {
      if (activity.phase === "hover") {
        // Take over the previewed sheet exactly as it is.
        this.claimSheet(activity, press, null);
      } else if (activity.phase === "anim" && activity.anim) {
        this.claimSheet(activity, press, { complete: activity.anim.complete });
      }
    }
  };

  /** Hold a live sheet with the pointer, from its current pose, with no jump. */
  private claimSheet(sheet: SheetActivity, press: PressState, resume: { complete: boolean } | null): void {
    sheet.phase = "drag";
    sheet.anim = null;
    sheet.resume = resume;
    sheet.measure = null;
    press.kind = "drag";
    const held = sheet.fold.active
      ? { x: sheet.fold.targetX, y: sheet.fold.targetY }
      : { x: sheet.grab.u, y: sheet.grab.v };
    const pointer = this.pointerLocal(sheet, press.x, press.y, sheet.fold.grabZ, sheet.cameraX);
    sheet.dragOffset = { x: held.x - pointer.x, y: held.y - pointer.y };
    // The view stays where it is while a caught sheet is held; the settle
    // after release finishes the slide.
    sheet.dragFrom = sheet.cameraX;
    sheet.dragKappa = 0;
    this.queue.setCeiling(PRIORITY.VISIBLE);
    this.ensurePages();
  }

  /** Pointer position in the sheet's frame, on the plane at height z. */
  private pointerLocal(sheet: SheetActivity, cssX: number, cssY: number, z: number, cameraX: number): { x: number; y: number } {
    const world = pointerToWorld(this.layout!, { x: cameraX, y: 0, zoom: this.zoom }, cssX, cssY, z);
    return { x: sheet.side * world.x, y: world.y };
  }

  /**
   * Move the held sheet so its grabbed point sits under the pointer. On a
   * phone the view slides as the sheet turns, so progress, camera and target
   * are solved together: progress follows directly from where the pointer is,
   * with no feedback from the previous frame.
   */
  private dragSheet(sheet: SheetActivity, cssX: number, cssY: number): void {
    const layout = this.layout!;
    const gu = sheet.grab.u;
    const slide = sheet.side * sheet.dragKappa * (sheet.cameraTo - sheet.dragFrom);
    // The grabbed point is lifted off the page, so the pointer is read on
    // the plane at that height. One case needs care: paper held mid-page and
    // barely pulled bows up from the binding, and its height grows with the
    // square root of the pull. Chasing that height exactly would feed on
    // itself (higher looks further out, so pull more, so higher) and the
    // sheet would leap at the first pixel. For such a bend the height is
    // taken into account gradually, over the first quarter page of pull;
    // after that, and always for a corner peel, the point is exactly under
    // the pointer.
    const heightUsed = (fold: FoldState): number => {
      if (!fold.active) return 0;
      const pull = Math.hypot(fold.grabU - fold.targetX, fold.grabV - fold.targetY);
      const settled = smooth(clamp(pull / (0.25 * layout.page.w), 0, 1));
      return fold.grabZ * (1 - fold.bend * (1 - settled));
    };
    let z = heightUsed(sheet.fold);
    for (let pass = 0; pass < 6; pass++) {
      // Pointer offset from the view centre, in world units at the grab's height.
      const offset = pointerToWorld(layout, { x: 0, y: 0, zoom: this.zoom }, cssX, cssY, z);
      const localOffset = sheet.side * offset.x + sheet.dragOffset.x;
      const denominator = 2 * gu + slide;
      const progress = denominator > 1e-6 ? clamp((gu - sheet.side * sheet.dragFrom - localOffset) / denominator, 0, 1) : 0;
      sheet.cameraX = sheet.dragFrom + sheet.dragKappa * (sheet.cameraTo - sheet.dragFrom) * progress;
      this.setFold(sheet, {
        x: sheet.side * sheet.cameraX + localOffset,
        y: offset.y + sheet.dragOffset.y,
      });
      const next = heightUsed(sheet.fold);
      if (Math.abs(next - z) < 1e-5) break;
      z = next;
    }
  }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.interactive) return;
    const position = this.pointerPosition(event);

    if (event.pointerType === "touch" && this.touches.has(event.pointerId)) {
      this.touches.set(event.pointerId, position);
      if (this.pinch && this.touches.size >= 2) {
        const [a, b] = [...this.touches.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.pinch.distance > 0) {
          this.setZoom((this.pinch.zoom * distance) / this.pinch.distance, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, false);
        }
        return;
      }
    }

    const press = this.press;
    if (!press || press.id !== event.pointerId) {
      if (event.pointerType === "mouse" && !press) this.updateHover(position);
      return;
    }
    press.x = position.x;
    press.y = position.y;

    if (press.kind === "pending") this.classifyPress(press);
    if (press.kind === "pan") {
      const scale = this.layout!.pxPerWorld * this.zoom;
      this.panX = press.panStart.x - (press.x - press.startX) / scale;
      this.panY = press.panStart.y + (press.y - press.startY) / scale;
      this.clampPan();
      this.events.onView?.();
      this.invalidate();
    } else if (press.kind === "drag" && this.activity.kind === "sheet" && this.activity.phase === "drag") {
      const sheet = this.activity;
      this.dragSheet(sheet, press.x, press.y);
      press.samples.push({ time: now(), progress: sheet.fold.progress });
      if (press.samples.length > 8) press.samples.shift();
      this.invalidate();
    }
  };

  private classifyPress(press: PressState): void {
    const side = press.side;
    const plan = side !== 0 ? this.planForSide(side) : null;
    const gesture = classifyGesture({
      dx: press.x - press.startX,
      dy: press.y - press.startY,
      slop: this.tuning.gestureSlop,
      pointerType: press.type,
      zoomed: this.zoom > 1,
      pressSide: side,
      pressDepth: press.depth,
      sideCanTurn: !!plan && this.effectiveTransition() === "curl",
    });
    switch (gesture.kind) {
      case "pending":
        return;
      case "pan":
        press.kind = "pan";
        return;
      case "scroll":
        // The browser scrolls the page; this press is over for the reader.
        press.kind = "done";
        return;
      case "drag": {
        this.clearDiagnostic();
        this.finishActivity();
        const fresh = side !== 0 ? this.planForSide(side) : null;
        if (!fresh || side === 0) {
          press.kind = "done";
          return;
        }
        const { w, h } = this.layout!.page;
        // Take hold of the paper under the pointer as it is now, not where
        // the press began: the sheet then starts flat and bends as the
        // pointer moves on, instead of bowing up by the slop distance at once.
        const under = pointerToWorld(this.layout!, this.camera(), press.x, press.y);
        const held = Math.sign(under.x) === side ? under : press.world;
        const grab = { u: clamp(Math.abs(held.x), 0, w), v: clamp(held.y, -h / 2, h / 2) };
        const target = sequentialTarget(this.page, this.pageCount, this.mode, fresh.forward ? 1 : -1) ?? this.page;
        const sheet = this.beginSheet(fresh, "drag", grab, target);
        press.kind = "drag";
        this.dragSheet(sheet, press.x, press.y);
        return;
      }
      case "flick": {
        press.kind = "done";
        // Swiping left pulls in what lies to the right, and the reverse.
        const towardSide: Side = gesture.swipe === -1 ? "right" : "left";
        const step: 1 | -1 = this.stepSide(1) === towardSide ? 1 : -1;
        void this.step(step, press.world.y > 0 ? "top" : "bottom");
      }
    }
  }

  private onPointerUp = (event: PointerEvent) => {
    this.touches.delete(event.pointerId);
    if (this.touches.size < 2) this.pinch = null;
    const press = this.press;
    if (!press || press.id !== event.pointerId) return;
    this.press = null;
    this.releaseCapture(event.pointerId);
    if (!this.interactive) return;

    if (press.kind === "pending") {
      this.handleTap(press);
      return;
    }
    if (press.kind === "drag" && this.activity.kind === "sheet" && this.activity.phase === "drag") {
      const sheet = this.activity;
      const moved = Math.hypot(press.x - press.startX, press.y - press.startY) > this.tuning.gestureSlop;
      if (!moved && sheet.resume) {
        // A press that only caught a turning sheet lets it carry on.
        this.settleSheet(sheet, sheet.resume.complete);
        this.handleTap(press);
        return;
      }
      if (!moved && !sheet.resume) {
        // A click on a previewed corner turns the page.
        this.settleSheet(sheet, true);
        return;
      }
      const samples = press.samples;
      let velocity = 0;
      if (samples.length >= 2) {
        const last = samples[samples.length - 1];
        const first = samples.find((sample) => last.time - sample.time <= 90) ?? samples[0];
        if (last.time > first.time) velocity = ((last.progress - first.progress) / (last.time - first.time)) * 1000;
      }
      this.settleSheet(sheet, releaseCompletes(sheet.fold.progress, velocity, this.tuning.releaseThreshold));
    }
  };

  private onPointerCancel = (event: PointerEvent) => {
    this.touches.delete(event.pointerId);
    if (this.touches.size < 2) this.pinch = null;
    const press = this.press;
    if (!press || press.id !== event.pointerId) return;
    this.press = null;
    this.releaseCapture(event.pointerId);
    if (press.kind === "drag" && this.activity.kind === "sheet" && this.activity.phase === "drag") {
      const sheet = this.activity;
      this.settleSheet(sheet, sheet.resume ? sheet.resume.complete : false);
    }
  };

  private onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && !this.press) this.endHover();
  };

  private releaseCapture(id: number): void {
    try {
      this.canvas.releasePointerCapture(id);
    } catch {
      // it was never captured
    }
  }

  private endPress(): void {
    const press = this.press;
    this.press = null;
    this.touches.clear();
    this.pinch = null;
    if (press) this.releaseCapture(press.id);
  }

  private handleTap(press: PressState): void {
    if (this.zoom > 1 || press.side === 0 || !this.layout) return;
    const { h } = this.layout.page;
    const corner: Corner = press.world.y > 0.15 * h ? "top" : "bottom";
    const side: Side = press.side === 1 ? "right" : "left";
    if (this.mode === "mobile") {
      const focused = sideOfPage(this.page, this.direction);
      // The sliver of the facing page, or the focused page's outer edge.
      if (side !== focused || press.depth >= 1 - TAP_EDGE_ZONE) {
        void this.step(this.stepSide(1) === side ? 1 : -1, corner);
      }
      return;
    }
    if (press.depth >= 1 - TAP_EDGE_ZONE) void this.step(this.stepSide(1) === side ? 1 : -1, corner);
  }

  /* Hover preview (desktop mouse) */

  private updateHover(position: { x: number; y: number }): void {
    const layout = this.layout;
    if (!layout) return;
    const activity = this.activity;
    const allowed =
      this.mode === "desktop" &&
      this.zoom <= 1 &&
      !this.zoomAnim &&
      !this.reducedMotion &&
      this.effectiveTransition() === "curl" &&
      (activity.kind === "idle" || (activity.kind === "sheet" && activity.phase === "hover"));
    if (!allowed) {
      if (activity.kind === "sheet" && activity.phase === "hover") this.endHover();
      return;
    }
    const world = pointerToWorld(layout, this.camera(), position.x, position.y);
    const { w, h } = layout.page;
    const zone = HOVER_CORNER_ZONE * w;
    const side: 1 | -1 = world.x >= 0 ? 1 : -1;
    const corner: Corner = world.y >= 0 ? "top" : "bottom";
    const cornerY = corner === "top" ? h / 2 : -h / 2;
    const inside = Math.abs(world.x) <= w && Math.abs(world.y) <= h / 2;
    const distance = Math.hypot(Math.abs(world.x) - w, world.y - cornerY);
    const plan = inside && distance <= zone ? this.planForSide(side) : null;

    if (!plan) {
      this.endHover();
      return;
    }
    let sheet: SheetActivity;
    if (activity.kind === "sheet") {
      if (activity.side !== side || Math.sign(activity.grab.v) !== Math.sign(cornerY)) {
        // Another corner: let this preview go and start again next move.
        this.endHover();
        return;
      }
      sheet = activity;
    } else {
      const target = sequentialTarget(this.page, this.pageCount, this.mode, plan.forward ? 1 : -1) ?? this.page;
      sheet = this.beginSheet(plan, "hover", cornerGrab(layout.page, corner), target);
    }
    sheet.hoverGoal = 1;
    sheet.hoverPoint = { x: position.x, y: position.y };
    this.hoverPointer = position;
    this.applyHover(sheet);
    this.invalidate();
  }

  private endHover(): void {
    this.hoverPointer = null;
    const activity = this.activity;
    if (activity.kind === "sheet" && activity.phase === "hover" && activity.hoverGoal !== 0) {
      activity.hoverGoal = 0;
      activity.hoverLastTime = null;
      this.invalidate();
    }
  }

  private onWheel = (event: WheelEvent) => {
    if (!this.interactive) return;
    const position = this.pointerPosition(event);
    if (event.ctrlKey || event.metaKey) {
      // Trackpad pinch and ctrl+wheel zoom about the pointer.
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * (event.deltaMode === 1 ? 0.05 : 0.0025));
      this.setZoom(this.getZoom() * factor, position, false);
      return;
    }
    if (this.zoom > 1 && this.layout) {
      // Zoomed in, the wheel pans the page instead of scrolling the host.
      event.preventDefault();
      const scale = this.layout.pxPerWorld * this.zoom;
      const unit = event.deltaMode === 1 ? 32 : 1;
      this.panX += (event.deltaX * unit) / scale;
      this.panY -= (event.deltaY * unit) / scale;
      this.clampPan();
      this.events.onView?.();
      this.invalidate();
    }
  };

  private finishZoomAnimation(): void {
    const anim = this.zoomAnim;
    if (!anim) return;
    this.zoomAnim = null;
    this.applyZoom(anim.to, anim.anchor);
  }

  /* ---------------------------------------------------------------- */
  /* Document access for the viewer                                     */
  /* ---------------------------------------------------------------- */

  get pageSource(): PageSource | null {
    return this.source;
  }

  get pages(): PageStore | null {
    return this.store;
  }

  get state() {
    return {
      ready: this.ready,
      loading: this.loading,
      error: this.error,
      page: this.page,
      pageCount: this.pageCount,
      direction: this.direction,
      mode: this.mode,
      zoom: this.getZoom(),
      visiblePages: this.ready ? visiblePages(this.page, this.pageCount, this.direction, this.mode) : [],
      turning: this.activity.kind !== "idle",
      generation: this.generation,
    };
  }

  canStep(step: 1 | -1): boolean {
    return this.ready && sequentialTarget(this.page, this.pageCount, this.mode, step) !== null;
  }

  /* ---------------------------------------------------------------- */
  /* Benchmark                                                          */
  /* ---------------------------------------------------------------- */

  async runBenchmark(durationMs = 4000, mode: BenchmarkMode = "cold"): Promise<BenchmarkResult> {
    if (mode !== "cold" && mode !== "preloaded") {
      throw new FlipBookError("INVALID_ARGUMENT", 'Benchmark mode must be "cold" or "preloaded"');
    }
    if (!this.ready || !this.layout || !this.store) {
      throw new FlipBookError("INVALID_ARGUMENT", "The reader is not ready");
    }
    this.benchmark?.cancel();
    const duration = clamp(Number.isFinite(durationMs) ? durationMs : 4000, 500, 120_000);
    const generation = this.generation;
    let stopped = false;
    this.benchmark = { cancel: () => (stopped = true) };
    const alive = () => !stopped && !this.destroyed && generation === this.generation && !!this.store;

    // State to put back afterwards.
    const saved = {
      page: this.page,
      zoom: this.getZoom(),
      panX: this.panX,
      panY: this.panY,
      diagnostic: this.diagnostic,
      reduced: this.reducedMotion,
    };
    this.resetPose();
    this.setZoom(1, null, false);
    this.reducedMotion = false;

    const store = this.store;
    const cacheStats = this.cache.stats();
    const turnsPossible = Math.max(0, Math.floor(this.pageCount / 2));
    const planned = Math.max(1, Math.min(turnsPossible, Math.ceil(duration / Math.max(180, this.tuning.turnDuration)) + 1));

    // What does an idle animation frame cost on this display?
    const baseline = await new Promise<number>((resolve) => {
      const stamps: number[] = [];
      const tick = (time: number) => {
        stamps.push(time);
        if (stamps.length < 14 && alive()) requestAnimationFrame(tick);
        else {
          const gaps = stamps.slice(1).map((value, index) => value - stamps[index]).sort((a, b) => a - b);
          resolve(gaps.length ? gaps[gaps.length >> 1] : 16.7);
        }
      };
      requestAnimationFrame(tick);
    });

    let longTasks = 0;
    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        longTasks += list.getEntries().length;
      });
      const supported = PerformanceObserver.supportedEntryTypes ?? [];
      observer.observe({ type: supported.includes("long-animation-frame") ? "long-animation-frame" : "longtask" });
    } catch {
      observer = null;
    }

    let preparationMs = 0;
    const visited = new Set<number>([this.page]);
    if (mode === "preloaded") {
      // Hold every page the run will show, at full quality, before timing starts.
      const target = this.rasterTarget(true);
      const pages: number[] = [];
      const first = spreadOfPage(this.page);
      for (let spread = first; spread <= Math.min(first + planned, Math.floor(this.pageCount / 2)); spread++) {
        if (spread * 2 >= 1 && spread * 2 <= this.pageCount) pages.push(spread * 2);
        if (spread * 2 + 1 <= this.pageCount) pages.push(spread * 2 + 1);
      }
      this.cache.setTargets(Math.max(cacheStats.entryTarget, pages.length + 4), null);
      const started = now();
      for (const page of pages) {
        if (!alive()) break;
        await store.prepare(page, target.height, PRIORITY.VISIBLE, target.maxWidth);
      }
      preparationMs = now() - started;
    } else {
      // Cold: drop everything that is not on screen so the run pays for it.
      for (const page of this.cache.pages()) if (!this.cache.isPinned(page)) this.cache.delete(page);
    }

    const turns: TurnMeasurement[] = [];
    const gaps: number[] = [];
    let gpuSync = 0;
    const preparedBefore = store.preparationMs;
    const rendersBefore = this.renderCount;
    const callbacksBefore = this.callbackCount;
    const startedAt = now();
    let direction: 1 | -1 = 1;

    while (alive() && now() - startedAt < duration) {
      if (!this.canStep(direction)) {
        direction = direction === 1 ? -1 : 1;
        if (!this.canStep(direction)) break;
      }
      this.lastTurn = null;
      const result = await this.step(direction);
      if (result.status !== "completed") break;
      visited.add(this.page);
      for (const page of visiblePages(this.page, this.pageCount, this.direction, "desktop")) visited.add(page);
      const measured = this.lastTurn as TurnMeasurement | null;
      if (measured) {
        turns.push(measured);
        gaps.push(measured.worstGapMs);
      }
      // GPU completion is synchronised between turns, never inside a frame.
      const sync = now();
      this.renderer.finish();
      gpuSync += now() - sync;
    }
    const elapsed = now() - startedAt;
    observer?.disconnect();

    const cancelledRun = !alive();
    if (!this.destroyed && generation === this.generation) {
      // Put everything back, whether the run finished or was cut short.
      this.cache.setTargets(normalizeCacheSize(this.options.cacheSize), this.options.surfaceByteTarget ?? null);
      this.onMotionChange();
      if (saved.reduced !== this.reducedMotion) this.reducedMotion = saved.reduced;
      this.goToPage(saved.page);
      this.setZoom(saved.zoom, null, false);
      this.panX = saved.panX;
      this.panY = saved.panY;
      this.clampPan();
      if (saved.diagnostic) this.setDiagnosticPose(saved.diagnostic);
      this.invalidate();
    }
    if (this.benchmark && !stopped) this.benchmark = null;

    const sorted = (values: number[]) => values.slice().sort((a, b) => a - b);
    const quantile = (values: number[], q: number) => {
      if (!values.length) return 0;
      const ordered = sorted(values);
      return ordered[Math.min(ordered.length - 1, Math.floor(q * ordered.length))];
    };
    const mean = (values: number[]) => (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0);
    const renderCounts = turns.map((turn) => turn.renders);
    const firstRenders = turns.map((turn) => turn.firstRenderMs);
    const travels = turns.map((turn) => turn.worstTravel);
    const submit = turns.map((turn) => turn.submitMs);
    const inRunPreparation = store.preparationMs - preparedBefore;
    const count = Math.max(1, turns.length);

    return {
      mode,
      turns: turns.length,
      durationMs: elapsed,
      preparationMs,
      inRunPreparationMs: inRunPreparation,
      renders: this.renderCount - rendersBefore,
      callbacks: this.callbackCount - callbacksBefore,
      rendersPerTurn: {
        min: renderCounts.length ? Math.min(...renderCounts) : 0,
        mean: mean(renderCounts),
        max: renderCounts.length ? Math.max(...renderCounts) : 0,
      },
      firstRenderMs: { mean: mean(firstRenders), worst: firstRenders.length ? Math.max(...firstRenders) : 0 },
      frameGapMs: { p50: quantile(gaps, 0.5), p95: quantile(gaps, 0.95), p99: quantile(gaps, 0.99), worst: gaps.length ? Math.max(...gaps) : 0 },
      submitMs: { mean: mean(submit), total: submit.reduce((sum, value) => sum + value, 0) },
      gpuSyncMs: gpuSync / count,
      workPerTurnMs: (inRunPreparation + submit.reduce((sum, value) => sum + value, 0) + gpuSync) / count,
      travel: { mean: mean(turns.map((turn) => turn.meanTravel)), p95: quantile(travels, 0.95), worst: travels.length ? Math.max(...travels) : 0 },
      callbackBaselineMs: baseline,
      longTasks,
      pagesVisited: visited.size,
      cancelled: cancelledRun,
      environment: {
        userAgent: navigator.userAgent,
        viewport: [this.layout?.cssWidth ?? 0, this.layout?.cssHeight ?? 0],
        devicePixelRatio: window.devicePixelRatio || 1,
        effectivePixelRatio: this.pixelRatio,
        rasterMode: this.source?.rasterMode ?? "none",
        rendererMode: this.renderer.kind,
        tuning: { ...this.tuning },
      },
    };
  }

  /* ---------------------------------------------------------------- */
  /* Teardown                                                           */
  /* ---------------------------------------------------------------- */

  /** Idempotent. Safe during loading, dragging, animation or a benchmark. */
  destroy(): void {
    if (this.destroyed) return;
    this.benchmark?.cancel();
    this.abortActivity();
    this.destroyed = true;
    this.generation++;
    this.loadAbort?.abort();
    if (this.frameHandle) cancelAnimationFrame(this.frameHandle);
    this.frameHandle = 0;
    if (this.rasterTimer) clearTimeout(this.rasterTimer);
    this.rasterTimer = null;
    this.endPress();
    if (this.webglRetry) clearTimeout(this.webglRetry);
    this.webglRetry = null;
    this.listen(this.canvasElement, false);
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.motionQuery?.removeEventListener?.("change", this.onMotionChange);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.store?.destroy();
    this.store = null;
    this.queue.destroy();
    this.source?.destroy();
    this.source = null;
    this.cache.clear();
    this.renderer.dispose();
    this.canvasElement.remove();
  }
}
