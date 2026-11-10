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
export declare function openSource(source: FlipBookSource, context: SourceOpenContext): Promise<PageSource>;
