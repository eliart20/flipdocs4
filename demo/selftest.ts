import { configureAssets, createFlipbook, detectPdfDirection } from "../src/core";
import type { FlipBookSource, FlipbookCreateOptions, FlipbookInstance, ReadyEvent } from "../src/core";

/**
 * In-browser acceptance run. Each case mounts real readers against the
 * fixture server and checks observable behaviour. Cases that need animation
 * frames are skipped when the page is not being painted (a hidden tab), and
 * say so. Results are also left on window.__selftest for automation.
 *
 * Filter with ?only=AC10,AC11 (prefix match on the case id).
 */

type Outcome = "pass" | "fail" | "skip";
interface Result {
  id: string;
  title: string;
  outcome: Outcome;
  detail: string;
  ms: number;
}

const results: Result[] = [];
const rows = document.getElementById("rows") as HTMLElement;
const stage = document.getElementById("stage") as HTMLElement;
const summary = document.getElementById("summary") as HTMLElement;
const only = (new URLSearchParams(location.search).get("only") ?? "").split(",").filter(Boolean);

class Skip extends Error {}
const skip = (reason: string): never => {
  throw new Skip(reason);
};
const assert = (condition: unknown, message: string): void => {
  if (!condition) throw new Error(message);
};
const equal = (actual: unknown, expected: unknown, label: string): void => {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a !== b) throw new Error(`${label}: expected ${b}, got ${a}`);
};
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const until = async (check: () => boolean, ms = 8000, label = "condition"): Promise<void> => {
  const started = performance.now();
  while (!check()) {
    if (performance.now() - started > ms) throw new Error(`timed out waiting for ${label}`);
    await sleep(25);
  }
};

/** Do animation frames arrive? They do not in a hidden or occluded tab. */
let painting: boolean | null = null;
async function isPainting(): Promise<boolean> {
  if (painting !== null) return painting;
  painting = await Promise.race([
    new Promise<boolean>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)))),
    sleep(600).then(() => false),
  ]);
  return painting;
}
const needsFrames = async () => {
  if (!(await isPainting())) skip("needs animation frames; this page is not being painted");
};

const mounts: HTMLElement[] = [];
function mount(width = 720, height = 480): HTMLElement {
  const node = document.createElement("div");
  node.className = "mount";
  node.style.width = `${width}px`;
  node.style.height = `${height}px`;
  stage.append(node);
  mounts.push(node);
  return node;
}

const open: FlipbookInstance[] = [];
interface Opened {
  book: FlipbookInstance;
  ready: ReadyEvent;
  errors: Error[];
  pages: number[];
  host: HTMLElement;
}
async function openBook(source: FlipBookSource, options: FlipbookCreateOptions = {}, host = mount()): Promise<Opened> {
  const errors: Error[] = [];
  const pages: number[] = [];
  const book = createFlipbook(host, {
    transition: "none",
    ...options,
    onError: (error) => {
      errors.push(error);
      options.onError?.(error);
    },
    onPageChange: (event) => {
      pages.push(event.page);
      options.onPageChange?.(event);
    },
  });
  open.push(book);
  const ready = await book.load(source);
  return { book, ready, errors, pages, host };
}

const pdf = (path: string): FlipBookSource => ({ type: "pdf", src: `/fx/pdf/${path}` });
const images = (count: number): FlipBookSource => ({
  type: "images",
  pages: Array.from({ length: count }, (_, index) => `/fx/img/${index + 1}.png?w=500&h=700`),
});
const resetLog = () => fetch("/fx/log/reset", { method: "POST" });
const readLog = async () => (await (await fetch("/fx/log")).json()) as Array<{ url: string; range: string | null; status: number; bytes: number }>;
const resources = () => performance.getEntriesByType("resource").map((entry) => entry.name);
const key = (book: FlipbookInstance, name: string) =>
  book.element.dispatchEvent(new KeyboardEvent("keydown", { key: name, bubbles: true, cancelable: true }));

