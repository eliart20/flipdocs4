import type { ImagesSource } from "../types";
import type { PageSource, SourceOpenContext } from "./pageSource";
export declare function openImagesSource(source: ImagesSource, context: SourceOpenContext): Promise<PageSource>;
