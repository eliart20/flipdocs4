import { describe, expect, it } from "vitest";
import { PRIORITY, RasterQueue } from "../src/cache/rasterQueue";
import { SurfaceCache, createSurface, isBetter, textureBytes } from "../src/cache/surfaceCache";
import type { PageSurface } from "../src/cache/surfaceCache";
import { FlipBookError } from "../src/errors";
import { containFit } from "../src/render/frame";

/** A stand-in for an ImageBitmap that records being closed. */
const bitmap = () => {
  const image = { closed: 0, close() { this.closed++; } };
  return image as unknown as ImageBitmap & { closed: number };
};

const surface = (page: number, options: Partial<PageSurface> & { image?: ImageBitmap } = {}): PageSurface =>
  createSurface({
    page,
    image: options.image ?? bitmap(),
    width: options.width ?? 100,
    height: options.height ?? 200,
    generation: options.generation ?? 1,
    preview: options.preview,
    final: options.final,
    owned: options.owned,
  });

describe("surface cache", () => {
  it("evicts least recently used entries beyond the target", () => {
    const disposed: number[] = [];
    const cache = new SurfaceCache({ entryTarget: 3, onDispose: (entry) => disposed.push(entry.page) });
    for (const page of [1, 2, 3]) cache.put(surface(page));
    cache.get(1);
    cache.put(surface(4));
    expect(disposed).toEqual([2]);
    expect(cache.pages().sort()).toEqual([1, 3, 4]);
  });

  it("never evicts a pinned surface, even over the target", () => {
    const disposed: number[] = [];
    const cache = new SurfaceCache({ entryTarget: 2, onDispose: (entry) => disposed.push(entry.page) });
    cache.put(surface(1));
    cache.put(surface(2));
    cache.setPinned([1, 2]);
    cache.put(surface(3));
    cache.put(surface(4));
    // The newcomers are the only unpinned entries, so they are what goes.
    expect(cache.peek(1)).toBeDefined();
    expect(cache.peek(2)).toBeDefined();
    expect(disposed.every((page) => page > 2)).toBe(true);
    cache.setPinned([4]);
    expect(cache.size).toBeLessThanOrEqual(2);
  });

  it("disposes each surface exactly once and closes only owned images", () => {
    const owned = bitmap();
    const borrowed = bitmap();
    let calls = 0;
    const cache = new SurfaceCache({ entryTarget: 4, onDispose: () => calls++ });
    cache.put(surface(1, { image: owned }));
    cache.put(surface(2, { image: borrowed, owned: false }));
    cache.delete(1);
    cache.delete(1);
    cache.clear();
    cache.clear();
    expect(calls).toBe(2);
    expect(owned.closed).toBe(1);
    expect(borrowed.closed).toBe(0);
  });

  it("replaces a page's surface only with a better one", () => {
    const cache = new SurfaceCache({ entryTarget: 4 });
    const preview = surface(1, { height: 200, preview: true });
    const full = surface(1, { height: 800 });
    const softer = surface(1, { height: 400 });
    expect(cache.put(preview)).toBe(true);
    expect(cache.put(full)).toBe(true);
    expect(preview.disposed).toBe(true);
    expect(cache.put(softer)).toBe(false);
    expect(softer.disposed).toBe(true);
    expect(cache.peek(1)).toBe(full);
    expect(isBetter(surface(1, { height: 900 }), full)).toBe(true);
    expect(isBetter(surface(1, { height: 900, preview: true }), full)).toBe(false);
    expect(isBetter(surface(1, { height: 10, generation: 2 }), full)).toBe(true);
  });

  it("accounts CPU, GPU and pinned bytes separately and reports overage", () => {
    const cache = new SurfaceCache({ entryTarget: 8, byteTarget: 100_000 });
    const a = surface(1, { width: 100, height: 100 });
    const b = surface(2, { width: 100, height: 100 });
    cache.put(a);
    cache.put(b);
    expect(cache.stats().cpuBytes).toBe(80_000);
    cache.setPinned([1]);
    cache.noteUploaded(a, true);
    const stats = cache.stats();
    expect(a.image).toBeNull();
    expect(stats.gpuBytes).toBe(textureBytes(100, 100));
    expect(stats.cpuBytes).toBe(40_000);
    expect(stats.pinnedBytes).toBe(textureBytes(100, 100));
    expect(stats.pinnedEntries).toBe(1);
    expect(stats.pinnedOverage).toBe(0);

    // Pinned content alone over the target is kept and reported, not dropped.
    const tight = new SurfaceCache({ entryTarget: 8, byteTarget: 10_000 });
    const big = surface(1, { width: 100, height: 100 });
    tight.setPinned([1]);
    tight.put(big);
    expect(tight.peek(1)).toBe(big);
    expect(tight.stats().pinnedOverage).toBe(30_000);
    expect(tight.overByteTarget()).toBe(true);
    tight.put(surface(2, { width: 100, height: 100 }));
    expect(tight.peek(2)).toBeUndefined();
  });

  it("fits images inside a slot without distortion", () => {
    const tall = surface(1, { width: 50, height: 200 });
    const wide = surface(2, { width: 200, height: 100 });
    expect(containFit(tall, 0.5, false)).toEqual([1, 1]);
    expect(containFit(tall, 0.5, true)).toEqual([2, 1]);
    expect(containFit(wide, 0.5, true)).toEqual([1, 4]);
    expect(containFit(null, 0.5, true)).toEqual([1, 1]);
  });
});