const cases: Array<[string, string, () => Promise<string | void>]> = [
  [
    "AC01a",
    "PDF by URL: count, first page, aspect, ready",
    async () => {
      const { book, ready, errors } = await openBook(pdf("range/p12.pdf"));
      equal(ready.pageCount, 12, "pageCount");
      assert(Math.abs(ready.pageAspect - 432 / 648) < 1e-3, `aspect ${ready.pageAspect}`);
      equal(ready.direction, "ltr", "direction");
      equal(book.getState().page, 1, "page");
      equal(errors.length, 0, "errors");
      return `aspect ${ready.pageAspect.toFixed(4)}, raster ${book.getSnapshot().rasterMode}`;
    },
  ],
  [
    "AC01b",
    "PDF from File and Blob, and from bytes without detaching them",
    async () => {
      const bytes = new Uint8Array(await (await fetch("/fx/pdf/range/p6.pdf")).arrayBuffer());
      const blob = new Blob([bytes], { type: "application/pdf" });
      const file = new File([bytes], "book.pdf", { type: "application/pdf" });
      const a = await openBook({ type: "pdf", src: blob });
      const b = await openBook({ type: "pdf", src: file });
      const c = await openBook({ type: "pdf", src: bytes });
      equal([a.ready.pageCount, b.ready.pageCount, c.ready.pageCount], [6, 6, 6], "page counts");
      assert(bytes.byteLength > 0 && bytes[0] === 0x25, "caller bytes were detached or changed");
      equal(a.book.getSnapshot().transportMode, "blob", "transport");
    },
  ],
  [
    "AC01c",
    "Image sequence; an empty one is an error",
    async () => {
      const { ready, book } = await openBook(images(7));
      equal(ready.pageCount, 7, "pageCount");
      assert(Math.abs(ready.pageAspect - 500 / 700) < 1e-3, `aspect ${ready.pageAspect}`);
      equal(book.getSnapshot().rasterMode, "image", "raster mode");
      let code = "";
      const errors: Error[] = [];
      try {
        await openBook({ type: "images", pages: [] }, { onError: (error) => errors.push(error) });
      } catch (error) {
        code = (error as { code?: string }).code ?? "";
      }
      equal(code, "EMPTY_SOURCE", "error code");
      equal(errors.length, 1, "onError calls");
    },
  ],
  [
    "AC02",
    "1, 2, 3 and longer books place and bound pages in LTR and RTL",
    async () => {
      const seen: string[] = [];
      for (const direction of ["ltr", "rtl"] as const) {
        for (const count of [1, 2, 3, 6]) {
          const { book } = await openBook(pdf(`range/p${count}.pdf`), { direction, layoutPolicy: "double" });
          const walk: string[] = [];
          for (let guard = 0; guard < 10; guard++) {
            walk.push(book.getState().visiblePages.join("+"));
            const result = await book.next();
            if (result.status === "boundary") break;
          }
          seen.push(`${direction}${count}:${walk.join(",")}`);
          const back = await book.goToPage(1).then(() => book.previous());
          equal(back.status, "boundary", `previous at the cover (${direction}, ${count})`);
          book.destroy();
        }
      }
      equal(
        seen,
        ["ltr1:1", "ltr2:1,2", "ltr3:1,2+3", "ltr6:1,2+3,4+5,6", "rtl1:1", "rtl2:1,2", "rtl3:1,3+2", "rtl6:1,3+2,5+4,6"],
        "visible pages",
      );
    },
  ],
  [
    "AC02b",
    "goToPage rounds, clamps and rejects NaN",
    async () => {
      const { book, pages } = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "double" });
      await book.goToPage(4.6);
      equal(book.getState().page, 5, "rounded");
      await book.goToPage(999);
      equal(book.getState().page, 12, "clamped high");
      await book.goToPage(-3);
      equal(book.getState().page, 1, "clamped low");
      let code = "";
      await book.goToPage(Number.NaN).catch((error) => (code = error.code));
      equal(code, "INVALID_ARGUMENT", "NaN");
      equal(pages, [1, 5, 12, 1], "page change events");
    },
  ],
  [
    "AC06",
    "Keyboard and wings follow the reading direction",
    async () => {
      const { book } = await openBook(pdf("range/p12.pdf"), { direction: "ltr", layoutPolicy: "double" });
      const page = () => book.getState().page;
      key(book, "ArrowRight");
      equal(page(), 2, "LTR ArrowRight");
      key(book, "ArrowLeft");
      equal(page(), 1, "LTR ArrowLeft");
      key(book, "PageDown");
      key(book, " ");
      equal(page(), 4, "PageDown then Space");
      key(book, "PageUp");
      equal(page(), 2, "PageUp");
      book.update({ direction: "rtl" });
      key(book, "ArrowLeft");
      equal(page(), 4, "RTL ArrowLeft is next");
      key(book, "ArrowRight");
      equal(page(), 2, "RTL ArrowRight is previous");
      key(book, "PageDown");
      equal(page(), 4, "RTL PageDown is next");
      key(book, "+");
      equal(book.getState().zoom, 1.25, "zoom in");
      key(book, "0");
      equal(book.getState().zoom, 1, "zoom reset");
      key(book, "-");
      equal(book.getState().zoom, 0.75, "zoom out");
      key(book, "-");
      equal(book.getState().zoom, 0.75, "zoom floor");
      key(book, "0");
      const wings = book.element.querySelectorAll<HTMLButtonElement>(".flipdocs__wing");
      equal([wings[0].dataset.action, wings[1].dataset.action], ["next", "previous"], "RTL wings");
      wings[0].click();
      equal(page(), 6, "left wing in RTL is next");
      const bar = book.element.querySelector<HTMLElement>(".flipdocs__progress") as HTMLElement;
      equal(getComputedStyle(bar).justifyContent, "flex-end", "RTL progress anchors right");
      // A reader that lives inside the host's own dialog still has its keys.
      const dialog = document.createElement("div");
      dialog.setAttribute("role", "dialog");
      dialog.style.height = "100%";
      book.element.parentElement!.insertBefore(dialog, book.element);
      dialog.append(book.element);
      key(book, "ArrowLeft");
      equal(page(), 8, "keys work inside a host dialog");
      key(book, "ArrowRight");
      equal(page(), 6, "back again");
      book.update({ interactive: false });
      key(book, "ArrowLeft");
      equal(page(), 6, "keys are off when not interactive");
      wings[0].click();
      equal(page(), 8, "toolbar still works when not interactive");
    },
  ],
  [
    "AC07",
    "Zooming keeps the page and brings a sharper raster",
    async () => {
      const { book } = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "double" });
      await book.goToPage(4);
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 4 && !texture.preview), 8000, "page 4");
      const before = book.getSnapshot().textures.find((texture) => texture.page === 4)!.height;
      book.setZoom(2.5);
      equal(book.getState().page, 4, "page kept");
      assert(book.getSnapshot().textures.some((texture) => texture.page === 4), "old texture dropped before its replacement");
      await until(() => (book.getSnapshot().textures.find((texture) => texture.page === 4)?.height ?? 0) > before * 1.5, 10000, "sharper raster");
      equal(book.getState().page, 4, "page kept after upgrade");
      return `raster ${before}px → ${book.getSnapshot().textures.find((texture) => texture.page === 4)!.height}px`;
    },
  ],
  [
    "AC08",
    "Replacing the source or unmounting mid-raster leaves nothing behind",
    async () => {
      const host = mount();
      const events: string[] = [];
      const book = createFlipbook(host, {
        transition: "none",
        onReady: (event) => events.push(`ready:${event.pageCount}`),
        onError: (error) => events.push(`error:${(error as { code?: string }).code}`),
      });
      open.push(book);
      const first = book.load(pdf("slow/p40.pdf")).then(
        () => "resolved",
        (error) => error.code,
      );
      await sleep(60);
      const second = book.load(pdf("range/p6.pdf"));
      equal(await first, "CANCELLED", "superseded load");
      equal((await second).pageCount, 6, "replacement");
      equal(book.getState().pageCount, 6, "state is the replacement's");
      await sleep(900);
      equal(events, ["ready:6"], "callbacks");
      // Destroy while a third document is still opening.
      const third = book.load(pdf("slow/p40.pdf")).then(
        () => "resolved",
        (error) => error.code,
      );
      await sleep(40);
      book.destroy();
      book.destroy();
      equal(await third, "CANCELLED", "load during destroy");
      await sleep(700);
      equal(events, ["ready:6"], "no late callbacks");
      equal(host.childElementCount, 0, "host emptied");
    },
  ],
  [
    "AC09",
    "Cache pressure never disposes a page that is on screen",
    async () => {
      const { book } = await openBook(pdf("range/p40.pdf"), { layoutPolicy: "double", cacheSize: 4, preloadRadius: 2 });
      let worst = 0;
      for (let step = 0; step < 16; step++) {
        await book.next();
        await sleep(40);
        const snapshot = book.getSnapshot();
        worst = Math.max(worst, snapshot.cache.entries);
        for (const page of snapshot.visiblePages) {
          const texture = snapshot.textures.find((entry) => entry.page === page);
          // A page may still be loading, but once shown it is never taken away.
          if (texture) assert(texture.width > 0, `page ${page} lost its texture`);
        }
        assert(snapshot.cache.entries <= Math.max(4, snapshot.cache.pinnedEntries) + 1, `cache grew to ${snapshot.cache.entries}`);
      }
      await until(() => book.getSnapshot().visiblePages.every((page) => book.getSnapshot().textures.some((entry) => entry.page === page)), 8000, "visible textures");
      return `largest cache ${worst} entries with target 4`;
    },
  ],
  [
    "AC10a",
    "Range-capable server: probe, then explicit partial requests only",
    async () => {
      await resetLog();
      const { book } = await openBook(pdf("range/p60-img.pdf"));
      equal(book.getSnapshot().transportMode, "range", "transport");
      const log = (await readLog()).filter((entry) => entry.url.includes("p60-img"));
      equal(log[0].range, "bytes=0-0", "probe");
      assert(log.every((entry) => entry.status === 206), "a non-partial response was requested");
      assert(log.every((entry) => entry.bytes <= 4 * 256 * 1024), "a range larger than a few chunks was requested");
      const total = Number((await fetch("/fx/pdf/range/p60-img.pdf", { method: "GET", headers: { Range: "bytes=0-0" } })).headers.get("content-range")!.split("/")[1]);
      const fetched = log.reduce((sum, entry) => sum + entry.bytes, 0);
      assert(fetched < total * 0.6, `fetched ${fetched} of ${total} bytes to show the first page`);
      return `${log.length} requests, ${(fetched / 1024).toFixed(0)} KiB of ${(total / 1024).toFixed(0)} KiB`;
    },
  ],
  [
    "AC10b",
    "Servers that ignore ranges fall back to ordinary loading",
    async () => {
      const out: string[] = [];
      for (const mode of ["norange", "lying"]) {
        await resetLog();
        const { book, ready } = await openBook(pdf(`${mode}/p12.pdf`));
        equal(ready.pageCount, 12, `${mode} pageCount`);
        equal(book.getSnapshot().transportMode, "stream", `${mode} transport`);
        const log = (await readLog()).filter((entry) => entry.url.includes(`${mode}/p12`));
        equal(log[0].range, "bytes=0-0", `${mode} probe`);
        equal(log[0].status, 200, `${mode} probe status`);
        out.push(`${mode}: ${log.length} requests`);
      }
      return out.join("; ");
    },
  ],
  [
    "AC11a",
    "A local file is read in slices, never whole",
    async () => {
      const bytes = await (await fetch("/fx/pdf/range/p60-img.pdf")).arrayBuffer();
      const file = new File([bytes], "large.pdf", { type: "application/pdf" });
      let wholeReads = 0;
      let slices = 0;
      const originalBuffer = Blob.prototype.arrayBuffer;
      const originalSlice = Blob.prototype.slice;
      Blob.prototype.arrayBuffer = function (this: Blob) {
        if (this.size === file.size) wholeReads++;
        return originalBuffer.call(this);
      };
      Blob.prototype.slice = function (this: Blob, ...args: [number?, number?, string?]) {
        if (this === file) slices++;
        return originalSlice.apply(this, args);
      };
      try {
        const { ready } = await openBook({ type: "pdf", src: file, rasterWorker: false });
        equal(ready.pageCount, 60, "pageCount");
      } finally {
        Blob.prototype.arrayBuffer = originalBuffer;
        Blob.prototype.slice = originalSlice;
      }
      equal(wholeReads, 0, "whole-file reads");
      assert(slices > 0, "the file was never sliced");
      return `${slices} slices of a ${(file.size / 1048576).toFixed(1)} MiB file`;
    },
  ],
  [
    "AC11b",
    "An image-only book requests no PDF.js, parser or raster worker",
    async () => {
      // Runs in a fresh frame so earlier cases cannot have loaded them.
      const frame = document.createElement("iframe");
      frame.style.cssText = "width:400px;height:300px;border:0";
      frame.src = "/selftest-images.html";
      stage.append(frame);
      const names = await new Promise<string[]>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("image-only frame did not report")), 15000);
        window.addEventListener("message", function listener(event) {
          if (event.data?.type !== "flipdocs-images-ready") return;
          clearTimeout(timer);
          window.removeEventListener("message", listener);
          resolve(event.data.resources as string[]);
        });
      });
      frame.remove();
      const pdfRelated = names.filter((name) => /pdfjs|pdf\.worker|pdfHost|raster\.worker|pdfSource/i.test(name));
      equal(pdfRelated, [], "PDF resources requested");
      return `${names.length} resources, none PDF-related`;
    },
  ],
  [
    "AC12",
    "No raster worker: pages are drawn on the main thread",
    async () => {
      const off = await openBook({ type: "pdf", src: "/fx/pdf/range/p12.pdf", rasterWorker: false });
      equal(off.book.getSnapshot().rasterMode, "main", "explicitly disabled");
      await until(() => off.book.getSnapshot().textures.some((texture) => texture.page === 1), 8000, "first page");
      // A worker script that cannot load must not stop the reader either.
      configureAssets({ rasterWorkerUrl: "/does-not-exist/raster.worker.js" });
      try {
        const broken = await openBook(pdf("range/p12.pdf"));
        equal(broken.book.getSnapshot().rasterMode, "main", "worker failed to load");
        equal(broken.ready.pageCount, 12, "pageCount");
        equal(broken.errors.length, 0, "errors");
      } finally {
        configureAssets({ rasterWorkerUrl: undefined });
      }
    },
  ],
  [
    "AC13",
    "A settled reader stops drawing, badge included",
    async () => {
      await needsFrames();
      const { book } = await openBook(pdf("range/p12.pdf"), { showFps: true });
      await until(() => {
        const snapshot = book.getSnapshot();
        return snapshot.activeWork.running === null && snapshot.activeWork.queued === 0 && snapshot.textures.length >= 3;
      }, 10000, "work to settle");
      await sleep(1600);
      const before = book.getSnapshot().renderCount;
      await sleep(1500);
      const after = book.getSnapshot();
      equal(after.renderCount - before, 0, "renders while idle");
      equal(after.renderRate, 0, "render rate");
      equal(book.element.querySelector(".flipdocs__fps")?.textContent, "idle", "badge");
      return `${after.renderCount} renders in total`;
    },
  ],
  [
    "AC03",
    "Poses hold, reset without advancing, and a turn lands exactly",
    async () => {
      await needsFrames();
      const { book, pages } = await openBook(pdf("range/p12.pdf"), { transition: "curl", layoutPolicy: "double" });
      await book.goToPage(4);
      book.setDiagnosticPose("forward-mid-turn");
      const held = book.getSnapshot();
      equal(held.diagnostic, "forward-mid-turn", "pose");
      assert(held.turnProgress > 0.3 && held.turnProgress < 0.7, `progress ${held.turnProgress}`);
      book.resetPose();
      const reset = book.getSnapshot();
      equal([reset.diagnostic, reset.turnProgress, reset.page, reset.state], [null, 0, 4, "idle"], "after reset");
      const result = await book.next();
      equal(result, { status: "completed", page: 6 }, "turn");
      const turn = book.getSnapshot().lastTurn;
      assert(turn && turn.renders >= 4, `renders ${turn?.renders}`);
      equal(pages[pages.length - 1], 6, "page event");
      return `${turn!.renders} renders, worst gap ${turn!.worstGapMs.toFixed(1)} ms, worst travel ${turn!.worstTravel.toFixed(3)}`;
    },
  ],
  [
    "AC14",
    "Cold and preloaded benchmarks account for preparation and restore state",
    async () => {
      await needsFrames();
      const { book } = await openBook(pdf("range/p40.pdf"), { transition: "curl", layoutPolicy: "double" });
      await book.goToPage(4);
      book.setZoom(1.5);
      const cold = await book.runBenchmark(1800, "cold");
      const warm = await book.runBenchmark(1800, "preloaded");
      assert(cold.turns >= 2 && warm.turns >= 2, `turns ${cold.turns}/${warm.turns}`);
      assert(cold.inRunPreparationMs > 0, "cold run prepared nothing inside the timer");
      assert(warm.preparationMs > 0, "preloaded run reported no preparation");
      assert(cold.renders <= cold.callbacks + cold.turns, "renders exceed callbacks");
      equal([book.getState().page, book.getState().zoom], [4, 1.5], "state restored");
      return `cold ${cold.turns} turns, ${cold.rendersPerTurn.mean.toFixed(1)} renders/turn, p95 gap ${cold.frameGapMs.p95.toFixed(1)} ms; warm p95 ${warm.frameGapMs.p95.toFixed(1)} ms; baseline ${cold.callbackBaselineMs.toFixed(1)} ms`;
    },
  ],
  [
    "AC16",
    "Host direction detection: R2L, L2R and the fallback",
    async () => {
      equal(await detectPdfDirection("/fx/pdf/range/p12-rtl.pdf"), "rtl", "R2L file");
      equal(await detectPdfDirection("/fx/pdf/range/p12.pdf"), "ltr", "plain file");
      equal(await detectPdfDirection("/fx/pdf/range/p12.pdf", { fallback: "rtl" }), "rtl", "no preference uses the fallback");
      equal(await detectPdfDirection("/fx/missing.pdf"), "ltr", "unreadable file");
      const { book, ready } = await openBook(pdf("range/p12-rtl.pdf"));
      equal(ready.direction, "ltr", "the reader itself does not guess");
      book.update({ direction: "rtl" });
      equal(book.getState().direction, "rtl", "runtime direction change");
      equal(book.getState().pageCount, 12, "no reload on direction change");
    },
  ],
  [
    "ADD01",
    "1,324-page manifest: deep link to 1,200 and 200 spread changes stay bounded",
    async () => {
      await resetLog();
      const { book, ready } = await openBook({ type: "manifest", manifest: "/fx/manifest/1324.json" }, { startPage: 1200, layoutPolicy: "double" });
      equal(ready.pageCount, 1324, "pageCount");
      equal(book.getState().page, 1200, "opened at the deep link");
      let worst = 0;
      for (let step = 0; step < 200; step++) {
        // Fifty spreads on, a hundred back, fifty on again: always in range.
        const result = await (step < 50 || step >= 150 ? book.next() : book.previous());
        assert(result.status === "completed", `step ${step} ${result.status}`);
        worst = Math.max(worst, book.getSnapshot().cache.entries);
      }
      assert(worst <= 9, `cache reached ${worst} entries`);
      const log = await readLog();
      const pagesRequested = new Set(log.filter((entry) => entry.url.includes("/fx/img/")).map((entry) => entry.url.split("?")[0]));
      assert(pagesRequested.size < 420, `${pagesRequested.size} distinct page images were requested`);
      equal(book.getPageLabel(1), "i", "label");
      equal(book.getPageLabel(5), "3", "label");
      return `cache peak ${worst}, ${pagesRequested.size} distinct page images requested`;
    },
  ],
  [
    "ADD02",
    "2,000-page PDF opens from a few ranges and jumps to the end",
    async () => {
      await resetLog();
      const { book, ready } = await openBook(pdf("range/p2000.pdf"));
      equal(ready.pageCount, 2000, "pageCount");
      await book.goToPage(1999);
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 1999), 15000, "page 1999");
      const log = (await readLog()).filter((entry) => entry.url.includes("p2000"));
      return `${log.length} range requests`;
    },
  ],
  [
    "ADD03",
    "Mixed sizes and a rotated page fit without distortion in per-page mode",
    async () => {
      const { book } = await openBook(pdf("range/p12-mixed-rot.pdf"), { pageSizing: "per-page", layoutPolicy: "double" });
      await book.goToPage(2);
      await until(() => [2, 3].every((page) => book.getSnapshot().textures.some((texture) => texture.page === page && !texture.preview)), 10000, "pages 2 and 3");
      const textures = book.getSnapshot().textures;
      const rotated = textures.find((texture) => texture.page === 2)!;
      const wide = textures.find((texture) => texture.page === 3)!;
      // Page 2 is 432×648 rotated a quarter turn; page 3 is 792×612.
      assert(Math.abs(rotated.width / rotated.height - 648 / 432) < 0.02, `rotated aspect ${rotated.width / rotated.height}`);
      assert(Math.abs(wide.width / wide.height - 792 / 612) < 0.02, `wide aspect ${wide.width / wide.height}`);
      return `rotated ${rotated.width}×${rotated.height}, wide ${wide.width}×${wide.height}`;
    },
  ],
  [
    "ADD04",
    "Container layout, two independent readers, and a zero-size embed",
    async () => {
      const narrow = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "container" }, mount(360, 420));
      const wide = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "container" }, mount(900, 420));
      equal([narrow.book.getState().mode, wide.book.getState().mode], ["mobile", "desktop"], "modes");
      await narrow.book.next();
      equal([narrow.book.getState().page, wide.book.getState().page], [2, 1], "independent pages");
      assert(narrow.book.element.dataset.flipdocs !== wide.book.element.dataset.flipdocs, "readers share an id");
      const viewport = await openBook(pdf("range/p12.pdf"), {}, mount(360, 420));
      equal(viewport.book.getState().mode, window.innerWidth <= 760 ? "mobile" : "desktop", "baseline policy follows the viewport");

      const hidden = mount(0, 0);
      hidden.style.display = "none";
      const late = await openBook(pdf("range/p12.pdf"), {}, hidden);
      equal(late.ready.pageCount, 12, "ready while hidden");
      hidden.style.cssText = "width:500px;height:360px";
      await until(() => late.book.getSnapshot().effectiveRasterScale > 0, 4000, "layout after being shown");
    },
  ],
  [
    "ADD05",
    "Search: progressive coverage, normalization, Hebrew, and honest partial results",
    async () => {
      const { book } = await openBook({ type: "manifest", manifest: "/fx/manifest/60.json" });
      const updates: number[] = [];
      const exact = await book.search("needle37", {}, (progress) => updates.push(progress.indexedPages)).done;
      equal([exact.complete, exact.matches.length, exact.matches[0]?.page], [true, 1, 37], "exact match");
      equal(exact.indexedPages + exact.failedPages.length, 60, "coverage");
      assert(exact.matches[0].rects?.length, "match has no highlight rectangle");
      const accents = await book.search("cafe").done;
      assert(accents.matches.length >= 30, `accent-insensitive matches ${accents.matches.length}`);
      const strict = await book.search("cafe", { matchDiacritics: true, matchCase: true }).done;
      assert(strict.matches.length < accents.matches.length, "diacritic sensitivity had no effect");
      const hebrew = await book.search("בראשית ברא").done;
      assert(hebrew.matches.length >= 10, `Hebrew matches ${hebrew.matches.length}`);
      const hyphen = await book.search("hyphens and uneven").done;
      assert(hyphen.matches.length >= 10, "soft hyphen or spacing hid a match");
      // A cancelled scan must not claim to be complete.
      const handle = book.search("fox");
      handle.cancel();
      equal((await handle.done).complete, false, "cancelled search");
      const none = await book.search("zzzznotthere").done;
      equal([none.complete, none.matches.length], [true, 0], "no matches, complete");
      const imagesOnly = await openBook(images(5));
      const unavailable = await imagesOnly.book.search("anything").done;
      equal([unavailable.totalPages, unavailable.matches.length], [0, 0], "image-only book has no search");
      return `${updates.length} progress updates`;
    },
  ],
  [
    "ADD06",
    "Links: safe ones are placed, unsafe ones dropped, internal ones navigate",
    async () => {
      const { book } = await openBook({ type: "manifest", manifest: "/fx/manifest/12.json" }, { layoutPolicy: "double" });
      await until(() => book.element.querySelectorAll(".flipdocs__link").length >= 2, 6000, "links");
      const links = [...book.element.querySelectorAll<HTMLAnchorElement>(".flipdocs__link")];
      equal(links.length, 2, "link count");
      assert(!links.some((link) => /javascript:/i.test(link.getAttribute("href") ?? "")), "an unsafe link was placed");
      const external = links.find((link) => link.target === "_blank")!;
      equal(external.rel.includes("noopener"), true, "isolated tab");
      links.find((link) => link.target !== "_blank")!.click();
      equal(book.getState().page, 12, "internal link");
      const pdfBook = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "double" });
      await until(() => pdfBook.book.element.querySelectorAll(".flipdocs__link").length >= 2, 8000, "PDF links");
      pdfBook.book.element.querySelector<HTMLAnchorElement>('.flipdocs__link:not([target="_blank"])')!.click();
      equal(pdfBook.book.getState().page, 3, "PDF internal link");
    },
  ],
  [
    "ADD07",
    "Malformed manifests are refused before any page asset loads",
    async () => {
      const base = { schemaVersion: 1, id: "x", revision: "1" };
      const page = (number: number, src = "p.png") => ({ number, width: 100, height: 140, variants: [{ src, width: 100, height: 140 }] });
      const bad: Array<[string, unknown, string]> = [
        ["unknown version", { ...base, schemaVersion: 2, pages: [page(1)] }, "INVALID_MANIFEST"],
        ["duplicate page", { ...base, pages: [page(1), page(1)] }, "INVALID_MANIFEST"],
        ["gap", { ...base, pages: [page(1), page(3)] }, "INVALID_MANIFEST"],
        ["unsafe URL", { ...base, pages: [page(1, "javascript:alert(1)")] }, "UNSAFE_URL"],
        ["bad outline", { ...base, pages: [page(1)], outline: [{ title: "x", page: 9 }] }, "INVALID_MANIFEST"],
      ];
      await resetLog();
      for (const [label, manifest, expected] of bad) {
        let code = "";
        await openBook({ type: "manifest", manifest: manifest as never, baseUrl: `${location.origin}/fx/img/` }).catch((error) => (code = error.code));
        equal(code, expected, label);
      }
      equal((await readLog()).length, 0, "requests made for refused manifests");
    },
  ],
  [
    "ADD08",
    "A document that changes while being read restarts cleanly",
    async () => {
      await resetLog();
      // The fixture becomes a different revision after its third request,
      // which lands in the middle of preparing the first page.
      const { book, ready, errors } = await openBook(pdf("changing/p60-img.pdf"));
      equal(ready.pageCount, 60, "pageCount after the restart");
      const probes = (await readLog()).filter((entry) => entry.url.includes("changing/") && entry.range === "bytes=0-0").length;
      assert(probes >= 2, `expected a fresh probe after the change, saw ${probes}`);
      await book.goToPage(40);
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 40), 15000, "page 40 from the new revision");
      equal(errors.length, 0, "fatal errors");
      return `${probes} probes: the reader started over instead of mixing revisions`;
    },
  ],
  [
    "ADD09",
    "An expired URL is renewed through the host's hook",
    async () => {
      let renewals = 0;
      const source: FlipBookSource = {
        type: "pdf",
        src: "/fx/pdf/auth/p60-img.pdf?token=first",
        request: {
          renew: () => {
            renewals++;
            return `/fx/pdf/auth/p60-img.pdf?token=renewed${renewals}`;
          },
        },
      };
      const { book, ready, errors } = await openBook(source);
      equal(ready.pageCount, 60, "pageCount");
      await book.goToPage(30);
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 30), 15000, "page 30");
      assert(renewals >= 1, "the URL was never renewed");
      equal(errors.length, 0, "errors");
      return `${renewals} renewals`;
    },
  ],
  [
    "ADD10",
    "Losing the WebGL context keeps the page and carries on in the non-curl reader",
    async () => {
      const { book, errors } = await openBook(pdf("range/p12.pdf"), { layoutPolicy: "double" });
      await book.goToPage(6);
      equal(book.getState().rendererMode, "webgl", "starts with WebGL");
      const canvas = book.element.querySelector("canvas") as HTMLCanvasElement;
      const context = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGL2RenderingContext | null;
      const extension = context?.getExtension("WEBGL_lose_context");
      if (!extension) skip("WEBGL_lose_context is not available");
      extension!.loseContext();
      await until(() => book.getState().rendererMode === "fallback", 4000, "fallback reader");
      equal(book.getState().page, 6, "page kept");
      await book.next();
      equal(book.getState().page, 8, "navigation in the fallback reader");
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 8), 8000, "page 8 in the fallback reader");
      equal(errors.length, 0, "no fatal error");
      await until(() => book.getState().rendererMode === "webgl", 9000, "WebGL to come back");
      equal(book.getState().page, 8, "page kept after recovery");
    },
  ],
  [
    "ADD11",
    "The non-curl reader, reduced motion and the text view",
    async () => {
      const { book } = await openBook(pdf("range/p12.pdf"), { renderer: "fallback", toolbar: ["previous", "page", "reading", "next"], layoutPolicy: "double" });
      equal(book.getState().rendererMode, "fallback", "forced fallback");
      await book.next();
      equal(book.getState().page, 2, "navigation");
      const toggle = book.element.querySelector<HTMLButtonElement>('button[aria-pressed]')!;
      await until(() => !toggle.disabled, 4000, "text view toggle");
      toggle.click();
      const view = book.element.querySelector<HTMLElement>(".flipdocs__reading")!;
      equal(view.hidden, false, "text view open");
      await until(() => /Needle2/.test(view.textContent ?? ""), 8000, "page text");
      equal(book.element.querySelector(".flipdocs__stage")!.getAttribute("aria-hidden"), "true", "canvas hidden from assistive technology");
      book.element.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      equal(view.hidden, true, "Escape closes the text view");
      equal(book.element.querySelector(".flipdocs__stage")!.hasAttribute("aria-hidden"), false, "canvas exposed again");
    },
  ],
  [
    "ADD12",
    "Deep links through the hash do not loop",
    async () => {
      history.replaceState(null, "", "#fd=5");
      const before = history.length;
      const { book } = await openBook(pdf("range/p12.pdf"), { deepLink: { hashKey: "fd" }, layoutPolicy: "double" });
      equal(book.getState().page, 5, "opened from the hash");
      await book.next();
      equal(location.hash, "#fd=6", "hash follows the page");
      equal(history.length, before, "no history entries added");
      location.hash = "#fd=9";
      await until(() => book.getState().page === 9, 3000, "hashchange navigation");
      equal(location.hash, "#fd=9", "no rewrite loop");
      history.replaceState(null, "", location.pathname + location.search);
    },
  ],
  [
    "ADD14",
    "An encrypted PDF asks the host for its password, retries, and can be cancelled",
    async () => {
      const probe = await fetch("/fx/pdf/range/p6-pw.pdf", { headers: { Range: "bytes=0-0" } });
      if (probe.status !== 206) skip("the encrypted fixture needs the qpdf command line tool");
      const encrypted = (onPassword?: (request: { reason: string; attempt: number }) => string | null): FlipBookSource => ({
        type: "pdf",
        src: "/fx/pdf/range/p6-pw.pdf",
        onPassword: onPassword as never,
      });
      // No callback: a clear error, and nothing readable.
      let code = "";
      await openBook(encrypted()).catch((error) => (code = error.code));
      equal(code, "PASSWORD_REQUIRED", "without a callback");
      // Wrong, then right.
      const asked: string[] = [];
      const { ready, book, errors } = await openBook(
        encrypted((request) => {
          asked.push(`${request.reason}:${request.attempt}`);
          return request.attempt === 1 ? "not-the-password" : "open-sesame";
        }),
      );
      equal(asked, ["required:1", "incorrect:2"], "prompts");
      equal(ready.pageCount, 6, "pageCount");
      equal(errors.length, 0, "errors");
      await until(() => book.getSnapshot().textures.some((texture) => texture.page === 1), 8000, "first page");
      // Cancelled by the host.
      code = "";
      await openBook(encrypted(() => null)).catch((error) => (code = error.code));
      equal(code, "PASSWORD_CANCELLED", "cancelled");
      // The same prompts reach a main-thread document.
      const main: string[] = [];
      const fallback = await openBook({
        type: "pdf",
        src: "/fx/pdf/range/p6-pw.pdf",
        rasterWorker: false,
        onPassword: (request) => {
          main.push(request.reason);
          return "open-sesame";
        },
      });
      equal([main, fallback.ready.pageCount], [["required"], 6], "main thread");
    },
  ],
  [
    "ADD13",
    "Twenty load and destroy cycles leave no canvases, workers or listeners",
    async () => {
      const host = mount();
      const workers: Worker[] = [];
      const NativeWorker = window.Worker;
      let terminated = 0;
      window.Worker = class extends NativeWorker {
        constructor(url: string | URL, options?: WorkerOptions) {
          super(url, options);
          workers.push(this);
        }
        override terminate(): void {
          terminated++;
          super.terminate();
        }
      };
      try {
        for (let cycle = 0; cycle < 20; cycle++) {
          const book = createFlipbook(host, { transition: "none" });
          await book.load(cycle % 2 ? pdf("range/p6.pdf") : images(4));
          if (cycle % 3 === 0) void book.next();
          book.destroy();
        }
      } finally {
        window.Worker = NativeWorker;
      }
      await sleep(600);
      equal(host.childElementCount, 0, "host emptied");
      equal(document.querySelectorAll("canvas").length - stage.querySelectorAll(".mount canvas").length, 0, "stray canvases");
      equal(terminated, workers.length, "workers terminated");
      return `${workers.length} workers started and terminated`;
    },
  ],
];

