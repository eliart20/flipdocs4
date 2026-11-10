// Runs after the two Vite passes and before declarations are emitted.
// Copies the PDF.js parser worker that matches the bundled PDF.js, and writes
// the third-party notices that ship with the package.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sourceHash } from "./source-hash.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

const pdfjsRoot = path.join(root, "node_modules", "pdfjs-dist");
const threeRoot = path.join(root, "node_modules", "three");
const worker = path.join(pdfjsRoot, "legacy", "build", "pdf.worker.min.mjs");
if (!fs.existsSync(worker)) {
  console.error(`Missing ${worker}. Run npm install first.`);
  process.exit(1);
}
fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(worker, path.join(dist, "pdf.worker.min.mjs"));

const pdfjs = read(path.join(pdfjsRoot, "package.json"));
const three = read(path.join(threeRoot, "package.json"));
const notice = (name, pkg, licenseFile) => {
  let text = "";
  try {
    text = fs.readFileSync(licenseFile, "utf8").trim();
  } catch {
    text = `See ${pkg.homepage ?? pkg.repository?.url ?? name}.`;
  }
  return `## ${name} ${pkg.version}\n\nLicense: ${pkg.license}\n\n${text}\n`;
};
fs.writeFileSync(
  path.join(root, "THIRD-PARTY-NOTICES.md"),
  [
    "# Third-party notices",
    "",
    "The files in `dist` include the following open-source software, pinned to these exact versions.",
    "",
    notice("pdfjs-dist", pdfjs, path.join(pdfjsRoot, "LICENSE")),
    notice("three", three, path.join(threeRoot, "LICENSE")),
  ].join("\n"),
);

// Record what was bundled and what it was built from. dist is committed, so
// this is how a stale dist is caught (build/verify-dist.mjs). No timestamp:
// an unchanged source must give an unchanged file.
fs.writeFileSync(
  path.join(dist, "flipdocs.build.json"),
  `${JSON.stringify({ pdfjs: pdfjs.version, three: three.version, sourceHash: sourceHash(root) }, null, 2)}\n`,
);
console.log(`postbuild: pdf.worker.min.mjs (pdfjs-dist ${pdfjs.version}), three ${three.version}`);
