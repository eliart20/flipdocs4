import { SearchIndex } from "./searchIndex";
import type { SearchWorkerRequest, SearchWorkerResponse } from "./protocol";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent) => void) | null;
  postMessage(message: unknown): void;
};

const index = new SearchIndex();

function reply(message: SearchWorkerResponse): void {
  scope.postMessage(message);
}

scope.onmessage = (event: MessageEvent) => {
  const request = event.data as SearchWorkerRequest;
  switch (request.type) {
    case "index":
      index.setPage(request.page, request.text);
      break;
    case "clear":
      index.clear();
      break;
    case "search":
      try {
        const matches = index.searchPage(request.page, request.query, request.options, request.maxMatches);
        reply({ type: "matches", id: request.id, page: request.page, matches });
      } catch (error) {
        reply({
          type: "error",
          id: request.id,
          page: request.page,
          message: error instanceof Error ? error.message : String(error),
        });
      }
      break;
  }
};

reply({ type: "ready" });
