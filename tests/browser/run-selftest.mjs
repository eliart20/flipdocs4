// Runs the in-browser self-test (demo/selftest.html) in a real, headed
// Chromium and prints the results. The dev server must be running:
//
//   npm run dev
//   node tests/browser/run-selftest.mjs [--only=AC10,ADD05] [--url=http://127.0.0.1:5184]
//
// The browser is headed on purpose: animation frames, WebGL and timing are
// only meaningful in a window that is really being painted. It opens off
// screen so it stays out of the way, with occlusion throttling turned off so
// frames keep arriving. Playwright is not a dependency of this package; point
// PLAYWRIGHT_PATH at any installed copy, or install it yourself.
import { createRequire } from "node:module";
import process from "node:process";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  }),
);
const base = args.url ?? "http://127.0.0.1:5184";
const page = args.page ?? "selftest.html";
const timeout = Number(args.timeout ?? 420_000);

function loadPlaywright() {
  const candidates = [process.env.PLAYWRIGHT_PATH, "playwright", "@playwright/test"].filter(Boolean);
  const require = createRequire(import.meta.url);
  for (const candidate of candidates) {
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
  executablePath: process.env.CHROMIUM_PATH || undefined,
  channel: process.env.CHROMIUM_PATH ? undefined : process.env.PLAYWRIGHT_CHANNEL || undefined,
  args: [
    "--window-position=-2600,-200",
    "--window-size=1320,900",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-timer-throttling",
    "--no-first-run",
    "--no-default-browser-check",
  ],
});

let exitCode = 1;
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const tab = await context.newPage();
  const consoleErrors = [];
  tab.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  tab.on("pageerror", (error) => consoleErrors.push(`pageerror: ${error.message}`));

  const query = args.only ? `?only=${encodeURIComponent(args.only)}` : "";
  await tab.goto(`${base}/${page}${query}`, { waitUntil: "load" });

  if (args.eval) {
    // One-off probe: evaluate an expression in the page and print it.
    const value = await tab.evaluate(async (source) => {
      const run = new Function(`return (async () => { ${source} })()`);
      return run();
    }, args.eval);
    console.log(typeof value === "string" ? value : JSON.stringify(value, null, 2));
    exitCode = 0;
  } else {
    await tab.waitForFunction(() => window.__selftest?.done === true, null, { timeout, polling: 500 });
    const results = await tab.evaluate(() => window.__selftest.results);
    const width = Math.max(...results.map((result) => result.id.length));
    for (const result of results) {
      console.log(
        `${result.outcome.toUpperCase().padEnd(4)} ${result.id.padEnd(width)}  ${String(result.ms).padStart(6)} ms  ${result.title}${
          result.detail ? `\n       ${result.detail}` : ""
        }`,
      );
    }
    const count = (outcome) => results.filter((result) => result.outcome === outcome).length;
    console.log(`\n${count("pass")} passed, ${count("fail")} failed, ${count("skip")} skipped`);
    const version = browser.version();
    const info = await tab.evaluate(() => ({ ua: navigator.userAgent, dpr: devicePixelRatio, visible: document.visibilityState }));
    console.log(`Chromium ${version}; devicePixelRatio ${info.dpr}; ${info.visible}`);
    if (consoleErrors.length) console.log(`console errors (${consoleErrors.length}):\n  ${consoleErrors.slice(0, 12).join("\n  ")}`);
    exitCode = count("fail") === 0 ? 0 : 1;
  }
} catch (error) {
  console.error(String(error));
  try {
    const partial = await browser.contexts()[0]?.pages()[0]?.evaluate(() => window.__selftest?.results ?? []);
    if (partial?.length) console.error(JSON.stringify(partial.map((result) => [result.id, result.outcome, result.detail])));
  } catch {
    // the page is gone
  }
} finally {
  await browser.close();
}
process.exit(exitCode);
