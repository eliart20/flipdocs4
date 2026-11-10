import type { FlipBookStrings } from "../types";

export const DEFAULT_STRINGS: Readonly<FlipBookStrings> = Object.freeze({
  reader: "Book reader",
  previousPage: "Previous page",
  nextPage: "Next page",
  pageOf: "Page {page} of {count}",
  goToPage: "Go to page",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  resetZoom: "Reset zoom",
  fitWidth: "Fit width",
  enterFullscreen: "Full screen",
  exitFullscreen: "Exit full screen",
  loading: "Loading…",
  loadingPercent: "Loading… {percent}%",
  loadFailed: "This document could not be opened.",
  openOriginal: "Open original",
  thumbnails: "Pages",
  outline: "Contents",
  search: "Search",
  searchPlaceholder: "Search in this book",
  searchProgress: "Searched {done} of {total} pages",
  searchNoMatches: "No matches",
  searchPartial: "No matches so far",
  searchMatchCase: "Match case",
  searchMatchDiacritics: "Match accents and vowel marks",
  searchUnavailable: "This book has no searchable text.",
  results: "{count} results",
  selectText: "Select text",
  readingMode: "Text view",
  readingNoText: "No text is available for this page.",
  close: "Close",
  idle: "idle",
  fallbackNotice: "Page-turn effects are unavailable; showing the simple reader.",
  passwordRequired: "This document needs a password.",
  noOutline: "This book has no table of contents.",
});

export function resolveStrings(overrides: Partial<FlipBookStrings> | undefined): FlipBookStrings {
  const result = { ...DEFAULT_STRINGS };
  if (!overrides) return result;
  for (const key of Object.keys(DEFAULT_STRINGS) as Array<keyof FlipBookStrings>) {
    const value = overrides[key];
    if (typeof value === "string") result[key] = value;
  }
  return result;
}

export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match,
  );
}
