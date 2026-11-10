# flipdocs4

An embeddable reader for PDF documents and ordered page images, with realistic page turns. It ships a typed React component, a framework-neutral entry point, and a `<flip-book>` element for a plain script tag.

- Pages turn as one GPU-folded sheet (Three.js and WebGL). The reader draws only when something moves and stops when it settles.
- PDFs open from byte ranges when the server allows it, so the first page does not wait for the whole file. Pages are drawn in a worker.
- LTR and RTL, desktop spreads and a single focused page on phones, zoom and pan, fullscreen, keyboard control.
- Optional extras: image manifests, thumbnails, table of contents, search, links, text selection, a plain text view, and a non-curl reader that takes over when WebGL is unavailable.

The reader displays what it is given. Choosing files, storing them, and deciding who may read them belong to the page that embeds it.

## Install

```bash
npm install github:eliart20/flipdocs4
```

The package has no runtime dependencies, and the built files are committed, so installing from GitHub runs no build. React 18 or later is a peer dependency of the React entry only.

## React

```tsx
import { useMemo, useRef } from "react";
import { FlipBook, type FlipBookHandle, type FlipBookSource } from "flipdocs4";
import "flipdocs4/style.css";

export function BookSample({ url }: { url: string }) {
  const ref = useRef<FlipBookHandle>(null);
  const source = useMemo<FlipBookSource>(() => ({ type: "pdf", src: url }), [url]);
  return (
    <div style={{ height: "min(82svh, 900px)" }}>
      <FlipBook
        ref={ref}
        source={source}
        direction="rtl"
        startPage={1}
        onPageChange={(event) => console.log(event.page, event.visiblePages)}
        onError={(error) => console.error(error)}
      />
    </div>
  );
}
```

Three rules to know:

1. **Give it a size.** The reader fills its parent. A parent with no height shows nothing.
2. **Memoize `source`.** The document reloads whenever the `source` object changes identity, even if the URL inside is the same.
3. **`startPage` is read once**, when the reader mounts. Navigate later with `ref.current.goToPage(n)`.

The component must render in the browser. In Next.js, load it with `dynamic(() => import("flipdocs4").then((m) => m.FlipBook), { ssr: false })`.

## Without React

```ts
import { createFlipbook } from "flipdocs4/core";
import "flipdocs4/style.css";

const book = createFlipbook(document.getElementById("reader")!, {
  source: { type: "pdf", src: "/books/sample.pdf" },
});
book.on("pagechange", (event) => console.log(event.page));
await book.goToPage(12);
book.destroy();
```

## From a script tag

No bundler is needed. Serve the package's `dist` folder and load one file:

```html
<script type="module" src="/vendor/flipdocs4/element.js"></script>
<flip-book src="/books/sample.pdf" direction="rtl" style="height: 80vh"></flip-book>
```

`element.js` adds the stylesheet beside it, defines `<flip-book>`, and puts the framework-neutral API on `window.Flipdocs`.

## Sources

```ts
// A PDF: a URL, a File, a Blob, or bytes.
{ type: "pdf", src: "/books/sample.pdf" }

// Page images, in reading order: URLs, Blobs or ImageBitmaps.
{ type: "images", pages: ["/p/1.jpg", "/p/2.jpg"] }

// A manifest: a light page list, with images and text loaded on demand.
{ type: "manifest", manifest: "/books/directory/manifest.json" }
```

An image book never downloads the PDF code. See [docs/api.md](docs/api.md) for request headers, credentials, URL renewal, the password callback and the manifest format.

## Reading direction

The reader uses the `direction` you give it and defaults to `"ltr"`. It does not guess from a PDF. If you want books to open the right way round, ask the file first:

```ts
import { detectPdfDirection } from "flipdocs4";

const direction = await detectPdfDirection(url); // "rtl" for /ViewerPreferences /Direction /R2L
```

The check never rejects; a file that cannot be read gives `"ltr"` (or the `fallback` you pass). It uses the same byte-range transport as the reader, and the ranges it fetches are reused when the reader opens the same file moments later. `direction` can also change after the book is open without reloading it.

## Options

