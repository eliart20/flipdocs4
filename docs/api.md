# API reference

All types are exported from `flipdocs4` and from `flipdocs4/core`. The React entry re-exports everything in the core entry.

## Sources

### PDF

```ts
interface PdfSource {
  type: "pdf";
  src: string | File | Blob | Uint8Array;
  request?: SourceRequestOptions;
  onPassword?: (request: { reason: "required" | "incorrect"; attempt: number }) => string | null | Promise<string | null>;
  pdfAssets?: { cMapUrl?: string; standardFontDataUrl?: string; wasmUrl?: string; iccUrl?: string };
  rasterWorker?: boolean;
  originalUrl?: string;
}
```

- **URL.** The reader first asks for one byte (`Range: bytes=0-0`). It uses byte ranges only if the answer is HTTP 206 with `Content-Range: bytes 0-0/N` and exactly one byte of body. An `Accept-Ranges` header alone is not believed. Otherwise it cancels the response and lets PDF.js load the file in the ordinary way, which may download all of it. Ranges are 256 KiB; PDF.js streaming and automatic fetching are off in range mode.
- **File or Blob.** Read with `blob.slice()`. The file is never read whole into memory.
- **Uint8Array.** Copied once into a Blob. The caller's buffer is not detached or changed.
- **`onPassword`.** Called when the document is encrypted. Return the password, or `null` to cancel (the load then fails with `PASSWORD_CANCELLED`). It is called again with `reason: "incorrect"` after a wrong one. Nothing is stored. Without this callback an encrypted PDF fails with `PASSWORD_REQUIRED`.
- **`pdfAssets`.** URLs of PDF.js data directories you host yourself, needed only for PDFs that rely on non-embedded CJK character maps, the 14 standard fonts, JPEG 2000 or ICC colour.
- **`rasterWorker: false`** draws pages on the main thread. The reader does this by itself when the worker cannot run.
- **`originalUrl`** is the link behind "Open original" and the failure message. For a URL source it defaults to the URL.

### Images

```ts
interface ImagesSource {
  type: "images";
  pages: Array<string | Blob | ImageBitmap>;
  request?: SourceRequestOptions;
  transferBitmaps?: boolean;
  originalUrl?: string;
}
```

Order is preserved. An empty array is an error (`EMPTY_SOURCE`). The first page fixes the page aspect. Images larger than the reader needs are scaled down as they are decoded.

ImageBitmaps you pass stay yours: the reader uses them and never closes them. With `transferBitmaps: true` you hand them over and the reader closes them when the source ends.

### Manifest

```ts
interface ManifestSource {
  type: "manifest";
  manifest: string | FlipBookManifest; // a URL, or an already parsed object
  baseUrl?: string;                    // what an in-memory object's relative references resolve against
  request?: SourceRequestOptions;
  originalUrl?: string;
}
```

