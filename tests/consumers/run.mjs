// Consumer build gate: pack the library, install the tarball into two
// outside projects, build them, and open each in a real browser.
//
//   vite-react     a plain Vite 7 + React 19 app (Strict Mode), production build
//   vite5-react18  the same app on Vite 5 and React 18, the oldest pair supported
//   plain          no bundler at all: a <script type="module"> on the package files
//
// Proves that the declarations, the stylesheet, the lazy chunks and all three
// workers resolve from a consumer's point of view. Needs the fixture server
// (npm run dev) for the PDF it opens, and Playwright (see run-selftest.mjs).
//
//   node tests/consumers/run.mjs [--skip-build] [--skip-browser]
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const flags = new Set(process.argv.slice(2));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const run = (cwd, args) => execFileSync(npm, args, { cwd, stdio: ["ignore", "pipe", "pipe"], shell: process.platform === "win32" }).toString();
const failures = [];
const check = (condition, message) => {
  console.log(`${condition ? "ok  " : "FAIL"} ${message}`);
  if (!condition) failures.push(message);
};

// 1. Pack exactly what a consumer would receive.
if (!flags.has("--skip-build")) run(root, ["run", "build"]);
// Lifecycle scripts may print ahead of the JSON report; take it from where it starts.
const packOutput = run(root, ["pack", "--json", "--pack-destination", here]);
const packed = JSON.parse(packOutput.slice(packOutput.search(/^\[\s*$/m)))[0];
const tarball = path.join(here, packed.filename);
const files = packed.files.map((entry) => entry.path);
for (const required of [
  "dist/flipdocs.js",
  "dist/core.js",
  "dist/element.js",
  "dist/flipdocs.css",
  "dist/index.d.ts",
  "dist/core.d.ts",
  "dist/pdf.worker.min.mjs",
  "dist/raster.worker.js",
  "dist/search.worker.js",
  "THIRD-PARTY-NOTICES.md",
]) {
  check(files.includes(required), `package contains ${required}`);
}
check(!files.some((file) => /\.pdf$/i.test(file) || file.startsWith("demo/") || file.startsWith("tests/")), "package has no fixtures, demo or tests");
check(packed.size < 6 * 1024 * 1024, `packed size ${(packed.size / 1024).toFixed(0)} KiB`);

// 2. Install and build the consumers.
const viteApp = path.join(here, "vite-react");
const vite5App = path.join(here, "vite5-react18");
const plainApp = path.join(here, "plain");
// The older pair builds the very same sources.
for (const name of ["index.html", "vite.config.js", "src"]) {
  fs.cpSync(path.join(viteApp, name), path.join(vite5App, name), { recursive: true });
}
const consumers = [viteApp, vite5App, plainApp];
for (const dir of consumers) {
  fs.rmSync(path.join(dir, "node_modules", "flipdocs4"), { recursive: true, force: true });
  run(dir, ["install", "--no-audit", "--no-fund", "--no-save", "--ignore-scripts", tarball]);
  // --no-save drops other dependencies from a fresh tree; install them too.
  run(dir, ["install", "--no-audit", "--no-fund", "--ignore-scripts"]);
  run(dir, ["install", "--no-audit", "--no-fund", "--no-save", "--ignore-scripts", tarball]);
}
for (const [label, app] of [
  ["Vite 7", viteApp],
  ["Vite 5", vite5App],
]) {
  run(app, ["run", "build"]);
  const built = fs.readdirSync(path.join(app, "dist", "assets"));
  check(built.some((name) => /raster\.worker.*\.js$/.test(name)), `${label} build emitted the raster worker`);
  check(built.some((name) => /search\.worker.*\.js$/.test(name)), `${label} build emitted the search worker`);
  check(built.some((name) => /pdf\.worker.*\.mjs$/.test(name)), `${label} build emitted the PDF.js parser worker`);
  check(built.some((name) => /pdfSource.*\.js$/.test(name)), `${label} build kept the PDF code in its own lazy chunk`);
  check(built.some((name) => /\.css$/.test(name)), `${label} build emitted the stylesheet`);
}

// TypeScript sees the declarations through the package's export map, under
// each way a consumer may resolve modules. skipLibCheck stays on, as it is in
// most projects: it hides a broken declaration, so every probe also has a
// line that must be an error. If an export has silently become `any`, that
// line stops being one and the unused @ts-expect-error fails the probe.
const typecheck = (label, filename, lines, moduleOptions) => {
  const probe = path.join(viteApp, filename);
  fs.writeFileSync(probe, `${lines.join("\n")}\n`);
  try {
    execFileSync(
      process.execPath,
      [
        path.join(root, "node_modules", "typescript", "bin", "tsc"),
        "--noEmit",
        "--strict",
        "--skipLibCheck",
        ...moduleOptions,
        "--target",
        "ES2022",
        "--lib",
        "ES2022,DOM",
        "--jsx",
        "react-jsx",
        probe,
      ],
      { cwd: viteApp, stdio: "pipe" },
    );
    check(true, `declarations typecheck from a consumer (${label})`);
  } catch (error) {
    check(false, `declarations typecheck from a consumer (${label}): ${error.stdout?.toString().slice(0, 600)}`);
  } finally {
    fs.rmSync(probe, { force: true });
  }
};
const staticProbe = [
  'import { FlipBook, createFlipbook, detectPdfDirection, type FlipBookHandle, type FlipBookProps, type FlipBookSource, type ReadingDirection, type ReadyEvent } from "flipdocs4";',
  'import { createFlipbook as coreCreate } from "flipdocs4/core";',
  'const source: FlipBookSource = { type: "pdf", src: "a.pdf" };',
  'const direction: ReadingDirection = "rtl";',
  "const props: FlipBookProps = { source, direction, onReady: (event: ReadyEvent) => event.pageAspect };",
  "declare const handle: FlipBookHandle;",
  "handle.goToPage(3);",
  'const detected: Promise<ReadingDirection> = detectPdfDirection("a.pdf");',
  "// @ts-expect-error a function is not a number",
  "const mistyped: number = createFlipbook;",
  "// @ts-expect-error nor is the one from the framework-neutral entry",
  "const mistypedCore: number = coreCreate;",
  "export { FlipBook, createFlipbook, coreCreate, props, detected, mistyped, mistypedCore };",
];
typecheck("bundler resolution", "type-probe.ts", staticProbe, ["--module", "ESNext", "--moduleResolution", "Bundler"]);
typecheck("Node16 resolution, ES module", "type-probe-node16.mts", staticProbe, ["--module", "Node16", "--moduleResolution", "Node16"]);
// A CommonJS project (a Medusa backend, for one) can only reach an ESM-only
// package through a dynamic import.
typecheck(
  "Node16 resolution, CommonJS",
  "type-probe-node16.cts",
  [
    "async function load() {",
    '  const mod = await import("flipdocs4");',
    '  const detected: Promise<"ltr" | "rtl"> = mod.detectPdfDirection("a.pdf");',
    "  // @ts-expect-error a function is not a number",
    "  const mistyped: number = mod.createFlipbook;",
    "  return { reader: mod.FlipBook, detected, mistyped };",
    "}",
    "export = load;",
  ],
  ["--module", "Node16", "--moduleResolution", "Node16"],
);

// 3. Open both in a browser.
if (!flags.has("--skip-browser")) {
  const require = createRequire(import.meta.url);
  let playwright = null;
  for (const candidate of [process.env.PLAYWRIGHT_PATH, "playwright", "@playwright/test"].filter(Boolean)) {
    try {
      playwright = require(candidate);
      break;
    } catch {
      // try the next one
    }
  }
  if (!playwright) {
    check(false, "Playwright not found (set PLAYWRIGHT_PATH)");
  } else {
    const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json" };
    const serve = (dir, port) =>
      new Promise((resolve) => {
        const server = http.createServer((req, res) => {
          const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
          const file = path.join(dir, pathname.endsWith("/") ? `${pathname}index.html` : pathname);
          if (!file.startsWith(dir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
            res.writeHead(404).end("not found");
            return;
          }
          res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
          fs.createReadStream(file).pipe(res);
        });
        server.listen(port, "127.0.0.1", () => resolve(server));
      });
    const servers = [
      await serve(path.join(viteApp, "dist"), 5186),
      await serve(plainApp, 5187),
      await serve(path.join(vite5App, "dist"), 5188),
    ];
    const browser = await playwright.chromium.launch({
      headless: false,
      args: ["--window-position=-2600,-200", "--window-size=1100,800", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding"],
    });
    try {
      for (const [label, url, snapshot] of [
        ["Vite 7 + React 19 build", "http://127.0.0.1:5186/", "window.flipbookRef.current.getSnapshot()"],
        ["Vite 5 + React 18 build", "http://127.0.0.1:5188/", "window.flipbookRef.current.getSnapshot()"],
        ["script tag, no bundler", "http://127.0.0.1:5187/", "document.getElementById('book').flipbook.getSnapshot()"],
      ]) {
        const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("requestfailed", (request) => errors.push(`request failed: ${request.url()}`));
        await page.goto(url);
        try {
          await page.waitForFunction(() => window.flipbookReady || window.flipbookError, null, { timeout: 30_000 });
        } catch {
          errors.push("timed out waiting for the reader");
        }
        const state = await page.evaluate(
          (expression) => ({
            ready: window.flipbookReady ?? null,
            error: window.flipbookError ?? null,
            snapshot: (() => {
              try {
                return new Function(`return ${expression}`)();
              } catch (error) {
                return { failed: String(error) };
              }
            })(),
            readers: document.querySelectorAll(".flipdocs").length,
            canvases: document.querySelectorAll("canvas").length,
            styled: getComputedStyle(document.querySelector(".flipdocs__toolbar") ?? document.body).display,
          }),
          snapshot,
        );
        check(state.ready?.pageCount === 12, `${label}: opened 12 pages`);
        check(state.snapshot?.rasterMode === "worker", `${label}: pages drawn in the raster worker (${state.snapshot?.rasterNote ?? state.snapshot?.rasterMode})`);
        check(state.snapshot?.transportMode === "range", `${label}: byte-range transport`);
        check(state.readers === 1 && state.canvases === 1, `${label}: exactly one reader and one canvas (Strict Mode safe)`);
        check(state.styled === "flex", `${label}: stylesheet applied`);
        check(errors.length === 0 && !state.error, `${label}: no errors ${errors.concat(state.error ?? []).join("; ")}`);
        await page.close();
      }
    } finally {
      await browser.close();
      for (const server of servers) server.close();
    }
  }
}

fs.rmSync(tarball, { force: true });
console.log(failures.length ? `\n${failures.length} consumer check(s) failed` : "\nconsumer builds passed");
process.exit(failures.length ? 1 : 0);
