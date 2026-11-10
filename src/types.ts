/**
 * Public types. Names marked "baseline" keep the vocabulary of the earlier
 * reader (FlipBook, FlipBookSource, FlipBookHandle, src, startPage); the rest
 * are version 1 additions and are optional everywhere.
 */

export type ReadingDirection = "ltr" | "rtl";

/* ------------------------------------------------------------------------ */
/* Sources                                                                    */
/* ------------------------------------------------------------------------ */

/** Host-controlled transport options for network sources. */
export interface SourceRequestOptions {
  /** Extra request headers, or a function evaluated before each request. */
  headers?:
    | Record<string, string>
    | (() => Record<string, string> | Promise<Record<string, string>>);
  /** Fetch credentials mode. Default "same-origin". */
  credentials?: RequestCredentials;
  /** Aborting this signal cancels loading and reports a CANCELLED error. */
  signal?: AbortSignal;
  /**
   * Called when a request is refused (401/403) or a ranged asset changed
   * while it was being read. Return a fresh URL to retry once, or null to
   * fail. The reader never stores what this returns beyond the open document.
   */
  renew?: (context: {
    url: string;
    status: number;
    reason: "unauthorized" | "revision-changed";
  }) => string | null | Promise<string | null>;
}

/** Optional PDF.js data directories, self-hosted by the embedding page. */
export interface PdfAssetOptions {
  cMapUrl?: string;
  standardFontDataUrl?: string;
  wasmUrl?: string;
  iccUrl?: string;
}

export interface PdfPasswordRequest {
  reason: "required" | "incorrect";
  /** 1 for the first prompt, incremented after each wrong password. */
  attempt: number;
}

/** Baseline: `{ type: "pdf", src }`. Everything else on it is an addition. */
export interface PdfSource {
  type: "pdf";
  /**
   * A URL, a File or a Blob. A Uint8Array (addition) is copied once into a
   * Blob; the caller's buffer is never detached or modified.
   */
  src: string | File | Blob | Uint8Array;
  request?: SourceRequestOptions;
  /** Return a password, or null to cancel. Never persisted. */
  onPassword?: (request: PdfPasswordRequest) => string | null | Promise<string | null>;
  pdfAssets?: PdfAssetOptions;
  /**
   * Draw pages in the raster worker (default). Set false to draw on the main
   * thread; the reader also does this by itself when the worker cannot run.
   */
  rasterWorker?: boolean;
  /** Link shown by "Open original" and by the fallback reader. */
  originalUrl?: string;
}

/** Baseline: `{ type: "images", pages }` in reading order. */
export interface ImagesSource {
  type: "images";
  pages: Array<string | Blob | ImageBitmap>;
  request?: SourceRequestOptions;
  /**
   * Caller-owned ImageBitmaps are never closed by the reader. Set this to
   * hand them over; the reader then closes them when it is done.
   */
  transferBitmaps?: boolean;
  originalUrl?: string;
}

/** Addition: a versioned manifest, by URL or as an already parsed object. */
export interface ManifestSource {
  type: "manifest";
  manifest: string | FlipBookManifest;
  /** Base for relative resources of an in-memory manifest. */
  baseUrl?: string;
  request?: SourceRequestOptions;
  originalUrl?: string;
}

export type FlipBookSource = PdfSource | ImagesSource | ManifestSource;

/* ------------------------------------------------------------------------ */
/* Manifest (schemaVersion 1)                                                 */
/* ------------------------------------------------------------------------ */

export interface ManifestImageVariant {
  src: string;
  width: number;
  height: number;
  mime?: string;
}

export interface ManifestPage {
  number: number;
  label?: string;
  width: number;
  height: number;
  preview?: string;
  variants: ManifestImageVariant[];
  thumbnail?: string;
  text?: string;
  links?: string;
}

export interface OutlineNode {
  title: string;
  /** 1-based physical page. */
  page: number;
  children?: OutlineNode[];
}

export interface FlipBookManifest {
  schemaVersion: 1;
  id: string;
  revision: string;
  title?: string;
  language?: string;
  direction?: ReadingDirection;
  pages: ManifestPage[];
  outline?: OutlineNode[];
}

