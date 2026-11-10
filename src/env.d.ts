/**
 * Build-time tokens. build/workerRefs.ts replaces each with the standard
 * `new URL("./file", import.meta.url)` form, so bundlers and browsers resolve
 * the sidecar files relative to the library itself.
 */
declare const __FLIPDOCS_RASTER_WORKER__: Worker;
declare const __FLIPDOCS_SEARCH_WORKER__: Worker;
declare const __FLIPDOCS_PDF_WORKER_URL__: URL;
