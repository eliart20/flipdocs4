import { FlipBookError, cancelled, isCancellation } from "../errors";
import { pdfWorkerUrl, spawnRasterWorker } from "../runtimeAssets";
import { closeImage } from "../source/decode";
import { safeExternalUrl } from "../source/manifest";
import { resolveHeaders, throwIfAborted } from "../source/pageSource";
import type { PageSource, SourceOpenContext, ThumbnailResult } from "../source/pageSource";
import type { OutlineNode, PageLink, PageText, PdfSource } from "../types";
import type {
  HostCallbacks,
  HostDocumentInfo,
  HostErrorPayload,
  HostOpenParams,
  HostRenderParams,
  HostRenderResult,
  HostTransport,
  MainReply,
  RawLink,
  WorkerMessage,
  WorkerRequest,
} from "./protocol";
import { createUrlRangeReader, probeRange } from "./rangeTransport";
import type { RangeReader } from "./rangeTransport";

/**
 * A PDF as a page source. This file runs on the main thread and never
 * imports PDF.js itself: the document lives in the raster worker, or, when
 * that cannot be used, behind a dynamic import of the same host code.
 */

const PREVIEW_HEIGHT = 512;
const WORKER_READY_TIMEOUT = 12_000;

const toError = (payload: HostErrorPayload): FlipBookError =>
  new FlipBookError(payload.code === "ENVIRONMENT" ? "RENDER_FAILED" : payload.code, payload.message);

interface Backend {
  readonly mode: "worker" | "main";
  open(params: HostOpenParams): Promise<HostDocumentInfo>;
  render(params: HostRenderParams, signal: AbortSignal): Promise<HostRenderResult>;
  text(page: number): Promise<PageText>;
  links(page: number): Promise<RawLink[]>;
  outline(): Promise<OutlineNode[]>;
  labels(): Promise<string[] | null>;
  destroy(): void;
}

class EnvironmentError extends Error {}

