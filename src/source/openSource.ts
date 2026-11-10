import { FlipBookError } from "../errors";
import type { FlipBookSource } from "../types";
import type { PageSource, SourceOpenContext } from "./pageSource";

/**
 * Open any supported source. Each kind is behind its own dynamic import, so
 * an image book never downloads the PDF code and a PDF never downloads the
 * manifest validator.
 *
 * The imports are deliberately not destructured (`const { x } = await
 * import()`): some bundlers rewrite that form for tree-shaking and get it
 * wrong once the library has been built into chunks. See build/audit-dist.mjs.
 */
export async function openSource(source: FlipBookSource, context: SourceOpenContext): Promise<PageSource> {
  if (!source || typeof source !== "object") {
    throw new FlipBookError("INVALID_SOURCE", "A source object is required");
  }
  switch (source.type) {
    case "pdf": {
      const module = await import("../pdf/pdfSource");
      return module.openPdfSource(source, context);
    }
    case "images": {
      const module = await import("./imagesSource");
      return module.openImagesSource(source, context);
    }
    case "manifest": {
      const module = await import("./manifestSource");
      return module.openManifestSource(source, context);
    }
    default:
      throw new FlipBookError(
        "INVALID_SOURCE",
        `Unknown source type "${String((source as { type?: unknown }).type)}"`,
      );
  }
}
