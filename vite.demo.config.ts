import { defineConfig } from "vite";
import { workerRefsDev } from "./build/workerRefs";
import { rangeFixtures } from "./build/rangeFixtures";

// Workbench and in-browser self-test. Serves the library from source.
export default defineConfig({
  root: "demo",
  plugins: [workerRefsDev(), rangeFixtures()],
  server: {
    host: "127.0.0.1",
    port: 5184,
    strictPort: true,
    fs: { allow: [".."] },
  },
  esbuild: { jsx: "automatic" },
  optimizeDeps: {
    // PDF.js is loaded lazily from source; pre-bundling it would detach the
    // parser worker from its relative URL.
    exclude: ["pdfjs-dist"],
  },
});
