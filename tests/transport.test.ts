import { beforeEach, describe, expect, it } from "vitest";
import { directionFromViewerPreference } from "../src/host/direction";
import {
  clearRangeCache,
  createBlobRangeReader,
  createUrlRangeReader,
  parseContentRange,
  probeRange,
  validatorsChanged,
} from "../src/pdf/rangeTransport";
import { searchOrder } from "../src/search/searchSession";

interface Call {
  url: string;
  range: string | null;
}

/** A fake server over an in-memory file. */
function server(
  data: Uint8Array,
  behaviour: (call: Call, index: number) => Response | undefined = () => undefined,
  headers: Record<string, string> = { ETag: '"v1"' },
) {
  const calls: Call[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const range = new Headers(init?.headers).get("Range");
    const call = { url: String(input), range };
    calls.push(call);
    const custom = behaviour(call, calls.length - 1);
    if (custom) return custom;
    const match = /^bytes=(\d+)-(\d+)$/.exec(range ?? "");
    if (!match) return new Response(data as BodyInit, { status: 200 });
    const start = Number(match[1]);
    const end = Number(match[2]);
    return new Response(data.slice(start, end + 1) as BodyInit, {
      status: 206,
      headers: { "Content-Range": `bytes ${start}-${end}/${data.length}`, ...headers },
    });
  }) as typeof fetch;
  return { fetch: fetchImpl, calls };
}

const file = Uint8Array.from({ length: 1000 }, (_, index) => index % 251);

beforeEach(() => clearRangeCache());

describe("Content-Range parsing", () => {
  it("accepts well-formed ranges and rejects everything else", () => {
    expect(parseContentRange("bytes 0-0/1234")).toEqual({ first: 0, last: 0, total: 1234 });
    expect(parseContentRange("Bytes 10-19/100")).toEqual({ first: 10, last: 19, total: 100 });
    expect(parseContentRange("bytes 0-0/*")).toEqual({ first: 0, last: 0, total: null });
    for (const bad of [null, "", "bytes */100", "bytes 5-2/100", "bytes 0-99/50", "items 0-0/10", "bytes 0-0/0", "bytes a-b/c"]) {
      expect(parseContentRange(bad)).toBeNull();
    }
  });
});

describe("range probe", () => {
  it("selects range mode only for 206, a valid Content-Range and one byte", async () => {
    const { fetch, calls } = server(file);
    const probe = await probeRange("https://cdn.test/book.pdf", { fetch });
    expect(probe).toEqual({
      mode: "range",
      url: "https://cdn.test/book.pdf",
      length: 1000,
      validators: { etag: '"v1"', lastModified: null },
    });
    expect(calls).toEqual([{ url: "https://cdn.test/book.pdf", range: "bytes=0-0" }]);
  });

  it("does not trust Accept-Ranges on a full response, and cancels its body", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        controller.enqueue(new Uint8Array(64 * 1024));
      },
      cancel() {
        cancelled = true;
      },
    });
    const { fetch } = server(file, () => new Response(body, { status: 200, headers: { "Accept-Ranges": "bytes" } }));
    const probe = await probeRange("https://cdn.test/book.pdf", { fetch });
    expect(probe.mode).toBe("stream");
    expect(cancelled).toBe(true);
  });

  it("falls back for a missing, malformed or dishonest partial response", async () => {
    const cases: Array<[string, Response]> = [
      ["no Content-Range", new Response(new Uint8Array(1), { status: 206 })],
      ["wrong offsets", new Response(new Uint8Array(1), { status: 206, headers: { "Content-Range": "bytes 0-9/1000" } })],
      ["unknown total", new Response(new Uint8Array(1), { status: 206, headers: { "Content-Range": "bytes 0-0/*" } })],
      ["two bytes", new Response(new Uint8Array(2), { status: 206, headers: { "Content-Range": "bytes 0-0/1000" } })],
      ["no bytes", new Response(new Uint8Array(0), { status: 206, headers: { "Content-Range": "bytes 0-0/1000" } })],
      ["server error", new Response("no", { status: 500 })],
    ];
    for (const [label, response] of cases) {
      const { fetch } = server(file, () => response);
      const probe = await probeRange("https://cdn.test/book.pdf", { fetch });
      expect(probe.mode, label).toBe("stream");
    }
  });

  it("falls back when the probe request itself fails, but passes on cancellation", async () => {
    const failing = (async () => {
      throw new TypeError("Failed to fetch");
    }) as unknown as typeof fetch;
    expect((await probeRange("https://cdn.test/book.pdf", { fetch: failing })).mode).toBe("stream");
    const controller = new AbortController();
    controller.abort();
    await expect(probeRange("https://cdn.test/book.pdf", { fetch: failing, signal: controller.signal })).rejects.toMatchObject({
      code: "CANCELLED",
    });
  });

  it("renews a refused URL once through the host's hook", async () => {
    const { fetch, calls } = server(file, (call) => (call.url.includes("old") ? new Response("", { status: 403 }) : undefined));
    const reasons: string[] = [];
    const probe = await probeRange("https://cdn.test/old.pdf", {
      fetch,
      request: {
        renew: ({ reason, status }) => {
          reasons.push(`${reason}:${status}`);
          return "https://cdn.test/new.pdf";
        },
      },
    });
    expect(probe).toMatchObject({ mode: "range", url: "https://cdn.test/new.pdf" });
    expect(reasons).toEqual(["unauthorized:403"]);
    expect(calls.map((call) => call.url)).toEqual(["https://cdn.test/old.pdf", "https://cdn.test/new.pdf"]);
  });

  it("sends the host's headers with every request", async () => {
    const seen: string[] = [];
    const fetchImpl = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      seen.push(new Headers(init?.headers).get("Authorization") ?? "");
      return new Response(new Uint8Array(1), { status: 206, headers: { "Content-Range": "bytes 0-0/10" } });
    }) as typeof fetch;
    let token = 0;
    await probeRange("https://cdn.test/book.pdf", { fetch: fetchImpl, request: { headers: () => ({ Authorization: `Bearer ${++token}` }) } });
    expect(seen).toEqual(["Bearer 1"]);
  });
});

