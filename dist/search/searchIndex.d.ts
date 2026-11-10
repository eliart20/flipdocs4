import type { NormalizedRect, PageText, SearchMatch, SearchOptions } from "../types";
export interface ResolvedSearchOptions {
    matchCase: boolean;
    matchDiacritics: boolean;
    limit: number;
}
export declare function resolveSearchOptions(options?: SearchOptions): ResolvedSearchOptions;
/** Rectangles covering original range [start, end), or undefined when no positioned run overlaps. */
export declare function rectsForRange(text: PageText, start: number, end: number): NormalizedRect[] | undefined;
export declare class SearchIndex {
    private readonly pages;
    get size(): number;
    setPage(page: number, text: PageText): void;
    hasPage(page: number): boolean;
    searchPage(page: number, query: string, options: ResolvedSearchOptions, maxMatches?: number): SearchMatch[];
    clear(): void;
}
