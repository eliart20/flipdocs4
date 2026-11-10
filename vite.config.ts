import { defineConfig } from "vite";
import { workerRefsBuild } from "./build/workerRefs";

// Library build: three ES entry points sharing lazy chunks.
//   flipdocs.js  React component (peer: react)
//   core.js      framework-neutral createFlipbook(), no React
//   element.js   <flip-book> custom element + window.Flipdocs, for a script tag
// three.js and PDF.js are bundled (PDF.js only into lazy chunks), so the
// package has no runtime dependencies and the parser worker always matches.
export default defineConfig({
  plugins: [workerRefsBuild()],

  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: false,
    lib: {
      entry: {
        flipdocs: "src/index.ts",
        core: "src/core.ts",
        element: "src/element.ts",
      },
      formats: ["es"],
      cssFileName: "flipdocs",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "flipdocs-[name]-[hash].js",
      },
    },
  },
});
