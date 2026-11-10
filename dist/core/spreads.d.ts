import type { ReadingDirection } from "../types.js";
/**
 * Page and spread arithmetic. Public page numbers are 1-based physical source
 * pages. Spread 0 holds only page 1 (the cover); spread k ≥ 1 holds pages 2k
 * and 2k+1. Each spread has two reading-order slots: `first` (the even page)
 * and `second` (the odd page). In LTR the first slot is the left side, in RTL
 * the right side, so RTL mirrors placement without mirroring content.
 */
export type Side = "left" | "right";
export type ViewMode = "desktop" | "mobile";
export interface SpreadPages {
    first: number | null;
    second: number | null;
}
export interface SpreadSides {
    left: number | null;
    right: number | null;
}
export declare const spreadCount: (pageCount: number) => number;
export declare const spreadOfPage: (page: number) => number;
export declare function spreadPages(spread: number, pageCount: number): SpreadPages;
/** Physical side of a reading-order slot. */
export declare const slotSide: (slot: "first" | "second", direction: ReadingDirection) => Side;
export declare function spreadSides(spread: number, pageCount: number, direction: ReadingDirection): SpreadSides;
/** Physical side a page rests on. Even pages fill the first slot. */
export declare const sideOfPage: (page: number, direction: ReadingDirection) => Side;
export declare const clampPage: (page: number, pageCount: number) => number;
/**
 * goToPage argument handling: round a finite value, clamp it into
 * 1…pageCount, and reject NaN and infinity with a typed argument error.
 */
export declare function normalizePageArgument(page: unknown, pageCount: number): number;
/**
 * Pages reported as visible. Desktop lists the real pages of the spread in
 * physical left-to-right order (an RTL spread reports [3, 2]); mobile lists
 * only the focused page. Blank slots never appear.
 */
export declare function visiblePages(page: number, pageCount: number, direction: ReadingDirection, mode: ViewMode): number[];
/** Lowest physical page of a spread: its logical anchor for sequential moves. */
export declare const spreadAnchor: (spread: number) => number;
/**
 * Destination of next()/previous(), or null at a boundary. Desktop moves a
 * spread at a time and lands on the destination spread's lowest page; mobile
 * moves one logical page.
 */
export declare function sequentialTarget(page: number, pageCount: number, mode: ViewMode, step: 1 | -1): number | null;
/**
 * Everything the renderer needs to turn one sheet between adjacent spreads.
 * The sheet is described in its own frame: it rests on `restSide`, showing
 * `restPage`, and lands on the opposite side showing `turnedPage`.
 */
export interface TurnPlan {
    fromSpread: number;
    toSpread: number;
    forward: boolean;
    /** Physical side the sheet lifts from. */
    restSide: Side;
    /** Face visible before the turn. */
    restPage: number;
    /** Face visible after the turn. */
    turnedPage: number;
    /** Page uncovered on the rest side, or null when the book ends there. */
    underPage: number | null;
    /** Page the sheet comes to cover on the landing side, or null. */
    landingPage: number | null;
}
export declare function planTurn(fromSpread: number, forward: boolean, pageCount: number, direction: ReadingDirection): TurnPlan | null;
/**
 * Mobile only: does moving from `from` to the adjacent page `to` stay inside
 * one spread (a camera slide) or cross a spread boundary (a sheet turn)?
 */
export declare const crossesSpread: (from: number, to: number) => boolean;
