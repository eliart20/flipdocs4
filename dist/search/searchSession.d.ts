import type { PageStore } from "../engine/pageStore.js";
import type { SearchHandle, SearchOptions, SearchProgress } from "../types.js";
/** Pages in the order a reader would want them searched. */
export declare function searchOrder(visible: number[], pageCount: number): number[];
export declare class SearchService {
    private readonly getStore;
    private readonly getVisible;
    private matcher;
    /** Pages whose text is already with the matcher (or known to have none). */
    private readonly indexed;
    private readonly empty;
    private active;
    private indexedStore;
    private destroyed;
    constructor(getStore: () => PageStore | null, getVisible: () => number[]);
    /** Forget everything about the previous document. */
    reset(): void;
    search(query: string, options?: SearchOptions, onProgress?: (progress: SearchProgress) => void): SearchHandle;
    destroy(): void;
}
