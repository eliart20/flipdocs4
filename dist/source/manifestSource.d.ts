import type { ManifestSource } from "../types.js";
import type { PageSource, SourceOpenContext } from "./pageSource.js";
export declare function openManifestSource(source: ManifestSource, context: SourceOpenContext): Promise<PageSource>;
