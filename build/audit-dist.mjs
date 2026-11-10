// Checks the built package: required files, relative sidecar references that
// every bundler understands, no leftover build tokens, no stray absolute
// asset URLs, and that an image-only import path cannot reach PDF.js.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];
const fail = (message) => failures.push(message);
const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

const required = [
  "flipdocs.js",
  "core.js",
  "element.js",
  "flipdocs.css",
  "index.d.ts",
  "core.d.ts",
  "element.d.ts",
  "pdf.worker.min.mjs",
  "raster.worker.js",
  "search.worker.js",
];
for (const file of required) {
  if (!fs.existsSync(path.join(dist, file))) fail(`missing dist/${file}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const files = fs.readdirSync(dist).filter((name) => fs.statSync(path.join(dist, name)).isFile());
const scripts = files.filter((name) => /\.m?js$/.test(name) && name !== "pdf.worker.min.mjs");
const text = Object.fromEntries(scripts.map((name) => [name, fs.readFileSync(path.join(dist, name), "utf8")]));

for (const [name, code] of Object.entries(text)) {
  if (/__FLIPDOCS_[A-Z_]+__/.test(code)) fail(`${name}: unreplaced build token`);
  if (/["'`]\/assets\//.test(code)) fail(`${name}: absolute /assets/ URL`);
  if (/from\s*["'](three|pdfjs-dist)/.test(code)) fail(`${name}: bare import of a bundled dependency`);
  // Vite 5 rewrites `const {a} = await import(x)` for tree-shaking and breaks
  // it when the chunk's exports were renamed; keep that form out of dist.
  if (/\}\s*=\s*await\s+import\(/.test(code)) fail(`${name}: destructured dynamic import`);
}

const all = Object.values(text).join("\n");
const expectations = [
  [/new Worker\(new URL\("\.\/raster\.worker\.js",\s*import\.meta\.url\),\s*\{\s*type:\s*"module"\s*\}\)/, "raster worker reference"],
  [/new Worker\(new URL\("\.\/search\.worker\.js",\s*import\.meta\.url\),\s*\{\s*type:\s*"module"\s*\}\)/, "search worker reference"],
  [/new URL\("\.\/pdf\.worker\.min\.mjs",\s*import\.meta\.url\)/, "parser worker reference"],
];
for (const [pattern, label] of expectations) {
  if (!pattern.test(all)) fail(`no ${label} in the library chunks`);
}

// Static import graph from an entry: an image-only reader must not pull PDF.js.
const staticImports = (name, seen = new Set()) => {
  if (seen.has(name) || !text[name]) return seen;
  seen.add(name);
  for (const match of text[name].matchAll(/(?:import|export)\s*(?:[^"'()]*?\sfrom\s*)?["']\.\/([^"']+)["']/g)) {
    staticImports(match[1], seen);
  }
  return seen;
};
const pdfChunks = scripts.filter((name) => /getDocument|GlobalWorkerOptions/.test(text[name]) && !/worker/.test(name));
for (const entry of ["flipdocs.js", "core.js", "element.js"]) {
  const reachable = staticImports(entry);
  for (const chunk of pdfChunks) {
    if (reachable.has(chunk)) fail(`${entry} statically imports the PDF.js chunk ${chunk}`);
  }
}
if (pdfChunks.length === 0) fail("no lazy PDF.js chunk found");

const peers = text["flipdocs.js"].match(/from\s*["']([^."'][^"']*)["']/g) ?? [];
for (const peer of peers) {
  if (!/["']react(\/jsx-runtime)?["']/.test(peer)) fail(`flipdocs.js: unexpected external ${peer}`);
}
if (/from\s*["']react/.test(text["core.js"]) || [...staticImports("core.js")].some((name) => /from\s*["']react/.test(text[name]))) {
  fail("core.js reaches React; the framework-neutral entry must not");
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const build = JSON.parse(fs.readFileSync(path.join(dist, "flipdocs.build.json"), "utf8"));

// Declarations must name every relative file in full. Node16 and NodeNext
// consumers read the package as ESM; an extensionless specifier resolves to
// nothing there, and with skipLibCheck nobody is told.
const declarationFiles = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) declarationFiles(full, out);
    else if (entry.name.endsWith(".d.ts")) out.push(full);
  }
  return out;
};
for (const file of declarationFiles(dist)) {
  const label = path.relative(root, file).replace(/\\/g, "/");
  const source = fs.readFileSync(file, "utf8");
  if (/^import\s+["'][^"']*\.css["']/m.test(source)) fail(`${label}: stylesheet import in a declaration`);
  for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*)["'](\.{1,2}(?:\/[^"']*)?)["']/g)) {
    const specifier = match[1];
    if (!specifier.endsWith(".js")) {
      fail(`${label}: "${specifier}" has no file extension`);
    } else if (!fs.existsSync(path.resolve(path.dirname(file), specifier.replace(/\.js$/, ".d.ts")))) {
      fail(`${label}: "${specifier}" has no declaration file`);
    }
  }
}
if (build.pdfjs !== pkg.devDependencies["pdfjs-dist"]) fail("bundled pdfjs-dist differs from the pinned version");
if (build.three !== pkg.devDependencies.three) fail("bundled three differs from the pinned version");

const sizes = files
  .map((name) => ({ name, bytes: fs.statSync(path.join(dist, name)).size }))
  .sort((a, b) => b.bytes - a.bytes);
const group = (label, test) => {
  const matched = sizes.filter((entry) => test(entry.name));
  return `${label.padEnd(28)} ${kib(matched.reduce((sum, entry) => sum + entry.bytes, 0)).padStart(12)}  (${matched.length} file${matched.length === 1 ? "" : "s"})`;
};
const isPdfChunk = (name) => pdfChunks.includes(name);
console.log("dist size by part");
console.log(group("entries (react, core, element)", (name) => ["flipdocs.js", "core.js", "element.js"].includes(name)));
console.log(group("library chunks (incl. three)", (name) => /^flipdocs-.*\.js$/.test(name) && !isPdfChunk(name) && !/worker/.test(name)));
console.log(group("lazy PDF.js chunk", isPdfChunk));
console.log(group("raster worker", (name) => name === "raster.worker.js" || /^flipdocs-worker-/.test(name)));
console.log(group("search worker", (name) => name === "search.worker.js"));
console.log(group("PDF.js parser worker", (name) => name === "pdf.worker.min.mjs"));
console.log(group("stylesheet", (name) => name.endsWith(".css")));
console.log(group("declarations", (name) => name.endsWith(".d.ts")));

if (failures.length) {
  console.error(`\naudit failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("\naudit passed");
