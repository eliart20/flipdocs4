import type { FlipBookErrorCode } from "./types";

/**
 * Every error the reader reports is an ordinary Error with a stable `code`,
 * so existing `onError(error => error.message)` handlers keep working.
 */
export class FlipBookError extends Error {
  readonly code: FlipBookErrorCode;
  readonly detail?: unknown;

  constructor(code: FlipBookErrorCode, message: string, options?: { cause?: unknown; detail?: unknown }) {
    super(message);
    this.name = "FlipBookError";
    this.code = code;
    if (options?.cause !== undefined) {
      (this as { cause?: unknown }).cause = options.cause;
    }
    if (options?.detail !== undefined) this.detail = options.detail;
  }
}

export const isFlipBookError = (value: unknown): value is FlipBookError =>
  value instanceof FlipBookError ||
  (typeof value === "object" && value !== null && (value as { name?: string }).name === "FlipBookError");

export const isCancellation = (value: unknown): boolean =>
  (isFlipBookError(value) && (value.code === "CANCELLED" || value.code === "DESTROYED")) ||
  (typeof value === "object" &&
    value !== null &&
    ((value as { name?: string }).name === "AbortError" ||
      (value as { name?: string }).name === "RenderingCancelledException"));

export const cancelled = (what = "Operation") => new FlipBookError("CANCELLED", `${what} was cancelled`);

/** Wrap anything thrown into a FlipBookError without losing the original. */
export function toFlipBookError(
  value: unknown,
  fallbackCode: FlipBookErrorCode,
  fallbackMessage: string,
): FlipBookError {
  if (isFlipBookError(value)) return value;
  const message = value instanceof Error && value.message ? value.message : fallbackMessage;
  return new FlipBookError(fallbackCode, message, { cause: value });
}
