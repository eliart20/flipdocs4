/**
 * Page preparation queue. One job runs at a time (a source may raise that for
 * network-bound work), always the most urgent one: the active turn, then the
 * visible pages, then speculative preload and upgrades.
 *
 * A ceiling suspends everything less urgent than it. Raising the bar during a
 * turn aborts a running speculative job and keeps upgrades from competing
 * with the sheet; the caller asks again once the turn has settled. Identical
 * requests share one job, and a repeat request can only make a job more
 * urgent.
 */
export declare const PRIORITY: {
    readonly TURN: 0;
    readonly VISIBLE: 1;
    readonly VISIBLE_UPGRADE: 2;
    readonly PRELOAD: 3;
    readonly PRELOAD_UPGRADE: 4;
    readonly BACKGROUND: 5;
};
export interface RasterJob<T> {
    /** Identity for de-duplication. */
    key: string;
    page: number;
    priority: number;
    /** Short description for diagnostics. */
    label: string;
    run: (signal: AbortSignal) => Promise<T>;
}
export declare class RasterQueue<T> {
    private concurrency;
    private readonly entries;
    private sequence;
    private active;
    private ceiling;
    private order;
    private destroyed;
    constructor(concurrency?: number);
    setConcurrency(value: number): void;
    /** Tie-break among equally urgent jobs; lower runs first. */
    setOrder(order: (page: number) => number): void;
    request(job: RasterJob<T>): Promise<T>;
    /**
     * Run nothing less urgent than `priority`. A running job below the bar is
     * aborted; queued ones below it are dropped.
     */
    setCeiling(priority: number): void;
    get currentCeiling(): number;
    cancel(predicate: (job: RasterJob<T>) => boolean): void;
    cancelAll(): void;
    destroy(): void;
    has(key: string): boolean;
    get runningLabel(): string | null;
    get queued(): number;
    get idle(): boolean;
    private abort;
    private pump;
    private start;
    private finish;
}
