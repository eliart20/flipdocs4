import type { FlipBookSource, FlipbookInstance } from "./types";
declare class FlipBookElement extends HTMLElement {
    static observedAttributes: string[];
    private instance;
    private pendingSource;
    /** The live reader, once connected. */
    get flipbook(): FlipbookInstance | null;
    /** Set a source object directly instead of using attributes. */
    set source(value: FlipBookSource | null);
    get source(): FlipBookSource | null;
    private sourceFromAttributes;
    private options;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, previous: string | null, next: string | null): void;
}
export * from "./core";
export { FlipBookElement };
