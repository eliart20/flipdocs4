import type { ManifestSource } from "../types";
import type { PageSource, SourceOpenContext } from "./pageSource";
export declare function openManifestSource(source: ManifestSource, context: SourceOpenContext): Promise<PageSource>;
