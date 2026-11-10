import { cancelled } from "../errors";

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

export const PRIORITY = {
  TURN: 0,
  VISIBLE: 1,
  VISIBLE_UPGRADE: 2,
  PRELOAD: 3,
  PRELOAD_UPGRADE: 4,
  BACKGROUND: 5,
} as const;

export interface RasterJob<T> {
  /** Identity for de-duplication. */
  key: string;
  page: number;
  priority: number;
  /** Short description for diagnostics. */
  label: string;
  run: (signal: AbortSignal) => Promise<T>;
}

interface Entry<T> {
  job: RasterJob<T>;
  sequence: number;
  controller: AbortController;
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
  running: boolean;
  settled: boolean;
}

export class RasterQueue<T> {
  private readonly entries = new Map<string, Entry<T>>();
  private sequence = 0;
  private active = 0;
  private ceiling: number = PRIORITY.BACKGROUND;
  private order: (page: number) => number = () => 0;
  private destroyed = false;

  constructor(private concurrency = 1) {}

  setConcurrency(value: number): void {
    this.concurrency = Math.max(1, value);
    this.pump();
  }

  /** Tie-break among equally urgent jobs; lower runs first. */
  setOrder(order: (page: number) => number): void {
    this.order = order;
  }

  request(job: RasterJob<T>): Promise<T> {
    if (this.destroyed) return Promise.reject(cancelled("Page preparation"));
    const existing = this.entries.get(job.key);
    if (existing) {
      if (job.priority < existing.job.priority) {
        existing.job = { ...existing.job, priority: job.priority };
        this.pump();
      }
      return existing.promise;
    }
    let resolve!: (value: T) => void;
    let reject!: (reason: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    // Callers that only care about the cache side effect must not trip
    // unhandled-rejection reporting when a job is cancelled.
    promise.catch(() => {});
    this.entries.set(job.key, {
      job,
      sequence: this.sequence++,
      controller: new AbortController(),
      promise,
      resolve,
      reject,
      running: false,
      settled: false,
    });
    this.pump();
    return promise;
  }

  /**
   * Run nothing less urgent than `priority`. A running job below the bar is
   * aborted; queued ones below it are dropped.
   */
  setCeiling(priority: number): void {
    this.ceiling = priority;
    for (const entry of [...this.entries.values()]) {
      if (entry.job.priority > priority) this.abort(entry);
    }
    this.pump();
  }

  get currentCeiling(): number {
    return this.ceiling;
  }

  cancel(predicate: (job: RasterJob<T>) => boolean): void {
    for (const entry of [...this.entries.values()]) {
      if (predicate(entry.job)) this.abort(entry);
    }
    this.pump();
  }

  cancelAll(): void {
    this.cancel(() => true);
  }

  destroy(): void {
    this.destroyed = true;
    this.cancelAll();
  }

  has(key: string): boolean {
    return this.entries.has(key);
  }

  get runningLabel(): string | null {
    for (const entry of this.entries.values()) if (entry.running) return entry.job.label;
    return null;
  }

  get queued(): number {
    let count = 0;
    for (const entry of this.entries.values()) if (!entry.running) count++;
    return count;
  }

  get idle(): boolean {
    return this.entries.size === 0;
  }

  private abort(entry: Entry<T>): void {
    if (entry.settled) return;
    entry.settled = true;
    this.entries.delete(entry.job.key);
    entry.controller.abort();
    if (entry.running) this.active--;
    entry.reject(cancelled("Page preparation"));
  }

  private pump(): void {
    while (!this.destroyed && this.active < this.concurrency) {
      let best: Entry<T> | null = null;
      let bestRank = 0;
      for (const entry of this.entries.values()) {
        if (entry.running || entry.job.priority > this.ceiling) continue;
        const rank = this.order(entry.job.page);
        if (
          !best ||
          entry.job.priority < best.job.priority ||
          (entry.job.priority === best.job.priority &&
            (rank < bestRank || (rank === bestRank && entry.sequence < best.sequence)))
        ) {
          best = entry;
          bestRank = rank;
        }
      }
      if (!best) return;
      this.start(best);
    }
  }

  private start(entry: Entry<T>): void {
    entry.running = true;
    this.active++;
    let outcome: Promise<T>;
    try {
      outcome = entry.job.run(entry.controller.signal);
    } catch (error) {
      outcome = Promise.reject(error);
    }
    outcome.then(
      (value) => this.finish(entry, () => entry.resolve(value)),
      (error) => this.finish(entry, () => entry.reject(error)),
    );
  }

  private finish(entry: Entry<T>, settle: () => void): void {
    if (entry.settled) return; // aborted while running; its result is obsolete
    entry.settled = true;
    this.entries.delete(entry.job.key);
    this.active--;
    settle();
    this.pump();
  }
}