/** The document in the raster worker, reached by messages. */
class WorkerBackend implements Backend {
  readonly mode = "worker" as const;
  private nextId = 1;
  private readonly pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (error: unknown) => void; abandoned?: boolean }
  >();
  private dead = false;

  private constructor(
    private readonly worker: Worker,
    private readonly callbacks: HostCallbacks,
  ) {
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => this.receive(event.data);
    worker.onerror = (event) => {
      event.preventDefault?.();
      this.crash(new EnvironmentError("The raster worker stopped"));
    };
  }

  static start(callbacks: HostCallbacks, signal: AbortSignal): Promise<WorkerBackend> {
    return new Promise<WorkerBackend>((resolve, reject) => {
      let worker: Worker;
      try {
        worker = spawnRasterWorker();
      } catch (error) {
        reject(new EnvironmentError(String(error)));
        return;
      }
      const stop = (error: Error) => {
        clearTimeout(timer);
        signal.removeEventListener("abort", onAbort);
        worker.onmessage = null;
        worker.onerror = null;
        worker.terminate();
        reject(error);
      };
      const onAbort = () => stop(cancelled("Loading"));
      const timer = setTimeout(() => stop(new EnvironmentError("The raster worker did not start")), WORKER_READY_TIMEOUT);
      signal.addEventListener("abort", onAbort, { once: true });
      worker.onerror = (event) => {
        event.preventDefault?.();
        stop(new EnvironmentError("The raster worker could not be loaded"));
      };
      worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data;
        if (message.type !== "ready") return;
        if (!message.offscreenCanvas || !message.fonts) {
          stop(new EnvironmentError("This browser cannot draw PDF pages in a worker"));
          return;
        }
        clearTimeout(timer);
        signal.removeEventListener("abort", onAbort);
        resolve(new WorkerBackend(worker, callbacks));
      };
    });
  }

  private send<T>(request: Omit<WorkerRequest, "id">, transfer: Transferable[] = []): { id: number; promise: Promise<T> } {
    const id = this.nextId++;
    const promise = new Promise<T>((resolve, reject) => {
      if (this.dead) {
        reject(cancelled("PDF work"));
        return;
      }
      this.pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
      this.worker.postMessage({ ...request, id }, transfer);
    });
    return { id, promise };
  }

  private receive(message: WorkerMessage): void {
    switch (message.type) {
      case "result": {
        const entry = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (!entry || entry.abandoned) {
          // A render that was cancelled after it finished: release its bitmap.
          closeImage((message.value as HostRenderResult | null)?.image ?? null);
          return;
        }
        entry.resolve(message.value);
        return;
      }
      case "error": {
        const entry = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (!entry || entry.abandoned) return;
        entry.reject(message.error.code === "ENVIRONMENT" ? new EnvironmentError(message.error.message) : toError(message.error));
        return;
      }
      case "progress":
        this.callbacks.progress(message.loaded, message.total);
        return;
      case "fatal":
        this.callbacks.fatal(message.error);
        return;
      case "call": {
        const reply = (value: unknown, transfer: Transferable[] = []) =>
          this.post({ type: "reply", callId: message.callId, value }, transfer);
        const fail = (error: unknown) =>
          this.post({
            type: "replyError",
            callId: message.callId,
            error: {
              code: error instanceof FlipBookError ? error.code : "NETWORK",
              message: error instanceof Error ? error.message : String(error),
            },
          });
        if (message.name === "readRange") {
          this.callbacks.readRange(message.args[0], message.args[1]).then((bytes) => reply(bytes, [bytes.buffer]), fail);
        } else {
          this.callbacks.password(message.args[0], message.args[1]).then((password) => reply(password), fail);
        }
        return;
      }
      case "ready":
        return;
    }
  }

  private post(message: MainReply, transfer: Transferable[] = []): void {
    if (!this.dead) this.worker.postMessage(message, transfer);
  }

  private crash(error: Error): void {
    if (this.dead) return;
    const waiting = [...this.pending.values()];
    this.pending.clear();
    for (const entry of waiting) if (!entry.abandoned) entry.reject(error);
  }

  open(params: HostOpenParams): Promise<HostDocumentInfo> {
    return this.send<HostDocumentInfo>({ method: "open", params }).promise;
  }

  render(params: HostRenderParams, signal: AbortSignal): Promise<HostRenderResult> {
    if (signal.aborted) return Promise.reject(cancelled("Page preparation"));
    const { id, promise } = this.send<HostRenderResult>({ method: "render", params });
    return new Promise<HostRenderResult>((resolve, reject) => {
      const onAbort = () => {
        const entry = this.pending.get(id);
        if (entry) entry.abandoned = true;
        if (!this.dead) this.worker.postMessage({ id: this.nextId++, method: "cancelRender", params: { requestId: id } });
        reject(cancelled("Page preparation"));
      };
      signal.addEventListener("abort", onAbort, { once: true });
      promise.then(
        (value) => {
          signal.removeEventListener("abort", onAbort);
          resolve(value);
        },
        (error) => {
          signal.removeEventListener("abort", onAbort);
          reject(error);
        },
      );
    });
  }

  text(page: number) {
    return this.send<PageText>({ method: "text", params: { page } }).promise;
  }

  links(page: number) {
    return this.send<RawLink[]>({ method: "links", params: { page } }).promise;
  }

  outline() {
    return this.send<OutlineNode[]>({ method: "outline", params: {} }).promise;
  }

  labels() {
    return this.send<string[] | null>({ method: "labels", params: {} }).promise;
  }

  destroy(): void {
    if (this.dead) return;
    const waiting = [...this.pending.values()];
    this.pending.clear();
    for (const entry of waiting) if (!entry.abandoned) entry.reject(cancelled("PDF work"));
    try {
      this.worker.postMessage({ id: this.nextId++, method: "destroy", params: {} });
    } catch {
      // the worker is already gone
    }
    this.dead = true;
    // Give the document a moment to close its parser, then end the thread.
    setTimeout(() => this.worker.terminate(), 250);
  }
}

/** The same host on the main thread, loaded on demand. */
class MainBackend implements Backend {
  readonly mode = "main" as const;
  private nextId = 1;
  private constructor(private readonly host: import("./pdfHost").PdfHost) {}

  static async start(callbacks: HostCallbacks): Promise<MainBackend> {
    const module = await import("./pdfHost");
    return new MainBackend(new module.PdfHost(callbacks));
  }

  private async guard<T>(work: Promise<T>, phase: "open" | "render"): Promise<T> {
    try {
      return await work;
    } catch (error) {
      if (error instanceof FlipBookError) throw error;
      const module = await import("./pdfHost");
      throw toError(module.describeHostError(error, phase));
    }
  }