| Option | Default | Notes |
| --- | --- | --- |
| `source` | required | Reloads when the object identity changes. |
| `direction` | `"ltr"` | May change at runtime. A manifest's own direction applies only when this is omitted. |
| `startPage` | `1` | Read once at mount. |
| `showControls` | `true` | The built-in toolbar. |
| `showFullscreen` | `true` | Fullscreen button, where the browser allows it. |
| `showFps` | `false` | Badge with completed renders per second, or "idle". |
| `preloadRadius` | `2` | Nearby pages to prepare ahead. |
| `cacheSize` | `8` | Target number of cached pages, minimum 4. Pages on screen are never evicted. |
| `maxPixelRatio` | `2` | Ceiling on device pixel ratio. |
| `maxTextureHeight` | `4096` | Ceiling on raster height in pixels. |
| `interactive` | `true` | Pointer, wheel and keyboard. The toolbar and the handle keep working when false. |
| `spine` | visible, 3 px, `#222a35` | `false`, or `{ visible, width, color }`. |
| `className` | | Extra class on the root. |
| `layoutPolicy` | `"viewport"` | `"viewport"` uses one page when the browser window is 760 px wide or less. `"container"` measures the reader's own box instead. `"single"` and `"double"` force a mode. |
| `pageSizing` | `"first-page"` | `"per-page"` fits each page inside its slot without distortion. |
| `transition` | `"curl"` | `"slide"` or `"none"`. |
| `reducedMotion` | `"auto"` | Honours the system setting with instant page changes. `"ignore"` always animates. |
| `toolbar` | baseline items | Array of items; add `"thumbnails"`, `"outline"`, `"search"`, `"selectText"`, `"reading"`, `"fitWidth"`, `"openOriginal"`. |
| `deepLink` | | `{ hashKey }` keeps the page in the URL hash, or supply `read` and `write`. |
| `surfaceByteTarget` | | Target for raster memory, in bytes. |
| `strings`, `locale`, `label` | English | Every visible string can be replaced. |

A static preview needs `interactive={false}` **and** `showControls={false}`; `interactive` alone leaves the toolbar live.

## Controls

| Key | LTR | RTL |
| --- | --- | --- |
| Right / Left arrow | next / previous | previous / next |
| Page Down, Space | next | next |
| Page Up | previous | previous |
| `+` or `=`, `-` | zoom in, zoom out | same |
| `0` | reset zoom | same |

Zoom runs from 0.75× to 4× in 0.25× steps. Above 1×, dragging pans. Drag an outer corner (or the outer half of a page) to turn it by hand; a tap near the outer edge turns it for you.

## The handle

`next()`, `previous()`, `goToPage(page)`, `zoomIn()`, `zoomOut()`, `resetZoom()`, `toggleFullscreen()`, `setTuning(values)`, `setDiagnosticPose(name)`, `resetPose()`, `runBenchmark(durationMs?, mode?)`, `downloadPng(filename?)`, `getSnapshot()`.

`goToPage` rounds and clamps a finite number and jumps straight there; it throws for `NaN` or infinity. The framework-neutral instance has the same methods, with navigation returning promises, plus `load`, `update`, `on`, `search`, `getState` and `destroy`.

## Serving it

Three files load beside the library: the raster worker, the search worker and the PDF.js parser worker. Bundlers pick them up by themselves. Two things are worth checking on your side:

- **Vite dev server:** add `optimizeDeps: { exclude: ["flipdocs4"] }`.
- **PDFs on another origin:** the server's CORS settings must expose `Content-Range` (and should expose `Accept-Ranges` and `ETag`). Without `Content-Range` the reader cannot confirm byte ranges and downloads the whole file instead.

Details, including Content Security Policy, are in [docs/deployment.md](docs/deployment.md).

## Documentation

- [docs/api.md](docs/api.md): sources, events, the adapter, tuning, diagnostics, the manifest format
- [docs/deployment.md](docs/deployment.md): workers, bundlers, CORS, CSP, memory, browser support
- [docs/migration-from-flipdocs3.md](docs/migration-from-flipdocs3.md): what changes for an existing flipdocs3 host
- [docs/verification.md](docs/verification.md): what has been tested, on what, and what has not

## Development

```bash
npm install
npm run dev        # workbench and fixture server on http://127.0.0.1:5184
npm run check      # typecheck, unit tests, build, dist audit, dist freshness
```

`dist` is committed. After changing anything under `src` or `build`, run `npm run check` and commit the rebuilt `dist` with the change; `npm run verify:dist` fails when the two disagree.

Browser checks run in a real, headed Chromium, because animation frames, WebGL and timing mean nothing in a window that is not painted. They need the dev server and a Playwright install (`PLAYWRIGHT_PATH` may point at one):

```bash
node tests/browser/run-selftest.mjs    # acceptance cases against the fixture server
node tests/consumers/run.mjs           # packs the library and builds it into outside apps
node tests/browser/capture.mjs --out=captures --book="pdf:range/p40.pdf"
```

The fixture server (`build/rangeFixtures.ts`) generates PDFs and page images and imitates awkward servers: one that ignores ranges, one that lies about supporting them, one whose file changes mid-read, one whose URLs expire. Real books dropped into `demo/public/books/`, or in folders listed in `demo/books.local.json` (a JSON array of paths), appear in the workbench and are never committed.

## Status

Version 0.1.0. The package name and licence are the owner's decision and are not final; `package.json` is marked private until they are.

Bundled, at exact versions: Three.js 0.187.0 and PDF.js 5.6.205 (legacy build). Their notices are in `THIRD-PARTY-NOTICES.md`.
