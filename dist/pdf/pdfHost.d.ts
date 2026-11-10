import type { OutlineNode, PageText } from "../types";
import type { HostCallbacks, HostDocumentInfo, HostErrorPayload, HostOpenParams, HostRenderParams, HostRenderResult, RawLink } from "./protocol";
export declare function describeHostError(error: unknown, phase: "open" | "render" | "data"): HostErrorPayload;
export declare class PdfHost {
    private readonly callbacks;
    private task;
    private doc;
    private parser;
    private readonly renders;
    private destroyed;
    constructor(callbacks: HostCallbacks);
    open(params: HostOpenParams): Promise<HostDocumentInfo>;
    private openWith;
    private fail;
    private requireDoc;
    render(requestId: number, params: HostRenderParams): Promise<HostRenderResult>;
    cancelRender(requestId: number): void;
    /**
     * Plain text in reading order with one positioned run per text item.
     * Rectangles are normalized to the final oriented page (crop box and
     * rotation applied), measured from its top-left corner.
     */
    getText(pageNumber: number): Promise<PageText>;
    getLinks(pageNumber: number): Promise<RawLink[]>;
    private resolveDestination;
    getOutline(): Promise<OutlineNode[]>;
    getLabels(): Promise<string[] | null>;
    private closeDocument;
    destroy(): Promise<void>;
}
