/**
 * The page fold. One solver serves hover, dragging, automatic turns and
 * diagnostics; the vertex shader in render/foldGlsl.ts repeats `foldPoint`
 * line for line.
 *
 * Frame: the sheet is described in material coordinates (u, v). u runs from
 * the binding edge (u = 0) to the free edge (u = w); v runs from -h/2 to
 * +h/2. At rest a material point sits at (u, v, 0); fully turned it sits at
 * (-u, v, 0). A sheet that rests on the left side of the book is the same
 * thing mirrored in x by the renderer.
 *
 * Model: a developable cylindrical fold. A fold line { m : n·m = d } splits
 * the sheet. Material on the binding side (s = n·m - d ≤ 0) does not move.
 * Material past the line wraps a half cylinder of radius r lying on the page
 * (0 < s < πr), and whatever is left continues flat at height 2r, reflected
 * back over the fixed part (s ≥ πr). The map is an isometry, so the paper
 * never stretches, and because the whole binding edge is kept on the fixed
 * side of the line it stays put analytically; nothing is blended or corrected
 * afterwards.
 *
 * Solving: the caller names a material point (the grab) and where it should
 * be (the target). The fold normal is the direction from target to grab. Let
 * L be their distance and S = n·g - |n_y|·h/2 the room between the grab and
 * the nearest binding corner, measured along n. The grab reaches the target
 * exactly when it sits s past the fold line, where
 *
 *   L = s - r·sin(s/r)   (grab still on the cylinder, L < s)
 *   L = 2s - πr          (grab on the reflected flap, L ≥ s)
 *
 * and the binding stays fixed exactly when s ≤ S. That leaves one free
 * choice. At the nominal radius the fold hugs the grab (a corner peel). When
 * the sheet overhangs the grab along n (an interior grab), a tight fold would
 * throw that overhang across the page for an infinitesimal pull, so the
 * solver slides s toward S instead, which is the same as growing the radius:
 * the sheet first bends gently from the binding and tightens as the pull
 * grows. Past the nominal fold's reach (s would exceed S) the line stays at
 * the binding corner and the radius shrinks, reaching zero exactly on the
 * boundary L = 2S, which is where taut paper would stop. (The solver stops a
 * little short of it, keeping a small roll, except in the two resting
 * states; see the reserve below.) That boundary is the
 * intersection of two discs centred on the binding corners; targets outside
 * it are pulled back along the ray from the binding point level with the
 * grab, which is continuous and leaves reachable targets untouched.
 */

export interface PageDims {
  /** Page width in world units. */
  w: number;
  /** Page height in world units. */
  h: number;
}

export interface FoldTuning {
  /** Nominal fold radius, world units (curlRadius × w). */
  radius: number;
  /** Minimum mid-turn lift 2r, world units (minimumLift × w). */
  minLift: number;
  /** Peak sag depth before the progress envelope, world units. */
  sagDepth: number;
}

export interface FoldState {
  /** False when the sheet is flat at rest. */
  active: boolean;
  nx: number;
  ny: number;
  d: number;
  r: number;
  grabU: number;
  grabV: number;
  /** Where the grab actually is, after reach clamping. */
  targetX: number;
  targetY: number;
  /** Height of the grab point above the page. */
  grabZ: number;
  /** 0 at rest, 1 fully turned. */
  progress: number;
  /** Sag depth with its envelope applied. */
  sag: number;
  /** 0…1 gate for every turn-only shading effect; 0 at both ends. */
  envelope: number;
  /** True when the requested target was out of reach. */
  clamped: boolean;
  /**
   * 0 for a fold at the nominal radius (a peel), up to 1 for a gentle bend
   * hinged at the binding (a grab with paper overhanging it, barely pulled).
   */
  bend: number;
}

export const SAG_MAX_DEPTH = 0.03;
/** Sag never removes more than this share of a point's height. */
export const SAG_FLOOR = 0.6;
const MIN_GRAB_U = 0.04;
const OVERHANG_GAIN = 2.5;
const MAX_RADIUS = 50;
const ASKEW_SPAN = 0.1;
const TINY = 1e-7;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth01 = (x: number) => x * x * (3 - 2 * x);

