import { FlipBookError } from "../errors";
import type { PageSource, SourceOpenContext } from "../source/pageSource";
import type { PdfSource } from "../types";
export interface PdfPageSource extends PageSource {
    /** Set by the engine; called when the open document becomes unusable. */
    onFatal?: (error: FlipBookError) => void;
    readonly transportStats: {
        requests: number;
        bytes: number;
    } | null;
    /** Raw /ViewerPreferences /Direction from the file, or null. Not applied by the reader. */
    readonly viewerDirection: string | null;
    /** Where PDF parsing runs. */
    readonly parserMode: "worker" | "same-thread";
    /** Why pages are drawn on the main thread, when they are. */
    readonly rasterNote: string | null;
}
export declare function openPdfSource(source: PdfSource, context: SourceOpenContext): Promise<PdfPageSource>;
