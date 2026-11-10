import type { ManifestImageVariant, OutlineNode, PageLink, PageText, ReadingDirection } from "../types.js";
export declare const MANIFEST_LIMITS: {
    maxBytes: number;
    maxPages: number;
    maxOutlineNodes: number;
    maxOutlineDepth: number;
    maxVariantsPerPage: number;
    maxStringLength: number;
    maxRunsPerPage: number;
    maxLinksPerPage: number;
    maxTextLength: number;
};
export interface ResolvedManifestPage {
    number: number;
    label?: string;
    width: number;
    height: number;
    /** width / height */
    aspect: number;
    preview?: string;
    /** absolute `src`, sorted by ascending height */
    variants: ManifestImageVariant[];
    thumbnail?: string;
    text?: string;
    links?: string;
}
export interface ResolvedManifest {
    schemaVersion: 1;
    id: string;
    revision: string;
    title?: string;
    language?: string;
    direction?: ReadingDirection;
    pages: ResolvedManifestPage[];
    outline: OutlineNode[];
    baseUrl: string;
}
/** Throws when a manifest document is larger than the limit. Call before JSON.parse. */
export declare function assertManifestSize(byteLength: number, maxBytes?: number): void;
/** Resolve a resource reference to a safe absolute URL. */
export declare function resolveResourceUrl(reference: unknown, baseUrl: string): string;
/** Normalized URL for http, https, mailto, tel; otherwise null. Never throws. */
export declare function safeExternalUrl(value: unknown, baseUrl?: string): string | null;
/** Sanitize a text sidecar into plain data. */
export declare function parseTextSidecar(input: unknown): PageText;
/** Sanitize a links sidecar. Invalid links are dropped silently. */
export declare function parseLinksSidecar(input: unknown, pageCount: number, baseUrl?: string): PageLink[];
/** Validate a parsed manifest object and resolve its resources. */
export declare function parseManifest(input: unknown, options: {
    baseUrl: string;
    maxPages?: number;
}): ResolvedManifest;
/** Smallest variant with height >= targetHeight, else the largest. */
export declare function pickVariant(page: ResolvedManifestPage, targetHeight: number): ManifestImageVariant;