/** Normalized rectangle, 0–1 from the top-left of the final oriented page. */
export interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PageTextRun {
  /** UTF-16 offsets into `PageText.text`. */
  start: number;
  end: number;
  rects: NormalizedRect[];
  lang?: string;
  dir?: ReadingDirection;
}

export interface PageText {
  text: string;
  runs?: PageTextRun[];
  lang?: string;
  dir?: ReadingDirection;
}

export interface PageLink {
  rect: NormalizedRect;
  label: string;
  /** Exactly one of `url` (external, safe scheme) or `page` (physical). */
  url?: string;
  page?: number;
}

/* ------------------------------------------------------------------------ */
/* Events                                                                     */
/* ------------------------------------------------------------------------ */

export interface ReadyEvent {
  pageCount: number;
  /** Width divided by height of the first page. */
  pageAspect: number;
  direction: ReadingDirection;
}

export interface PageChangeEvent {
  /** Current physical page, 1-based. */
  page: number;
  pageCount: number;
  /**
   * Desktop: the real pages of the spread in physical left-to-right order
   * (an RTL spread can report [3, 2]). Mobile: only the focused page.
   */
  visiblePages: number[];
}

export type FlipBookErrorCode =
  | "INVALID_ARGUMENT"
  | "INVALID_SOURCE"
  | "EMPTY_SOURCE"
  | "LOAD_FAILED"
  | "NETWORK"
  | "RANGE_MISMATCH"
  | "PASSWORD_REQUIRED"
  | "PASSWORD_CANCELLED"
  | "INVALID_MANIFEST"
  | "UNSAFE_URL"
  | "RENDER_FAILED"
  | "CAPTURE_FAILED"
  | "WEBGL_UNAVAILABLE"
  | "CONTEXT_LOST"
  | "FULLSCREEN_FAILED"
  | "CANCELLED"
  | "DESTROYED";

/* ------------------------------------------------------------------------ */
/* Options                                                                    */
/* ------------------------------------------------------------------------ */

export interface SpineOptions {
  /** Default true. */
  visible?: boolean;
  /** CSS pixels at 1× zoom. Default 3. */
  width?: number;
  /** Default "#222a35". */
  color?: string;
}

/**
 * viewport  (baseline) mobile when the browser viewport is ≤ 760 CSS px wide
 * container mobile when the reader's own box is ≤ 760 CSS px wide
 * single    always one focused page
 * double    always a two-page spread
 */
export type LayoutPolicy = "viewport" | "container" | "single" | "double";

/** first-page (baseline): every page fills a slot shaped like page 1. */
export type PageSizing = "first-page" | "per-page";

export type TransitionKind = "curl" | "slide" | "none";

/** auto: honour prefers-reduced-motion. ignore: always animate (legacy). */
export type ReducedMotionPolicy = "auto" | "ignore";

export type ToolbarItem =
  | "previous"
  | "next"
  | "page"
  | "zoomOut"
  | "zoom"
  | "zoomIn"
  | "fitWidth"
  | "fullscreen"
  | "thumbnails"
  | "outline"
  | "search"
  | "selectText"
  | "reading"
  | "openOriginal";

export interface DeepLinkOptions {
  /**
   * Keep the page in the URL hash as `#<hashKey>=<page>`. Uses
   * history.replaceState, so it adds no history entries.
   */
  hashKey?: string;
  /** Host-managed alternative: read the page to open, if any. */
  read?: () => number | null | undefined;
  /** Host-managed alternative: called after each page change. */
  write?: (page: number) => void;
}

/** User-visible strings. Every key is optional; English is the default. */
export interface FlipBookStrings {
  reader: string;
  previousPage: string;
  nextPage: string;
  pageOf: string; // "Page {page} of {count}"
  goToPage: string;
  zoomIn: string;
  zoomOut: string;
  resetZoom: string;
  fitWidth: string;
  enterFullscreen: string;
  exitFullscreen: string;
  loading: string;
  loadingPercent: string; // "Loading… {percent}%"
  loadFailed: string;
  openOriginal: string;
  thumbnails: string;
  outline: string;
  search: string;
  searchPlaceholder: string;
  searchProgress: string; // "Searched {done} of {total} pages"
  searchNoMatches: string;
  searchPartial: string;
  searchMatchCase: string;
  searchMatchDiacritics: string;
  searchUnavailable: string;
  results: string; // "{count} results"
  selectText: string;
  readingMode: string;
  readingNoText: string;
  close: string;
  idle: string;
  fallbackNotice: string;
  passwordRequired: string;
  noOutline: string;
}

