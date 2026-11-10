import type { DiagnosticPose } from "../types";

/**
 * Deterministic diagnostic poses. Each is a grab and a target in normalized
 * material coordinates (u and x in page widths from the binding, v and y in
 * page heights from the page centre), so a pose means the same geometry at
 * any size. `forward` picks which sheet is held. Targets may lie outside the
 * reachable region on purpose: the solver's clamp is part of what is tested.
 */
export interface PoseSpec {
  forward: boolean;
  grab: readonly [number, number];
  target: readonly [number, number];
}

export const DIAGNOSTIC_POSES: Readonly<Record<DiagnosticPose, PoseSpec>> = Object.freeze({
  "forward-top-hover": { forward: true, grab: [1, 0.5], target: [0.9, 0.435] },
  "forward-bottom-hover": { forward: true, grab: [1, -0.5], target: [0.9, -0.435] },
  "backward-top-hover": { forward: false, grab: [1, 0.5], target: [0.9, 0.435] },
  "backward-bottom-hover": { forward: false, grab: [1, -0.5], target: [0.9, -0.435] },
  "forward-mid-turn": { forward: true, grab: [1, -0.5], target: [0, -0.3] },
  "backward-mid-turn": { forward: false, grab: [1, -0.5], target: [0, -0.3] },
  "near-spine-diagonal": { forward: true, grab: [0.16, -0.34], target: [0.03, -0.12] },
  "extreme-low-to-high": { forward: true, grab: [1, -0.5], target: [0.3, 0.7] },
});

export const DIAGNOSTIC_POSE_NAMES = Object.keys(DIAGNOSTIC_POSES) as DiagnosticPose[];

export const isDiagnosticPose = (value: unknown): value is DiagnosticPose =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(DIAGNOSTIC_POSES, value);
