import type { FlipEngine } from "../engine/engine.js";
import type { PageText, SearchMatch } from "../types.js";
export declare class PageOverlay {
    private readonly engine;
    private readonly goToPage;
    readonly element: HTMLDivElement;
    private readonly layers;
    private readonly linkCache;
    private readonly textCache;
    private matches;
    private currentMatch;
    private selectText;
    private scheduled;
    private generation;
    private destroyed;
    constructor(engine: FlipEngine, goToPage: (page: number) => void);
    /** Coalesce view changes into one update. Never keeps a frame loop alive. */
    schedule(): void;
    setMatches(matches: SearchMatch[], current: SearchMatch | null): void;
    setSelectText(enabled: boolean): void;
    /** Drop everything cached for the previous document. */
    reset(): void;
    private remember;
    /** Text of a page, shared with the reading view. */
    pageText(page: number): Promise<PageText | null>;
    private update;
    private createLayer;
    private loadLinks;
    private renderHits;
    /**
     * Selectable text as one SVG per page. Each run is stretched to its
     * rectangle with textLength, so the layer scales with the page and needs no
     * font measurement.
     */
    private loadText;
    destroy(): void;
}
