/** Small DOM helpers. Text always goes in as text, never as markup. */
type Attributes = Record<string, string | number | boolean | null | undefined>;
export declare function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, attributes?: Attributes, ...children: Array<Node | string | null | undefined>): HTMLElementTagNameMap[K];
export declare function setAttributes(node: Element, attributes: Attributes): void;
export declare function svg(tag: string, attributes?: Attributes): SVGElement;
/** A 20 px line icon from path data. Decorative: hidden from assistive tech. */
export declare function icon(paths: string | string[]): SVGElement;
export declare const ICONS: {
    readonly left: "M15 5l-7 7 7 7";
    readonly right: "M9 5l7 7-7 7";
    readonly plus: "M12 5v14M5 12h14";
    readonly minus: "M5 12h14";
    readonly expand: readonly ["M4 9V4h5", "M20 9V4h-5", "M4 15v5h5", "M20 15v5h-5"];
    readonly shrink: readonly ["M9 4v5H4", "M15 4v5h5", "M9 20v-5H4", "M15 20v-5h5"];
    readonly grid: readonly ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"];
    readonly list: readonly ["M8 6h12", "M8 12h12", "M8 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"];
    readonly search: readonly ["M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14z", "M20 20l-4-4"];
    readonly text: readonly ["M5 6h14", "M5 10h14", "M5 14h10", "M5 18h7"];
    readonly cursor: readonly ["M9 4h6", "M9 20h6", "M12 4v16"];
    readonly fit: readonly ["M4 12h16", "M8 8l-4 4 4 4", "M16 8l4 4-4 4"];
    readonly external: readonly ["M14 5h5v5", "M19 5l-8 8", "M18 14v5H5V6h5"];
    readonly close: readonly ["M6 6l12 12", "M18 6L6 18"];
};
export declare function button(className: string, label: string, paths: string | readonly string[] | null, onClick: (event: MouseEvent) => void): HTMLButtonElement;
/** Unique id for aria relationships; scoped per reader by its own counter. */
export declare const uniqueId: (prefix: string) => string;
/**
 * Does this event target own its keys, so the reader's shortcuts must stay
 * out of the way? Fields do, and so does a dialog inside the reader (its
 * side panel). A dialog the host put the whole reader in does not count.
 */
export declare const ownsKeys: (target: EventTarget | null, reader: Element) => boolean;
export {};
