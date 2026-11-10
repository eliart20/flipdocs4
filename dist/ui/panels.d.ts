import type { FlipEngine } from "../engine/engine";
import type { FlipBookStrings, SearchHandle, SearchMatch, SearchOptions, SearchProgress } from "../types";
/**
 * The side drawer: page thumbnails, the table of contents and search. Lists
 * are virtualized or capped, so a 2,000-page book costs a few dozen DOM
 * nodes, never one subtree per page.
 */
export type PanelKind = "thumbnails" | "outline" | "search";
export interface PanelHost {
    engine: FlipEngine;
    strings(): FlipBookStrings;
    goToPage(page: number): void;
    search(query: string, options: SearchOptions, onProgress: (progress: SearchProgress) => void): SearchHandle;
    showMatches(matches: SearchMatch[], current: SearchMatch | null): void;
    pageLabel(page: number): string;
    onClose(): void;
}
export declare class SidePanel {
    private readonly host;
    readonly element: HTMLElement;
    private readonly title;
    private readonly body;
    private kind;
    private cleanup;
    private readonly thumbs;
    private thumbGeneration;
    private searchState;
    private activeSearch;
    private onPageChange;
    constructor(host: PanelHost);
    get current(): PanelKind | null;
    open(kind: PanelKind): void;
    close(): void;
    /** The document changed: nothing cached still applies. */
    reset(): void;
    pageChanged(): void;
    private closeContent;
    private clearThumbs;
    private thumbnailNode;
    private buildThumbnails;
    private buildOutline;
    private buildSearch;
    destroy(): void;
}
