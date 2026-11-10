import { FlipBookError } from "../errors";
import type { ReadingDirection } from "../types";

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

export const spreadCount = (pageCount: number): number => (pageCount < 1 ? 0 : Math.floor(pageCount / 2) + 1);

export const spreadOfPage = (page: number): number => Math.floor(page / 2);

export function spreadPages(spread: number, pageCount: number): SpreadPages {
  const first = 2 * spread;
  const second = 2 * spread + 1;
  return {
    first: first >= 1 && first <= pageCount ? first : null,
    second: second >= 1 && second <= pageCount ? second : null,
  };
}

/** Physical side of a reading-order slot. */
export const slotSide = (slot: "first" | "second", direction: ReadingDirection): Side =>
  (slot === "first") === (direction === "ltr") ? "left" : "right";

export function spreadSides(spread: number, pageCount: number, direction: ReadingDirection): SpreadSides {
  const { first, second } = spreadPages(spread, pageCount);
  return direction === "ltr" ? { left: first, right: second } : { left: second, right: first };
}

/** Physical side a page rests on. Even pages fill the first slot. */
export const sideOfPage = (page: number, direction: ReadingDirection): Side =>
  slotSide(page % 2 === 0 ? "first" : "second", direction);

export const clampPage = (page: number, pageCount: number): number =>
  Math.min(Math.max(1, pageCount), Math.max(1, page));

/**
 * goToPage argument handling: round a finite value, clamp it into
 * 1…pageCount, and reject NaN and infinity with a typed argument error.
 */
export function normalizePageArgument(page: unknown, pageCount: number): number {
  if (typeof page !== "number" || !Number.isFinite(page)) {
    throw new FlipBookError("INVALID_ARGUMENT", "goToPage expects a finite page number");
  }
  return clampPage(Math.round(page), pageCount);
}

/**
 * Pages reported as visible. Desktop lists the real pages of the spread in
 * physical left-to-right order (an RTL spread reports [3, 2]); mobile lists
 * only the focused page. Blank slots never appear.
 */
export function visiblePages(
  page: number,
  pageCount: number,
  direction: ReadingDirection,
  mode: ViewMode,
): number[] {
  if (pageCount < 1) return [];
  const current = clampPage(page, pageCount);
  if (mode === "mobile") return [current];
  const sides = spreadSides(spreadOfPage(current), pageCount, direction);
  const out: number[] = [];
  if (sides.left !== null) out.push(sides.left);
  if (sides.right !== null) out.push(sides.right);
  return out;
}

/** Lowest physical page of a spread: its logical anchor for sequential moves. */
export const spreadAnchor = (spread: number): number => (spread <= 0 ? 1 : 2 * spread);

/**
 * Destination of next()/previous(), or null at a boundary. Desktop moves a
 * spread at a time and lands on the destination spread's lowest page; mobile
 * moves one logical page.
 */
export function sequentialTarget(
  page: number,
  pageCount: number,
  mode: ViewMode,
  step: 1 | -1,
): number | null {
  if (pageCount < 1) return null;
  const current = clampPage(page, pageCount);
  if (mode === "mobile") {
    const target = current + step;
    return target >= 1 && target <= pageCount ? target : null;
  }
  const spread = spreadOfPage(current) + step;
  if (spread < 0 || spread >= spreadCount(pageCount)) return null;
  return spreadAnchor(spread);
}

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

export function planTurn(
  fromSpread: number,
  forward: boolean,
  pageCount: number,
  direction: ReadingDirection,
): TurnPlan | null {
  const toSpread = fromSpread + (forward ? 1 : -1);
  if (toSpread < 0 || toSpread >= spreadCount(pageCount) || fromSpread < 0) return null;
  if (forward) {
    const under = 2 * fromSpread + 3;
    return {
      fromSpread,
      toSpread,
      forward,
      restSide: slotSide("second", direction),
      restPage: 2 * fromSpread + 1,
      turnedPage: 2 * fromSpread + 2,
      underPage: under <= pageCount ? under : null,
      landingPage: fromSpread >= 1 ? 2 * fromSpread : null,
    };
  }
  const landing = 2 * fromSpread + 1;
  return {
    fromSpread,
    toSpread,
    forward,
    restSide: slotSide("first", direction),
    restPage: 2 * fromSpread,
    turnedPage: 2 * fromSpread - 1,
    underPage: toSpread >= 1 ? 2 * toSpread : null,
    landingPage: landing <= pageCount ? landing : null,
  };
}

/**
 * Mobile only: does moving from `from` to the adjacent page `to` stay inside
 * one spread (a camera slide) or cross a spread boundary (a sheet turn)?
 */
export const crossesSpread = (from: number, to: number): boolean => spreadOfPage(from) !== spreadOfPage(to);