describe("raster queue", () => {
  const deferred = <T,>() => {
    let resolve!: (value: T) => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
  const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

  it("runs one job at a time, most urgent first", async () => {
    const queue = new RasterQueue<string>(1);
    const order: string[] = [];
    const gates = new Map<string, ReturnType<typeof deferred<string>>>();
    const job = (key: string, priority: number) => {
      gates.set(key, deferred<string>());
      return queue.request({
        key,
        page: 1,
        priority,
        label: key,
        run: () => {
          order.push(key);
          return gates.get(key)!.promise;
        },
      });
    };
    const first = job("preload-a", PRIORITY.PRELOAD);
    job("preload-b", PRIORITY.PRELOAD);
    job("visible", PRIORITY.VISIBLE);
    job("turn", PRIORITY.TURN);
    expect(order).toEqual(["preload-a"]);
    expect(queue.queued).toBe(3);
    gates.get("preload-a")!.resolve("a");
    await first;
    await flush();
    expect(order).toEqual(["preload-a", "turn"]);
    gates.get("turn")!.resolve("t");
    await flush();
    expect(order).toEqual(["preload-a", "turn", "visible"]);
  });

  it("de-duplicates identical requests and lets a repeat raise the urgency", async () => {
    const queue = new RasterQueue<number>(1);
    let runs = 0;
    const blocker = deferred<number>();
    queue.request({ key: "blocker", page: 0, priority: PRIORITY.TURN, label: "", run: () => blocker.promise });
    const make = (priority: number) =>
      queue.request({ key: "page-5", page: 5, priority, label: "", run: async () => ++runs });
    const a = make(PRIORITY.PRELOAD);
    queue.request({ key: "page-6", page: 6, priority: PRIORITY.VISIBLE, label: "", run: async () => 99 });
    const b = make(PRIORITY.TURN);
    expect(a).toBe(b);
    blocker.resolve(0);
    await expect(a).resolves.toBe(1);
    expect(runs).toBe(1);
  });

  it("suspends speculative work while a turn holds the ceiling", async () => {
    const queue = new RasterQueue<string>(1);
    let aborted = false;
    const speculative = queue.request({
      key: "preload",
      page: 9,
      priority: PRIORITY.PRELOAD,
      label: "preload",
      run: (signal) =>
        new Promise<string>((_, reject) => {
          signal.addEventListener("abort", () => {
            aborted = true;
            reject(new Error("aborted"));
          });
        }),
    });
    const outcome = speculative.then(
      () => "resolved",
      (error) => (error as FlipBookError).code,
    );
    queue.setCeiling(PRIORITY.VISIBLE);
    expect(aborted).toBe(true);
    await expect(outcome).resolves.toBe("CANCELLED");

    // Below the bar nothing starts; the turn's own work still does.
    let started = false;
    queue.request({ key: "upgrade", page: 2, priority: PRIORITY.VISIBLE_UPGRADE, label: "", run: async () => ((started = true), "u") });
    const turn = queue.request({ key: "turn", page: 3, priority: PRIORITY.TURN, label: "", run: async () => "t" });
    await expect(turn).resolves.toBe("t");
    await flush();
    expect(started).toBe(false);
    queue.setCeiling(PRIORITY.BACKGROUND);
    await flush();
    expect(started).toBe(true);
  });

  it("drops a late result from a cancelled job", async () => {
    const queue = new RasterQueue<string>(1);
    const gate = deferred<string>();
    const job = queue.request({ key: "slow", page: 1, priority: PRIORITY.VISIBLE, label: "", run: () => gate.promise });
    const outcome = job.then(
      () => "resolved",
      () => "rejected",
    );
    queue.cancel((entry) => entry.page === 1);
    gate.resolve("late");
    await expect(outcome).resolves.toBe("rejected");
    expect(queue.idle).toBe(true);
    // The slot is free again for new work.
    await expect(queue.request({ key: "next", page: 2, priority: PRIORITY.VISIBLE, label: "", run: async () => "ok" })).resolves.toBe("ok");
  });

  it("orders equally urgent jobs by distance and refuses work after destroy", async () => {
    const queue = new RasterQueue<number>(1);
    const order: number[] = [];
    const gate = deferred<number>();
    queue.request({ key: "gate", page: 0, priority: PRIORITY.TURN, label: "", run: () => gate.promise });
    queue.setOrder((page) => Math.abs(page - 10));
    for (const page of [2, 11, 9, 30]) {
      void queue.request({ key: `p${page}`, page, priority: PRIORITY.PRELOAD, label: "", run: async () => (order.push(page), page) });
    }
    gate.resolve(0);
    await flush();
    await flush();
    await flush();
    await flush();
    await flush();
    expect(order).toEqual([11, 9, 2, 30]);
    queue.destroy();
    await expect(
      queue.request({ key: "after", page: 1, priority: PRIORITY.TURN, label: "", run: async () => 1 }),
    ).rejects.toMatchObject({ code: "CANCELLED" });
  });
});
