/**
 * Text normalization for search. Every output code unit keeps the original
 * range it came from, so matches map back to the untouched page text.
 */
export interface NormalizeOptions {
    matchCase: boolean;
    matchDiacritics: boolean;
}
export interface NormalizedText {
    /** Normalized string that matching runs on. */
    text: string;
    /** For each UTF-16 code unit i of `text`: offset in the original where its source begins. */
    starts: Uint32Array;
    /** For each UTF-16 code unit i of `text`: offset in the original just past its source. */
    ends: Uint32Array;
}
export declare function normalizeText(original: string, options: NormalizeOptions): NormalizedText;
/** Same pipeline as normalizeText, trimmed of leading and trailing spaces. */
export declare function normalizeQuery(query: string, options: NormalizeOptions): string;
/** Map a match [from, to) in normalized.text back to original offsets. */
export declare function toOriginalRange(normalized: NormalizedText, from: number, to: number): {
    start: number;
    end: number;
};
