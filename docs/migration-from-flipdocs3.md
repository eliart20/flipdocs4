# Moving a host from flipdocs3 to flipdocs4

flipdocs4 was written from the specification, not from the flipdocs3 source, and keeps flipdocs3's public vocabulary. For a host that mounts `<FlipBook>` with a source and a direction, the change is the package name.

## What to change

```diff
- import { FlipBook, type FlipBookSource } from "flipdocs3";
- import "flipdocs3/style.css";
+ import { FlipBook, type FlipBookSource } from "flipdocs4";
+ import "flipdocs4/style.css";
```

```diff
  // package.json
- "flipdocs3": "github:eliart20/flipdocs3",
+ "flipdocs4": "github:eliart20/flipdocs4",
```

```diff
  // Vite config (dev server only)
- optimizeDeps: { exclude: ["flipdocs3"] }
+ optimizeDeps: { exclude: ["flipdocs4"] }
```

If the host's bundler config copies a hashed raster-worker file into its public folder, delete that step. flipdocs4 refers to its workers by relative URL, and bundlers emit them without help.

## What stays the same

- Names: `FlipBook`, `FlipBookProps`, `FlipBookSource`, `FlipBookHandle`, `ReadingDirection`, `ReadyEvent`, `src`, `startPage`.
- Sources: `{ type: "pdf", src: string | File | Blob }` and `{ type: "images", pages: [...] }`.
- Defaults: direction `"ltr"`, `startPage` 1, controls and fullscreen shown, `preloadRadius` 2, `cacheSize` 8, `maxPixelRatio` 2, `maxTextureHeight` 4096, interactive, spine 3 px `#222a35`.
- Behaviour:
  - the document reloads when the `source` object changes identity;
  - `startPage` is read once at mount;
  - phone layout follows the browser window at 760 px;
  - `interactive={false}` leaves the toolbar and the handle working;
  - zoom is 0.75×–4× in 0.25× steps;
  - `goToPage` rounds, clamps and jumps.
- Tuning names, defaults and ranges.
- The root element has the class `flipdocs` and is focusable.
- ES modules only; React 18 or later.

## What is different

**`onError` means the document cannot be shown.** A single page that fails to draw, a refused fullscreen request or a failed capture goes to the new `onWarning` instead. A host that replaces the reader with a message when `onError` fires is therefore safe.

**Reduced motion is honoured by default.** A visitor whose system asks for reduced motion gets instant page changes instead of curls. Pass `reducedMotion="ignore"` to animate regardless, as flipdocs3 did.

**The reader is one DOM tree in both React and non-React use.** Class names inside the root begin with `flipdocs__`. A host that styled flipdocs3's internal class names needs to restyle; the supported way to theme is the custom properties on `.flipdocs` (`--flipdocs-bar`, `--flipdocs-accent`, and the rest at the top of `style.css`).

**Direction detection no longer needs the whole file.** flipdocs3 hosts typically downloaded the PDF, parsed it with another library to read `/ViewerPreferences /Direction`, and passed a Blob. That paid for the full download before the first page. Replace it with:

```ts
import { detectPdfDirection } from "flipdocs4";

const direction = await detectPdfDirection(url); // never rejects; "ltr" when unknown
// then: <FlipBook source={{ type: "pdf", src: url }} direction={direction} />
```

and pass the URL as the source, so the reader can use byte ranges. The other library is no longer needed for this.

**A source built inline reloads on every render.** This was already true; it is worth fixing while you are here:

```diff
- <FlipBook source={{ type: "pdf", src: url }} />
+ const source = useMemo(() => ({ type: "pdf" as const, src: url }), [url]);
+ <FlipBook source={source} />
```

## Not verified against flipdocs3

The handle's method names are the same. Their return types were written from the specification: navigation, zoom, tuning, pose and `downloadPng` return nothing; `toggleFullscreen` and `runBenchmark` return promises; `getSnapshot` returns the snapshot. They have not been compared with flipdocs3's published declarations. A host that awaits or chains one of these should check it compiles.

The snapshot and benchmark result contain everything the specification lists and more; field names inside them may differ from flipdocs3's.

## New, and off unless you ask

Manifest sources, `Uint8Array` PDFs, URL renewal and request headers, a password callback, thumbnails, outline, search, links, text selection, the text view, `layoutPolicy`, `pageSizing`, `transition`, deep links, a byte target for memory, `createFlipbook` and `<flip-book>`. None of them changes what an existing host sees until it opts in. The default toolbar is the baseline set: previous, page, zoom out, zoom, zoom in, fullscreen, next.
