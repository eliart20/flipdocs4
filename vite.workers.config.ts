import { defineConfig } from "vite";

// Second build pass: the two self-contained worker files. They are emitted
// next to the library chunks under fixed names so that the relative
// references written by build/workerRefs.ts stay valid.
export default defineConfig({
  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: false,
    minify: "esbuild",
    lib: {
      entry: {
        "raster.worker": "src/pdf/raster.worker.ts",
        "search.worker": "src/search/search.worker.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "flipdocs-worker-[name]-[hash].js",
      },
    },
  },
});
