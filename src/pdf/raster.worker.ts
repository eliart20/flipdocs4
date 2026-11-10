import { PdfHost, describeHostError } from "./pdfHost";
import type { HostErrorPayload, MainReply, WorkerMessage, WorkerRequest } from "./protocol";

/**
 * Raster worker: owns the PDF document and draws pages off the main thread,
 * returning each one as a transferable ImageBitmap. Range reads and password
 * prompts are answered by the main thread, where the host's callbacks live.
 */

interface WorkerScope {
  onmessage: ((event: MessageEvent<WorkerRequest | MainReply>) => void) | null;
  postMessage(message: WorkerMessage, transfer?: Transferable[]): void;
  fonts?: unknown;
}

const scope = self as unknown as WorkerScope;
const post = (message: WorkerMessage, transfer?: Transferable[]) => scope.postMessage(message, transfer ?? []);

let nextCall = 1;
const calls = new Map<number, { resolve: (value: unknown) => void; reject: (error: HostErrorPayload) => void }>();

function call<T>(
  name: "readRange" | "password",
  args: [number, number] | ["required" | "incorrect", number],
): Promise<T> {
  const callId = nextCall++;
  return new Promise<T>((resolve, reject) => {
    calls.set(callId, { resolve: resolve as (value: unknown) => void, reject });
    post({ type: "call", callId, name, args } as WorkerMessage);
  });
}

const host = new PdfHost({
  readRange: (begin, end) => call<Uint8Array>("readRange", [begin, end]),
  password: (reason, attempt) => call<string | null>("password", [reason, attempt]),
  progress: (loaded, total) => post({ type: "progress", loaded, total }),
  fatal: (error) => post({ type: "fatal", error }),
});

async function handle(request: WorkerRequest): Promise<{ value: unknown; transfer?: Transferable[] }> {
  switch (request.method) {
    case "open":
      return { value: await host.open(request.params) };
    case "render": {
      const result = await host.render(request.id, request.params);
      return { value: result, transfer: [result.image as ImageBitmap] };
    }
    case "cancelRender":
      host.cancelRender(request.params.requestId);
      return { value: null };
    case "text":
      return { value: await host.getText(request.params.page) };
    case "links":
      return { value: await host.getLinks(request.params.page) };
    case "outline":
      return { value: await host.getOutline() };
    case "labels":
      return { value: await host.getLabels() };
    case "destroy":
      await host.destroy();
      return { value: null };
  }
}

scope.onmessage = (event) => {
  const message = event.data;
  if ("type" in message) {
    const pending = calls.get(message.callId);
    if (!pending) return;
    calls.delete(message.callId);
    if (message.type === "reply") pending.resolve(message.value);
    else pending.reject(message.error);
    return;
  }
  handle(message).then(
    ({ value, transfer }) => post({ type: "result", id: message.id, value }, transfer),
    (error) =>
      post({
        type: "error",
        id: message.id,
        error: describeHostError(error, message.method === "open" ? "open" : "render"),
      }),
  );
};

post({
  type: "ready",
  offscreenCanvas: typeof OffscreenCanvas !== "undefined",
  fonts: !!scope.fonts,
});