export interface FlipBookOptions {
  /** Baseline. Reloads when the object identity changes. */
  source: FlipBookSource;
  /** Baseline, default "ltr". A manifest's direction applies only when omitted. */
  direction?: ReadingDirection;
  /** Baseline, default 1. Captured when the engine mounts. */
  startPage?: number;
  showControls?: boolean;
  showFullscreen?: boolean;
  showFps?: boolean;
  preloadRadius?: number;
  cacheSize?: number;
  maxPixelRatio?: number;
  maxTextureHeight?: number;
  /** Pointer, wheel and keyboard input. Does not gate the toolbar or the handle. */
  interactive?: boolean;
  spine?: boolean | SpineOptions;
  className?: string;

  /* Additions */
  layoutPolicy?: LayoutPolicy;
  pageSizing?: PageSizing;
  transition?: TransitionKind;
  reducedMotion?: ReducedMotionPolicy;
  toolbar?: ToolbarItem[];
  strings?: Partial<FlipBookStrings>;
  /** BCP 47 tag used for number formatting and the root `lang`. */
  locale?: string;
  deepLink?: DeepLinkOptions;
  /** Target for library-owned raster bytes (CPU + estimated GPU). */
  surfaceByteTarget?: number;
  /** Initial tuning; later changes go through `setTuning`. */
  tuning?: Partial<FlipBookTuning>;
  /** Accessible name of the reader region. */
  label?: string;
  /** Force the non-curl reader even when WebGL is available. */
  renderer?: "auto" | "webgl" | "fallback";

  onReady?: (event: ReadyEvent) => void;
  onPageChange?: (event: PageChangeEvent) => void;
  onZoomChange?: (zoom: number) => void;
  /** The document could not be shown. */
  onError?: (error: Error) => void;
  /** Addition: a problem the reader recovered from (one page, fullscreen, capture). */
  onWarning?: (error: Error) => void;
}

/** React props are the options; `source` stays required. */
export type FlipBookProps = FlipBookOptions;

/* ------------------------------------------------------------------------ */
/* Tuning                                                                     */
/* ------------------------------------------------------------------------ */

export interface FlipBookTuning {
  /** × page width. Default 0.085, range 0.025–0.22. */
  curlRadius: number;
  /** Default 0.72, range 0–1. */
  cornerSag: number;
  /** × page width. Default 0.018, range 0–0.08. */
  minimumLift: number;
  /** × page height. Default 0.2, range 0.02–0.45. */
  cornerPull: number;
  /** Default 0.42, range 0–0.8. */
  shadowOpacity: number;
  /** Milliseconds. Default 620, range 180–1600. */
  turnDuration: number;
  /** Integer. Default 38, range 12–60. Smooths hitches only. */
  minimumTurnFrames: number;
  /** CSS pixels. Default 6, range 2–24. */
  gestureSlop: number;
  /** Default 0.34, range 0.15–0.8. */
  releaseThreshold: number;
  /** × page width. Default 0.075, range 0.02–0.2. */
  mobilePeek: number;
  /** Default 1.08, range 0.6–2. */
  qualityScale: number;
  /** Default 1, range 0.5–1.5. */
  meshQuality: number;
}

/* ------------------------------------------------------------------------ */
/* Diagnostics                                                                */
/* ------------------------------------------------------------------------ */

export type DiagnosticPose =
  | "forward-top-hover"
  | "forward-bottom-hover"
  | "backward-top-hover"
  | "backward-bottom-hover"
  | "forward-mid-turn"
  | "backward-mid-turn"
  | "near-spine-diagonal"
  | "extreme-low-to-high";

export type BenchmarkMode = "cold" | "preloaded";

export interface TurnMeasurement {
  /** Completed WebGL renders during the turn. */
  renders: number;
  /** requestAnimationFrame callbacks during the turn. */
  callbacks: number;
  /** Accepted action to first completed render, ms. */
  firstRenderMs: number;
  /** First to last render, ms. */
  spanMs: number;
  worstGapMs: number;
  /** Largest travel of any sampled sheet point between two renders, in page widths. */
  worstTravel: number;
  meanTravel: number;
  /** CPU time spent submitting renders, ms. Not GPU completion time. */
  submitMs: number;
}

