import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

/**
 * Development fixtures for the workbench and the in-browser self-test.
 * Nothing here ships. It serves generated books and deliberately awkward
 * servers, and logs every request so tests can assert what was fetched.
 *
 *   /fx/pdf/<mode>/<spec>.pdf   generated PDF; spec tokens: p<N> pages, rtl,
 *                               img (a raster on each page), mixed (page
 *                               sizes), rot (one rotated page), pw (encrypted
 *                               with the password "open-sesame"; needs the
 *                               qpdf command line tool)
 *     mode range     honours Range with 206 and validators
 *     mode norange   ignores Range, always 200
 *     mode lying     advertises Accept-Ranges but still answers 200
 *     mode changing  becomes a different revision after a few requests
 *     mode auth      needs ?token=…; tokens stop working after a few requests
 *     mode slow      range, with a delay on every response
 *   /fx/img/<n>.png?w=&h=       generated page image
 *   /fx/manifest/<N>.json       manifest for N pages with text and links
 *   /fx/text/<n>.json, /fx/links/<n>.json
 *   /fx/book/<mode>/<file>      a real local book (see localBookDirs)
 *   /fx/books                   list of local books
 *   /fx/log, /fx/log/reset      request log
 */

/**
 * Folders of real books to offer in the workbench: demo/public/books, the
 * FLIPDOCS_BOOKS environment variable, and any listed in the untracked file
 * demo/books.local.json (a JSON array of folder paths).
 */
function localBookDirs(): string[] {
  try {
    const listed = JSON.parse(fs.readFileSync(path.resolve("demo/books.local.json"), "utf8"));
    return Array.isArray(listed) ? listed.filter((entry) => typeof entry === "string") : [];
  } catch {
    return [];
  }
}

const BOOK_DIRS = [path.resolve("demo/public/books"), process.env.FLIPDOCS_BOOKS ?? "", ...localBookDirs()].filter(Boolean);

interface LogEntry {
  url: string;
  range: string | null;
  status: number;
  bytes: number;
}

const log: LogEntry[] = [];
const counters = new Map<string, number>();

/* ---------------------------------------------------------------------- */
/* PNG                                                                      */
/* ---------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

const DIGITS: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
};

function hue(page: number): [number, number, number] {
  const h = (page * 47) % 360;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (0.86 - 0.12 * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}

const pngCache = new Map<string, Buffer>();

function pagePng(page: number, width: number, height: number): Buffer {
  const key = `${page}:${width}:${height}`;
  const cached = pngCache.get(key);
  if (cached) return cached;
  const [r, g, b] = hue(page);
  const stride = width * 3 + 1;
  const raw = Buffer.alloc(stride * height);
  const text = String(page);
  const cell = Math.max(2, Math.floor(Math.min(width / (text.length * 4 + 2), height / 9)));
  const textWidth = (text.length * 4 - 1) * cell;
  const left = Math.floor((width - textWidth) / 2);
  const top = Math.floor((height - 5 * cell) / 2);
  const border = Math.max(2, Math.floor(width / 60));
  for (let y = 0; y < height; y++) {
    const row = y * stride;
    for (let x = 0; x < width; x++) {
      let pr = r;
      let pg = g;
      let pb = b;
      // Fine ruled lines so sharpness and orientation are visible.
      if (y % Math.max(8, Math.floor(height / 40)) === 0 && x > width * 0.12 && x < width * 0.88) {
        pr = pg = pb = 150;
      }
      if (x < border || y < border || x >= width - border || y >= height - border) {
        pr = 40;
        pg = 50;
        pb = 70;
      }
      const cx = Math.floor((x - left) / cell);
      const cy = Math.floor((y - top) / cell);
      if (x >= left && cy >= 0 && cy < 5 && cx >= 0 && cx < text.length * 4) {
        const glyph = DIGITS[text[Math.floor(cx / 4)]];
        if (glyph && cx % 4 < 3 && glyph[cy][cx % 4] === "1") {
          pr = 20;
          pg = 24;
          pb = 34;
        }
      }
      // A mark in the top-left corner: mirrored or flipped pages are obvious.
      if (x > border * 2 && x < border * 6 && y > border * 2 && y < border * 4) {
        pr = 200;
        pg = 30;
        pb = 30;
      }
      const offset = row + 1 + x * 3;
      raw[offset] = pr;
      raw[offset + 1] = pg;
      raw[offset + 2] = pb;
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw, { level: 6 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  if (pngCache.size > 400) pngCache.clear();
  pngCache.set(key, png);
  return png;
}

/* ---------------------------------------------------------------------- */
/* PDF                                                                      */
/* ---------------------------------------------------------------------- */

