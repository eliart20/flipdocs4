import { DIAGNOSTIC_POSE_NAMES, TUNING_DEFAULTS, TUNING_RANGES, createFlipbook, detectPdfDirection } from "../src/core";
import type { FlipBookSource, FlipBookTuning, FlipbookCreateOptions, FlipbookInstance, ToolbarItem } from "../src/core";

/**
 * Workbench: every source kind, every option worth poking, the diagnostic
 * poses and the benchmark. URL parameters preset it, e.g.
 *   ?book=pdf:range/p40.pdf&direction=rtl&toolbar=full&page=7
 */

const params = new URLSearchParams(location.search);
const side = document.getElementById("side") as HTMLElement;
const mount = document.getElementById("reader") as HTMLElement;

const FULL_TOOLBAR: ToolbarItem[] = [
  "previous",
  "thumbnails",
  "outline",
  "search",
  "page",
  "zoomOut",
  "zoom",
  "zoomIn",
  "fitWidth",
  "selectText",
  "reading",
  "openOriginal",
  "fullscreen",
  "next",
];

const BOOKS: Array<[string, string]> = [
  ["pdf:range/p40.pdf", "PDF, 40 pages, range server"],
  ["pdf:range/p40-rtl.pdf", "PDF, 40 pages, RTL preference"],
  ["pdf:range/p60-img.pdf", "PDF, 60 pages with rasters"],
  ["pdf:range/p12-mixed-rot.pdf", "PDF, mixed sizes and a rotated page"],
  ["pdf:norange/p40.pdf", "PDF, server ignores ranges"],
  ["pdf:lying/p40.pdf", "PDF, false Accept-Ranges"],
  ["pdf:slow/p40.pdf", "PDF, slow server"],
  ["pdf:range/p1.pdf", "PDF, 1 page"],
  ["pdf:range/p2.pdf", "PDF, 2 pages"],
  ["pdf:range/p3.pdf", "PDF, 3 pages"],
  ["pdf:range/p2000.pdf", "PDF, 2,000 pages"],
  ["images:24", "Images, 24 URLs"],
  ["images:1324", "Images, 1,324 URLs"],
  ["manifest:1324", "Manifest, 1,324 pages"],
  ["manifest:40?mixed", "Manifest, mixed sizes"],
  ["manifest:40?rtl", "Manifest, RTL"],
];

function sourceFor(book: string): FlipBookSource {
  const [kind, rest] = [book.slice(0, book.indexOf(":")), book.slice(book.indexOf(":") + 1)];
  if (kind === "pdf") return { type: "pdf", src: `/fx/pdf/${rest}` };
  if (kind === "book") return { type: "pdf", src: `/fx/book/${rest}` };
  if (kind === "manifest") {
    const [count, query] = rest.split("?");
    return { type: "manifest", manifest: `/fx/manifest/${count}.json${query ? `?${query}` : ""}` };
  }
  const count = Number(rest) || 24;
  return { type: "images", pages: Array.from({ length: count }, (_, index) => `/fx/img/${index + 1}.png?w=900&h=1260`) };
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, text?: string) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
};

function group(title: string): HTMLFieldSetElement {
  const set = el("fieldset");
  set.append(el("legend", title));
  side.append(set);
  return set;
}

function field(parent: HTMLElement, label: string, control: HTMLElement): void {
  const row = el("label");
  row.append(el("span", label), control);
  parent.append(row);
}

function select(options: Array<[string, string]>, value: string, onChange: (value: string) => void): HTMLSelectElement {
  const node = el("select");
  for (const [key, label] of options) {
    const option = el("option", label);
    option.value = key;
    node.append(option);
  }
  node.value = value;
  node.addEventListener("change", () => onChange(node.value));
  return node;
}

function action(parent: HTMLElement, label: string, run: () => void): void {
  const node = el("button", label);
  node.type = "button";
  node.addEventListener("click", run);
  parent.append(node);
}

const state = {
  book: params.get("book") ?? "pdf:range/p40.pdf",
  direction: params.get("direction") ?? "auto",
  layout: params.get("layout") ?? "viewport",
  transition: params.get("transition") ?? "curl",
  sizing: params.get("sizing") ?? "first-page",
  toolbar: params.get("toolbar") ?? "full",
  fps: params.get("fps") !== "0",
  renderer: params.get("renderer") ?? "auto",
};

let instance: FlipbookInstance | null = null;
const output = el("pre");

async function mountReader(): Promise<void> {
  instance?.destroy();
  instance = null;
  const source = sourceFor(state.book);
  let direction: "ltr" | "rtl" | undefined;
  if (state.direction === "auto") {
    // Host-side detection, as an embedding page would do it.
    direction = source.type === "pdf" ? await detectPdfDirection(source.src as string) : undefined;
  } else {
    direction = state.direction as "ltr" | "rtl";
  }
  const options: FlipbookCreateOptions = {
    source,
    direction,
    startPage: Number(params.get("page")) || 1,
    layoutPolicy: state.layout as FlipbookCreateOptions["layoutPolicy"],
    transition: state.transition as FlipbookCreateOptions["transition"],
    pageSizing: state.sizing as FlipbookCreateOptions["pageSizing"],
    toolbar: state.toolbar === "full" ? FULL_TOOLBAR : undefined,
    showFps: state.fps,
    renderer: state.renderer as FlipbookCreateOptions["renderer"],
    deepLink: params.has("deeplink") ? { hashKey: "p" } : undefined,
    onReady: (event) => log("ready", event),
    onPageChange: (event) => log("page", event),
    onError: (error) => log("error", { message: error.message, code: (error as { code?: string }).code }),
    onWarning: (error) => log("warning", { message: error.message, code: (error as { code?: string }).code }),
  };
  instance = createFlipbook(mount, options);
  (window as unknown as { flipbook: FlipbookInstance | null }).flipbook = instance;
}

