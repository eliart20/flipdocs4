import type { PageText, SearchMatch } from "../types.js";
import type { ResolvedSearchOptions } from "./searchIndex.js";
export type SearchWorkerRequest = {
    type: "index";
    page: number;
    text: PageText;
} | {
    type: "search";
    id: number;
    page: number;
    query: string;
    options: ResolvedSearchOptions;
    maxMatches: number;
} | {
    type: "clear";
};
export type SearchWorkerResponse = {
    type: "ready";
} | {
    type: "matches";
    id: number;
    page: number;
    matches: SearchMatch[];
} | {
    type: "error";
    id: number;
    page: number;
    message: string;
};
