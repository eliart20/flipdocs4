// One hash over everything dist is built from: the library source, the build
// configuration and the pinned versions. Line endings are normalized so the
// hash is the same on every platform and checkout setting.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const INPUTS = ["src", "build", "vite.config.ts", "vite.workers.config.ts", "tsconfig.json", "tsconfig.build.json", "package.json"];
// Development-only files in build/ that never affect dist.
const IGNORED = new Set(["build/rangeFixtures.ts", "build/audit-dist.mjs", "build/verify-dist.mjs"]);

function walk(root, relative, out) {
  const absolute = path.join(root, relative);
  const stat = fs.statSync(absolute);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(absolute).sort()) walk(root, path.posix.join(relative, name), out);
  } else if (!IGNORED.has(relative)) {
    out.push(relative);
  }
}

export function sourceHash(root) {
  const files = [];
  for (const input of INPUTS) walk(root, input, files);
  const hash = crypto.createHash("sha256");
  for (const file of files.sort()) {
    let text = fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n");
    if (file === "package.json") {
      // Only what shapes the build: versions and the export map.
      const { version, exports, devDependencies, peerDependencies } = JSON.parse(text);
      text = JSON.stringify({ version, exports, devDependencies, peerDependencies });
    }
    hash.update(file);
    hash.update("\0");
    hash.update(text);
    hash.update("\0");
  }
  return hash.digest("hex");
}
