// dist is committed so that installing from GitHub needs no build. This
// fails when dist was not rebuilt after the source changed.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sourceHash } from "./source-hash.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let recorded = null;
try {
  recorded = JSON.parse(fs.readFileSync(path.join(root, "dist", "flipdocs.build.json"), "utf8")).sourceHash;
} catch {
  recorded = null;
}
const current = sourceHash(root);
if (recorded !== current) {
  console.error("dist is stale: it was not built from the current source. Run `npm run build` and commit dist.");
  process.exit(1);
}
console.log("dist matches the current source");
