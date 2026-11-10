// Runs after tsc has emitted the declarations.
//
// tsc copies the source's extensionless specifiers ("./core") into the .d.ts
// files. A consumer on Node16 or NodeNext module resolution reads this package
// as ESM and needs full specifiers there ("./core.js"). Without them the
// re-exports resolve to nothing, and with skipLibCheck that is silent: names
// go missing or turn into `any`. This writes each relative specifier out in
// full, and drops the stylesheet import, which means nothing in a declaration.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];

function declarations(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) declarations(full, out);
    else if (entry.name.endsWith(".d.ts")) out.push(full);
  }
  return out;
}

function fullSpecifier(file, specifier) {
  if (/\.(js|mjs|cjs|json)$/.test(specifier)) return specifier;
  const target = path.resolve(path.dirname(file), specifier);
  if (fs.existsSync(`${target}.d.ts`)) return `${specifier}.js`;
  if (fs.existsSync(path.join(target, "index.d.ts"))) return `${specifier.replace(/\/$/, "")}/index.js`;
  failures.push(`${path.relative(root, file)}: cannot resolve "${specifier}"`);
  return specifier;
}

let changed = 0;
for (const file of declarations(dist)) {
  const before = fs.readFileSync(file, "utf8");
  const after = before
    .replace(/^import\s+(["'])\.{1,2}\/[^"']*\.css\1;?[ \t]*\r?\n/gm, "")
    .replace(
      /(\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}(?:\/[^"']*)?)\2/g,
      (_match, lead, quote, specifier) => `${lead}${quote}${fullSpecifier(file, specifier)}${quote}`,
    );
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

if (failures.length) {
  console.error(`fix-declarations failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`fix-declarations: full specifiers written in ${changed} declaration file${changed === 1 ? "" : "s"}`);
