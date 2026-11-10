import type { FlipBookHandle } from "../types";
/**
 * React component. React owns the root element's lifetime, class and props;
 * the viewer owns everything inside it. The engine is created in an effect
 * and destroyed in its cleanup, so a Strict Mode remount leaves exactly one.
 *
 * `source` reloads when its identity changes: memoize it. `startPage` is read
 * once, when the engine mounts; navigate later through the ref.
 */
export declare const FlipBook: import("react").ForwardRefExoticComponent<import("..").FlipBookOptions & import("react").RefAttributes<FlipBookHandle>>;
