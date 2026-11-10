import {
  AnnotationMode,
  GlobalWorkerOptions,
  PDFDataRangeTransport,
  PDFWorker,
  PasswordResponses,
  Util,
  getDocument,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import type { OutlineNode, PageText, PageTextRun } from "../types";
import type {
  HostCallbacks,
  HostDocumentInfo,
  HostErrorPayload,
  HostOpenParams,
  HostRenderParams,
  HostRenderResult,
  RawLink,
} from "./protocol";
import { RANGE_CHUNK_SIZE } from "./rangeTransport";

/**
 * Everything that touches PDF.js, written to run unchanged in two places:
 * inside the raster worker (the normal case, so drawing a page never blocks
 * the page-turn animation) and on the main thread (the fallback when the
 * worker or one of the APIs it needs is missing). This module is only ever
 * reached through a dynamic import or the worker entry, so an image-only
 * book never downloads it.
 */

const IN_WORKER = typeof document === "undefined";
const HAS_OFFSCREEN = typeof OffscreenCanvas !== "undefined";

type AnyCanvas = OffscreenCanvas | HTMLCanvasElement;
type AnyContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

function makeCanvas(width: number, height: number): AnyCanvas {
  if (HAS_OFFSCREEN) return new OffscreenCanvas(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/** PDF.js scratch canvases without a DOM. */
class WorkerCanvasFactory {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(_options?: unknown) {}

  create(width: number, height: number) {
    if (width <= 0 || height <= 0) throw new Error("Invalid canvas size");
    const canvas = makeCanvas(width, height);
    return { canvas, context: canvas.getContext("2d", { willReadFrequently: true }) as AnyContext | null };
  }

  reset(entry: { canvas: AnyCanvas | null }, width: number, height: number) {
    if (!entry.canvas) throw new Error("Canvas is not specified");
    if (width <= 0 || height <= 0) throw new Error("Invalid canvas size");
    entry.canvas.width = width;
    entry.canvas.height = height;
  }

  destroy(entry: { canvas: AnyCanvas | null; context: AnyContext | null }) {
    if (!entry.canvas) return;
    entry.canvas.width = 0;
    entry.canvas.height = 0;
    entry.canvas = null;
    entry.context = null;
  }
}

/** SVG filters need a DOM; without one PDF.js uses its pixel fallbacks. */
class NoFilterFactory {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(_options?: unknown) {}
  addFilter() {
    return "none";
  }
  addHCMFilter() {
    return "none";
  }
  addAlphaFilter() {
    return "none";
  }
  addLuminosityFilter() {
    return "none";
  }
  addHighlightHCMFilter() {
    return "none";
  }
  destroy() {}
}

class CallbackRangeTransport extends PDFDataRangeTransport {
  private aborted = false;

  constructor(
    length: number,
    private readonly read: (begin: number, end: number) => Promise<Uint8Array>,
    private readonly onFailure: (error: unknown) => void,
  ) {
    super(length, null);
  }

  override requestDataRange(begin: number, end: number): void {
    this.read(begin, end).then(
      (chunk) => {
        if (!this.aborted) this.onDataRange(begin, chunk);
      },
      (error) => {
        if (!this.aborted) this.onFailure(error);
      },
    );
  }

  override abort(): void {
    this.aborted = true;
  }
}

const errorName = (error: unknown) =>
  typeof error === "object" && error !== null ? String((error as { name?: unknown }).name ?? "") : "";

export function describeHostError(error: unknown, phase: "open" | "render" | "data"): HostErrorPayload {
  if (typeof error === "object" && error !== null && "code" in error && "message" in error) {
    const payload = error as HostErrorPayload;
    if (typeof payload.code === "string") return { code: payload.code, message: String(payload.message) };
  }
  const name = errorName(error);
  const message = error instanceof Error && error.message ? error.message : String(error);
  if (name === "RenderingCancelledException" || name === "AbortException" || name === "AbortError") {
    return { code: "CANCELLED", message: "Cancelled" };
  }
  if (name === "PasswordException") return { code: "PASSWORD_REQUIRED", message: "This PDF needs a password" };
  if (name === "InvalidPDFException") return { code: "LOAD_FAILED", message: "This file is not a readable PDF" };
  if (name === "ResponseException" || name === "MissingPDFException" || name === "UnexpectedResponseException") {
    return { code: "NETWORK", message: message || "The PDF could not be downloaded" };
  }
  // A missing browser API inside the worker: the main thread should take over.
  if (IN_WORKER && (name === "ReferenceError" || name === "TypeError" || name === "NotSupportedError")) {
    return { code: "ENVIRONMENT", message };
  }
  if (phase === "open") return { code: "LOAD_FAILED", message: message || "The PDF could not be opened" };
  return { code: "RENDER_FAILED", message: message || "The page could not be drawn" };
}

interface ParserHandle {
  worker?: PDFWorker;
  port?: Worker;
  mode: "worker" | "same-thread";
  failed: Promise<never>;
  dispose(): void;
}

function startParser(url: string): ParserHandle {
  let rejectFailed: (error: unknown) => void = () => {};
  const failed = new Promise<never>((_, reject) => {
    rejectFailed = reject;
  });
  failed.catch(() => {});
  try {
    const port = new Worker(url, { type: "module" });
    const onError = (event: Event) => {
      event.preventDefault?.();
      rejectFailed({ code: "ENVIRONMENT", message: "The PDF parser worker could not be started" });
    };
    port.addEventListener("error", onError);
    const worker = new PDFWorker({ port: port as never });
    return {
      worker,
      port,
      mode: "worker",
      failed,
      dispose() {
        port.removeEventListener("error", onError);
        try {
          worker.destroy();
        } catch {
          // already gone
        }
        port.terminate();
      },
    };
  } catch {
    // No nested or module workers here: PDF.js parses on this thread instead.
    GlobalWorkerOptions.workerSrc = url;
    return { mode: "same-thread", failed, dispose() {} };
  }
}

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

export class PdfHost {
  private task: PDFDocumentLoadingTask | null = null;
  private doc: PDFDocumentProxy | null = null;
  private parser: ParserHandle | null = null;
  private readonly renders = new Map<number, RenderTask>();
  private destroyed = false;

  constructor(private readonly callbacks: HostCallbacks) {}

  async open(params: HostOpenParams): Promise<HostDocumentInfo> {
    try {
      return await this.openWith(params, startParser(params.parserWorkerUrl));
    } catch (error) {
      const described = describeHostError(error, "open");
      // The parser worker itself failed: try once with PDF.js parsing in place.
      if (described.code === "ENVIRONMENT" && this.parser?.mode === "worker" && !this.destroyed) {
        await this.closeDocument();
        GlobalWorkerOptions.workerSrc = params.parserWorkerUrl;
        const neverFails = new Promise<never>(() => {});
        return this.openWith(params, { mode: "same-thread", failed: neverFails, dispose() {} });
      }
      throw error;
    }
  }

  private async openWith(params: HostOpenParams, parser: ParserHandle): Promise<HostDocumentInfo> {
    this.parser = parser;
    const base: Record<string, unknown> = {
      rangeChunkSize: RANGE_CHUNK_SIZE,
      isEvalSupported: false,
      enableXfa: false,
      verbosity: 0,
      worker: parser.worker,
    };
    const assets = params.pdfAssets;
    if (assets?.cMapUrl) {
      base.cMapUrl = assets.cMapUrl;
      base.cMapPacked = true;
    }
    if (assets?.standardFontDataUrl) base.standardFontDataUrl = assets.standardFontDataUrl;
    if (assets?.wasmUrl) base.wasmUrl = assets.wasmUrl;
    if (assets?.iccUrl) base.iccUrl = assets.iccUrl;
    if (IN_WORKER) {
      const scope = globalThis as unknown as { fonts?: unknown };
      base.ownerDocument = {
        fonts: scope.fonts,
        createElement: (name: string) => {
          if (name === "canvas") return makeCanvas(1, 1);
          throw new Error(`Cannot create <${name}> in a worker`);
        },
      };
      base.CanvasFactory = WorkerCanvasFactory;
      base.FilterFactory = NoFilterFactory;
      base.isOffscreenCanvasSupported = true;
      // PDF.js reads document.baseURI to decide this; decide it here instead.
      base.useWorkerFetch = true;
    }

    const transport = params.transport;
    if (transport.kind === "url") {
      // A URL object, not a string: PDF.js resolves strings against
      // window.location, which a worker does not have.
      base.url = new URL(transport.url);
      base.httpHeaders = transport.headers;
      base.withCredentials = transport.withCredentials;
    } else {
      const read =
        transport.kind === "blob"
          ? async (begin: number, end: number) =>
              new Uint8Array(await transport.blob.slice(begin, end).arrayBuffer())
          : (begin: number, end: number) => this.callbacks.readRange(begin, end);
      const length = transport.kind === "blob" ? transport.blob.size : transport.length;
      base.range = new CallbackRangeTransport(length, read, (error) => this.fail(error));
      base.length = length;
      // Explicit ranges only: no speculative streaming or whole-file fetching.
      base.disableStream = true;
      base.disableAutoFetch = true;
    }

    const task = getDocument(base as Parameters<typeof getDocument>[0]);
    this.task = task;
    let attempt = 0;
    let rejectPassword: (error: unknown) => void = () => {};
    const passwordFailure = new Promise<never>((_, reject) => {
      rejectPassword = reject;
    });
    passwordFailure.catch(() => {});
    task.onPassword = (update: (password: string) => void, reason: number) => {
      attempt++;
      this.callbacks
        .password(reason === PasswordResponses.INCORRECT_PASSWORD ? "incorrect" : "required", attempt)
        .then((password) => {
          if (password === null) rejectPassword({ code: "PASSWORD_CANCELLED", message: "Password entry was cancelled" });
          else update(password);
        }, rejectPassword);
    };
    task.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
      this.callbacks.progress(loaded, total > 0 ? total : null);
    };

    const doc = await Promise.race([task.promise, parser.failed, passwordFailure]);
    this.doc = doc;
    const first = await doc.getPage(1);
    const viewport = first.getViewport({ scale: 1 });
    let hasOutline = false;
    try {
      hasOutline = ((await doc.getOutline()) ?? []).length > 0;
    } catch {
      hasOutline = false;
    }
    let viewerDirection: string | null = null;
    try {
      const preferences = (await doc.getViewerPreferences()) as { Direction?: unknown } | null;
      if (typeof preferences?.Direction === "string") viewerDirection = preferences.Direction;
    } catch {
      viewerDirection = null;
    }
    return {
      pageCount: doc.numPages,
      firstPage: { width: viewport.width, height: viewport.height },
      parser: parser.mode,
      hasOutline,
      viewerDirection,
    };
  }

  private fail(error: unknown): void {
    if (this.destroyed) return;
    this.callbacks.fatal(describeHostError(error, "data"));
  }

  private requireDoc(): PDFDocumentProxy {
    if (!this.doc || this.destroyed) throw { code: "CANCELLED", message: "The document is closed" };
    return this.doc;
  }

  async render(requestId: number, params: HostRenderParams): Promise<HostRenderResult> {
    const doc = this.requireDoc();
    const page = await doc.getPage(params.page);
    const base = page.getViewport({ scale: 1 });
    let scale = params.height / base.height;
    if (params.maxWidth) scale = Math.min(scale, params.maxWidth / base.width);
    scale = Math.min(scale, params.maxDimension / base.width, params.maxDimension / base.height);
    const width = Math.max(1, Math.round(base.width * scale));
    const height = Math.max(1, Math.round(base.height * scale));
    // Scale each axis to the rounded size so the page fills the canvas exactly.
    const viewport = page.getViewport({ scale });
    const canvas = makeCanvas(width, height);
    const context = canvas.getContext("2d", { alpha: false }) as AnyContext | null;
    if (!context) throw { code: "RENDER_FAILED", message: "A drawing surface could not be created" };

    const task = page.render({
      canvas: null,
      canvasContext: context as CanvasRenderingContext2D,
      viewport,
      intent: "display",
      annotationMode: AnnotationMode.ENABLE,
      transform: [width / viewport.width, 0, 0, height / viewport.height, 0, 0],
    });
    this.renders.set(requestId, task);
    try {
      await task.promise;
    } catch (error) {
      canvas.width = 0;
      canvas.height = 0;
      throw error;
    } finally {
      this.renders.delete(requestId);
      if (!params.keepPageData) page.cleanup();
    }
    if (this.destroyed) {
      canvas.width = 0;
      canvas.height = 0;
      throw { code: "CANCELLED", message: "The document is closed" };
    }
    const image =
      "transferToImageBitmap" in canvas ? canvas.transferToImageBitmap() : (canvas as HTMLCanvasElement);
    return { image, width, height };
  }

  cancelRender(requestId: number): void {
    this.renders.get(requestId)?.cancel();
  }

  /**
   * Plain text in reading order with one positioned run per text item.
   * Rectangles are normalized to the final oriented page (crop box and
   * rotation applied), measured from its top-left corner.
   */
  async getText(pageNumber: number): Promise<PageText> {
    const page = await this.requireDoc().getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent({ includeMarkedContent: false });
    const styles = content.styles as Record<string, { ascent?: number; descent?: number; vertical?: boolean }>;
    let text = "";
    const runs: PageTextRun[] = [];
    for (const raw of content.items) {
      const item = raw as { str?: string; dir?: string; transform?: number[]; width?: number; height?: number; fontName?: string; hasEOL?: boolean };
      if (typeof item.str !== "string") continue;
      if (item.str.length > 0 && item.transform) {
        const start = text.length;
        text += item.str;
        const rect = itemRect(item as Required<typeof item>, viewport, styles[item.fontName ?? ""]);
        if (rect && item.str.trim().length > 0) {
          const run: PageTextRun = { start, end: text.length, rects: [rect] };
          if (item.dir === "rtl" || item.dir === "ltr") run.dir = item.dir;
          runs.push(run);
        }
      }
      if (item.hasEOL) text += "\n";
    }
    const result: PageText = { text };
    if (runs.length > 0) result.runs = runs;
    if (typeof content.lang === "string" && content.lang) result.lang = content.lang;
    return result;
  }

  async getLinks(pageNumber: number): Promise<RawLink[]> {
    const doc = this.requireDoc();
    const page = await doc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const annotations = (await page.getAnnotations({ intent: "display" })) as Array<{
      subtype?: string;
      rect?: number[];
      url?: string;
      dest?: unknown;
    }>;
    const links: RawLink[] = [];
    for (const annotation of annotations) {
      if (annotation.subtype !== "Link" || !Array.isArray(annotation.rect)) continue;
      const [x1, y1, x2, y2] = viewport.convertToViewportRectangle(annotation.rect) as number[];
      const rect = {
        x: clamp01(Math.min(x1, x2) / viewport.width),
        y: clamp01(Math.min(y1, y2) / viewport.height),
        width: Math.abs(x2 - x1) / viewport.width,
        height: Math.abs(y2 - y1) / viewport.height,
      };
      if (!(rect.width > 0) || !(rect.height > 0)) continue;
      if (typeof annotation.url === "string") {
        links.push({ rect, url: annotation.url });
      } else if (annotation.dest) {
        const target = await this.resolveDestination(annotation.dest);
        if (target !== null) links.push({ rect, page: target });
      }
    }
    return links;
  }

  private async resolveDestination(dest: unknown): Promise<number | null> {
    const doc = this.requireDoc();
    try {
      const explicit = typeof dest === "string" ? await doc.getDestination(dest) : dest;
      if (!Array.isArray(explicit) || explicit.length === 0) return null;
      const ref = explicit[0];
      if (Number.isInteger(ref)) return (ref as number) + 1;
      if (ref && typeof ref === "object") return (await doc.getPageIndex(ref)) + 1;
      return null;
    } catch {
      return null;
    }
  }

  async getOutline(): Promise<OutlineNode[]> {
    const doc = this.requireDoc();
    const root = (await doc.getOutline()) ?? [];
    let budget = 20000;
    const convert = async (
      items: Array<{ title: string; dest: unknown; items?: unknown[] }>,
      depth: number,
    ): Promise<OutlineNode[]> => {
      const out: OutlineNode[] = [];
      for (const item of items) {
        if (budget-- <= 0) break;
        const children =
          depth < 16 && Array.isArray(item.items) && item.items.length > 0
            ? await convert(item.items as never, depth + 1)
            : [];
        let page = item.dest ? await this.resolveDestination(item.dest) : null;
        // A heading without its own target still leads to its first child.
        if (page === null && children.length > 0) page = children[0].page;
        if (page === null) continue;
        const node: OutlineNode = { title: String(item.title ?? "").trim() || `Page ${page}`, page };
        if (children.length > 0) node.children = children;
        out.push(node);
      }
      return out;
    };
    return convert(root as never, 0);
  }

  async getLabels(): Promise<string[] | null> {
    try {
      return await this.requireDoc().getPageLabels();
    } catch {
      return null;
    }
  }

  private async closeDocument(): Promise<void> {
    for (const task of this.renders.values()) task.cancel();
    this.renders.clear();
    const task = this.task;
    this.task = null;
    this.doc = null;
    try {
      await task?.destroy();
    } catch {
      // closing is best effort
    }
    this.parser?.dispose();
    this.parser = null;
  }

  async destroy(): Promise<void> {
    if (this.destroyed) return;
    this.destroyed = true;
    await this.closeDocument();
  }
}

function itemRect(
  item: { transform: number[]; width: number; height: number },
  viewport: { transform: number[]; width: number; height: number },
  style: { ascent?: number; descent?: number; vertical?: boolean } | undefined,
) {
  const m = Util.transform(viewport.transform, item.transform) as number[];
  const fontHeight = Math.hypot(m[2], m[3]);
  if (!(fontHeight > 0)) return null;
  const angle = Math.atan2(m[1], m[0]);
  const ascent = style?.ascent ?? 0.8;
  const descent = style?.descent ?? -0.2;
  // Advance along the baseline and the font's extent across it.
  const advance = style?.vertical ? item.height : item.width;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const up = fontHeight * ascent;
  const down = fontHeight * descent;
  const corners: Array<[number, number]> = [
    [0, -up],
    [advance, -up],
    [advance, -down],
    [0, -down],
  ];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [along, across] of corners) {
    const x = m[4] + along * cos - across * sin;
    const y = m[5] + along * sin + across * cos;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const x = clamp01(minX / viewport.width);
  const y = clamp01(minY / viewport.height);
  const width = clamp01(maxX / viewport.width) - x;
  const height = clamp01(maxY / viewport.height) - y;
  if (!(width > 0) || !(height > 0)) return null;
  return { x, y, width, height };
}
