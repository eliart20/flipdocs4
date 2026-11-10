import { defineConfig } from "vite";

// A deliberately plain consumer: no plugin or alias for flipdocs4 at all.
export default defineConfig({
  esbuild: { jsx: "automatic" },
  // The library resolves its workers relative to its own module, which
  // dependency pre-bundling would move. Only the dev server needs this.
  optimizeDeps: { exclude: ["flipdocs4"] },
});