interface PdfSpec {
  pages: number;
  rtl: boolean;
  images: boolean;
  mixed: boolean;
  rotated: boolean;
  encrypted: boolean;
  revision: number;
}

export const FIXTURE_PASSWORD = "open-sesame";

/** Encrypt a PDF with qpdf (AES-256). Throws when qpdf is not installed. */
function encryptPdf(pdf: Buffer): Buffer {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "flipdocs-fixture-"));
  const input = path.join(dir, "in.pdf");
  const output = path.join(dir, "out.pdf");
  try {
    fs.writeFileSync(input, pdf);
    execFileSync("qpdf", ["--encrypt", FIXTURE_PASSWORD, "fixture-owner", "256", "--", input, output], { stdio: "pipe" });
    return fs.readFileSync(output);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function parseSpec(name: string): PdfSpec {
  const tokens = name.replace(/\.pdf$/i, "").split("-");
  const pages = Number(tokens.find((token) => /^p\d+$/.test(token))?.slice(1) ?? 12);
  return {
    pages: Math.max(1, Math.min(2500, pages)),
    rtl: tokens.includes("rtl"),
    images: tokens.includes("img"),
    mixed: tokens.includes("mixed"),
    rotated: tokens.includes("rot"),
    encrypted: tokens.includes("pw"),
    revision: 0,
  };
}

const pdfCache = new Map<string, Buffer>();

function buildPdf(spec: PdfSpec): Buffer {
  const key = JSON.stringify(spec);
  const cached = pdfCache.get(key);
  if (cached) return cached;

  const objects: Buffer[] = [];
  const add = (body: string | Buffer): number => {
    objects.push(typeof body === "string" ? Buffer.from(body, "latin1") : body);
    return objects.length;
  };
  const stream = (dictionary: string, data: Buffer): Buffer =>
    Buffer.concat([
      Buffer.from(`<< ${dictionary} /Length ${data.length} >>\nstream\n`, "latin1"),
      data,
      Buffer.from("\nendstream", "latin1"),
    ]);

  // Layout: the catalog, a balanced page tree, every page record and the
  // outline come first, as an optimised PDF has them, so finding a page
  // costs one early chunk. The heavy content streams and rasters follow.
  const catalogId = add("");
  const pagesId = add("");
  const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const pageIds: number[] = [];
  for (let page = 1; page <= spec.pages; page++) pageIds.push(add(""));

  // Page tree with a fan-out of eight and correct /Count on every node.
  const FAN = 8;
  const parentOf = new Map<number, number>();
  let level = pageIds.map((id) => ({ id, count: 1 }));
  while (level.length > FAN) {
    const next: Array<{ id: number; count: number }> = [];
    for (let i = 0; i < level.length; i += FAN) {
      const kids = level.slice(i, i + FAN);
      const id = add("");
      for (const kid of kids) parentOf.set(kid.id, id);
      next.push({ id, count: kids.reduce((sum, kid) => sum + kid.count, 0) });
      objects[id - 1] = Buffer.from(
        `<< /Type /Pages /Parent 0 0 R /Kids [${kids.map((kid) => `${kid.id} 0 R`).join(" ")}] /Count ${next[next.length - 1].count} >>`,
        "latin1",
      );
    }
    level = next;
  }
  for (const node of level) parentOf.set(node.id, pagesId);
  objects[pagesId - 1] = Buffer.from(
    `<< /Type /Pages /Kids [${level.map((node) => `${node.id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`,
    "latin1",
  );
  // Intermediate nodes were written before their parents were known.
  for (const [id, parent] of parentOf) {
    const body = objects[id - 1].toString("latin1");
    if (body.includes("/Parent 0 0 R")) objects[id - 1] = Buffer.from(body.replace("/Parent 0 0 R", `/Parent ${parent} 0 R`), "latin1");
  }

  const outlineRoot = add("");
  const marks = [1, Math.min(spec.pages, 3), spec.pages].filter((value, index, all) => all.indexOf(value) === index);
  const outlineItems = marks.map(() => add(""));
  marks.forEach((page, index) => {
    const previous = index > 0 ? ` /Prev ${outlineItems[index - 1]} 0 R` : "";
    const next = index < marks.length - 1 ? ` /Next ${outlineItems[index + 1]} 0 R` : "";
    objects[outlineItems[index] - 1] = Buffer.from(
      `<< /Title (Section at page ${page}) /Parent ${outlineRoot} 0 R /Dest [${pageIds[page - 1]} 0 R /Fit]${previous}${next} >>`,
      "latin1",
    );
  });
  objects[outlineRoot - 1] = Buffer.from(
    `<< /Type /Outlines /First ${outlineItems[0]} 0 R /Last ${outlineItems[outlineItems.length - 1]} 0 R /Count ${outlineItems.length} >>`,
    "latin1",
  );
  const preferences = spec.rtl ? " /ViewerPreferences << /Direction /R2L >>" : "";
  objects[catalogId - 1] = Buffer.from(
    `<< /Type /Catalog /Pages ${pagesId} 0 R /Outlines ${outlineRoot} 0 R /PageLabels << /Nums [0 << /S /r >> 2 << /S /D >>] >>${preferences} >>`,
    "latin1",
  );

  // A noisy raster per page, so pages weigh what scanned pages weigh and
  // each page's bytes live in their own part of the file.
  const pageImage = (page: number): number => {
    const width = 360;
    const height = 500;
    const pixels = Buffer.alloc(width * height * 3);
    let seed = 12345 + spec.revision * 7919 + page * 104729;
    for (let i = 0; i < pixels.length; i += 3) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const noise = seed % 56;
      const x = (i / 3) % width;
      const y = Math.floor(i / 3 / width);
      pixels[i] = (150 + noise + (x * 40) / width) | 0;
      pixels[i + 1] = (140 + noise + (y * 50) / height) | 0;
      pixels[i + 2] = 120 + noise;
    }
    return add(
      stream(
        `/Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode`,
        zlib.deflateSync(pixels, { level: 1 }),
      ),
    );
  };

  for (let page = 1; page <= spec.pages; page++) {
    const width = spec.mixed && page % 3 === 0 ? 792 : 432;
    const height = spec.mixed && page % 3 === 0 ? 612 : 648;
    const [r, g, b] = hue(page).map((value) => (value / 255).toFixed(3));
    const imageId = spec.images ? pageImage(page) : 0;
    const lines: string[] = [];
    lines.push(`${r} ${g} ${b} rg 0 0 ${width} ${height} re f`);
    lines.push(`0.16 0.2 0.28 RG 3 w 6 6 ${width - 12} ${height - 12} re S`);
    if (imageId) lines.push(`q ${width * 0.5} 0 0 ${height * 0.42} ${width * 0.25} ${height * 0.08} cm /Im1 Do Q`);
    // Ruled filler: plenty of small operations, like a dense text page.
    lines.push("0.35 0.38 0.44 rg");
    for (let row = 0; row < 46; row++) {
      for (let column = 0; column < 14; column++) {
        const x = 48 + column * ((width - 96) / 14);
        const y = height - 150 - row * 8;
        if (y < height * 0.52) break;
        lines.push(`${x.toFixed(1)} ${y.toFixed(1)} ${((width - 96) / 14 - 4).toFixed(1)} 1.2 re f`);
      }
    }
    lines.push("0.08 0.1 0.14 rg");
    lines.push(`BT /F1 54 Tf ${width / 2 - 70} ${height - 100} Td (Page ${page}) Tj ET`);
    lines.push(`BT /F1 13 Tf 48 ${height - 128} Td (Flipdocs fixture page ${page} of ${spec.pages} revision ${spec.revision}) Tj ET`);
    lines.push(`BT /F1 13 Tf 48 60 Td (The quick brown fox jumps over the lazy dog. Needle${page}) Tj ET`);
    lines.push("0.8 0.1 0.1 rg");
    lines.push(`14 ${height - 30} 40 16 re f`);
    const contentId = add(stream("", Buffer.from(lines.join("\n"), "latin1")));
    const annotations =
      page === 1 && spec.pages > 2
        ? ` /Annots [ << /Type /Annot /Subtype /Link /Rect [48 40 300 78] /Border [0 0 0] /Dest [${pageIds[2]} 0 R /Fit] >> << /Type /Annot /Subtype /Link /Rect [${width - 200} 40 ${width - 48} 78] /Border [0 0 0] /A << /S /URI /URI (https://example.com/flipdocs) >> >> ]`
        : "";
    const rotate = spec.rotated && page === 2 ? " /Rotate 90" : "";
    const resources = `<< /Font << /F1 ${fontId} 0 R >>${imageId ? ` /XObject << /Im1 ${imageId} 0 R >>` : ""} >>`;
    objects[pageIds[page - 1] - 1] = Buffer.from(
      `<< /Type /Page /Parent ${parentOf.get(pageIds[page - 1])} 0 R /MediaBox [0 0 ${width} ${height}] /Resources ${resources} /Contents ${contentId} 0 R${rotate}${annotations} >>`,
      "latin1",
    );
  }

  const parts: Buffer[] = [Buffer.from("%PDF-1.7\n%\xe2\xe3\xcf\xd3\n", "latin1")];
  const offsets: number[] = [];
  let position = parts[0].length;
  objects.forEach((body, index) => {
    const head = Buffer.from(`${index + 1} 0 obj\n`, "latin1");
    const tail = Buffer.from("\nendobj\n", "latin1");
    offsets.push(position);
    parts.push(head, body, tail);
    position += head.length + body.length + tail.length;
  });
  const xref = [`xref\n0 ${objects.length + 1}\n`, "0000000000 65535 f \n"];
  for (const offset of offsets) xref.push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  xref.push(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${position}\n%%EOF\n`);
  parts.push(Buffer.from(xref.join(""), "latin1"));
  const plain = Buffer.concat(parts);
  const pdf = spec.encrypted ? encryptPdf(plain) : plain;
  if (pdfCache.size > 24) pdfCache.clear();
  pdfCache.set(key, pdf);
  return pdf;
}

/* ---------------------------------------------------------------------- */
/* Serving                                                                  */
/* ---------------------------------------------------------------------- */

interface Body {
  length: number;
  etag: string;
  read(start: number, end: number): Buffer | fs.ReadStream;
}

const bufferBody = (buffer: Buffer, tag: string): Body => ({
  length: buffer.length,
  etag: `"${tag}-${buffer.length}"`,
  read: (start, end) => buffer.subarray(start, end + 1),
});

function fileBody(file: string): Body | null {
  try {
    const stat = fs.statSync(file);
    if (!stat.isFile()) return null;
    return {
      length: stat.size,
      etag: `"${stat.size}-${Math.round(stat.mtimeMs)}"`,
      read: (start, end) => fs.createReadStream(file, { start, end }),
    };
  } catch {
    return null;
  }
}

function send(res: ServerResponse, status: number, headers: Record<string, string | number>, body?: Buffer | fs.ReadStream | string): void {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges, ETag, Last-Modified",
    "Cache-Control": "no-store",
    ...headers,
  });
  if (body === undefined) res.end();
  else if (typeof body === "string" || Buffer.isBuffer(body)) res.end(body);
  else body.pipe(res);
}

function serveBody(req: IncomingMessage, res: ServerResponse, body: Body, mode: string, type: string, url: string): void {
  const range = req.headers.range ?? null;
  const record = (status: number, bytes: number) => {
    log.push({ url, range, status, bytes });
    if (log.length > 5000) log.splice(0, 1000);
  };
  const full = (extra: Record<string, string> = {}) => {
    record(200, body.length);
    send(res, 200, { "Content-Type": type, "Content-Length": body.length, ETag: body.etag, ...extra }, body.read(0, body.length - 1));
  };
  if (mode === "norange") return full();
  if (mode === "lying") return full({ "Accept-Ranges": "bytes" });
  const match = range ? /^bytes=(\d+)-(\d*)$/.exec(range) : null;
  if (!match) return full({ "Accept-Ranges": "bytes" });
  const start = Number(match[1]);
  const end = Math.min(body.length - 1, match[2] ? Number(match[2]) : body.length - 1);
  if (start > end || start >= body.length) {
    record(416, 0);
    return send(res, 416, { "Content-Range": `bytes */${body.length}` });
  }
  record(206, end - start + 1);
  send(
    res,
    206,
    {
      "Content-Type": type,
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${body.length}`,
      "Accept-Ranges": "bytes",
      ETag: body.etag,
    },
    body.read(start, end),
  );
}

function findBook(name: string): string | null {
  for (const dir of BOOK_DIRS) {
    const file = path.join(dir, name);
    if (path.dirname(file) === path.resolve(dir) && fs.existsSync(file)) return file;
  }
  return null;
}

function listBooks(): Array<{ name: string; size: number }> {
  const seen = new Map<string, number>();
  for (const dir of BOOK_DIRS) {
    try {
      for (const name of fs.readdirSync(dir)) {
        if (!/\.pdf$/i.test(name) || seen.has(name)) continue;
        seen.set(name, fs.statSync(path.join(dir, name)).size);
      }
    } catch {
      // the directory is optional
    }
  }
  return [...seen].map(([name, size]) => ({ name, size })).sort((a, b) => a.size - b.size);
}

const SENTENCES = [
  "A reader turns the page and the next spread is already waiting.",
  "Search finds words without caring about case or accents: Café, cafe, CAFÉ.",
  "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
  "Soft hy\u00adphens and   uneven   spacing should not hide a match.",
];

function handle(req: IncomingMessage, res: ServerResponse): boolean {
  const parsed = new URL(req.url ?? "/", "http://localhost");
  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts[0] !== "fx") return false;
  if (req.method === "OPTIONS") {
    send(res, 204, { "Access-Control-Allow-Headers": "Range, Authorization, X-Test", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" });
    return true;
  }
  const json = (value: unknown, status = 200) => send(res, status, { "Content-Type": "application/json" }, JSON.stringify(value));

  if (parts[1] === "log") {
    if (parts[2] === "reset") {
      log.length = 0;
      counters.clear();
      json({ ok: true });
    } else {
      json(log);
    }
    return true;
  }
  if (parts[1] === "books") {
    json(listBooks());
    return true;
  }
  if (parts[1] === "book" && parts[2] && parts[3]) {
    const file = findBook(decodeURIComponent(parts.slice(3).join("/")));
    const body = file ? fileBody(file) : null;
    if (!body) json({ error: "not found" }, 404);
    else serveBody(req, res, body, parts[2], "application/pdf", parsed.pathname);
    return true;
  }
  if (parts[1] === "img" && parts[2]) {
    const page = Number.parseInt(parts[2], 10) || 1;
    const width = Math.min(2400, Number(parsed.searchParams.get("w")) || 700);
    const height = Math.min(3400, Number(parsed.searchParams.get("h")) || 1000);
    const png = pagePng(page, width, height);
    log.push({ url: parsed.pathname + parsed.search, range: null, status: 200, bytes: png.length });
    send(res, 200, { "Content-Type": "image/png", "Content-Length": png.length }, png);
    return true;
  }
  if (parts[1] === "manifest" && parts[2]) {
    const count = Math.max(1, Math.min(3000, Number.parseInt(parts[2], 10) || 12));
    const mixed = parsed.searchParams.has("mixed");
    const pages = Array.from({ length: count }, (_, index) => {
      const number = index + 1;
      const wide = mixed && number % 4 === 0;
      const width = wide ? 1400 : 1000;
      const height = wide ? 1000 : 1400;
      return {
        number,
        label: number <= 2 ? ["i", "ii"][index] : String(number - 2),
        width,
        height,
        preview: `../img/${number}.png?w=${width / 5}&h=${height / 5}`,
        variants: [
          { src: `../img/${number}.png?w=${width / 2}&h=${height / 2}`, width: width / 2, height: height / 2, mime: "image/png" },
          { src: `../img/${number}.png?w=${width}&h=${height}`, width, height, mime: "image/png" },
        ],
        thumbnail: `../img/${number}.png?w=${width / 10}&h=${height / 10}`,
        text: `../text/${number}.json`,
        links: number === 1 ? `../links/${number}.json?count=${count}` : undefined,
      };
    });
    const body = JSON.stringify({
      schemaVersion: 1,
      id: `fixture-${count}`,
      revision: "1",
      title: `Fixture directory, ${count} pages`,
      language: "en",
      direction: parsed.searchParams.has("rtl") ? "rtl" : "ltr",
      pages,
      outline: [
        { title: "Front matter", page: 1 },
        { title: "Middle", page: Math.max(1, Math.round(count / 2)), children: [{ title: "Last page", page: count }] },
      ],
      futureField: { ignored: true },
    });
    log.push({ url: parsed.pathname + parsed.search, range: null, status: 200, bytes: body.length });
    send(res, 200, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }, body);
    return true;
  }
  if (parts[1] === "text" && parts[2]) {
    const page = Number.parseInt(parts[2], 10) || 1;
    const first = `Page ${page}. ${SENTENCES[page % SENTENCES.length]}`;
    const second = `Needle${page} appears once on this page.`;
    const text = `${first}\n\n${second}`;
    json({
      text,
      runs: [
        { start: 0, end: first.length, rect: { x: 0.12, y: 0.2, width: 0.76, height: 0.03 } },
        { start: first.length + 2, end: text.length, rect: { x: 0.12, y: 0.26, width: 0.5, height: 0.03 } },
      ],
      lang: "en",
    });
    return true;
  }
  if (parts[1] === "links" && parts[2]) {
    const count = Number(parsed.searchParams.get("count")) || 3;
    json({
      links: [
        { rect: { x: 0.1, y: 0.8, width: 0.3, height: 0.05 }, label: "Jump to the last page", page: count },
        { rect: { x: 0.6, y: 0.8, width: 0.3, height: 0.05 }, label: "Example site", url: "https://example.com/" },
        { rect: { x: 0.1, y: 0.9, width: 0.3, height: 0.05 }, label: "Unsafe", url: "javascript:alert(1)" },
      ],
    });
    return true;
  }
  if (parts[1] === "pdf" && parts[2] && parts[3]) {
    const mode = parts[2];
    const spec = parseSpec(parts[3]);
    const key = parsed.pathname;
    const seen = (counters.get(key) ?? 0) + 1;
    counters.set(key, seen);
    if (mode === "changing" && seen > 3) spec.revision = 1;
    if (mode === "auth") {
      const token = parsed.searchParams.get("token") ?? "";
      const uses = (counters.get(`token:${token}`) ?? 0) + 1;
      counters.set(`token:${token}`, uses);
      if (!token || uses > 4) {
        log.push({ url: parsed.pathname + parsed.search, range: req.headers.range ?? null, status: 401, bytes: 0 });
        send(res, 401, { "Content-Type": "text/plain" }, "expired");
        return true;
      }
    }
    const body = bufferBody(buildPdf(spec), `r${spec.revision}`);
    const serveMode = mode === "norange" || mode === "lying" ? mode : "range";
    if (mode === "slow") setTimeout(() => serveBody(req, res, body, serveMode, "application/pdf", parsed.pathname + parsed.search), 350);
    else serveBody(req, res, body, serveMode, "application/pdf", parsed.pathname + parsed.search);
    return true;
  }
  json({ error: "unknown fixture" }, 404);
  return true;
}

export function rangeFixtures(): Plugin {
  return {
    name: "flipdocs:fixtures",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          if (!handle(req, res)) next();
        } catch (error) {
          res.statusCode = 500;
          res.end(String(error));
        }
      });
    },
  };
}
