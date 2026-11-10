import { describe, expect, it } from "vitest";
import { FlipBookError } from "../src/errors";
import { classifyGesture, releaseCompletes } from "../src/core/gestures";
import { foldPoint, foldTuning, solveFold } from "../src/core/fold";
import type { PageDims } from "../src/core/fold";
import {
  crossesSpread,
  normalizePageArgument,
  planTurn,
  sequentialTarget,
  sideOfPage,
  spreadCount,
  spreadOfPage,
  spreadSides,
  visiblePages,
} from "../src/core/spreads";
import {
  TurnClock,
  buildTravelTable,
  canonicalPath,
  cornerGrab,
  pathEnd,
  poseTravel,
  samplePose,
  settlePath,
  tauForFraction,
  timingRamp,
} from "../src/core/trajectory";
import {
  TUNING_DEFAULTS,
  TUNING_RANGES,
  applyTuning,
  clampZoom,
  defaultTuning,
  normalizeCacheSize,
  normalizeMaxPixelRatio,
  normalizeMaxTextureHeight,
  normalizePreloadRadius,
} from "../src/tuning";

describe("spreads", () => {
  it("counts spreads with a single cover", () => {
    expect(spreadCount(0)).toBe(0);
    expect(spreadCount(1)).toBe(1);
    expect(spreadCount(2)).toBe(2);
    expect(spreadCount(3)).toBe(2);
    expect(spreadCount(4)).toBe(3);
    expect(spreadOfPage(1)).toBe(0);
    expect(spreadOfPage(2)).toBe(1);
    expect(spreadOfPage(3)).toBe(1);
  });

  it("places the cover on the right in LTR and on the left in RTL", () => {
    expect(spreadSides(0, 5, "ltr")).toEqual({ left: null, right: 1 });
    expect(spreadSides(0, 5, "rtl")).toEqual({ left: 1, right: null });
    expect(spreadSides(1, 5, "ltr")).toEqual({ left: 2, right: 3 });
    expect(spreadSides(1, 5, "rtl")).toEqual({ left: 3, right: 2 });
    expect(spreadSides(2, 4, "ltr")).toEqual({ left: 4, right: null });
    expect(sideOfPage(1, "ltr")).toBe("right");
    expect(sideOfPage(2, "ltr")).toBe("left");
    expect(sideOfPage(2, "rtl")).toBe("right");
  });

  it("reports visible pages in physical order without blanks", () => {
    expect(visiblePages(1, 6, "ltr", "desktop")).toEqual([1]);
    expect(visiblePages(3, 6, "ltr", "desktop")).toEqual([2, 3]);
    expect(visiblePages(2, 6, "rtl", "desktop")).toEqual([3, 2]);
    expect(visiblePages(6, 6, "ltr", "desktop")).toEqual([6]);
    expect(visiblePages(3, 6, "rtl", "mobile")).toEqual([3]);
    expect(visiblePages(1, 0, "ltr", "desktop")).toEqual([]);
  });

  it("rounds and clamps goToPage and rejects non-finite input", () => {
    expect(normalizePageArgument(2.5, 10)).toBe(3);
    expect(normalizePageArgument(2.4, 10)).toBe(2);
    expect(normalizePageArgument(-4, 10)).toBe(1);
    expect(normalizePageArgument(99, 10)).toBe(10);
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, "3", null, undefined]) {
      let thrown: unknown;
      try {
        normalizePageArgument(bad, 10);
      } catch (error) {
        thrown = error;
      }
      expect(thrown).toBeInstanceOf(FlipBookError);
      expect((thrown as FlipBookError).code).toBe("INVALID_ARGUMENT");
    }
  });

  it("steps by spread on desktop, anchored on the lowest page", () => {
    expect(sequentialTarget(1, 7, "desktop", 1)).toBe(2);
    expect(sequentialTarget(3, 7, "desktop", 1)).toBe(4);
    expect(sequentialTarget(5, 7, "desktop", 1)).toBe(6);
    expect(sequentialTarget(7, 7, "desktop", 1)).toBeNull();
    expect(sequentialTarget(6, 7, "desktop", 1)).toBeNull();
    expect(sequentialTarget(5, 7, "desktop", -1)).toBe(2);
    expect(sequentialTarget(3, 7, "desktop", -1)).toBe(1);
    expect(sequentialTarget(1, 7, "desktop", -1)).toBeNull();
  });

  it("steps by page on mobile and knows spread boundaries", () => {
    expect(sequentialTarget(2, 5, "mobile", 1)).toBe(3);
    expect(sequentialTarget(5, 5, "mobile", 1)).toBeNull();
    expect(sequentialTarget(1, 5, "mobile", -1)).toBeNull();
    expect(crossesSpread(2, 3)).toBe(false);
    expect(crossesSpread(3, 4)).toBe(true);
    expect(crossesSpread(1, 2)).toBe(true);
  });

  it("plans forward and backward sheets for 1, 2, 3 and longer books", () => {
    expect(planTurn(0, true, 1, "ltr")).toBeNull();
    expect(planTurn(0, false, 5, "ltr")).toBeNull();

    expect(planTurn(0, true, 2, "ltr")).toEqual({
      fromSpread: 0,
      toSpread: 1,
      forward: true,
      restSide: "right",
      restPage: 1,
      turnedPage: 2,
      underPage: null,
      landingPage: null,
    });
    expect(planTurn(0, true, 3, "ltr")?.underPage).toBe(3);
    expect(planTurn(1, true, 6, "ltr")).toEqual({
      fromSpread: 1,
      toSpread: 2,
      forward: true,
      restSide: "right",
      restPage: 3,
      turnedPage: 4,
      underPage: 5,
      landingPage: 2,
    });
    expect(planTurn(1, true, 4, "ltr")?.underPage).toBeNull();
    expect(planTurn(1, true, 3, "ltr")).toBeNull();

    expect(planTurn(2, false, 6, "ltr")).toEqual({
      fromSpread: 2,
      toSpread: 1,
      forward: false,
      restSide: "left",
      restPage: 4,
      turnedPage: 3,
      underPage: 2,
      landingPage: 5,
    });
    expect(planTurn(1, false, 2, "ltr")).toMatchObject({ restPage: 2, turnedPage: 1, underPage: null, landingPage: null });

    // RTL mirrors the sides and nothing else.
    expect(planTurn(1, true, 6, "rtl")).toMatchObject({ restSide: "left", restPage: 3, turnedPage: 4 });
    expect(planTurn(2, false, 6, "rtl")).toMatchObject({ restSide: "right", restPage: 4, turnedPage: 3 });
  });
});

