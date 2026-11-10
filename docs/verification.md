# What has been verified

This records what was run, on what, and what was not. Numbers are measurements on one machine, not promises for others.

## Environment

- Date: 9–10 November 2026
- Machine: one Windows 11 development PC
- Browser: Chromium 149.0.7827.55 (Playwright 1.61.1), headed, device pixel ratio 1; phone-sized runs emulate 390 × 760 at pixel ratio 2 with touch
- Display cadence: an idle animation frame every 17.8 ms on this machine
- Library: three 0.187.0, pdfjs-dist 5.6.205 (legacy build)
- Documents: generated PDFs and page images from the fixture server, and real books from a local folder (a 20-page, 4 MB Hebrew Gemara sample; a 17 MB single-page title page)

Browser checks run headed because a window that is not being painted delivers no animation frames. The window is placed off screen with occlusion throttling disabled.

## How to rerun

```bash
npm run check                           # typecheck, unit tests, build, dist audit
npm run dev                             # fixture server, needed by everything below
node tests/browser/run-selftest.mjs     # acceptance cases
node tests/browser/interaction.mjs      # real mouse and touch input
node tests/consumers/run.mjs            # pack, install into outside apps, build, open
```

## Results

| Suite | Result |
| --- | --- |
| Unit tests (`tests/*.test.ts`) | 141 pass |
| Browser acceptance cases (`demo/selftest.ts`) | 32 pass, 0 skipped |
| Real input (`tests/browser/interaction.mjs`) | 46 pass |
| Consumer builds (`tests/consumers/run.mjs`) | all pass: Vite 7 + React 19, Vite 5 + React 18, script tag with no bundler |
| Next.js 15.5.18 | opens with both workers under webpack (`next build` + `next start`) and Turbopack (`next dev --turbopack`); checked by hand with a scratch app, not part of the scripts |
| Dist audit (`build/audit-dist.mjs`) | pass |

## Acceptance cases from the specification

| Case | Covered by | Status |
| --- | --- | --- |
| AC01 sources, count, aspect, ready, empty images | selftest AC01a–c | pass |
| AC02 1, 2, 3 and longer books, LTR and RTL | selftest AC02, AC02b; unit tests for spreads and turn plans | pass. Printed text not mirrored was checked by eye in captures, not by pixel comparison. |
| AC03 hover, press, reverse, release, cancel | interaction test (desktop); selftest AC03 | pass |
| AC04 top and bottom, extreme pulls, sag, stretch | unit tests in `tests/fold.test.ts` | pass: binding fixed in every pose, no stretch without sag, under 1% at full sag, sag changes depth only, zero sag is exact |
| AC05 phone movement within and across spreads | interaction test (touch) | pass in emulation. Not run on a physical phone. |
| AC06 controls and keyboard in both directions | selftest AC06 | pass |
| AC07 zoom while pages prepare | selftest AC07 | pass |
| AC08 replace source, unmount during rasterization | selftest AC08 | pass |
| AC09 cache pressure during turns | selftest AC09; unit tests for the cache | pass |
| AC10 range-capable and range-ignoring servers | selftest AC10a, AC10b; unit tests for the probe | pass |
| AC11 large local file, image-only startup | selftest AC11a, AC11b | pass |
| AC12 raster worker unavailable | selftest AC12 | pass |
| AC13 settled reader stops drawing | selftest AC13; interaction test (held hover) | pass |
| AC14 cold and preloaded benchmarks | selftest AC14 | pass |
| AC15 build, pack, consumer builds | consumer gate; Next.js by hand | pass |
| AC16 host direction detection | selftest AC16 | pass |

## Additional gates

| Gate | Covered by | Status |
| --- | --- | --- |
| 1,324-page directory, deep link to 1,200, 200 spread changes | selftest ADD01 | pass; cache stayed within its target |
| 2,000 pages | selftest ADD02 (PDF) | pass |
| Repeated labels | selftest ADD01 checks labels from the manifest | partly: labels are read; a book with repeated labels was not built |
| Mixed dimensions, rotated PDF page | selftest ADD03 | pass |
| Container layout, two readers, zero-size embed | selftest ADD04 | pass |
| Progressive search, normalization, Hebrew | selftest ADD05; unit tests for search | pass |
| Links: safe, unsafe, internal | selftest ADD06 | pass |
| Malformed manifest | selftest ADD07; unit tests for manifests | pass |
| File changes mid-read | selftest ADD08 | pass |
| Expired URL renewal | selftest ADD09 | pass |
| Context loss | selftest ADD10 | pass: falls back, keeps the page, returns to WebGL |
| Non-curl reader, text view | selftest ADD11 | pass |
| Deep links without loops | selftest ADD12 | pass |
| 20 load and destroy cycles | selftest ADD13 | pass for canvases, workers and host DOM. Heap growth was not measured. |
| Password callback | selftest ADD14 (needs `qpdf` for the encrypted fixture) | pass |
| Delayed source races | selftest AC08 | pass |
| Selection and link alignment | links are positioned from the same layout as the pages and tested for presence and behaviour | alignment and text selection were not checked by pixel |

## Measurements

One page turn of the real 20-page sample, desktop layout, 620 ms turn:

| | |
| --- | --- |
| Completed renders | 36 |
| Action to first render | 10 ms |
| Worst gap between renders | 18.5 ms (the display's own interval is 17.8 ms) |
| CPU time submitting renders, whole turn | 4 ms |
| Sheet travel between renders | mean 0.088, worst 0.104 page widths |

Benchmark on the 40-page generated PDF (1.8 s runs): about 36 renders per turn, frame-gap p95 18.5 ms cold and 18.9 ms preloaded.

Opening the first page of a 16.5 MB generated PDF from a range-capable server: 5 requests, 876 KiB.

After settling, the render count does not change (0 renders in 1.5 s, with the badge on).

The display's cadence sets the pose count, not the engine. On a later run the same machine delivered an idle frame only every 31 ms (about 32 Hz). The same turn then drew 20 to 22 poses with a worst gap of 32.5 ms, one display interval, and the sheet moved up to 0.19 page widths between renders. One preloaded benchmark run in that state had a single 62 ms gap, two display intervals. Always read a frame count next to `callbackBaselineMs` in the benchmark result.

## Not verified

- **Other browsers.** Firefox and Safari have not been run at all.
- **Real phones.** Touch was tested through Chromium's device emulation. Nothing was run on a physical Android phone or iPhone, so real touch latency, GPU behaviour and memory limits there are unknown.
- **Assistive technology.** Controls have labels, roles and focus handling, and the text view hides the canvas from assistive technology while open. Nothing was tested with NVDA or VoiceOver, and no WCAG conformance claim is made. 200% browser zoom and narrow reflow were not checked.
- **The performance budgets in section 14 of the specification.** They call for 30 cold and 30 warm runs on named devices under a throttled network. That has not been done; the figures above are single measurements on one PC.
- **Visual regression baselines.** Poses and turns were captured and looked at. No reference images or pixel tolerances are stored yet.
- **flipdocs3 type compatibility.** The handle's return types were written from the specification and not compared with flipdocs3's declarations.
- **Production asset hosts.** Partial loading depends on the host's CORS settings; see [deployment.md](deployment.md).
- **Authenticated documents with cookies, PDFs needing CJK character maps, standard fonts or JPEG 2000.** The options exist; no fixture exercises them.