  open(params: HostOpenParams) {
    return this.guard(this.host.open(params), "open");
  }

  render(params: HostRenderParams, signal: AbortSignal): Promise<HostRenderResult> {
    if (signal.aborted) return Promise.reject(cancelled("Page preparation"));
    const id = this.nextId++;
    const onAbort = () => this.host.cancelRender(id);
    signal.addEventListener("abort", onAbort, { once: true });
    return this.guard(this.host.render(id, params), "render").finally(() =>
      signal.removeEventListener("abort", onAbort),
    );
  }

  text(page: number) {
    return this.guard(this.host.getText(page), "render");
  }

  links(page: number) {
    return this.guard(this.host.getLinks(page), "render");
  }

  outline() {
    return this.guard(this.host.getOutline(), "render");
  }

  labels() {
    return this.guard(this.host.getLabels(), "render");
  }

  destroy(): void {
    void this.host.destroy();
  }
}

export interface PdfPageSource extends PageSource {
  /** Set by the engine; called when the open document becomes unusable. */
  onFatal?: (error: FlipBookError) => void;
  readonly transportStats: { requests: number; bytes: number } | null;
  /** Raw /ViewerPreferences /Direction from the file, or null. Not applied by the reader. */
  readonly viewerDirection: string | null;
  /** Where PDF parsing runs. */
  readonly parserMode: "worker" | "same-thread";
  /** Why pages are drawn on the main thread, when they are. */
  readonly rasterNote: string | null;
}