describe("tuning", () => {
  it("has the documented defaults", () => {
    expect(defaultTuning()).toEqual({
      curlRadius: 0.085,
      cornerSag: 0.72,
      minimumLift: 0.018,
      cornerPull: 0.2,
      shadowOpacity: 0.42,
      turnDuration: 620,
      minimumTurnFrames: 38,
      gestureSlop: 6,
      releaseThreshold: 0.34,
      mobilePeek: 0.075,
      qualityScale: 1.08,
      meshQuality: 1,
    });
  });

  it("clamps finite values and rounds integer settings", () => {
    const next = applyTuning(defaultTuning(), {
      curlRadius: 9,
      cornerSag: -1,
      turnDuration: 10,
      minimumTurnFrames: 40.6,
      meshQuality: 0,
    });
    expect(next.curlRadius).toBe(TUNING_RANGES.curlRadius.max);
    expect(next.cornerSag).toBe(0);
    expect(next.turnDuration).toBe(180);
    expect(next.minimumTurnFrames).toBe(41);
    expect(next.meshQuality).toBe(0.5);
    expect(applyTuning(defaultTuning(), { minimumTurnFrames: 99 }).minimumTurnFrames).toBe(60);
  });

  it("rejects NaN and infinity and ignores unknown keys", () => {
    expect(() => applyTuning(defaultTuning(), { curlRadius: Number.NaN })).toThrow(FlipBookError);
    expect(() => applyTuning(defaultTuning(), { turnDuration: Number.POSITIVE_INFINITY })).toThrow(FlipBookError);
    const next = applyTuning(defaultTuning(), { nonsense: 3, cornerSag: undefined } as never);
    expect(next).toEqual(TUNING_DEFAULTS);
  });

  it("does not mutate the object it is given", () => {
    const current = defaultTuning();
    applyTuning(current, { cornerSag: 0 });
    expect(current.cornerSag).toBe(0.72);
  });

  it("normalizes option limits", () => {
    expect(clampZoom(0.1)).toBe(0.75);
    expect(clampZoom(9)).toBe(4);
    expect(normalizePreloadRadius(undefined)).toBe(2);
    expect(normalizePreloadRadius(-3)).toBe(0);
    expect(normalizePreloadRadius(2.6)).toBe(3);
    expect(normalizeCacheSize(undefined)).toBe(8);
    expect(normalizeCacheSize(1)).toBe(4);
    expect(normalizeMaxPixelRatio(0.2)).toBe(1);
    expect(normalizeMaxPixelRatio(undefined)).toBe(2);
    expect(normalizeMaxTextureHeight(100)).toBe(512);
    expect(normalizeMaxTextureHeight(undefined)).toBe(4096);
  });
});

