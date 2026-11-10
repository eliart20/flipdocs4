# Deployment

## What ships

```
dist/
  flipdocs.js            React entry
  core.js                framework-neutral entry
  element.js             <flip-book> element and window.Flipdocs
  flipdocs.css           stylesheet
  flipdocs-*.js          shared and lazy chunks (the PDF code is lazy)
  raster.worker.js       draws PDF pages off the main thread
  search.worker.js       matches search text
  pdf.worker.min.mjs     PDF.js parser worker, same version as the bundled PDF.js
  *.d.ts                 type declarations
```

Stable import paths: `flipdocs4`, `flipdocs4/core`, `flipdocs4/element`, `flipdocs4/style.css`, `flipdocs4/pdf.worker.min.mjs`, `flipdocs4/raster-worker`, `flipdocs4/search-worker`. Chunk file names contain hashes and may change between builds; these paths do not.

The library is ES modules only.

## How the workers are found

The library refers to its three sidecar files in the one form every current bundler and browser understands:

```js
new Worker(new URL("./raster.worker.js", import.meta.url), { type: "module" })
new URL("./pdf.worker.min.mjs", import.meta.url)
```

So there is normally nothing to configure:

| Host | Result |
| --- | --- |
| Vite 5 and 7, production build | Workers and the parser are emitted as hashed assets. Tested. |
| Next.js 15, webpack (`next build`) | Same. Tested. |
| Next.js 15, Turbopack (`next dev --turbopack`) | Same. Tested. |
| No bundler | The browser resolves the files beside `core.js` or `element.js`. Tested. |

**Vite dev server.** Dependency pre-bundling copies a package into one file somewhere else, which breaks relative references. Exclude the package:

```js
// vite.config.js
export default { optimizeDeps: { exclude: ["flipdocs4"] } };
```

**Somewhere else entirely.** If the three files are served from a different place, say so once before the first reader is created:

```ts
import { configureAssets } from "flipdocs4/core";
configureAssets({ rasterWorkerUrl, searchWorkerUrl, pdfWorkerUrl });
```

A worker script on another origin is started through a same-origin wrapper, which needs that origin to allow the request through CORS. `pdfWorkerUrl` must point at the `pdf.worker.min.mjs` that came with this package: PDF.js refuses a parser of a different version.

### If a worker cannot run

- **Raster worker missing, blocked, or the browser lacks worker canvases or fonts.** Pages are drawn on the main thread instead. The reader still works; turns may stutter while a heavy page is being drawn. `getSnapshot().rasterMode` says `"main"` and `rasterNote` says why.
- **Parser worker missing.** PDF.js parses on the thread it was started from. If the file `pdf.worker.min.mjs` cannot be loaded at all, PDFs cannot open; main-thread drawing does not help with that. Check the network tab for a 404 on that file.
- **Search worker missing.** Matching runs on the main thread.

## Serving PDFs

### Same origin

Any static server that honours `Range` requests gives partial loading. Nothing else is needed.

### Another origin (a CDN or bucket)

The browser hides response headers from scripts unless the server lists them. The reader has to read `Content-Range` to confirm that a byte range really is one, so the bucket's CORS rule must expose it:

```
Access-Control-Allow-Origin: https://your-site.example
Access-Control-Expose-Headers: Content-Range, Accept-Ranges, Content-Length, ETag
```

- Without `Content-Range` exposed, the reader cannot use ranges and downloads the whole file. It still works; a 50 MB book just takes as long as 50 MB takes.
- `ETag` (or `Last-Modified`) lets the reader notice a file replaced mid-read, and lets it reuse ranges it fetched moments earlier.
- `Range: bytes=…` is a simple header, so no preflight request is made for it.

For Cloudflare R2 that is the bucket's CORS policy:

```json
[{
  "AllowedOrigins": ["https://your-site.example"],
  "AllowedMethods": ["GET", "HEAD"],
  "AllowedHeaders": ["Range"],
  "ExposeHeaders": ["Content-Range", "Accept-Ranges", "Content-Length", "ETag"],
  "MaxAgeSeconds": 86400
}]
```

To check a URL from a terminal:

```bash
curl -s -D - -o /dev/null -H "Range: bytes=0-0" -H "Origin: https://your-site.example" "https://cdn.example/book.pdf"
```

You want `206`, `Content-Range: bytes 0-0/<size>`, and `Content-Range` named in `Access-Control-Expose-Headers`.

### What partial loading can and cannot do

How little is fetched depends on how the PDF is laid out. A file whose page tree and cross-reference data sit together (what `qpdf --linearize` or most export tools produce) opens from a handful of 256 KiB ranges. A file with a flat list of thousands of pages, or one enormous first page, needs much more before anything shows. The reader never promises a first-page time for an arbitrary PDF.