/** θ in [0, π] with θ - sin θ = x. */
function solveWrap(x: number): number {
  if (x <= 0) return 0;
  if (x >= Math.PI) return Math.PI;
  let lo = 0;
  let hi = Math.PI;
  for (let i = 0; i < 50; i++) {
    const mid = 0.5 * (lo + hi);
    if (mid - Math.sin(mid) < x) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

/** θ in (0, π] with sin θ / θ = y, for y in [0, 1). */
function inverseSinc(y: number): number {
  if (y <= 0) return Math.PI;
  if (y >= 1) return 0;
  let lo = 0;
  let hi = Math.PI;
  for (let i = 0; i < 50; i++) {
    const mid = 0.5 * (lo + hi);
    const value = mid < 1e-9 ? 1 : Math.sin(mid) / mid;
    if (value > y) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

export function flatFold(grabU = 0, grabV = 0): FoldState {
  return {
    active: false,
    nx: 1,
    ny: 0,
    d: 1e6,
    r: 0,
    grabU,
    grabV,
    targetX: grabU,
    targetY: grabV,
    grabZ: 0,
    progress: 0,
    sag: 0,
    envelope: 0,
    clamped: false,
    bend: 0,
  };
}

/**
 * 0…1: how far the grab is held off its own row, saturating at a tenth of
 * the page height. Zero in both resting states, where the sheet lies flat.
 */
function askewness(dy: number, h: number): number {
  return smooth01(clamp01(Math.abs(dy) / (ASKEW_SPAN * h)));
}

/** Shading gate: rises over the first 6% of a turn, falls over the last 14%. */
export function turnEnvelope(progress: number): number {
  const rise = smooth01(clamp01(progress / 0.06));
  const fall = 1 - smooth01(clamp01((progress - 0.86) / 0.14));
  return rise * fall;
}

/**
 * Place the grabbed material point as close to `target` as the paper allows
 * and return the fold that does it. Pure: equal inputs give equal folds, so
 * reversing a drag retraces the same shapes.
 */
export function solveFold(
  dims: PageDims,
  tuning: FoldTuning,
  grab: { u: number; v: number },
  target: { x: number; y: number },
): FoldState {
  const { w, h } = dims;
  const half = h / 2;
  const gu = Math.min(w, Math.max(MIN_GRAB_U * w, grab.u));
  const gv = Math.min(half, Math.max(-half, grab.v));

  // Reserve a little lift in the reach limit. It fades out only where the
  // sheet can really lie flat: at rest and fully turned, with the grab back
  // on its own row. A grab held off its row at either end is paper pulled
  // taut and askew; without the reserve it would crease dead flat there.
  const requested = clamp01((gu - target.x) / (2 * gu));
  const reserve =
    Math.min(tuning.minLift / 2, (0.6 * gu) / Math.PI) *
    Math.max(Math.sin(Math.PI * requested), askewness(target.y - gv, h));

  const topBudget = gu * gu + (gv - half) * (gv - half);
  const bottomBudget = gu * gu + (gv + half) * (gv + half);
  const slack = 1e-12 * w * w;
  const reachable = (x: number, y: number): boolean => {
    const cost = Math.PI * reserve * Math.hypot(gu - x, gv - y);
    return (
      x * x + (y - half) * (y - half) + cost <= topBudget + slack &&
      x * x + (y + half) * (y + half) + cost <= bottomBudget + slack
    );
  };

  let tx = target.x;
  let ty = target.y;
  let clamped = false;
  if (!reachable(tx, ty)) {
    // Pull back along the ray from the binding point level with the grab.
    clamped = true;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 44; i++) {
      const mid = 0.5 * (lo + hi);
      if (reachable(mid * target.x, gv + mid * (target.y - gv))) lo = mid;
      else hi = mid;
    }
    tx = lo * target.x;
    ty = gv + lo * (target.y - gv);
  }

  const dx = gu - tx;
  const dy = gv - ty;
  const L = Math.hypot(dx, dy);
  if (L < TINY * w) {
    const flat = flatFold(gu, gv);
    flat.clamped = clamped;
    return flat;
  }

  const nx = dx / L;
  const ny = dy / L;
  const along = nx * gu + ny * gv;
  // Room to the nearest binding corner; the fold line may not pass it.
  const room = Math.max(along - Math.abs(ny) * half, L / 2);

  const nominal = tuning.radius;
  const peel = L >= Math.PI * nominal ? (L + Math.PI * nominal) / 2 : nominal * solveWrap(L / nominal);

  let s: number;
  let bend = 0;
  if (peel >= room) {
    s = room;
  } else {
    const overhang = Math.max(0, Math.max(nx, 0) * w + Math.abs(ny) * half - along);
    bend = overhang > 1e-9 * w ? overhang / (overhang + OVERHANG_GAIN * L) : 0;
    s = peel + bend * (room - peel);
  }

  let r: number;
  if (L >= s) {
    r = Math.max(0, (2 * s - L) / Math.PI);
  } else {
    const theta = inverseSinc(1 - L / s);
    r = theta > 1e-9 ? s / theta : MAX_RADIUS * w;
  }
  r = Math.min(r, MAX_RADIUS * w);

  const progress = clamp01((gu - tx) / (2 * gu));
  let grabZ = 0;
  if (r > TINY * w) {
    const half_angle = Math.sin(Math.min(s / r, Math.PI) / 2);
    grabZ = s >= Math.PI * r ? 2 * r : 2 * r * half_angle * half_angle;
  }

  return {
    active: true,
    nx,
    ny,
    d: along - s,
    r,
    grabU: gu,
    grabV: gv,
    targetX: tx,
    targetY: ty,
    grabZ,
    progress,
    sag: tuning.sagDepth > 0 ? tuning.sagDepth * Math.sin(Math.PI * progress) : 0,
    // Paper held askew at either end is still off the page, so it keeps its shading.
    envelope: Math.max(turnEnvelope(progress), askewness(ty - gv, h)),
    clamped,
    bend,
  };
}

/**
 * Opposite-corner sag: a depth-only droop that grows along the fold line away
 * from the grab and only where the sheet has lifted. It is zero on the grab's
 * own ruling and on everything that has not left the page, so it moves
 * neither the grabbed point nor the binding edge, and it changes no x or y.
 */
function sagAt(fold: FoldState, dims: PageDims, u: number, v: number, s: number, z: number): number {
  if (fold.sag <= 0 || z <= 0) return 0;
  const tau = Math.abs(-fold.ny * (u - fold.grabU) + fold.nx * (v - fold.grabV)) / dims.h;
  const weight = smooth01(Math.min(1, tau));
  const lifted = fold.r > TINY * dims.w ? smooth01(clamp01(s / (Math.PI * fold.r))) : 1;
  return Math.min(fold.sag * weight * lifted, SAG_FLOOR * z);
}

/** Position of material point (u, v) under a fold. Writes into `out`. */
export function foldPoint(
  fold: FoldState,
  dims: PageDims,
  u: number,
  v: number,
  out: [number, number, number] = [0, 0, 0],
): [number, number, number] {
  if (!fold.active) {
    out[0] = u;
    out[1] = v;
    out[2] = 0;
    return out;
  }
  const s = fold.nx * u + fold.ny * v - fold.d;
  if (s <= 0) {
    out[0] = u;
    out[1] = v;
    out[2] = 0;
    return out;
  }
  const r = fold.r;
  let shift: number;
  let z: number;
  if (r <= TINY * dims.w) {
    shift = 2 * s;
    z = 0;
  } else if (s < Math.PI * r) {
    const theta = s / r;
    const halfSine = Math.sin(theta / 2);
    shift = s - r * Math.sin(theta);
    z = 2 * r * halfSine * halfSine;
  } else {
    shift = 2 * s - Math.PI * r;
    z = 2 * r;
  }
  out[0] = u - shift * fold.nx;
  out[1] = v - shift * fold.ny;
  out[2] = z - sagAt(fold, dims, u, v, s, z);
  return out;
}

/**
 * Largest ratio of deformed to rest length over the edges and diagonals of a
 * sampling grid. 1 means no stretch anywhere. Used by the geometry tests and
 * by diagnostics.
 */
export function sampleStretch(fold: FoldState, dims: PageDims, columns = 96, rows = 72): number {
  const { w, h } = dims;
  const points: Array<[number, number, number]> = new Array((columns + 1) * (rows + 1));
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= columns; i++) {
      points[j * (columns + 1) + i] = foldPoint(fold, dims, (i / columns) * w, (j / rows - 0.5) * h, [0, 0, 0]);
    }
  }
  const du = w / columns;
  const dv = h / rows;
  const diagonal = Math.hypot(du, dv);
  const dist = (a: [number, number, number], b: [number, number, number]) =>
    Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let worst = 0;
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= columns; i++) {
      const p = points[j * (columns + 1) + i];
      if (i < columns) worst = Math.max(worst, dist(p, points[j * (columns + 1) + i + 1]) / du);
      if (j < rows) worst = Math.max(worst, dist(p, points[(j + 1) * (columns + 1) + i]) / dv);
      if (i < columns && j < rows) {
        worst = Math.max(worst, dist(p, points[(j + 1) * (columns + 1) + i + 1]) / diagonal);
        worst = Math.max(
          worst,
          dist(points[j * (columns + 1) + i + 1], points[(j + 1) * (columns + 1) + i]) / diagonal,
        );
      }
    }
  }
  return worst;
}

/** Fold tuning in world units for a page of the given width. */
export function foldTuning(
  values: { curlRadius: number; minimumLift: number; cornerSag: number },
  dims: PageDims,
): FoldTuning {
  return {
    radius: values.curlRadius * dims.w,
    minLift: values.minimumLift * dims.w,
    sagDepth: values.cornerSag * SAG_MAX_DEPTH * dims.w,
  };
}
