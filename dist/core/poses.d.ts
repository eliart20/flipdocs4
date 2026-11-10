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
export declare const DIAGNOSTIC_POSES: Readonly<Record<DiagnosticPose, PoseSpec>>;
export declare const DIAGNOSTIC_POSE_NAMES: DiagnosticPose[];
export declare const isDiagnosticPose: (value: unknown) => value is DiagnosticPose;