If the host downloads the whole PDF itself and passes a Blob, the network cost has already been paid; the reader then only saves memory, by slicing instead of copying.

### Preparing preview PDFs

For book samples, one JPEG per page at about 200 dpi, written with a balanced page tree and linearized last, gives small ranges and fast first pages:

```bash
qpdf --linearize in.pdf out.pdf
```

## Content Security Policy

The reader needs:

```
script-src 'self';
worker-src 'self' blob:;
connect-src 'self' https://your-pdf-host.example;
img-src 'self' blob: data: https://your-image-host.example;
style-src 'self';
font-src 'self' data:;
```

- `blob:` in `worker-src` is only needed when the worker files are on another origin.
- PDF.js is started with code generation switched off, so `'unsafe-eval'` is not required.
- `font-src data:` covers fonts embedded in PDFs.

The reader makes no requests of its own beyond the documents and images it is given and its own files. It sets no cookies, stores nothing in local storage, and sends no telemetry.

## What a document can and cannot do

- Scripts inside a PDF are never run. Launch actions and form submissions are ignored.
- Links are kept only when they point to a page in the book or to an `http`, `https`, `mailto` or `tel` address. External links open in a separate tab that cannot reach the opening page.
- Manifest text is displayed as text. It is never interpreted as HTML.
- A download or "open original" button is a convenience, not access control. Anyone who can load a file in the reader can also fetch it.

## Size

Measured after a consumer's bundler has minified it:

| Part | Minified | Gzip | When it loads |
| --- | --- | --- | --- |
| Reader, including Three.js | about 650 KB | about 170 KB | With the reader |
| Stylesheet | 10 KB | 3 KB | With the reader |
| Raster worker (PDF.js drawing code) | about 520 KB | about 180 KB | First PDF |
| PDF.js parser worker | 1.3 MB | about 400 KB | First PDF |
| Main-thread PDF fallback | about 520 KB | about 180 KB | Only if the raster worker cannot run |
| Search worker | 3 KB | 2 KB | First search |

Three.js accounts for roughly 530 KB of the reader. An image-only book loads none of the PDF parts.

Load the reader itself lazily (a dynamic import behind the button that opens it) so pages that never open a book pay nothing.

## Memory

The reader keeps one raster per cached page. Once a page is on the GPU its CPU copy is released.

- `cacheSize` (default 8) is a target for cached pages, not a ceiling: pages on screen or on the turning sheet are never evicted, so the count can briefly exceed it.
- A raster's height follows the reader's size, zoom, device pixel ratio (capped by `maxPixelRatio`) and `qualityScale`, and is capped by `maxTextureHeight` and by what the graphics card supports.
- `surfaceByteTarget` sets a byte target (for example `64 * 1024 * 1024`, or half that on low-memory devices). Past it the reader stops sharpening pages it is only preloading and evicts what is not on screen. If the visible pages alone exceed it, they are kept and the excess is reported as `cache.pinnedOverage` in the snapshot.
- Browser memory counters do not show GPU or image-decoder memory. The snapshot's `gpuBytes` is an estimate that includes mipmaps.

## Hosts

- **Give the reader a size.** It fills its container. If the container has no size yet (hidden, or still zero), the reader waits and lays itself out when it gets one; the document still reports ready.
- **Phone or desktop layout.** By default the choice follows the browser window: 760 CSS px or less means one page. A narrow reader inside a wide window therefore stays a two-page spread. Set `layoutPolicy="container"` to follow the reader's own width.
- **Server rendering.** The component needs a browser. In Next.js, import it dynamically with `ssr: false`.
- **Inside a dialog.** Focus the reader's root (`.flipdocs`) when the dialog opens so the arrow keys reach it. The React component's root is focusable from its first render.
- **Several readers on one page** are independent: separate state, shortcuts only for the one with focus.
- **Deep links** are opt-in. `deepLink: { hashKey: "page" }` keeps `#page=12` in the address without adding history entries. Nothing is written to local storage.

## Browser support

Tested: Chromium 149 on Windows, at desktop and phone viewport sizes. Not yet tested: Firefox, Safari, and real phones. See [verification.md](verification.md) for exactly what was run.

Requirements: WebGL 2 for page turns (without it the non-curl reader is used), module workers and worker canvases for off-thread drawing (without them the main thread is used), and the browsers PDF.js 5.6 legacy build supports.

If the WebGL context is lost, the reader keeps the page, zoom and direction, switches to the non-curl reader so reading continues, and returns to page turns when a context can be created again.
