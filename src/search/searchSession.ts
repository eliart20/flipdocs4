import { PRIORITY } from "../cache/rasterQueue";
import type { PageStore } from "../engine/pageStore";
import { isCancellation } from "../errors";
import { spawnSearchWorker } from "../runtimeAssets";
import type { PageText, SearchHandle, SearchMatch, SearchOptions, SearchProgress } from "../types";
import type { SearchWorkerRequest, SearchWorkerResponse } from "./protocol";
import { SearchIndex, resolveSearchOptions } from "./searchIndex";
import type { ResolvedSearchOptions } from "./searchIndex";

/**
 * Progressive search over a document. Pages are read nearest-first, starting
 * with the ones on screen, and matched in a worker. Text extraction is queued
 * behind navigation work, so a search never competes with a page turn.
 *
 * A scan that has not covered every page is never reported as complete: the
 * caller sees how many pages are accounted for and decides what to say.
 */

interface Matcher {
  index(page: number, text: PageText): void;
  search(page: number, query: string, options: ResolvedSearchOptions, maxMatches: number): Promise<SearchMatch[]>;
  clear(): void;
  destroy(): void;
}

function localMatcher(): Matcher {
  const index = new SearchIndex();
  return {
    index: (page, text) => index.setPage(page, text),
    search: async (page, query, options, maxMatches) => index.searchPage(page, query, options, maxMatches),
    clear: () => index.clear(),
    destroy: () => index.clear(),
  };
}

function workerMatcher(): Matcher | null {
  let worker: Worker;
  try {
    worker = spawnSearchWorker();
  } catch {
    return null;
  }
  let nextId = 1;
  let fallback: Matcher | null = null;
  const stored = new Map<number, PageText>();
  const pending = new Map<number, { resolve: (matches: SearchMatch[]) => void; retry: () => void }>();

  const useFallback = () => {
    if (fallback) return fallback;
    // The worker never ran: match on this thread with the same index code.
    fallback = localMatcher();
    for (const [page, text] of stored) fallback.index(page, text);
    worker.terminate();
    for (const entry of [...pending.values()]) entry.retry();
    pending.clear();
    return fallback;
  };

  worker.onerror = (event) => {
    event.preventDefault?.();
    useFallback();
  };
  worker.onmessage = (event: MessageEvent<SearchWorkerResponse>) => {
    const message = event.data;
    if (message.type === "ready") return;
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    entry.resolve(message.type === "matches" ? message.matches : []);
  };
  const post = (message: SearchWorkerRequest) => worker.postMessage(message);

  return {
    index(page, text) {
      stored.set(page, text);
      if (fallback) fallback.index(page, text);
      else post({ type: "index", page, text });
    },
    search(page, query, options, maxMatches) {
      if (fallback) return fallback.search(page, query, options, maxMatches);
      return new Promise<SearchMatch[]>((resolve) => {
        const id = nextId++;
        pending.set(id, {
          resolve,
          retry: () => void useFallback().search(page, query, options, maxMatches).then(resolve),
        });
        post({ type: "search", id, page, query, options, maxMatches });
      });
    },
    clear() {
      stored.clear();
      if (fallback) fallback.clear();
      else post({ type: "clear" });
    },
    destroy() {
      stored.clear();
      for (const entry of pending.values()) entry.resolve([]);
      pending.clear();
      fallback?.destroy();
      worker.terminate();
    },
  };
}

/** Pages in the order a reader would want them searched. */
export function searchOrder(visible: number[], pageCount: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  const add = (page: number) => {
    if (page >= 1 && page <= pageCount && !seen.has(page)) {
      seen.add(page);
      order.push(page);
    }
  };
  for (const page of visible) add(page);
  const low = visible.length ? Math.min(...visible) : 1;
  const high = visible.length ? Math.max(...visible) : 1;
  for (let step = 1; order.length < pageCount; step++) {
    add(high + step);
    add(low - step);
    if (high + step > pageCount && low - step < 1) break;
  }
  return order;
}

