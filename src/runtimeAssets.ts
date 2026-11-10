/**
 * The three files that ship beside the library: the raster worker, the
 * search worker and the PDF.js parser worker. By default each is found
 * relative to the library module, which is what bundlers and plain
 * `<script type="module">` use both understand. A host that serves them from
 * somewhere else can point at them with `configureAssets`.
 */

export interface AssetOverrides {
  /** URL of `raster.worker.js`. */
  rasterWorkerUrl?: string | URL;
  /** URL of `search.worker.js`. */
  searchWorkerUrl?: string | URL;
  /** URL of `pdf.worker.min.mjs`. Must match the bundled PDF.js version. */
  pdfWorkerUrl?: string | URL;
}

const overrides: AssetOverrides = {};

export function configureAssets(next: AssetOverrides): void {
  Object.assign(overrides, next);
}

const absolute = (url: string | URL): string =>
  new URL(String(url), typeof document !== "undefined" ? document.baseURI : undefined).href;

/**
 * Start a module worker from a URL. A worker script on another origin cannot
 * be started directly, so it is imported from a same-origin blob instead
 * (which needs the other origin to allow the request through CORS).
 */
export function createModuleWorker(url: string | URL): Worker {
  const href = absolute(url);
  const crossOrigin = typeof location !== "undefined" && new URL(href).origin !== location.origin;
  if (!crossOrigin) return new Worker(href, { type: "module" });
  const blob = new Blob([`import ${JSON.stringify(href)};`], { type: "text/javascript" });
  const blobUrl = URL.createObjectURL(blob);
  try {
    return new Worker(blobUrl, { type: "module" });
  } finally {
    // The worker has its own reference once construction returns.
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
  }
}

export function spawnRasterWorker(): Worker {
  return overrides.rasterWorkerUrl ? createModuleWorker(overrides.rasterWorkerUrl) : __FLIPDOCS_RASTER_WORKER__;
}

export function spawnSearchWorker(): Worker {
  return overrides.searchWorkerUrl ? createModuleWorker(overrides.searchWorkerUrl) : __FLIPDOCS_SEARCH_WORKER__;
}

/** Absolute URL of the PDF.js parser worker. */
export function pdfWorkerUrl(): string {
  return absolute(overrides.pdfWorkerUrl ?? __FLIPDOCS_PDF_WORKER_URL__);
}