describe("range reader", () => {
  const probeOf = async (fetchImpl: typeof fetch) => {
    const probe = await probeRange("https://cdn.test/book.pdf", { fetch: fetchImpl });
    if (probe.mode !== "range") throw new Error("expected range mode");
    return probe;
  };

  it("returns exactly the requested bytes", async () => {
    const { fetch, calls } = server(file);
    const reader = createUrlRangeReader(await probeOf(fetch), { fetch });
    const bytes = await reader.read(100, 164);
    expect([...bytes]).toEqual([...file.slice(100, 164)]);
    expect(calls[calls.length - 1].range).toBe("bytes=100-163");
    expect(reader.stats).toEqual({ requests: 1, bytes: 64 });
    await expect(reader.read(990, 1200)).rejects.toMatchObject({ code: "INVALID_ARGUMENT" });
  });

  it("refuses to mix revisions: changed length, validators, offsets or byte count", async () => {
    const mismatches: Array<[string, (call: Call) => Response | undefined]> = [
      [
        "length",
        (call) =>
          call.range === "bytes=10-19"
            ? new Response(new Uint8Array(10), { status: 206, headers: { "Content-Range": "bytes 10-19/2000", ETag: '"v1"' } })
            : undefined,
      ],
      [
        "etag",
        (call) =>
          call.range === "bytes=10-19"
            ? new Response(new Uint8Array(10), { status: 206, headers: { "Content-Range": "bytes 10-19/1000", ETag: '"v2"' } })
            : undefined,
      ],
      [
        "offsets",
        (call) =>
          call.range === "bytes=10-19"
            ? new Response(new Uint8Array(10), { status: 206, headers: { "Content-Range": "bytes 0-9/1000", ETag: '"v1"' } })
            : undefined,
      ],
      [
        "short body",
        (call) =>
          call.range === "bytes=10-19"
            ? new Response(new Uint8Array(4), { status: 206, headers: { "Content-Range": "bytes 10-19/1000", ETag: '"v1"' } })
            : undefined,
      ],
      ["full response", (call) => (call.range === "bytes=10-19" ? new Response(file as BodyInit, { status: 200 }) : undefined)],
    ];
    for (const [label, behaviour] of mismatches) {
      const { fetch } = server(file, behaviour);
      const reader = createUrlRangeReader(await probeOf(fetch), { fetch });
      await expect(reader.read(10, 20), label).rejects.toMatchObject({ code: "RANGE_MISMATCH" });
    }
  });

  it("compares validators only when both sides have them", () => {
    const response = (headers: Record<string, string>) => new Response("", { headers });
    expect(validatorsChanged({ etag: '"a"', lastModified: null }, response({ ETag: '"a"' }))).toBe(false);
    expect(validatorsChanged({ etag: '"a"', lastModified: null }, response({ ETag: '"b"' }))).toBe(true);
    expect(validatorsChanged({ etag: '"a"', lastModified: null }, response({}))).toBe(false);
    expect(validatorsChanged({ etag: null, lastModified: "Mon" }, response({ "Last-Modified": "Tue" }))).toBe(true);
    expect(validatorsChanged({ etag: null, lastModified: null }, response({ ETag: '"z"' }))).toBe(false);
  });

  it("renews an expired URL mid-document and retries the same range", async () => {
    let expired = false;
    const { fetch, calls } = server(file, (call) => (expired && call.url.includes("t=1") ? new Response("", { status: 401 }) : undefined));
    const probe = await probeRange("https://cdn.test/book.pdf?t=1", { fetch });
    if (probe.mode !== "range") throw new Error("expected range mode");
    const reader = createUrlRangeReader(probe, {
      fetch,
      request: { renew: () => "https://cdn.test/book.pdf?t=2" },
    });
    expired = true;
    const bytes = await reader.read(0, 8);
    expect(bytes.length).toBe(8);
    expect(calls.slice(-2).map((call) => call.url)).toEqual(["https://cdn.test/book.pdf?t=1", "https://cdn.test/book.pdf?t=2"]);
    // Later reads go straight to the renewed URL.
    await reader.read(8, 16);
    expect(calls[calls.length - 1].url).toBe("https://cdn.test/book.pdf?t=2");
  });

  it("serves a range it already fetched to the next reader of the same revision", async () => {
    const { fetch, calls } = server(file);
    const first = createUrlRangeReader(await probeOf(fetch), { fetch });
    const original = await first.read(0, 256);
    const before = calls.length;
    const second = createUrlRangeReader(await probeOf(fetch), { fetch });
    const again = await second.read(0, 256);
    expect([...again]).toEqual([...original]);
    // Only the second probe went to the network.
    expect(calls.length - before).toBe(1);
    // A copy each time: a caller that transfers its buffer cannot empty the cache.
    again.fill(7);
    expect([...(await second.read(0, 256))]).toEqual([...original]);

    // A new revision at the same URL starts from nothing.
    const changed = server(file, undefined, { ETag: '"v2"' });
    const third = createUrlRangeReader(await probeOf(changed.fetch), { fetch: changed.fetch });
    await third.read(0, 256);
    expect(changed.calls.filter((call) => call.range === "bytes=0-255").length).toBe(1);

    // Without a validator nothing is remembered.
    clearRangeCache();
    const bare = server(file, undefined, {});
    const a = createUrlRangeReader(await probeOf(bare.fetch), { fetch: bare.fetch });
    await a.read(0, 64);
    const b = createUrlRangeReader(await probeOf(bare.fetch), { fetch: bare.fetch });
    await b.read(0, 64);
    expect(bare.calls.filter((call) => call.range === "bytes=0-63").length).toBe(2);
  });

  it("keeps network concurrency bounded", async () => {
    let active = 0;
    let peak = 0;
    const fetchImpl = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const range = new Headers(init?.headers).get("Range")!;
      const [start, end] = range.replace("bytes=", "").split("-").map(Number);
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active--;
      return new Response(file.slice(start, end + 1) as BodyInit, {
        status: 206,
        headers: { "Content-Range": `bytes ${start}-${end}/${file.length}` },
      });
    }) as typeof fetch;
    const probe = await probeRange("https://cdn.test/book.pdf", { fetch: fetchImpl });
    if (probe.mode !== "range") throw new Error("expected range mode");
    const reader = createUrlRangeReader(probe, { fetch: fetchImpl });
    peak = 0;
    await Promise.all(Array.from({ length: 12 }, (_, index) => reader.read(index * 10, index * 10 + 10)));
    expect(peak).toBeLessThanOrEqual(4);
  });

  it("reads a Blob by slicing, never whole", async () => {
    const blob = new Blob([file]);
    let whole = 0;
    const original = blob.arrayBuffer.bind(blob);
    blob.arrayBuffer = () => {
      whole++;
      return original();
    };
    const reader = createBlobRangeReader(blob);
    expect(reader.length).toBe(1000);
    expect([...(await reader.read(990, 1000))]).toEqual([...file.slice(990, 1000)]);
    expect(whole).toBe(0);
    expect(reader.stats).toEqual({ requests: 1, bytes: 10 });
  });
});

describe("host helpers", () => {
  it("maps the viewer preference to a direction", () => {
    expect(directionFromViewerPreference("R2L")).toBe("rtl");
    expect(directionFromViewerPreference("/R2L")).toBe("rtl");
    expect(directionFromViewerPreference("L2R")).toBe("ltr");
    expect(directionFromViewerPreference(undefined)).toBe("ltr");
    expect(directionFromViewerPreference("anything")).toBe("ltr");
  });

  it("searches visible pages first, then outward, forward before back", () => {
    expect(searchOrder([4, 5], 9)).toEqual([4, 5, 6, 3, 7, 2, 8, 1, 9]);
    expect(searchOrder([], 3)).toEqual([2, 3]);
    expect(searchOrder([1], 1)).toEqual([1]);
    expect(new Set(searchOrder([700, 701], 1324)).size).toBe(1324);
  });
});
