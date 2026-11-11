// Real input against the workbench: mouse hover, press, drag, reverse,
// release and cancel on desktop; touch drag, swipe, scroll and pinch on a
// phone-sized page. Events are sent by the browser itself (Playwright's mouse
// and the DevTools touch protocol), not synthesized in the page.
//
//   npm run dev
//   node tests/browser/interaction.mjs [--book=pdf:range/p40.pdf]
import { createRequire } from "node:module";
import process from "node:process";

const args = {};
for (const arg of process.argv.slice(2)) {
  const text = arg.replace(/^--/, "");
  const at = text.indexOf("=");
  args[at < 0 ? text : text.slice(0, at)] = at < 0 ? "true" : text.slice(at + 1);
}
const base = args.url ?? "http://127.0.0.1:5184";
const book = args.book ?? "pdf:range/p40.pdf";

const require = createRequire(import.meta.url);
let playwright = null;
for (const candidate of [process.env.PLAYWRIGHT_PATH, "playwright", "@playwright/test"].filter(Boolean)) {
  try {
    playwright = require(candidate);
    break;
  } catch {
    // try the next one
  }
}
if (!playwright) {
  console.error("Playwright was not found. Set PLAYWRIGHT_PATH to an installed copy.");
  process.exit(2);
}

const results = [];
const check = (condition, label, detail = "") => {
  results.push({ ok: !!condition, label });
  console.log(`${condition ? "ok  " : "FAIL"} ${label}${detail ? `  (${detail})` : ""}`);
};
const near = (a, b, tolerance) => Math.abs(a - b) <= tolerance;