describe("automatic turns", () => {
  const dims: PageDims = { w: 1, h: 1 / 0.7 };
  const tuning = foldTuning(TUNING_DEFAULTS, dims);

  it("starts at rest and ends mirrored for both corners", () => {
    for (const corner of ["top", "bottom"] as const) {
      const grab = cornerGrab(dims, corner);
      const path = canonicalPath(dims, TUNING_DEFAULTS.cornerPull, corner);
      expect(path(0).x).toBeCloseTo(grab.u, 12);
      expect(path(0).y).toBeCloseTo(grab.v, 12);
      expect(path(1).x).toBeCloseTo(-grab.u, 12);
      expect(path(1).y).toBeCloseTo(grab.v, 12);
      expect(pathEnd(grab, true)).toEqual({ x: -grab.u, y: grab.v });
      expect(pathEnd(grab, false)).toEqual({ x: grab.u, y: grab.v });
      // The bell pulls the corner toward the middle of the page.
      const mid = path(0.5);
      expect(Math.abs(mid.y)).toBeLessThan(Math.abs(grab.v));
    }
  });

  it("mirrors top and bottom turns", () => {
    const top = canonicalPath(dims, 0.2, "top");
    const bottom = canonicalPath(dims, 0.2, "bottom");
    for (const tau of [0.1, 0.35, 0.5, 0.8]) {
      const a = solveFold(dims, tuning, cornerGrab(dims, "top"), top(tau));
      const b = solveFold(dims, tuning, cornerGrab(dims, "bottom"), bottom(tau));
      const pa = foldPoint(a, dims, 0.8, 0.3);
      const pb = foldPoint(b, dims, 0.8, -0.3);
      expect(pa[0]).toBeCloseTo(pb[0], 9);
      expect(pa[1]).toBeCloseTo(-pb[1], 9);
      expect(pa[2]).toBeCloseTo(pb[2], 9);
    }
  });

  it("spreads sheet travel evenly over a turn", () => {
    const grab = cornerGrab(dims, "bottom");
    const path = canonicalPath(dims, TUNING_DEFAULTS.cornerPull, "bottom");
    const table = buildTravelTable(dims, tuning, grab, path);
    expect(table.total).toBeGreaterThan(1.9);
    expect(tauForFraction(table, 0)).toBe(0);
    expect(tauForFraction(table, 1)).toBe(1);

    const poses = 38;
    const travels: number[] = [];
    let previous = samplePose(solveFold(dims, tuning, grab, path(0)), dims);
    for (let i = 1; i <= poses; i++) {
      const tau = tauForFraction(table, timingRamp(i / poses));
      const current = samplePose(solveFold(dims, tuning, grab, path(tau)), dims);
      travels.push(poseTravel(previous, current, dims));
      previous = current;
    }
    const mean = travels.reduce((sum, value) => sum + value, 0) / travels.length;
    const worst = Math.max(...travels);
    // No pose carries a disproportionate share of the motion.
    expect(worst).toBeLessThan(mean * 1.6);
    expect(worst).toBeLessThan(0.1);
  });

  it("has a monotonic, C1 timing ramp", () => {
    expect(timingRamp(0)).toBe(0);
    expect(timingRamp(1)).toBe(1);
    expect(timingRamp(0.5)).toBeCloseTo(0.5, 12);
    let previous = 0;
    let previousSlope = 0;
    for (let i = 1; i <= 1000; i++) {
      const value = timingRamp(i / 1000);
      const slope = (value - previous) * 1000;
      expect(value).toBeGreaterThanOrEqual(previous);
      if (i > 1) expect(Math.abs(slope - previousSlope)).toBeLessThan(0.02);
      previous = value;
      previousSlope = slope;
    }
  });

  it("starts a settle exactly at the held pose", () => {
    const grab = { u: 0.8, v: -0.2 };
    const held = solveFold(dims, tuning, grab, { x: 0.1, y: 0.05 });
    const path = settlePath({ x: held.targetX, y: held.targetY }, pathEnd(grab, true));
    const first = solveFold(dims, tuning, grab, path(0));
    expect(first).toEqual(held);
    const last = solveFold(dims, tuning, grab, path(1));
    expect(last.progress).toBeCloseTo(1, 9);
  });

  it("keeps real-time pacing on a steadily slow display", () => {
    const clock = new TurnClock();
    for (let i = 0; i < 9; i++) clock.observe(31.25);
    // 32 Hz: every frame advances by its full interval, so 620 ms takes 620 ms.
    expect(clock.advance(31.25, 620, 38)).toBe(31.25);
    // An isolated hitch is limited instead of leaping the sheet ahead.
    expect(clock.advance(400, 620, 38)).toBeLessThan(45);
  });

  it("limits a hitch on a fast display without a pose-count floor", () => {
    const clock = new TurnClock();
    for (let i = 0; i < 9; i++) clock.observe(16.7);
    expect(clock.advance(16.7, 620, 38)).toBe(16.7);
    expect(clock.advance(250, 620, 38)).toBeCloseTo(16.7 * 1.35, 5);
    expect(clock.advance(0, 620, 38)).toBe(0);
    // A single long frame does not change the steady estimate.
    clock.observe(400);
    expect(clock.steadyInterval).toBeCloseTo(16.7, 5);
  });
});

