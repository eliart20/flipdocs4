/** Small DOM helpers. Text always goes in as text, never as markup. */

type Attributes = Record<string, string | number | boolean | null | undefined>;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  attributes?: Attributes,
  ...children: Array<Node | string | null | undefined>
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (attributes) setAttributes(node, attributes);
  for (const child of children) {
    if (child === null || child === undefined) continue;
    node.append(child);
  }
  return node;
}

export function setAttributes(node: Element, attributes: Attributes): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value === null || value === undefined || value === false) node.removeAttribute(name);
    else node.setAttribute(name, value === true ? "" : String(value));
  }
}

const SVG_NS = "http://www.w3.org/2000/svg";

export function svg(tag: string, attributes?: Attributes): SVGElement {
  const node = document.createElementNS(SVG_NS, tag);
  if (attributes) setAttributes(node, attributes);
  return node;
}

/** A 20 px line icon from path data. Decorative: hidden from assistive tech. */
export function icon(paths: string | string[]): SVGElement {
  const node = svg("svg", {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false",
  });
  for (const d of Array.isArray(paths) ? paths : [paths]) node.append(svg("path", { d }));
  return node;
}

export const ICONS = {
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  expand: ["M4 9V4h5", "M20 9V4h-5", "M4 15v5h5", "M20 15v5h-5"],
  shrink: ["M9 4v5H4", "M15 4v5h5", "M9 20v-5H4", "M15 20v-5h5"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
  list: ["M8 6h12", "M8 12h12", "M8 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"],
  search: ["M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14z", "M20 20l-4-4"],
  text: ["M5 6h14", "M5 10h14", "M5 14h10", "M5 18h7"],
  cursor: ["M9 4h6", "M9 20h6", "M12 4v16"],
  fit: ["M4 12h16", "M8 8l-4 4 4 4", "M16 8l4 4-4 4"],
  external: ["M14 5h5v5", "M19 5l-8 8", "M18 14v5H5V6h5"],
  close: ["M6 6l12 12", "M18 6L6 18"],
} as const;

export function button(
  className: string,
  label: string,
  paths: string | readonly string[] | null,
  onClick: (event: MouseEvent) => void,
): HTMLButtonElement {
  const node = el("button", className, { type: "button", "aria-label": label, title: label });
  if (paths) node.append(icon(typeof paths === "string" ? paths : [...paths]));
  node.addEventListener("click", onClick);
  return node;
}

let nextId = 1;
/** Unique id for aria relationships; scoped per reader by its own counter. */
export const uniqueId = (prefix: string): string => `${prefix}-${nextId++}`;

/**
 * Does this event target own its keys, so the reader's shortcuts must stay
 * out of the way? Fields do, and so does a dialog inside the reader (its
 * side panel). A dialog the host put the whole reader in does not count.
 */
export const ownsKeys = (target: EventTarget | null, reader: Element): boolean => {
  if (!(target instanceof Element)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (target as HTMLElement).isContentEditable) return true;
  const dialog = target.closest('[role="dialog"]');
  return dialog !== null && dialog !== reader && reader.contains(dialog);
};
