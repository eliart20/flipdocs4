import type { FlipBookErrorCode } from "./types.js";
/**
 * Every error the reader reports is an ordinary Error with a stable `code`,
 * so existing `onError(error => error.message)` handlers keep working.
 */
export declare class FlipBookError extends Error {
    readonly code: FlipBookErrorCode;
    readonly detail?: unknown;
    constructor(code: FlipBookErrorCode, message: string, options?: {
        cause?: unknown;
        detail?: unknown;
    });
}
export declare const isFlipBookError: (value: unknown) => value is FlipBookError;
export declare const isCancellation: (value: unknown) => boolean;
export declare const cancelled: (what?: string) => FlipBookError;
/** Wrap anything thrown into a FlipBookError without losing the original. */
export declare function toFlipBookError(value: unknown, fallbackCode: FlipBookErrorCode, fallbackMessage: string): FlipBookError;