function render(): void {
  rows.replaceChildren(
    ...results.map((result) => {
      const row = document.createElement("tr");
      const cell = (text: string, className = "") => {
        const node = document.createElement("td");
        node.className = className;
        const pre = document.createElement("pre");
        pre.textContent = text;
        node.append(pre);
        return node;
      };
      row.append(cell(`${result.id}  ${result.title}`), cell(`${result.outcome} (${result.ms} ms)`, result.outcome), cell(result.detail));
      return row;
    }),
  );
  const count = (outcome: Outcome) => results.filter((result) => result.outcome === outcome).length;
  summary.textContent = `${count("pass")} passed, ${count("fail")} failed, ${count("skip")} skipped`;
}

async function run(): Promise<void> {
  for (const [id, title, body] of cases) {
    if (only.length && !only.some((prefix) => id.startsWith(prefix))) continue;
    const started = performance.now();
    let outcome: Outcome = "pass";
    let detail = "";
    try {
      detail = (await Promise.race([
        body(),
        sleep(60000).then(() => {
          throw new Error("case timed out after 60 s");
        }),
      ])) ?? "";
    } catch (error) {
      outcome = error instanceof Skip ? "skip" : "fail";
      detail = error instanceof Error ? error.message : String(error);
    }
    for (const book of open.splice(0)) book.destroy();
    for (const node of mounts.splice(0)) node.remove();
    results.push({ id, title, outcome, detail, ms: Math.round(performance.now() - started) });
    render();
  }
  summary.textContent += " — done";
  (window as unknown as { __selftest: unknown }).__selftest = { done: true, results };
}

(window as unknown as { __selftest: unknown }).__selftest = { done: false, results };
void run();