export interface BenchmarkResult {
  mode: BenchmarkMode;
  turns: number;
  durationMs: number;
  /** Preparation of benchmark pages done before timing (preloaded mode). */
  preparationMs: number;
  /** Page preparation inside the timed run (cold mode). */
  inRunPreparationMs: number;
  renders: number;
  callbacks: number;
  rendersPerTurn: { min: number; mean: number; max: number };
  firstRenderMs: { mean: number; worst: number };
  frameGapMs: { p50: number; p95: number; p99: number; worst: number };
  submitMs: { mean: number; total: number };
  /** Mean GPU-synchronised cost per turn, measured between turns. */
  gpuSyncMs: number;
  workPerTurnMs: number;
  travel: { mean: number; p95: number; worst: number };
  /** Idle requestAnimationFrame interval measured with no engine work. */
  callbackBaselineMs: number;
  longTasks: number;
  pagesVisited: number;
  cancelled: boolean;
  environment: {
    userAgent: string;
    viewport: [number, number];
    devicePixelRatio: number;
    effectivePixelRatio: number;
    rasterMode: string;
    rendererMode: string;
    tuning: FlipBookTuning;
  };
}

export interface CacheSnapshot {
  entries: number;
  entryTarget: number;
  pinnedEntries: number;
  cpuBytes: number;
  gpuBytes: number;
  pinnedBytes: number;
  byteTarget: number | null;
  /** Bytes by which pinned content alone exceeds the byte target. */
  pinnedOverage: number;
}

export interface FlipBookSnapshot {
  page: number;
  pageCount: number;
  direction: ReadingDirection;
  visiblePages: number[];
  mode: "desktop" | "mobile";
  zoom: number;
  pan: [number, number];
  diagnostic: DiagnosticPose | null;
  /** 0 at rest, up to 1 while a sheet is held or turning. */
  turnProgress: number;
  state: string;
  /**
   * The sheet being held or turned, in page widths: the grabbed material
   * point (u from the binding, v from the page centre), where it is now, and
   * whether the pointer asked for somewhere the paper cannot reach.
   */
  sheet: {
    forward: boolean;
    side: "left" | "right";
    grab: [number, number];
    target: [number, number];
    lift: number;
    clamped: boolean;
  } | null;
  /** Size of one page in CSS pixels at 1× zoom, and the camera's x in page widths. */
  view: { pageWidth: number; pageHeight: number; cameraX: number; cameraDistance: number } | null;
  /** Completed WebGL renders since mount. */
  renderCount: number;
  /** Completed renders per second over the last second; 0 when idle. */
  renderRate: number;
  lastTurn: TurnMeasurement | null;

  /* Additions */
  sourceGeneration: number;
  rendererMode: "webgl" | "fallback";
  rasterMode: "worker" | "main" | "image" | "none";
  /** Why PDF pages are being drawn on the main thread, or null. */
  rasterNote: string | null;
  transportMode: "range" | "stream" | "blob" | "image" | "none";
  effectiveRasterScale: number;
  effectivePixelRatio: number;
  textures: Array<{ page: number; width: number; height: number; preview: boolean }>;
  activeWork: { running: string | null; queued: number };
  cache: CacheSnapshot;
  ready: boolean;
}

/* ------------------------------------------------------------------------ */
/* Imperative handle (React ref) — baseline                                   */
/* ------------------------------------------------------------------------ */

