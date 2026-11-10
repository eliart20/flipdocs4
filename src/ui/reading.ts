import type { FlipBookStrings, PageText } from "../types";
import { ICONS, button, el, uniqueId } from "./dom";
import { format } from "./strings";

/**
 * Text view: the active pages as real, stable text in reading order, with no
 * animation. While it is open the canvas is hidden from assistive technology,
 * so the document is announced once. Plain extraction keeps paragraphs and
 * language when the source provides them; it does not invent headings or
 * tables the source never marked up.
 */

export interface ReadingHost {
  strings(): FlipBookStrings;
  visiblePages(): number[];
  pageCount(): number;
  pageLabel(page: number): string;
  pageText(page: number): Promise<PageText | null>;
  step(direction: 1 | -1): void;
  canStep(direction: 1 | -1): boolean;
  onClose(): void;
}

export class ReadingView {
  readonly element: HTMLElement;
  private readonly body: HTMLElement;
  private readonly heading: HTMLElement;
  private readonly previous: HTMLButtonElement;
  private readonly next: HTMLButtonElement;
  private token = 0;
  private open = false;

  constructor(private readonly host: ReadingHost) {
    const strings = host.strings();
    const headingId = uniqueId("flipdocs-reading");
    this.heading = el("h2", "flipdocs__reading-title", { id: headingId });
    this.previous = button("flipdocs__button", strings.previousPage, ICONS.left, () => host.step(-1));
    this.next = button("flipdocs__button", strings.nextPage, ICONS.right, () => host.step(1));
    const close = button("flipdocs__button", strings.close, ICONS.close, () => host.onClose());
    this.body = el("div", "flipdocs__reading-body", { tabindex: -1 });
    this.element = el(
      "section",
      "flipdocs__reading",
      { "aria-labelledby": headingId, hidden: true },
      el("div", "flipdocs__reading-header", undefined, this.heading, this.previous, this.next, close),
      this.body,
    );
  }

  get isOpen(): boolean {
    return this.open;
  }

  show(): void {
    this.open = true;
    this.element.hidden = false;
    this.refresh();
    this.body.focus({ preventScroll: true });
  }

  hide(): void {
    this.open = false;
    this.token++;
    this.element.hidden = true;
    this.body.replaceChildren();
  }

  /** Reload the text for the pages now showing. */
  refresh(): void {
    if (!this.open) return;
    const token = ++this.token;
    const strings = this.host.strings();
    const pages = this.host
      .visiblePages()
      .slice()
      .sort((a, b) => a - b);
    const count = this.host.pageCount();
    this.heading.textContent = pages.length
      ? format(strings.pageOf, { page: pages.map((page) => this.host.pageLabel(page)).join("–"), count })
      : strings.readingMode;
    this.previous.disabled = !this.host.canStep(-1);
    this.next.disabled = !this.host.canStep(1);

    Promise.all(pages.map((page) => this.host.pageText(page).catch(() => null))).then((texts) => {
      if (token !== this.token) return;
      const nodes: HTMLElement[] = [];
      texts.forEach((text, index) => {
        const page = pages[index];
        const article = el("article", "flipdocs__reading-page", { "aria-label": format(strings.pageOf, { page: this.host.pageLabel(page), count }) });
        if (pages.length > 1) article.append(el("h3", "flipdocs__reading-page-title", undefined, this.host.pageLabel(page)));
        const content = text?.text.trim();
        if (!content) {
          article.append(el("p", "flipdocs__reading-empty", undefined, strings.readingNoText));
        } else {
          if (text?.lang) article.setAttribute("lang", text.lang);
          article.setAttribute("dir", text?.dir ?? "auto");
          // Blank lines separate paragraphs; single breaks inside one are layout.
          for (const paragraph of content.split(/\n\s*\n+/)) {
            const line = paragraph.replace(/\s*\n\s*/g, " ").trim();
            if (line) article.append(el("p", undefined, { dir: "auto" }, line));
          }
        }
        nodes.push(article);
      });
      this.body.replaceChildren(...nodes);
      this.body.scrollTop = 0;
    });
  }

  destroy(): void {
    this.token++;
    this.element.remove();
  }
}
