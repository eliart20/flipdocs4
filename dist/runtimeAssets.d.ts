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
export declare function configureAssets(next: AssetOverrides): void;
/**
 * Start a module worker from a URL. A worker script on another origin cannot
 * be started directly, so it is imported from a same-origin blob instead
 * (which needs the other origin to allow the request through CORS).
 */
export declare function createModuleWorker(url: string | URL): Worker;
export declare function spawnRasterWorker(): Worker;
export declare function spawnSearchWorker(): Worker;
/** Absolute URL of the PDF.js parser worker. */
export declare function pdfWorkerUrl(): string;