export class SearchService {
  private matcher: Matcher | null = null;
  /** Pages whose text is already with the matcher (or known to have none). */
  private readonly indexed = new Set<number>();
  private readonly empty = new Set<number>();
  private active: { cancel(): void } | null = null;
  private indexedStore: PageStore | null = null;
  private destroyed = false;

  constructor(
    private readonly getStore: () => PageStore | null,
    private readonly getVisible: () => number[],
  ) {}

  /** Forget everything about the previous document. */
  reset(): void {
    this.active?.cancel();
    this.active = null;
    this.indexed.clear();
    this.empty.clear();
    this.matcher?.clear();
  }

  search(query: string, options?: SearchOptions, onProgress?: (progress: SearchProgress) => void): SearchHandle {
    this.active?.cancel();
    const store = this.getStore();
    const resolved = resolveSearchOptions(options);
    const total = store?.source.capabilities.search ? store.source.pageCount : 0;
    const progress: SearchProgress = {
      query,
      matches: [],
      indexedPages: 0,
      totalPages: total,
      failedPages: [],
      complete: false,
      truncated: false,
    };
    let stopped = false;
    let finish!: (value: SearchProgress) => void;
    const done = new Promise<SearchProgress>((resolve) => {
      finish = resolve;
    });
    const emit = () => {
      if (!stopped || progress.complete) onProgress?.({ ...progress, matches: progress.matches.slice() });
    };
    const handle: SearchHandle = {
      query,
      get progress() {
        return progress;
      },
      done,
      cancel: () => {
        if (stopped) return;
        stopped = true;
        finish(progress);
      },
    };
    this.active = handle;

    if (!store || total === 0 || !query.trim() || this.destroyed) {
      // Nothing to scan. An empty query is complete; a book without text is too.
      progress.complete = true;
      stopped = true;
      emit();
      finish(progress);
      return handle;
    }

    if (!this.matcher) this.matcher = workerMatcher() ?? localMatcher();
    const matcher = this.matcher;
    if (this.indexedStore !== store) {
      // A different document (or a restarted one): index from scratch.
      this.indexedStore = store;
      this.indexed.clear();
      this.empty.clear();
      matcher.clear();
    }
    const order = searchOrder(this.getVisible(), total);

    void (async () => {
      let lastEmit = 0;
      for (const page of order) {
        if (stopped || this.destroyed || this.getStore() !== store) break;
        let failed = false;
        try {
          if (!this.indexed.has(page)) {
            const text = await store.text(page, PRIORITY.BACKGROUND);
            if (stopped) break;
            if (text && text.text) matcher.index(page, text);
            else this.empty.add(page);
            this.indexed.add(page);
          }
          if (!this.empty.has(page)) {
            const remaining = resolved.limit - progress.matches.length;
            const matches = await matcher.search(page, query, resolved, remaining);
            if (stopped) break;
            if (matches.length > 0) {
              progress.matches.push(...matches);
              progress.matches.sort((a, b) => a.page - b.page || a.start - b.start);
            }
          }
        } catch (error) {
          if (isCancellation(error)) {
            // Suspended by a page turn: wait a moment and take this page again.
            await new Promise((resolve) => setTimeout(resolve, 120));
            order.push(page);
            continue;
          }
          progress.failedPages.push(page);
          failed = true;
        }
        if (!failed) progress.indexedPages++;
        if (progress.matches.length >= resolved.limit) {
          progress.truncated = true;
          break;
        }
        const time = performance.now();
        if (time - lastEmit > 60) {
          lastEmit = time;
          emit();
        }
      }
      if (stopped) return;
      progress.complete = !progress.truncated && progress.indexedPages + progress.failedPages.length >= total;
      stopped = true;
      emit();
      finish(progress);
    })();

    return handle;
  }

  destroy(): void {
    this.destroyed = true;
    this.active?.cancel();
    this.matcher?.destroy();
    this.matcher = null;
  }
}
