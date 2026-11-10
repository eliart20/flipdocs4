import { FlipBookError, cancelled } from "../errors";
import type { ManifestSource, PageLink, PageText } from "../types";
import { closeImage, decodeBlob } from "./decode";
import {
  MANIFEST_LIMITS,
  assertManifestSize,
  parseLinksSidecar,
  parseManifest,
  parseTextSidecar,
  pickVariant,
} from "./manifest";
import type { ResolvedManifest } from "./manifest";
import { Semaphore, fetchResource, throwIfAborted } from "./pageSource";
import type { PageSource, SourceOpenContext } from "./pageSource";

/**
 * A manifest book: a light page list up front, with page images and text and
 * link sidecars fetched on demand. Nothing but the manifest itself is needed
 * before the first page can be requested, because page sizes are declared.
 */

const SIDECAR_CACHE = 24;

async function readJson(response: Response, what: string, maxBytes: number): Promise<unknown> {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > 0) assertManifestSize(declared, maxBytes);
  const body = await response.text();
  assertManifestSize(body.length, maxBytes);
  try {
    return JSON.parse(body);
  } catch (error) {
    throw new FlipBookError("INVALID_MANIFEST", `${what} is not valid JSON`, { cause: error });
  }
}

export async function openManifestSource(source: ManifestSource, context: SourceOpenContext): Promise<PageSource> {
  let manifest: ResolvedManifest;
  if (typeof source.manifest === "string") {
    const { response, url } = await fetchResource(source.manifest, source.request, context.signal, "the manifest");
    const absolute = new URL(response.url || url, typeof document !== "undefined" ? document.baseURI : undefined).href;
    manifest = parseManifest(await readJson(response, "The manifest", MANIFEST_LIMITS.maxBytes), {
      baseUrl: source.baseUrl ?? absolute,
    });
  } else {
    const baseUrl = source.baseUrl ?? (typeof document !== "undefined" ? document.baseURI : "");
    if (!baseUrl) throw new FlipBookError("INVALID_MANIFEST", "An in-memory manifest needs a baseUrl");
    manifest = parseManifest(source.manifest, { baseUrl });
  }
  throwIfAborted(context.signal);
  context.onProgress(1, 1);

  const pages = manifest.pages;
  const network = new Semaphore(4);
  const textCache = new Map<number, Promise<PageText | null>>();
  const linkCache = new Map<number, Promise<PageLink[]>>();
  let destroyed = false;

  const remember = <T>(cache: Map<number, Promise<T>>, page: number, load: () => Promise<T>): Promise<T> => {
    const cached = cache.get(page);
    if (cached) {
      cache.delete(page);
      cache.set(page, cached);
      return cached;
    }
    const pending = load();
    cache.set(page, pending);
    pending.catch(() => cache.delete(page));
    if (cache.size > SIDECAR_CACHE) cache.delete(cache.keys().next().value as number);
    return pending;
  };

  const hasPreviews = pages.some((page) => !!page.preview || page.variants.length > 1);

  return {
    kind: "manifest",
    pageCount: pages.length,
    pageAspect: pages[0].aspect,
    concurrency: 3,
    previewHeight: hasPreviews ? 640 : 0,
    capabilities: {
      text: pages.some((page) => !!page.text),
      links: pages.some((page) => !!page.links),
      outline: manifest.outline.length > 0,
      thumbnails: true,
      search: pages.some((page) => !!page.text),
      labels: pages.some((page) => page.label !== undefined),
    },
    rasterMode: "image",
    transportMode: "image",
    direction: manifest.direction,
    language: manifest.language,
    originalUrl: source.originalUrl,

    async render(request) {
      if (destroyed) throw cancelled("Page preparation");
      const page = pages[request.page - 1];
      const smallest = page.variants[0];
      const largest = page.variants[page.variants.length - 1];
      let url: string;
      let known: { width: number; height: number } | undefined;
      let last: boolean;
      if (request.preview && (page.preview || page.variants.length > 1)) {
        url = page.preview ?? smallest.src;
        known = page.preview ? undefined : { width: smallest.width, height: smallest.height };
        last = false;
      } else {
        const variant = pickVariant(page, request.height);
        url = variant.src;
        known = { width: variant.width, height: variant.height };
        last = variant === largest;
      }
      const blob = await network.run(async () => {
        throwIfAborted(request.signal);
        const { response } = await fetchResource(url, source.request, request.signal, `page ${request.page}`);
        return response.blob();
      });
      throwIfAborted(request.signal);
      const decoded = await decodeBlob(
        blob,
        { height: request.height, maxWidth: request.maxWidth, maxDimension: context.maxTextureSize },
        known,
      );
      if (request.signal.aborted || destroyed) {
        closeImage(decoded.image);
        throw cancelled("Page preparation");
      }
      return {
        image: decoded.image,
        width: decoded.width,
        height: decoded.height,
        owned: true,
        final: last && decoded.final,
      };
    },

    getText(page, signal) {
      const url = pages[page - 1]?.text;
      if (!url) return Promise.resolve(null);
      return remember(textCache, page, async () => {
        const { response } = await fetchResource(url, source.request, signal, `text for page ${page}`);
        return parseTextSidecar(await readJson(response, `Text for page ${page}`, MANIFEST_LIMITS.maxBytes));
      });
    },

    getLinks(page, signal) {
      const url = pages[page - 1]?.links;
      if (!url) return Promise.resolve([]);
      return remember(linkCache, page, async () => {
        const { response } = await fetchResource(url, source.request, signal, `links for page ${page}`);
        return parseLinksSidecar(
          await readJson(response, `Links for page ${page}`, MANIFEST_LIMITS.maxBytes),
          pages.length,
          manifest.baseUrl,
        );
      });
    },

    async getOutline() {
      return manifest.outline;
    },

    getLabel(page) {
      return pages[page - 1]?.label ?? null;
    },

    async getThumbnail(page) {
      const entry = pages[page - 1];
      if (!entry) return null;
      return { url: entry.thumbnail ?? entry.preview ?? entry.variants[0].src };
    },

    destroy() {
      destroyed = true;
      textCache.clear();
      linkCache.clear();
    },
  };
}
