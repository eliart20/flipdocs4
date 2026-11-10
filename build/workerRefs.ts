import path from "node:path";
import type { Plugin } from "vite";

/**
 * The library refers to its three sidecar files (the raster worker, the search
 * worker and the PDF.js parser worker) through bare tokens in
 * `src/runtimeAssets.ts`. This plugin turns each token into the one spelling
 * every bundler recognises:
 *
 *   new Worker(new URL("./raster.worker.js", import.meta.url), { type: "module" })
 *   new URL("./pdf.worker.min.mjs", import.meta.url)
 *
 * In a library build the replacement happens in `generateBundle`, after Vite's
 * own worker and asset transforms and after minification, so the published
 * file keeps a plain relative reference that a consumer's bundler (or a
 * browser loading `dist` directly) resolves on its own. In the dev server the
 * tokens are replaced up front with source paths and Vite serves the workers.
 */

const TOKENS = {
  raster: "__FLIPDOCS_RASTER_WORKER__",
  search: "__FLIPDOCS_SEARCH_WORKER__",
  pdf: "__FLIPDOCS_PDF_WORKER_URL__",
} as const;

export const DIST_FILES = {
  raster: "raster.worker.js",
  search: "search.worker.js",
  pdf: "pdf.worker.min.mjs",
} as const;

const worker = (specifier: string) =>
  `new Worker(new URL(${JSON.stringify(specifier)}, import.meta.url), { type: "module" })`;
const url = (specifier: string) =>
  `new URL(${JSON.stringify(specifier)}, import.meta.url)`;

const replaceAll = (code: string, map: Record<string, string>) => {
  let out = code;
  for (const [token, value] of Object.entries(map)) {
    out = out.split(token).join(value);
  }
  return out;
};

export function workerRefsDev(): Plugin {
  return {
    name: "flipdocs:worker-refs-dev",
    enforce: "pre",
    apply: "serve",
    transform(code, id) {
      if (!id.replace(/\\/g, "/").endsWith("/src/runtimeAssets.ts")) return null;
      return {
        code: replaceAll(code, {
          [TOKENS.raster]: worker("./pdf/raster.worker.ts"),
          [TOKENS.search]: worker("./search/search.worker.ts"),
          [TOKENS.pdf]: url("../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs"),
        }),
        map: null,
      };
    },
  };
}

export function workerRefsBuild(): Plugin {
  return {
    name: "flipdocs:worker-refs-build",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue;
        if (!Object.values(TOKENS).some((token) => chunk.code.includes(token))) continue;
        const dir = path.posix.dirname(chunk.fileName);
        const rel = (file: string) => {
          const relative = path.posix.relative(dir, file);
          return relative.startsWith(".") ? relative : `./${relative}`;
        };
        chunk.code = replaceAll(chunk.code, {
          [TOKENS.raster]: worker(rel(DIST_FILES.raster)),
          [TOKENS.search]: worker(rel(DIST_FILES.search)),
          [TOKENS.pdf]: url(rel(DIST_FILES.pdf)),
        });
      }
    },
  };
}