export interface FlipBookHandle {
  next(): void;
  previous(): void;
  /** Rounds, clamps to 1…pageCount and jumps. Throws on NaN or infinity. */
  goToPage(page: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  toggleFullscreen(): Promise<void>;
  setTuning(values: Partial<FlipBookTuning>): void;
  setDiagnosticPose(pose: DiagnosticPose): void;
  resetPose(): void;
  runBenchmark(durationMs?: number, mode?: BenchmarkMode): Promise<BenchmarkResult>;
  downloadPng(filename?: string): void;
  getSnapshot(): FlipBookSnapshot;
}

/* ------------------------------------------------------------------------ */
/* Search (addition)                                                          */
/* ------------------------------------------------------------------------ */

export interface SearchOptions {
  /** Default false: case is folded. */
  matchCase?: boolean;
  /**
   * Default false: combining marks are ignored, which for Hebrew means
   * niqqud and cantillation; letters stay distinct.
   */
  matchDiacritics?: boolean;
  /** Stop after this many matches. Default 500. */
  limit?: number;
}

export interface SearchMatch {
  /** 1-based physical page. */
  page: number;
  /** UTF-16 offsets into the page's original text. */
  start: number;
  end: number;
  excerpt: string;
  /** Offsets of the match inside `excerpt`. */
  excerptStart: number;
  excerptEnd: number;
  rects?: NormalizedRect[];
}

export interface SearchProgress {
  query: string;
  matches: SearchMatch[];
  indexedPages: number;
  totalPages: number;
  failedPages: number[];
  /** True only when every searchable page is accounted for. */
  complete: boolean;
  /** True when `limit` stopped the scan early. */
  truncated: boolean;
}

export interface SearchHandle {
  readonly query: string;
  /** Latest state; updated before each `onProgress` call. */
  readonly progress: SearchProgress;
  /** Resolves with the final state; a cancelled search resolves incomplete. */
  readonly done: Promise<SearchProgress>;
  cancel(): void;
}

/* ------------------------------------------------------------------------ */
/* Framework-neutral adapter (addition)                                       */
/* ------------------------------------------------------------------------ */

export type NavigationStatus = "completed" | "boundary" | "cancelled";

export interface NavigationResult {
  status: NavigationStatus;
  page: number;
}

export interface FlipbookState {
  ready: boolean;
  loading: boolean;
  /** 0–1 when the total is known, otherwise null. */
  loadProgress: number | null;
  error: Error | null;
  page: number;
  pageCount: number;
  visiblePages: number[];
  direction: ReadingDirection;
  mode: "desktop" | "mobile";
  zoom: number;
  fullscreen: boolean;
  rendererMode: "webgl" | "fallback";
  capabilities: SourceCapabilities;
}

export interface SourceCapabilities {
  text: boolean;
  links: boolean;
  outline: boolean;
  thumbnails: boolean;
  search: boolean;
  labels: boolean;
}

export interface FlipbookEventMap {
  ready: ReadyEvent;
  pagechange: PageChangeEvent;
  zoomchange: number;
  error: Error;
  warning: Error;
  statechange: FlipbookState;
  searchprogress: SearchProgress;
}

export type FlipbookCreateOptions = Omit<FlipBookOptions, "source"> & {
  source?: FlipBookSource;
};

export interface FlipbookInstance {
  /** Replace the document. Resolves once the first page is readable. */
  load(source: FlipBookSource): Promise<ReadyEvent>;
  update(options: Partial<FlipbookCreateOptions>): void;
  next(): Promise<NavigationResult>;
  previous(): Promise<NavigationResult>;
  goToPage(page: number): Promise<NavigationResult>;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  setZoom(zoom: number): void;
  fitWidth(): void;
  toggleFullscreen(): Promise<void>;
  setTuning(values: Partial<FlipBookTuning>): void;
  getTuning(): FlipBookTuning;
  setDiagnosticPose(pose: DiagnosticPose): void;
  resetPose(): void;
  runBenchmark(durationMs?: number, mode?: BenchmarkMode): Promise<BenchmarkResult>;
  /** Draws a fresh frame and resolves with the PNG. Rejects with CAPTURE_FAILED. */
  capturePng(): Promise<Blob>;
  downloadPng(filename?: string): Promise<void>;
  getSnapshot(): FlipBookSnapshot;
  getState(): FlipbookState;
  search(query: string, options?: SearchOptions, onProgress?: (progress: SearchProgress) => void): SearchHandle;
  getOutline(): Promise<OutlineNode[]>;
  getPageText(page: number): Promise<PageText | null>;
  getPageLabel(page: number): string | null;
  on<K extends keyof FlipbookEventMap>(
    event: K,
    listener: (payload: FlipbookEventMap[K]) => void,
  ): () => void;
  /** Idempotent. Safe during loading, dragging, animation or a benchmark. */
  destroy(): void;
  readonly element: HTMLElement;
}