See [The manifest format](#the-manifest-format).

### Request options

```ts
interface SourceRequestOptions {
  headers?: Record<string, string> | (() => Record<string, string> | Promise<Record<string, string>>);
  credentials?: RequestCredentials;   // default "same-origin"
  signal?: AbortSignal;               // aborting cancels loading
  renew?: (context: { url: string; status: number; reason: "unauthorized" | "revision-changed" }) =>
    string | null | Promise<string | null>;
}
```

`renew` is for URLs that expire. When a request is refused with 401 or 403 the reader calls it once and retries with the URL it returns. It is also called, with `reason: "revision-changed"`, when a ranged file changes while being read; see below.

### When a file changes mid-read

Every ranged response is checked: status 206, the offsets asked for, the same total length as the probe, the same `ETag` and `Last-Modified` when the server exposes them, and the expected byte count. If any differ the reader does not combine the bytes. It starts the document over once, with a fresh probe, and the promise returned by `load()` follows that restart. If the second attempt also fails, `onError` receives `RANGE_MISMATCH`.

## Events

| Callback | Payload |
| --- | --- |
| `onReady` | `{ pageCount, pageAspect, direction }`, once the first page can be read. `pageAspect` is width ÷ height of page 1. |
| `onPageChange` | `{ page, pageCount, visiblePages }` |
| `onZoomChange` | The zoom factor, including resets. |
| `onError` | An `Error` with a `code`. The document could not be shown. |
| `onWarning` | An `Error` with a `code`. Something failed that the reader carried on from: one page, fullscreen, a capture. |

`page` is the current physical page, counted from 1. On desktop `visiblePages` lists the real pages of the spread from left to right, so an RTL spread reports `[3, 2]`; on a phone it holds only the focused page. Blank slots never appear.

`onError` is reserved for failures that leave nothing to read, so a host may safely replace the reader with a message or a download link when it fires.

### Error codes

`INVALID_ARGUMENT`, `INVALID_SOURCE`, `EMPTY_SOURCE`, `LOAD_FAILED`, `NETWORK`, `RANGE_MISMATCH`, `PASSWORD_REQUIRED`, `PASSWORD_CANCELLED`, `INVALID_MANIFEST`, `UNSAFE_URL`, `RENDER_FAILED`, `CAPTURE_FAILED`, `WEBGL_UNAVAILABLE`, `CONTEXT_LOST`, `FULLSCREEN_FAILED`, `CANCELLED`, `DESTROYED`.

Errors are instances of `FlipBookError`, which extends `Error`.

## Pages and spreads

Page 1 is a single cover. After it, spreads hold pages 2–3, 4–5 and so on. In LTR the cover sits on the right; RTL mirrors where pages sit and which way they turn, never the printed content. A missing partner page is simply absent.

On desktop, `next()` and `previous()` move one spread and land on the lowest page of the destination spread. On a phone they move one page: within a spread the view slides, and across a spread boundary the sheet turns. At either end of the book they do nothing (the arrow gives a small bounce) and no page-change event fires.

`goToPage(page)` rounds a finite number with `Math.round`, clamps it to 1…pageCount, drops any held or diagnostic pose, and shows the destination directly. It does not animate through the pages in between. `NaN` and infinity throw `INVALID_ARGUMENT`.

A new navigation call while a turn is running finishes that turn at once and starts the next; turns do not queue up.

## The React handle

```ts
interface FlipBookHandle {
  next(): void;
  previous(): void;
  goToPage(page: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  toggleFullscreen(): Promise<void>;
  setTuning(values: Partial<FlipBookTuning>): void;
  setDiagnosticPose(pose: DiagnosticPose): void;
  resetPose(): void;
  runBenchmark(durationMs?: number, mode?: "cold" | "preloaded"): Promise<BenchmarkResult>;
  downloadPng(filename?: string): void;
  getSnapshot(): FlipBookSnapshot;
}
```

The handle works whatever `interactive` is. `downloadPng` reports a failure through `onWarning`.

## The framework-neutral instance

`createFlipbook(container, options)` returns:

```ts
interface FlipbookInstance {
  load(source): Promise<ReadyEvent>;
  update(options): void;
  next(): Promise<NavigationResult>;
  previous(): Promise<NavigationResult>;
  goToPage(page): Promise<NavigationResult>;
  zoomIn(): void; zoomOut(): void; resetZoom(): void; setZoom(zoom): void; fitWidth(): void;
  toggleFullscreen(): Promise<void>;
  setTuning(values): void; getTuning(): FlipBookTuning;
  setDiagnosticPose(pose): void; resetPose(): void;
  runBenchmark(durationMs?, mode?): Promise<BenchmarkResult>;
  capturePng(): Promise<Blob>;
  downloadPng(filename?): Promise<void>;
  getSnapshot(): FlipBookSnapshot;
  getState(): FlipbookState;
  search(query, options?, onProgress?): SearchHandle;
  getOutline(): Promise<OutlineNode[]>;
  getPageText(page): Promise<PageText | null>;
  getPageLabel(page): string | null;
  on(event, listener): () => void;   // returns the unsubscribe function
  destroy(): void;
  readonly element: HTMLElement;
}
```

Navigation promises resolve with `{ status, page }`. `status` is `"completed"`, `"boundary"` (already at that end of the book; nothing changed), or `"cancelled"` (replaced by a later call before it took effect). They do not reject for these. `goToPage` rejects only for `NaN` or infinity.

Events for `on`: `ready`, `pagechange`, `zoomchange`, `error`, `warning`, `statechange`, `searchprogress`.

`destroy()` may be called at any time, including during loading, a drag, a turn or a benchmark, and more than once. It removes everything the reader added and nothing else.

## Search

```ts
const handle = book.search("needle", { matchCase: false, matchDiacritics: false, limit: 500 }, (progress) => {
  // progress.matches, progress.indexedPages, progress.totalPages, progress.failedPages, progress.complete
});
const final = await handle.done;
handle.cancel();
```

Pages are read nearest-first, starting with the ones on screen, and matched in a worker. Text extraction waits behind page turns.

`complete` is true only when every page is accounted for (`indexedPages + failedPages.length === totalPages`). A scan that was cancelled, or stopped by `limit`, is not complete, so "no matches" should only be said when `complete` is true.

Matching folds case and runs of white space, applies Unicode normalization, drops soft hyphens, and by default ignores combining marks, which for Hebrew means vowel points and cantillation. Letters stay distinct: final forms are not folded. `matchCase` and `matchDiacritics` turn the folding off. A match never spans two pages.

Each match has the page, `start` and `end` offsets into that page's original text, an excerpt, and highlight rectangles when the text has positions. Image books without supplied text cannot be searched (`totalPages` is 0). There is no OCR.

## Tuning

`setTuning` clamps finite numbers into range, rounds integer settings, and throws for `NaN` or infinity. Changes apply at once, without remounting or losing the page.

| Setting | Default | Range | Meaning |
| --- | --- | --- | --- |
| `curlRadius` | 0.085 | 0.025–0.22 | Fold radius, × page width |
| `cornerSag` | 0.72 | 0–1 | How far the far end of a lifted sheet droops. 0 removes it exactly. |
| `minimumLift` | 0.018 | 0–0.08 | Least lift kept mid-turn, × page width |
| `cornerPull` | 0.2 | 0.02–0.45 | How far an automatic turn lifts the corner, × page height |
| `shadowOpacity` | 0.42 | 0–0.8 | Strength of the curl shading and the contact shadow |
| `turnDuration` | 620 | 180–1600 | Milliseconds |
| `minimumTurnFrames` | 38 | 12–60, integer | Limits how far one late frame may advance a turn |
| `gestureSlop` | 6 | 2–24 | CSS pixels before a press becomes a gesture |
| `releaseThreshold` | 0.34 | 0.15–0.8 | Progress past which a released sheet completes |
| `mobilePeek` | 0.075 | 0.02–0.2 | Sliver of the facing page shown on a phone, × page width |
| `qualityScale` | 1.08 | 0.6–2 | Raster sharpness multiplier |
| `meshQuality` | 1 | 0.5–1.5 | Subdivision of the turning sheet |

`minimumTurnFrames` is a smoothing control. On a display that is steadily slow, a turn still takes `turnDuration`; only an isolated long frame is cut short so the sheet does not leap. `meshQuality` never changes raster resolution, and zoom never changes the fold.

## Diagnostics

### Poses

`setDiagnosticPose(name)` holds a fixed shape, defined in material coordinates so it means the same geometry at any size: `forward-top-hover`, `forward-bottom-hover`, `backward-top-hover`, `backward-bottom-hover`, `forward-mid-turn`, `backward-mid-turn`, `near-spine-diagonal`, `extreme-low-to-high`. `resetPose()` returns to the stable spread without advancing. A pose whose sheet does not exist at the current page (a backward pose on the cover) is ignored.

### Snapshot

`getSnapshot()` returns the page, page count, direction, visible pages, layout mode, zoom and pan, the active pose, turn progress, the count of completed renders and their rate over the last second, and the measurements of the last automatic turn. It also reports the source generation, the renderer in use (`webgl` or `fallback`), where pages are drawn (`worker`, `main`, `image`) and why if not in the worker, the transport (`range`, `stream`, `blob`, `image`), the effective raster scale and pixel ratio, each cached texture's size, the work in hand, and the cache: entries, CPU bytes, estimated GPU bytes with mipmaps, pinned bytes, and by how much pinned content exceeds the byte target.

Reading the snapshot never causes a render.

### Benchmark

`runBenchmark(durationMs = 4000, mode = "cold")` turns real pages back and forth for the given time and then puts the page, zoom, pan and pose back, whether it finishes or is cancelled.

- **cold** drops every cached page that is not on screen first, so preparation happens inside the timed run (`inRunPreparationMs`).
- **preloaded** prepares every page the run will show at full quality first and reports that separately (`preparationMs`).

The result keeps these apart: completed renders and animation-frame callbacks, renders per turn, first-render latency, frame gaps (p50, p95, p99, worst), CPU time spent submitting renders, GPU completion time measured between turns (never inside a frame), work per turn, how far the sheet moved between consecutive renders, the display's own idle frame interval, and long tasks. It also records the browser, viewport, pixel ratio, raster and renderer modes and the tuning in force.

A frame rate is only meaningful next to the idle frame interval: a display capped at 32 Hz delivers 20 poses in 620 ms however fast the engine is.

## The manifest format

```json
{
  "schemaVersion": 1,
  "id": "brooklyn-directory",
  "revision": "2026-01",
  "title": "Brooklyn Directory",
  "language": "en",
  "direction": "ltr",
  "pages": [
    {
      "number": 1,
      "label": "Cover",
      "width": 1300,
      "height": 2000,
      "preview": "pages/1-small.jpg",
      "variants": [{ "src": "pages/1.jpg", "width": 1300, "height": 2000, "mime": "image/jpeg" }],
      "thumbnail": "thumbs/1.jpg",
      "text": "text/1.json",
      "links": "links/1.json"
    }
  ],
  "outline": [{ "title": "Cover", "page": 1 }]
}
```

Relative references resolve against the manifest's URL, or against `baseUrl` for an in-memory object. `id` plus `revision` name immutable content.

The manifest is refused, before any page asset is requested, if:

- `schemaVersion` is not 1;
- page numbers are not 1, 2, 3… in order, or one repeats;
- a width or height is not positive;
- a variant's aspect ratio differs from its page's by more than 1%;
- a reference does not resolve to `http:`, `https:`, `blob:` or a `data:image/…` URL;
- an outline entry points outside the book;
- the document is larger than 8 MiB or lists more than 20,000 pages.

Unknown fields are ignored, so later versions can add optional ones.

The reader shows `preview` first when there is one, then the smallest variant at least as tall as it needs. `direction` in the manifest applies only when the reader's own `direction` option is omitted.

### Text sidecar

```json
{
  "text": "Plain text of the page, in reading order.",
  "runs": [{ "start": 0, "end": 10, "rect": { "x": 0.12, "y": 0.2, "width": 0.3, "height": 0.03 }, "lang": "en", "dir": "ltr" }],
  "lang": "en"
}
```

`start` and `end` are UTF-16 offsets into `text`. Rectangles are fractions of the page, measured from its top-left corner as displayed. A run may give one `rect` or several `rects`. Runs are optional: without them search and the text view still work, without highlights. Text is always treated as text, never as markup.

### Links sidecar

```json
{ "links": [
  { "rect": { "x": 0.1, "y": 0.8, "width": 0.3, "height": 0.05 }, "label": "Contents", "page": 3 },
  { "rect": { "x": 0.6, "y": 0.8, "width": 0.3, "height": 0.05 }, "label": "Publisher", "url": "https://example.com/" }
] }
```

A link has exactly one destination: a physical `page`, or a `url` whose scheme is `http`, `https`, `mailto` or `tel`. Anything else is dropped. External links open in a new tab with `rel="noopener noreferrer"`.

PDF links and the PDF outline are read from the file and go through the same rules.

## Where the sidecar files are

```ts
import { configureAssets } from "flipdocs4/core";

configureAssets({
  rasterWorkerUrl: "/static/flipdocs/raster.worker.js",
  searchWorkerUrl: "/static/flipdocs/search.worker.js",
  pdfWorkerUrl: "/static/flipdocs/pdf.worker.min.mjs",
});
```

This is only needed when the three files are not served from beside the library. See [deployment.md](deployment.md).
