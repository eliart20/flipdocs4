import { describe, expect, it } from "vitest";
import { flatFold, foldPoint, foldTuning, sampleStretch, solveFold, turnEnvelope } from "../src/core/fold";
import type { FoldState, PageDims } from "../src/core/fold";
import { DIAGNOSTIC_POSES, DIAGNOSTIC_POSE_NAMES } from "../src/core/poses";
import { TUNING_DEFAULTS } from "../src/tuning";

const dims: PageDims = { w: 1, h: 1 / 0.7 };
const tuned = (overrides: Partial<{ curlRadius: number; minimumLift: number; cornerSag: number }> = {}) =>
  foldTuning({ ...TUNING_DEFAULTS, ...overrides }, dims);
const full = tuned({ cornerSag: 1 });
const noSag = tuned({ cornerSag: 0 });

const poseFold = (name: (typeof DIAGNOSTIC_POSE_NAMES)[number], tuning = full): FoldState => {
  const spec = DIAGNOSTIC_POSES[name];
  return solveFold(
    dims,
    tuning,
    { u: spec.grab[0] * dims.w, v: spec.grab[1] * dims.h },
    { x: spec.target[0] * dims.w, y: spec.target[1] * dims.h },
  );
};

/** Deterministic pseudo-random numbers. */
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