function log(label: string, value: unknown): void {
  output.textContent = `${label}: ${JSON.stringify(value, null, 1)}\n${output.textContent ?? ""}`.slice(0, 6000);
}

async function build(): Promise<void> {
  side.append(el("h1", "Flipdocs 4"));

  const local: Array<[string, string]> = [];
  try {
    const books = (await (await fetch("/fx/books")).json()) as Array<{ name: string; size: number }>;
    for (const book of books) {
      local.push([`book:range/${encodeURIComponent(book.name)}`, `${book.name.slice(0, 26)} (${(book.size / 1048576).toFixed(0)} MB)`]);
    }
  } catch {
    // no local books
  }

  const source = group("Document");
  const all = [...BOOKS, ...local];
  if (!all.some(([key]) => key === state.book)) all.unshift([state.book, state.book]);
  field(source, "Book", select(all, state.book, (value) => ((state.book = value), void mountReader())));
  field(
    source,
    "Direction",
    select(
      [
        ["auto", "Detect (host)"],
        ["ltr", "LTR"],
        ["rtl", "RTL"],
      ],
      state.direction,
      (value) => {
        state.direction = value;
        if (value === "auto") void mountReader();
        else instance?.update({ direction: value as "ltr" | "rtl" });
      },
    ),
  );

  const view = group("View");
  field(
    view,
    "Layout",
    select(
      [
        ["viewport", "Viewport (baseline)"],
        ["container", "Container"],
        ["single", "Single"],
        ["double", "Double"],
      ],
      state.layout,
      (value) => ((state.layout = value), instance?.update({ layoutPolicy: value as FlipbookCreateOptions["layoutPolicy"] })),
    ),
  );
  field(
    view,
    "Transition",
    select(
      [
        ["curl", "Curl"],
        ["slide", "Slide"],
        ["none", "None"],
      ],
      state.transition,
      (value) => ((state.transition = value), instance?.update({ transition: value as FlipbookCreateOptions["transition"] })),
    ),
  );
  field(
    view,
    "Sizing",
    select(
      [
        ["first-page", "First page"],
        ["per-page", "Per page"],
      ],
      state.sizing,
      (value) => ((state.sizing = value), instance?.update({ pageSizing: value as FlipbookCreateOptions["pageSizing"] })),
    ),
  );
  field(
    view,
    "Toolbar",
    select(
      [
        ["full", "Everything"],
        ["default", "Baseline"],
      ],
      state.toolbar,
      (value) => ((state.toolbar = value), instance?.update({ toolbar: value === "full" ? FULL_TOOLBAR : undefined })),
    ),
  );
  field(
    view,
    "Renderer",
    select(
      [
        ["auto", "Auto"],
        ["fallback", "Non-curl reader"],
      ],
      state.renderer,
      (value) => ((state.renderer = value), void mountReader()),
    ),
  );

  const poses = group("Diagnostic poses");
  for (const name of DIAGNOSTIC_POSE_NAMES) action(poses, name.replace(/-/g, " "), () => instance?.setDiagnosticPose(name));
  action(poses, "Reset pose", () => instance?.resetPose());
  action(poses, "PNG", () => void instance?.downloadPng());

  const bench = group("Benchmark");
  for (const mode of ["cold", "preloaded"] as const) {
    action(bench, mode, async () => {
      log("benchmark", "running…");
      try {
        log(`benchmark ${mode}`, await instance?.runBenchmark(4000, mode));
      } catch (error) {
        log("benchmark failed", String(error));
      }
    });
  }
  action(bench, "Snapshot", () => log("snapshot", instance?.getSnapshot()));
  action(bench, "State", () => log("state", instance?.getState()));

  const tuning = group("Tuning");
  for (const key of Object.keys(TUNING_DEFAULTS) as Array<keyof FlipBookTuning>) {
    const range = TUNING_RANGES[key];
    const slider = el("input");
    slider.type = "range";
    slider.min = String(range.min);
    slider.max = String(range.max);
    slider.step = String(range.integer ? 1 : (range.max - range.min) / 200);
    slider.value = String(TUNING_DEFAULTS[key]);
    slider.addEventListener("input", () => instance?.setTuning({ [key]: Number(slider.value) }));
    field(tuning, key, slider);
  }
  action(tuning, "Defaults", () => {
    instance?.setTuning({ ...TUNING_DEFAULTS });
    for (const slider of tuning.querySelectorAll<HTMLInputElement>("input[type=range]")) {
      const key = slider.parentElement?.firstElementChild?.textContent as keyof FlipBookTuning;
      slider.value = String(TUNING_DEFAULTS[key]);
    }
  });

  const out = group("Log");
  out.append(output);
}

void build().then(mountReader);