describe("gestures", () => {
  const base = {
    slop: 6,
    pointerType: "touch",
    zoomed: false,
    pressSide: 1 as const,
    pressDepth: 0.8,
    sideCanTurn: true,
  };

  it("stays pending inside the slop", () => {
    expect(classifyGesture({ ...base, dx: -4, dy: 3 }).kind).toBe("pending");
  });

  it("leaves mostly vertical touch movement to the page", () => {
    expect(classifyGesture({ ...base, dx: -5, dy: 30 }).kind).toBe("scroll");
  });

  it("grabs the page for an outer-half drag toward the binding", () => {
    expect(classifyGesture({ ...base, dx: -20, dy: 4 })).toEqual({ kind: "drag", swipe: -1 });
    expect(classifyGesture({ ...base, pressSide: -1, dx: 20, dy: 4 })).toEqual({ kind: "drag", swipe: 1 });
  });

  it("uses the canonical path for inner-half and outward gestures", () => {
    expect(classifyGesture({ ...base, pressDepth: 0.3, dx: -20, dy: 2 })).toEqual({ kind: "flick", swipe: -1 });
    expect(classifyGesture({ ...base, dx: 20, dy: 2 })).toEqual({ kind: "flick", swipe: 1 });
    expect(classifyGesture({ ...base, sideCanTurn: false, dx: -20, dy: 2 }).kind).toBe("flick");
    expect(classifyGesture({ ...base, pressSide: 0, pressDepth: 0, dx: -20, dy: 2 }).kind).toBe("flick");
  });

  it("pans when zoomed in", () => {
    expect(classifyGesture({ ...base, zoomed: true, dx: -20, dy: 20 }).kind).toBe("pan");
  });

  it("lets a mouse drag a corner vertically but ignores other vertical drags", () => {
    expect(classifyGesture({ ...base, pointerType: "mouse", dx: -8, dy: 40 }).kind).toBe("drag");
    expect(classifyGesture({ ...base, pointerType: "mouse", pressDepth: 0.2, dx: -8, dy: 40 }).kind).toBe("pending");
  });

  it("completes or cancels a release from progress and velocity", () => {
    expect(releaseCompletes(0.5, 0, 0.34)).toBe(true);
    expect(releaseCompletes(0.2, 0, 0.34)).toBe(false);
    expect(releaseCompletes(0.1, 2, 0.34)).toBe(true);
    expect(releaseCompletes(0.9, -2, 0.34)).toBe(false);
  });
});
