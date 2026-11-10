// Captures stills of the workbench in a real, headed Chromium: the resting
// spread, each diagnostic pose, and evenly spaced frames of a live turn.
//
//   node tests/browser/capture.mjs --out=captures --book="pdf:range/p40.pdf" [--direction=rtl]
//        [--page=6] [--width=1280] [--height=800] [--mobile] [--frames=8] [--duration=1400]
//
// Needs the dev server (npm run dev) and Playwright (see run-selftest.mjs).
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const args = {};
for (const arg of process.argv.slice(2)) {
  const text = arg.replace(/^--/, "");
  const at = text.indexOf("=");
  if (at < 0) args[text] = "true";
  else args[text.slice(0, at)] = text.slice(at + 1);
}
const base = args.url ?? "http://127.0.0.1:5184";
const out = path.resolve(args.out ?? "captures");
const width = Number(args.width ?? 1280);
const height = Number(args.height ?? 800);
const frames = Number(args.frames ?? 8);
const duration = Number(args.duration ?? 1400);
fs.mkdirSync(out, { recursive: true });

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  for (const candidate of [process.env.PLAYWRIGHT_PATH, "playwright", "@playwright/test"].filter(Boolean)) {
    try {
      return require(candidate);
    } catch {
      // try the next one
    }
  }
  console.error("Playwright was not found. Set PLAYWRIGHT_PATH to an installed copy.");
  process.exit(2);
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch({
  headless: false,
  args: [
    "--window-position=-2600,-200",
    `--window-size=${width + 40},${height + 120}`,
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-timer-throttling",
    "--no-first-run",
  ],
});

try {
  const mobile = args.mobile === "true";
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: Number(args.dpr ?? (mobile ? 2 : 1)),
    hasTouch: mobile,
    isMobile: mobile,
  });
  const tab = await context.newPage();
  tab.on("pageerror", (error) => console.log(`pageerror: ${error.message}`));
  tab.on("console", (message) => {
    if (message.type() === "error") console.log(`console error: ${message.text()}`);
  });
  const query = new URLSearchParams({
    book: args.book ?? "pdf:range/p40.pdf",
    direction: args.direction ?? "ltr",
    toolbar: args.toolbar ?? "default",
    fps: "1",
    page: args.page ?? "4",
  });
  if (args.layout) query.set("layout", args.layout);
  if (args.transition) query.set("transition", args.transition);
  await tab.goto(`${base}/?${query}`, { waitUntil: "load" });
  await tab.waitForFunction(() => window.flipbook?.getState().ready === true, null, { timeout: 120_000 });
  // Let the full-quality rasters of the spread and its neighbours arrive.
  await tab.waitForFunction(
    () => {
      const snapshot = window.flipbook.getSnapshot();
      return snapshot.activeWork.running === null && snapshot.activeWork.queued === 0;
    },
    null,
    { timeout: 120_000 },
  );
  await tab.waitForTimeout(700);

  const reader = tab.locator("#reader");
  const shot = async (name) => {
    await reader.screenshot({ path: path.join(out, `${name}.png`) });
    console.log(`saved ${name}.png`);
  };

  await shot("01-rest");
  if (args.poses !== "false") {
    for (const pose of (args.poses ?? "forward-bottom-hover,forward-mid-turn,backward-mid-turn,near-spine-diagonal,extreme-low-to-high").split(",")) {
      await tab.evaluate((name) => window.flipbook.setDiagnosticPose(name), pose);
      await tab.waitForTimeout(450);
      await shot(`02-pose-${pose}`);
    }
    await tab.evaluate(() => window.flipbook.resetPose());
    await tab.waitForTimeout(200);
  }

  // A live turn, slowed so the stills are evenly spread across it.
  await tab.evaluate((ms) => window.flipbook.setTuning({ turnDuration: ms }), duration);
  for (const direction of ["next", "previous"]) {
    const started = Date.now();
    const done = tab.evaluate((name) => window.flipbook[name]().then((result) => result.status), direction);
    for (let index = 1; index <= frames; index++) {
      const due = started + (duration * index) / (frames + 1);
      await tab.waitForTimeout(Math.max(0, due - Date.now()));
      await shot(`03-${direction}-${String(index).padStart(2, "0")}`);
    }
    console.log(`${direction}: ${await done}`);
    await tab.waitForTimeout(250);
  }
  await tab.evaluate(() => window.flipbook.setTuning({ turnDuration: 620 }));
  const report = await tab.evaluate(async () => {
    await window.flipbook.next();
    const snapshot = window.flipbook.getSnapshot();
    return {
      page: snapshot.page,
      visible: snapshot.visiblePages,
      mode: snapshot.mode,
      raster: snapshot.rasterMode,
      note: snapshot.rasterNote,
      transport: snapshot.transportMode,
      lastTurn: snapshot.lastTurn,
      cache: snapshot.cache,
      textures: snapshot.textures.map((texture) => `${texture.page}:${texture.width}x${texture.height}${texture.preview ? "p" : ""}`),
    };
  });
  console.log(JSON.stringify(report, null, 1));
} finally {
  await browser.close();
}