const browser = await playwright.chromium.launch({
  headless: false,
  args: ["--window-position=-2600,-200", "--window-size=1400,950", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding", "--disable-background-timer-throttling"],
});

async function open(context, page, startPage, direction = "ltr") {
  const tab = await context.newPage();
  tab.on("pageerror", (error) => check(false, `no page errors: ${error.message.slice(0, 120)}`));
  const query = new URLSearchParams({ book, direction, toolbar: "default", fps: "0", page: String(startPage) });
  await tab.goto(`${base}/${page}?${query}`, { waitUntil: "load" });
  await tab.waitForFunction(() => window.flipbook?.getState().ready === true, null, { timeout: 60_000 });
  await tab.waitForFunction(() => window.flipbook.getSnapshot().activeWork.queued === 0 && window.flipbook.getSnapshot().activeWork.running === null, null, { timeout: 60_000 });
  await tab.waitForTimeout(400);
  return tab;
}

const snap = (tab) => tab.evaluate(() => window.flipbook.getSnapshot());
const settle = async (tab, ms = 1100) => {
  await tab.waitForTimeout(ms);
  await tab.waitForFunction(() => window.flipbook.getSnapshot().state === "idle", null, { timeout: 5000 }).catch(() => {});
};

/** Geometry of the book on screen, from the canvas box and the snapshot. */
async function geometry(tab) {
  const box = await tab.locator(".flipdocs__canvas").boundingBox();
  const s = await snap(tab);
  return {
    cx: box.x + box.width / 2,
    cy: box.y + box.height / 2,
    pw: s.view.pageWidth,
    ph: s.view.pageHeight,
    box,
  };
}

/** Where the grabbed point of the held sheet is drawn, in screen pixels. */
function grabOnScreen(g, s) {
  const sign = s.sheet.side === "right" ? 1 : -1;
  const depth = s.view.cameraDistance / (s.view.cameraDistance - s.sheet.lift);
  return {
    x: g.cx + (sign * s.sheet.target[0] - s.view.cameraX) * g.pw * depth,
    y: g.cy - s.sheet.target[1] * g.pw * depth,
  };
}

try {
  /* ------------------------------------------------------------------ */
  /* Desktop, mouse                                                       */
  /* ------------------------------------------------------------------ */
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const tab = await open(desktop, "", 4);
  const g = await geometry(tab);
  const corner = { x: g.cx + g.pw - 22, y: g.cy + g.ph / 2 - 22 };
  const mouse = tab.mouse;

  // Hover
  await mouse.move(g.cx + g.pw * 0.5, g.cy);
  await mouse.move(corner.x, corner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  let s = await snap(tab);
  check(s.state === "hover" && s.turnProgress > 0.005 && s.turnProgress < 0.2, "hovering an outer corner lifts a small preview curl", `state ${s.state}, progress ${s.turnProgress.toFixed(3)}`);
  check(s.page === 4, "hover does not change the page");
  const hoverGrab = grabOnScreen(g, s);
  check(near(hoverGrab.x, corner.x, 2.5) && near(hoverGrab.y, corner.y, 2.5), "the previewed corner sits under the pointer", `${hoverGrab.x.toFixed(1)},${hoverGrab.y.toFixed(1)} vs ${corner.x.toFixed(1)},${corner.y.toFixed(1)}`);
  const renderedBefore = s.renderCount;
  await tab.waitForTimeout(700);
  s = await snap(tab);
  check(s.renderCount === renderedBefore, "a held hover preview does not keep drawing");
  await mouse.move(g.cx + g.pw * 0.5, g.cy, { steps: 6 });
  await tab.waitForTimeout(500);
  s = await snap(tab);
  check(s.state === "idle" && s.page === 4 && s.sheet === null, "leaving the corner restores the spread without advancing");

  // Press the previewed corner: same pose, no jump
  await mouse.move(corner.x, corner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  const beforePress = await snap(tab);
  await mouse.down();
  await tab.waitForTimeout(80);
  s = await snap(tab);
  check(s.state === "drag", "pressing the previewed corner takes hold of the sheet");
  check(near(s.sheet.target[0], beforePress.sheet.target[0], 1e-6) && near(s.sheet.target[1], beforePress.sheet.target[1], 1e-6), "taking hold does not move the sheet");

  // Drag: the grabbed corner follows the pointer
  const a = { x: g.cx + g.pw * 0.55, y: g.cy + g.ph / 2 - 70 };
  const b = { x: g.cx - g.pw * 0.25, y: g.cy + g.ph / 2 - 130 };
  await mouse.move(a.x, a.y, { steps: 12 });
  await tab.waitForTimeout(60);
  const atA = await snap(tab);
  const drawnA = grabOnScreen(g, atA);
  check(near(drawnA.x, a.x, 3) && near(drawnA.y, a.y, 3), "while dragging, the grabbed corner stays under the pointer", `off by ${(drawnA.x - a.x).toFixed(2)}, ${(drawnA.y - a.y).toFixed(2)} px`);
  await mouse.move(b.x, b.y, { steps: 12 });
  await tab.waitForTimeout(60);
  const atB = await snap(tab);
  const drawnB = grabOnScreen(g, atB);
  check(near(drawnB.x, b.x, 3) && near(drawnB.y, b.y, 3), "and still is across the binding", `off by ${(drawnB.x - b.x).toFixed(2)}, ${(drawnB.y - b.y).toFixed(2)} px`);
  check(atB.turnProgress > atA.turnProgress && atA.turnProgress > 0.1, "progress grows with the drag", `${atA.turnProgress.toFixed(3)} → ${atB.turnProgress.toFixed(3)}`);
  await mouse.move(a.x, a.y, { steps: 12 });
  await tab.waitForTimeout(60);
  const backAtA = await snap(tab);
  check(near(backAtA.sheet.target[0], atA.sheet.target[0], 1e-9) && near(backAtA.sheet.target[1], atA.sheet.target[1], 1e-9) && near(backAtA.turnProgress, atA.turnProgress, 1e-9), "reversing the drag retraces the same shape");
  check(backAtA.page === 4, "dragging does not change the page");

  // Out of reach: clamped, never torn off
  await mouse.move(g.cx + g.pw * 0.9, g.cy - g.ph * 0.9, { steps: 10 });
  await tab.waitForTimeout(60);
  s = await snap(tab);
  check(s.sheet.clamped && Math.hypot(s.sheet.target[0], s.sheet.target[1] + s.view.pageHeight / s.view.pageWidth / 2) <= 1.0001, "an unreachable pull is held at the paper's reach", `target ${s.sheet.target.map((v) => v.toFixed(3))}`);

  // Release past the threshold completes
  await mouse.move(b.x, b.y, { steps: 10 });
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 6 && s.state === "idle", "releasing past the threshold completes the turn", `page ${s.page}`);

  // A short drag cancels
  const g2 = await geometry(tab);
  await mouse.move(g2.cx + g2.pw * 0.5, g2.cy);
  await mouse.move(corner.x, corner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  await mouse.down();
  await mouse.move(corner.x - 70, corner.y - 20, { steps: 8 });
  await tab.waitForTimeout(250);
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 6 && s.state === "idle", "releasing a short pull puts the page back", `page ${s.page}`);

  // Backward, from the left page's corner
  const leftCorner = { x: g.cx - g.pw + 22, y: g.cy - g.ph / 2 + 22 };
  await mouse.move(g.cx - g.pw * 0.5, g.cy);
  await mouse.move(leftCorner.x, leftCorner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  s = await snap(tab);
  check(s.state === "hover" && s.sheet?.forward === false && s.sheet.side === "left", "the left page's top corner previews a backward turn");
  await mouse.down();
  await mouse.move(g.cx + g.pw * 0.3, g.cy - g.ph / 2 + 90, { steps: 14 });
  await tab.waitForTimeout(60);
  s = await snap(tab);
  const mirrored = grabOnScreen(g, s);
  check(near(mirrored.x, g.cx + g.pw * 0.3, 3), "the mirrored sheet follows the pointer too", `off by ${(mirrored.x - (g.cx + g.pw * 0.3)).toFixed(2)} px`);
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 4, "and completes to the previous spread", `page ${s.page}`);

  // A click on a previewed corner turns the page
  await mouse.move(g.cx + g.pw * 0.5, g.cy);
  await mouse.move(corner.x, corner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  await mouse.down();
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 6, "clicking a previewed corner turns the page", `page ${s.page}`);

  // Taps near the outer edges
  await mouse.click(g.cx - g.pw + 14, g.cy);
  await settle(tab);
  s = await snap(tab);
  check(s.page === 4, "a click near the left edge goes back", `page ${s.page}`);
  await mouse.click(g.cx + g.pw * 0.5, g.cy);
  await settle(tab, 500);
  s = await snap(tab);
  check(s.page === 4, "a click in the middle of a page does nothing");
  check(await tab.evaluate(() => document.activeElement === document.querySelector(".flipdocs")), "clicking the page gives the reader keyboard focus");

  // Grabbing mid-page starts without a jump and carries the point
  const mid = { x: g.cx + g.pw * 0.72, y: g.cy + 10 };
  await mouse.move(mid.x, mid.y);
  await mouse.down();
  await mouse.move(mid.x - 9, mid.y, { steps: 3 });
  await tab.waitForTimeout(60);
  s = await snap(tab);
  check(s.state === "drag" && near(s.sheet.grab[0], 0.72 - 9 / g.pw, 0.01), "an outer-half drag takes hold of the paper under the pointer", `grab u ${s.sheet?.grab[0].toFixed(3)}`);
  // Paper pushed toward its binding bows up at once (the height goes with the
  // square root of the push), so the first frame is a shallow arch, not flat.
  // What must not happen is the far part of the page flipping over.
  check(s.turnProgress < 0.002 && s.sheet.lift < 0.02, "and starts flat, with no jump", `progress ${s.turnProgress.toFixed(4)}, lift ${s.sheet.lift.toFixed(3)}`);
  await mouse.move(mid.x - 13, mid.y, { steps: 2 });
  await tab.waitForTimeout(60);
  s = await snap(tab);
  // Four pixels of pull: four pixels of paper travel, not a leap.
  const travelled = (s.sheet.grab[0] - s.sheet.target[0]) * g.pw;
  check(travelled > 2 && travelled < 7, "then follows the pointer pixel for pixel", `${travelled.toFixed(1)} px of paper for 4 px of pointer, lift ${s.sheet.lift.toFixed(3)}`);
  await mouse.move(g.cx + g.pw * 0.1, mid.y - 30, { steps: 14 });
  await tab.waitForTimeout(60);
  s = await snap(tab);
  const interior = grabOnScreen(g, s);
  check(near(interior.x, g.cx + g.pw * 0.1, 3) && near(interior.y, mid.y - 30, 3), "the mid-page point stays under the pointer", `off by ${(interior.x - (g.cx + g.pw * 0.1)).toFixed(2)}, ${(interior.y - (mid.y - 30)).toFixed(2)} px`);
  await mouse.move(mid.x - 30, mid.y, { steps: 10 });
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 4, "letting it fall back leaves the page alone", `page ${s.page}`);

  // An inner-half swipe uses the canonical turn
  await mouse.move(g.cx + g.pw * 0.25, g.cy);
  await mouse.down();
  await mouse.move(g.cx + g.pw * 0.25 - 40, g.cy, { steps: 4 });
  await tab.waitForTimeout(120);
  s = await snap(tab);
  check(s.state === "anim", "an inner-half swipe starts the canonical turn, not a drag", `state ${s.state}`);
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 6, "and it completes", `page ${s.page}`);

  // A fast flick completes even when short
  const g3 = await geometry(tab);
  await mouse.move(g3.cx + g3.pw * 0.5, g3.cy);
  await mouse.move(corner.x, corner.y, { steps: 6 });
  await tab.waitForTimeout(450);
  await mouse.down();
  await mouse.move(corner.x - 190, corner.y - 30, { steps: 3 });
  await mouse.up();
  await settle(tab);
  s = await snap(tab);
  check(s.page === 8, "a quick flick completes below the distance threshold", `page ${s.page}`);

  // Catching a turning sheet
  await tab.evaluate(() => window.flipbook.setTuning({ turnDuration: 1500 }));
  await tab.keyboard.press("ArrowRight");
  await tab.waitForTimeout(500);
  const flying = await snap(tab);
  await mouse.move(g.cx, g.cy - 40);
  await mouse.down();
  await tab.waitForTimeout(80);
  s = await snap(tab);
  check(s.state === "drag" && near(s.turnProgress, flying.turnProgress, 0.12), "a press catches a turning sheet where it is", `progress ${flying.turnProgress.toFixed(3)} → ${s.turnProgress.toFixed(3)}`);
  await mouse.up();
  await settle(tab, 1700);
  s = await snap(tab);
  check(s.page === 10, "and letting go lets it finish", `page ${s.page}`);
  await tab.evaluate(() => window.flipbook.setTuning({ turnDuration: 620 }));

  // Zoom and pan
  await mouse.move(g.cx + g.pw * 0.5, g.cy);
  await tab.keyboard.down("Control");
  await mouse.wheel(0, -400);
  await tab.keyboard.up("Control");
  await tab.waitForTimeout(350);
  s = await snap(tab);
  check(s.zoom > 1.5, "ctrl + wheel zooms in about the pointer", `zoom ${s.zoom.toFixed(2)}`);
  const pagesBefore = s.page;
  await mouse.down();
  await mouse.move(g.cx + g.pw * 0.5 - 120, g.cy - 60, { steps: 8 });
  await mouse.up();
  await tab.waitForTimeout(200);
  s = await snap(tab);
  check((Math.abs(s.pan[0]) > 0.01 || Math.abs(s.pan[1]) > 0.01) && s.page === pagesBefore && s.state === "idle", "above 1× a drag pans instead of turning", `pan ${s.pan.map((v) => v.toFixed(3))}`);
  await tab.keyboard.press("0");
  await tab.waitForTimeout(400);
  s = await snap(tab);
  check(s.zoom === 1 && s.pan[0] === 0 && s.pan[1] === 0, "resetting zoom clears the pan");
  await tab.close();

  /* ------------------------------------------------------------------ */
  /* What is drawn: the seam, and the shading inside a curl              */
  /* ------------------------------------------------------------------ */
  // Blank white pages, so every pixel read back is shading and nothing else.
  const look = await open(desktop, "", 4);
  await look.evaluate(async () => {
    const blank = new OffscreenCanvas(600, 800);
    const context = blank.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 600, 800);
    const pages = [];
    for (let i = 0; i < 8; i++) pages.push(await createImageBitmap(blank));
    await window.flipbook.load({ type: "images", pages });
    await window.flipbook.goToPage(4);
  });
  await look.waitForFunction(() => window.flipbook.getSnapshot().activeWork.queued === 0 && window.flipbook.getSnapshot().activeWork.running === null, null, { timeout: 30_000 });
  await settle(look, 500);
  const lg = await geometry(look);
  const lmouse = look.mouse;
  const height = lg.ph / lg.pw;
  /** Screen position of a point on the right-hand page: u out from the spine, v up from the middle, in page widths. */
  const onRight = (u, v) => ({ x: lg.cx + u * lg.pw, y: lg.cy - v * lg.pw });
  /** Pixels of a screen rectangle as RGBA bytes, decoded in the page. */
  const pixels = async (clip) => {
    const png = await look.screenshot({ clip });
    return look.evaluate(async (base64) => {
      const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
      const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/png" }));
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, 0, 0);
      return { width: bitmap.width, height: bitmap.height, data: Array.from(context.getImageData(0, 0, bitmap.width, bitmap.height).data) };
    }, png.toString("base64"));
  };
  /** Share of the binding, top to bottom, where the dark seam is what shows. */
  const seamShowing = async () => {
    const image = await pixels({ x: Math.floor(lg.cx), y: Math.round(lg.cy - lg.ph / 2) + 6, width: 1, height: Math.round(lg.ph) - 12 });
    let dark = 0;
    for (let i = 0; i < image.height; i++) {
      if (image.data[4 * i] < 80 && image.data[4 * i + 1] < 90 && image.data[4 * i + 2] < 105) dark += 1;
    }
    return dark / image.height;
  };
  /** Mean brightness, 0–255, of a 3 × 3 patch. */
  const brightness = async (point) => {
    const image = await pixels({ x: Math.round(point.x) - 1, y: Math.round(point.y) - 1, width: 3, height: 3 });
    let sum = 0;
    for (let i = 0; i < image.width * image.height; i++) sum += (image.data[4 * i] + image.data[4 * i + 1] + image.data[4 * i + 2]) / 3;
    return sum / (image.width * image.height);
  };
  const hold = async (from, to) => {
    await lmouse.move(from.x, from.y);
    await lmouse.down();
    await lmouse.move(to.x, to.y, { steps: 24 });
    await look.waitForTimeout(300);
    return snap(look);
  };
  const letGo = async (from) => {
    await lmouse.move(from.x, from.y, { steps: 10 });
    await lmouse.up();
    await settle(look, 1300);
  };

  const seamAtRest = await seamShowing();
  check(seamAtRest > 0.97, "at rest the seam runs the height of the binding", `${(seamAtRest * 100).toFixed(0)}% of it`);

  // An ordinary corner peel: the sheet still lies on the binding, seam as before.
  const cornerPress = onRight(0.97, -0.47 * height);
  let held = await hold(cornerPress, onRight(0.45, -0.2 * height));
  const seamInPeel = await seamShowing();
  check(held.state === "drag" && Math.abs(seamInPeel - seamAtRest) < 0.01, "a sheet resting on the binding leaves the seam as it was", `${(seamInPeel * 100).toFixed(0)}% showing`);

  // The inside of the curl, near the end of the fold where it is in view.
  // Just past the crease the paper has barely tilted, so it should look like
  // the paper just before the crease, which lies in the roll's shadow. It
  // must never be the brighter of the two: that reads as a glowing sliver.
  if (held.sheet && !held.sheet.clamped) {
    const [gu, gv] = held.sheet.grab;
    const [tx, ty] = held.sheet.target;
    const pull = Math.hypot(gu - tx, gv - ty);
    const nx = (gu - tx) / pull;
    const ny = (gv - ty) / pull;
    const radius = held.sheet.lift / 2;
    const d = nx * gu + ny * gv - (pull + Math.PI * radius) / 2;
    // Where the fold line meets the bottom edge, then a little way along it
    // into the page: far enough that the flap's shadow is plain to see, not
    // so far that the roll closes over the crease.
    const tipAlong = (-height / 2 - d * ny) / nx;
    const along = tipAlong + (0.6 * Math.PI * radius * Math.abs(ny)) / nx;
    const crease = { x: d * nx - along * ny, y: d * ny + along * nx };
    const before = await brightness(onRight(crease.x - 0.016 * nx, crease.y - 0.016 * ny));
    const inside = await brightness(onRight(crease.x + 0.016 * nx, crease.y + 0.016 * ny));
    const clear = await brightness(onRight(0.3, 0.25 * height));
    check(before < clear - 8, "the flap shades the paper beside the crease", `${before.toFixed(0)} against ${clear.toFixed(0)} in the open`);
    check(inside <= before + 3, "the inside of the curl is no brighter than the paper it rises from", `${inside.toFixed(0)} inside, ${before.toFixed(0)} before the crease`);
  } else {
    check(false, "a corner peel was held for the shading checks", JSON.stringify(held.sheet));
  }
  await letGo(cornerPress);

  // Pulled taut and askew across the binding: the flipped page lies almost in
  // the plane of the book, and must still cover the seam it lies on.
  const midPress = onRight(0.69, -0.28 * height);
  held = await hold(midPress, onRight(-0.7, 0.25 * height));
  const minimumLift = await look.evaluate(() => window.flipbook.getState().tuning?.minimumLift ?? 0.018);
  check(held.sheet?.clamped === true && held.sheet.lift >= 0.9 * minimumLift, "paper pulled taut keeps a small roll instead of creasing flat", `lift ${held.sheet?.lift.toFixed(4)}`);
  const seamUnderTaut = await seamShowing();
  check(seamUnderTaut < 0.35, "a page pulled flat across the binding covers the seam", `${(seamUnderTaut * 100).toFixed(0)}% still showing`);
  await letGo(midPress);
  await look.close();
  await desktop.close();

  /* ------------------------------------------------------------------ */
  /* Phone, touch                                                         */
  /* ------------------------------------------------------------------ */
  const phone = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const mtab = await open(phone, "", 3);
  const cdp = await phone.newCDPSession(mtab);
  const touch = (type, points) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: points.map(([x, y], id) => ({ x, y, id })) });
  const swipe = async (from, to, steps = 10, hold = 0) => {
    await touch("touchStart", [from]);
    for (let i = 1; i <= steps; i++) {
      await touch("touchMove", [[from[0] + ((to[0] - from[0]) * i) / steps, from[1] + ((to[1] - from[1]) * i) / steps]]);
      await mtab.waitForTimeout(16);
    }
    if (hold) await mtab.waitForTimeout(hold);
  };
  const mg = await geometry(mtab);
  let m = await snap(mtab);
  check(m.mode === "mobile" && m.visiblePages.length === 1 && m.visiblePages[0] === 3, "a phone shows one focused page", `visible ${m.visiblePages}`);
  const W = mg.box.width;
  const midY = mg.cy;

  // Vertical movement belongs to the page
  await swipe([W * 0.8, midY - 100], [W * 0.78, midY + 160]);
  await touch("touchEnd", []);
  await settle(mtab, 400);
  m = await snap(mtab);
  check(m.page === 3 && m.state === "idle", "a vertical swipe is left to the page and turns nothing");

  // Outer-half drag: the point stays under the finger while the view slides
  const start = [W * 0.86, midY + 40];
  await swipe(start, [W * 0.5, midY + 20], 12, 80);
  m = await snap(mtab);
  const under = grabOnScreen(mg, m);
  check(m.state === "drag" && m.sheet.forward, "an outer-half touch drag takes hold of the page", `state ${m.state}`);
  check(near(under.x, W * 0.5, 4) && near(under.y, midY + 20, 4), "the grabbed point stays under the finger as the view slides", `off by ${(under.x - W * 0.5).toFixed(2)}, ${(under.y - (midY + 20)).toFixed(2)} px; camera ${m.view.cameraX.toFixed(3)}`);
  const halfway = m.turnProgress;
  await touch("touchMove", [[W * 0.2, midY + 10]]);
  await mtab.waitForTimeout(80);
  m = await snap(mtab);
  const under2 = grabOnScreen(mg, m);
  check(near(under2.x, W * 0.2, 4), "and further on", `off by ${(under2.x - W * 0.2).toFixed(2)} px; progress ${halfway.toFixed(2)} → ${m.turnProgress.toFixed(2)}`);
  await touch("touchEnd", []);
  await settle(mtab);
  m = await snap(mtab);
  check(m.page === 4 && m.visiblePages[0] === 4, "releasing completes to the next page", `page ${m.page}`);

  // Within a spread the view slides; no sheet turns
  await swipe([W * 0.4, midY], [W * 0.15, midY + 4], 6);
  await touch("touchEnd", []);
  await mtab.waitForTimeout(120);
  m = await snap(mtab);
  check(m.state === "focus" || m.page === 5, "a swipe within a spread slides the view", `state ${m.state}`);
  await settle(mtab);
  m = await snap(mtab);
  check(m.page === 5 && m.lastTurn !== undefined, "and lands on the facing page", `page ${m.page}`);

  // Swiping the other way goes back
  await swipe([W * 0.3, midY], [W * 0.62, midY + 4], 6);
  await touch("touchEnd", []);
  await settle(mtab);
  m = await snap(mtab);
  check(m.page === 4, "swiping right goes back a page", `page ${m.page}`);

  // Tap on the facing page's sliver
  const sliverX = (await snap(mtab)).view.cameraX < 0 ? W - 6 : 6;
  await touch("touchStart", [[sliverX, midY]]);
  await touch("touchEnd", []);
  await settle(mtab);
  m = await snap(mtab);
  check(m.page === 5, "tapping the sliver of the facing page moves to it", `page ${m.page}`);

  // Pinch
  await touch("touchStart", [[W * 0.4, midY], [W * 0.6, midY]]);
  for (let i = 1; i <= 8; i++) {
    await touch("touchMove", [[W * (0.4 - 0.03 * i), midY], [W * (0.6 + 0.03 * i), midY]]);
    await mtab.waitForTimeout(16);
  }
  await touch("touchEnd", []);
  await mtab.waitForTimeout(300);
  m = await snap(mtab);
  check(m.zoom > 1.6 && m.page === 5 && m.state === "idle", "a pinch zooms without turning", `zoom ${m.zoom.toFixed(2)}`);
  await mtab.evaluate(() => window.flipbook.resetZoom());
  await mtab.close();
  await phone.close();
} catch (error) {
  check(false, `run completed: ${String(error).slice(0, 300)}`);
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.ok).length;
console.log(`\n${results.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