describe("fold solver", () => {
  it("leaves the sheet flat when the target is the grab", () => {
    const fold = solveFold(dims, full, { u: 1, v: -dims.h / 2 }, { x: 1, y: -dims.h / 2 });
    expect(fold.active).toBe(false);
    expect(foldPoint(fold, dims, 0.4, 0.1)).toEqual([0.4, 0.1, 0]);
    expect(foldPoint(flatFold(), dims, 0.9, -0.2)).toEqual([0.9, -0.2, 0]);
  });

  it("puts a reachable grab exactly on its target", () => {
    const random = rng(7);
    for (let i = 0; i < 400; i++) {
      const grab = { u: 0.3 + 0.7 * random(), v: (random() - 0.5) * dims.h };
      const target = { x: grab.u - 2 * grab.u * random() * 0.9, y: grab.v + (random() - 0.5) * 0.4 };
      const fold = solveFold(dims, noSag, grab, target);
      if (fold.clamped || !fold.active) continue;
      const [x, y, z] = foldPoint(fold, dims, grab.u, grab.v);
      expect(x).toBeCloseTo(target.x, 6);
      expect(y).toBeCloseTo(target.y, 6);
      expect(z).toBeCloseTo(fold.grabZ, 6);
    }
  });

  it("keeps the whole binding edge fixed in every pose", () => {
    const random = rng(11);
    const folds: FoldState[] = DIAGNOSTIC_POSE_NAMES.map((name) => poseFold(name));
    for (let i = 0; i < 400; i++) {
      folds.push(
        solveFold(
          dims,
          full,
          { u: random(), v: (random() - 0.5) * dims.h },
          { x: (random() * 2.6 - 1.3) * dims.w, y: (random() * 2.4 - 1.2) * dims.h },
        ),
      );
    }
    for (const fold of folds) {
      for (let j = 0; j <= 40; j++) {
        const v = (j / 40 - 0.5) * dims.h;
        const [x, y, z] = foldPoint(fold, dims, 0, v);
        expect(Math.abs(x)).toBeLessThan(1e-9);
        expect(y).toBeCloseTo(v, 9);
        expect(Math.abs(z)).toBeLessThan(1e-9);
      }
    }
  });

  it("never stretches the sheet without sag", () => {
    for (const name of DIAGNOSTIC_POSE_NAMES) {
      expect(sampleStretch(poseFold(name, noSag), dims)).toBeLessThanOrEqual(1 + 1e-9);
    }
  });

  it("keeps sampled local stretch under 1% at full sag", () => {
    for (const name of DIAGNOSTIC_POSE_NAMES) {
      expect(sampleStretch(poseFold(name, full), dims, 160, 112)).toBeLessThan(1.01);
    }
    const random = rng(23);
    for (let i = 0; i < 250; i++) {
      const fold = solveFold(
        dims,
        full,
        { u: 0.1 + 0.9 * random(), v: (random() - 0.5) * dims.h },
        { x: (random() * 2.4 - 1.2) * dims.w, y: (random() * 2 - 1) * dims.h },
      );
      expect(sampleStretch(fold, dims, 64, 48)).toBeLessThan(1.01);
    }
  });

  it("makes sag a depth-only change that spares the grab and the binding", () => {
    for (const name of DIAGNOSTIC_POSE_NAMES) {
      const withSag = poseFold(name, full);
      const without = poseFold(name, noSag);
      let moved = 0;
      for (let j = 0; j <= 24; j++) {
        for (let i = 0; i <= 24; i++) {
          const u = (i / 24) * dims.w;
          const v = (j / 24 - 0.5) * dims.h;
          const a = foldPoint(withSag, dims, u, v);
          const b = foldPoint(without, dims, u, v);
          expect(a[0]).toBe(b[0]);
          expect(a[1]).toBe(b[1]);
          expect(a[2]).toBeLessThanOrEqual(b[2]);
          expect(a[2]).toBeGreaterThanOrEqual(0);
          moved = Math.max(moved, b[2] - a[2]);
        }
      }
      const grab = foldPoint(withSag, dims, withSag.grabU, withSag.grabV);
      const grabFlat = foldPoint(without, dims, without.grabU, without.grabV);
      expect(grab[2]).toBe(grabFlat[2]);
      if (name.endsWith("mid-turn")) expect(moved).toBeGreaterThan(0.005);
    }
  });

  it("takes the exact no-sag path when cornerSag is 0", () => {
    const fold = poseFold("forward-mid-turn", noSag);
    expect(fold.sag).toBe(0);
  });

  it("fades sag and shading to nothing at both resting ends", () => {
    const grab = { u: 1, v: -dims.h / 2 };
    const start = solveFold(dims, full, grab, { x: 0.99999, y: grab.v });
    const end = solveFold(dims, full, grab, { x: -0.99999, y: grab.v });
    expect(start.sag).toBeLessThan(1e-5);
    expect(end.sag).toBeLessThan(1e-5);
    expect(turnEnvelope(0)).toBe(0);
    expect(turnEnvelope(1)).toBe(0);
    expect(turnEnvelope(0.5)).toBe(1);
  });

  it("lands every point on its mirrored resting position", () => {
    const grab = { u: 1, v: -dims.h / 2 };
    const fold = solveFold(dims, full, grab, { x: -1, y: grab.v });
    expect(fold.progress).toBeCloseTo(1, 9);
    for (let j = 0; j <= 10; j++) {
      for (let i = 0; i <= 10; i++) {
        const u = i / 10;
        const v = (j / 10 - 0.5) * dims.h;
        const [x, y, z] = foldPoint(fold, dims, u, v);
        expect(x).toBeCloseTo(-u, 6);
        expect(y).toBeCloseTo(v, 6);
        expect(z).toBeCloseTo(0, 6);
      }
    }
  });

  it("clamps unreachable targets continuously", () => {
    const grab = { u: 1, v: -dims.h / 2 };
    // Sweep the pointer from well inside reach to far outside it. The far
    // corner is on a long lever, so judge continuity by refinement: ten times
    // finer steps must give ten times smaller moves, with no step left over.
    const worstMove = (steps: number): number => {
      let previous: [number, number, number] | null = null;
      let worst = 0;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const fold = solveFold(dims, full, grab, { x: 0.6 - 0.4 * t, y: -0.5 * dims.h + 2.2 * dims.h * t });
        const corner = foldPoint(fold, dims, 1, dims.h / 2);
        if (previous) {
          worst = Math.max(
            worst,
            Math.hypot(corner[0] - previous[0], corner[1] - previous[1], corner[2] - previous[2]),
          );
        }
        previous = corner;
      }
      return worst;
    };
    const coarse = worstMove(600);
    const fine = worstMove(6000);
    expect(coarse).toBeLessThan(0.06);
    expect(fine).toBeLessThan(coarse / 8);
    const far = solveFold(dims, full, grab, { x: 0.3, y: 5 });
    expect(far.clamped).toBe(true);
    // Paper cannot stretch: the corner stays within its distance of the lower binding corner.
    expect(Math.hypot(far.targetX, far.targetY + dims.h / 2)).toBeLessThanOrEqual(1 + 1e-6);
  });

  it("starts an interior grab without a jump", () => {
    const grab = { u: 0.7, v: 0.1 };
    const fold = solveFold(dims, full, grab, { x: 0.7 - 1e-4, y: 0.1 });
    for (const [u, v] of [
      [1, 0.5 * dims.h],
      [1, -0.5 * dims.h],
      [0.85, 0],
      [0.5, 0.2],
    ]) {
      const [x, y, z] = foldPoint(fold, dims, u, v);
      expect(Math.hypot(x - u, y - v, z)).toBeLessThan(0.05);
    }
  });

  it("retraces the same shape when a drag reverses", () => {
    const grab = { u: 0.9, v: -0.4 };
    const target = { x: 0.1, y: 0.05 };
    const first = solveFold(dims, full, grab, target);
    solveFold(dims, full, grab, { x: -0.6, y: 0.3 });
    const again = solveFold(dims, full, grab, target);
    expect(again).toEqual(first);
  });

  it("holds a minimum lift mid-turn and none at the ends", () => {
    const grab = { u: 1, v: -dims.h / 2 };
    // A target right on the reach boundary would otherwise crease flat.
    const mid = solveFold(dims, full, grab, { x: 0, y: -dims.h / 2 + 1 });
    expect(2 * mid.r).toBeGreaterThanOrEqual(full.minLift * 0.95);
    const end = solveFold(dims, full, grab, { x: -1, y: -dims.h / 2 });
    expect(end.r).toBeLessThan(1e-6);
  });

  it("uses the nominal radius for a plain corner peel", () => {
    const fold = poseFold("forward-mid-turn", full);
    expect(fold.r).toBeCloseTo(full.radius, 9);
    expect(fold.clamped).toBe(false);
  });
});