export async function openPdfSource(source: PdfSource, context: SourceOpenContext): Promise<PdfPageSource> {
  const src = source.src;
  let transport: HostTransport;
  let transportMode: "range" | "stream" | "blob";
  let reader: RangeReader | null = null;

  if (typeof src === "string") {
    if (!src) throw new FlipBookError("INVALID_SOURCE", "The PDF URL is empty");
    const probe = await probeRange(src, { request: source.request, signal: context.signal });
    throwIfAborted(context.signal);
    if (probe.mode === "range") {
      reader = createUrlRangeReader(probe, { request: source.request, signal: context.signal });
      transport = { kind: "range", length: probe.length };
      transportMode = "range";
    } else {
      transport = {
        kind: "url",
        url: new URL(probe.url, document.baseURI).href,
        headers: await resolveHeaders(source.request),
        withCredentials: source.request?.credentials === "include",
      };
      transportMode = "stream";
    }
  } else if (typeof Blob !== "undefined" && src instanceof Blob) {
    transport = { kind: "blob", blob: src };
    transportMode = "blob";
  } else if (src instanceof Uint8Array) {
    // Copied once; the caller's buffer is never detached.
    transport = { kind: "blob", blob: new Blob([src as BlobPart], { type: "application/pdf" }) };
    transportMode = "blob";
  } else {
    throw new FlipBookError("INVALID_SOURCE", "A PDF source needs a URL, File, Blob or Uint8Array");
  }

  let destroyed = false;
  let fatalError: FlipBookError | null = null;
  let labels: string[] | null = null;
  let rasterNote: string | null = null;

  const result: { onFatal?: (error: FlipBookError) => void } = {};

  const callbacks: HostCallbacks = {
    readRange: (begin, end) => {
      if (!reader) return Promise.reject(new FlipBookError("LOAD_FAILED", "No range reader for this document"));
      return reader.read(begin, end);
    },
    password: async (reason, attempt) => {
      if (!source.onPassword) throw new FlipBookError("PASSWORD_REQUIRED", "This PDF needs a password");
      return source.onPassword({ reason, attempt });
    },
    progress: (loaded, total) => {
      if (!destroyed) context.onProgress(loaded, total);
    },
    fatal: (payload) => {
      if (destroyed || fatalError) return;
      fatalError = toError(payload);
      result.onFatal?.(fatalError);
    },
  };

  const params: HostOpenParams = { transport, parserWorkerUrl: pdfWorkerUrl(), pdfAssets: source.pdfAssets };

  let backend: Backend;
  let info: HostDocumentInfo;
  const openOnMain = async () => {
    const main = await MainBackend.start(callbacks);
    try {
      return { backend: main as Backend, info: await main.open(params) };
    } catch (error) {
      main.destroy();
      throw error;
    }
  };

  if (source.rasterWorker === false) {
    rasterNote = "raster worker disabled by the source";
    ({ backend, info } = await openOnMain());
  } else {
    let worker: WorkerBackend | null = null;
    try {
      worker = await WorkerBackend.start(callbacks, context.signal);
      info = await worker.open(params);
      backend = worker;
    } catch (error) {
      worker?.destroy();
      if (!(error instanceof EnvironmentError)) throw error;
      rasterNote = `raster worker unavailable: ${error.message}`;
      throwIfAborted(context.signal);
      ({ backend, info } = await openOnMain());
    }
  }
  if (context.signal.aborted) {
    backend.destroy();
    throw cancelled("Loading");
  }

  // If the worker later fails for environmental reasons, move to the main thread once.
  let switching: Promise<void> | null = null;
  const switchToMain = (): Promise<void> => {
    if (!switching) {
      switching = (async () => {
        const previous = backend;
        const opened = await openOnMain();
        backend = opened.backend;
        previous.destroy();
      })();
    }
    return switching;
  };

  const run = async <T>(work: (target: Backend) => Promise<T>): Promise<T> => {
    if (destroyed) throw cancelled("PDF work");
    if (fatalError) throw fatalError;
    if (switching) await switching;
    try {
      return await work(backend);
    } catch (error) {
      if (!(error instanceof EnvironmentError) || destroyed) throw error;
      if (backend.mode === "main") throw new FlipBookError("RENDER_FAILED", error.message);
      rasterNote = `raster worker failed: ${error.message}`;
      await switchToMain();
      return work(backend);
    }
  };

  const capabilities = {
    text: true,
    links: true,
    outline: info.hasOutline,
    thumbnails: true,
    search: true,
    labels: false,
  };

  void run((target) => target.labels()).then(
    (value) => {
      labels = value;
      if (value && value.some((label, index) => label !== String(index + 1))) capabilities.labels = true;
    },
    () => {},
  );

  const pageSource: PdfPageSource = {
    kind: "pdf",
    pageCount: info.pageCount,
    pageAspect: info.firstPage.width / info.firstPage.height,
    concurrency: 1,
    previewHeight: PREVIEW_HEIGHT,
    capabilities,
    get rasterMode() {
      return backend.mode;
    },
    transportMode,
    originalUrl: source.originalUrl ?? (typeof src === "string" ? src : undefined),
    get transportStats() {
      return reader ? reader.stats : null;
    },
    viewerDirection: info.viewerDirection,
    parserMode: info.parser,
    get rasterNote() {
      return rasterNote;
    },
    set onFatal(handler: ((error: FlipBookError) => void) | undefined) {
      result.onFatal = handler;
    },
    get onFatal() {
      return result.onFatal;
    },

    async render(request) {
      const rendered = await run((target) =>
        target.render(
          {
            page: request.page,
            height: request.height,
            maxWidth: request.maxWidth,
            maxDimension: context.maxTextureSize,
            keepPageData: request.preview,
          },
          request.signal,
        ),
      );
      if (request.signal.aborted || destroyed) {
        closeImage(rendered.image);
        throw cancelled("Page preparation");
      }
      return { image: rendered.image, width: rendered.width, height: rendered.height, owned: true, final: false };
    },

    getText(page) {
      return run((target) => target.text(page));
    },

    async getLinks(page) {
      const raw = await run((target) => target.links(page));
      const links: PageLink[] = [];
      for (const link of raw) {
        if (typeof link.page === "number" && link.page >= 1 && link.page <= info.pageCount) {
          links.push({ rect: link.rect, label: `Page ${link.page}`, page: link.page });
        } else if (link.url) {
          const url = safeExternalUrl(link.url);
          if (url) links.push({ rect: link.rect, label: url, url });
        }
      }
      return links;
    },

    getOutline() {
      return run((target) => target.outline());
    },

    getLabel(page) {
      return labels?.[page - 1] ?? null;
    },

    async getThumbnail(page, height, signal): Promise<ThumbnailResult | null> {
      try {
        const rendered = await run((target) =>
          target.render({ page, height, maxDimension: context.maxTextureSize, keepPageData: false }, signal),
        );
        return { image: rendered.image, width: rendered.width, height: rendered.height, owned: true };
      } catch (error) {
        if (isCancellation(error)) throw error;
        return null;
      }
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      backend.destroy();
    },
  };
  return pageSource;
}
