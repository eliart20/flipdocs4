import type { FlipBookStrings } from "../types.js";
export declare const DEFAULT_STRINGS: Readonly<FlipBookStrings>;
export declare function resolveStrings(overrides: Partial<FlipBookStrings> | undefined): FlipBookStrings;
export declare function format(template: string, values: Record<string, string | number>): string;
