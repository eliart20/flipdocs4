import type { ImagesSource } from "../types.js";
import type { PageSource, SourceOpenContext } from "./pageSource.js";
export declare function openImagesSource(source: ImagesSource, context: SourceOpenContext): Promise<PageSource>;
