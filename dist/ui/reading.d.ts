import type { FlipBookStrings, PageText } from "../types";
/**
 * Text view: the active pages as real, stable text in reading order, with no
 * animation. While it is open the canvas is hidden from assistive technology,
 * so the document is announced once. Plain extraction keeps paragraphs and
 * language when the source provides them; it does not invent headings or
 * tables the source never marked up.
 */
export interface ReadingHost {
    strings(): FlipBookStrings;
    visiblePages(): number[];
    pageCount(): number;
    pageLabel(page: number): string;
    pageText(page: number): Promise<PageText | null>;
    step(direction: 1 | -1): void;
    canStep(direction: 1 | -1): boolean;
    onClose(): void;
}
export declare class ReadingView {
    private readonly host;
    readonly element: HTMLElement;
    private readonly body;
    private readonly heading;
    private readonly previous;
    private readonly next;
    private token;
    private open;
    constructor(host: ReadingHost);
    get isOpen(): boolean;
    show(): void;
    hide(): void;
    /** Reload the text for the pages now showing. */
    refresh(): void;
    destroy(): void;
}
