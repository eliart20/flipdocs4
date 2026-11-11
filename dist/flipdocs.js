import { forwardRef as d, useRef as i, useEffect as u, useImperativeHandle as m, createElement as f } from "react";
import { h as E, D as P, F as h } from "./flipdocs-core-BWCZhjD2.js";
import { b as C, T as b, d as A, e as B, c as x, f as y, g as G, i as O } from "./flipdocs-core-BWCZhjD2.js";
const D = d(function(t, l) {
  const c = i(null), a = i(null), s = i(t);
  return s.current = t, u(() => {
    const r = c.current;
    if (!r) return;
    const n = {
      ...s.current,
      onReady: (o) => s.current.onReady?.(o),
      onPageChange: (o) => s.current.onPageChange?.(o),
      onZoomChange: (o) => s.current.onZoomChange?.(o),
      onError: (o) => s.current.onError?.(o),
      onWarning: (o) => s.current.onWarning?.(o)
    }, e = new E(r, n, !0);
    return a.current = e, () => {
      a.current = null, e.destroy();
    };
  }, []), u(() => {
    const r = a.current;
    if (!r) return;
    const { onReady: n, onPageChange: e, onZoomChange: o, onError: w, onWarning: F, startPage: N, renderer: R, tuning: p, ...g } = t;
    r.update(g);
  }), m(
    l,
    () => {
      const r = () => a.current, n = () => {
        const e = a.current;
        if (!e) throw new h("DESTROYED", "The reader is not mounted");
        return e;
      };
      return {
        next: () => {
          r()?.next();
        },
        previous: () => {
          r()?.previous();
        },
        goToPage: (e) => n().jumpTo(e),
        zoomIn: () => r()?.zoomIn(),
        zoomOut: () => r()?.zoomOut(),
        resetZoom: () => r()?.resetZoom(),
        toggleFullscreen: () => n().toggleFullscreen(),
        setTuning: (e) => n().setTuning(e),
        setDiagnosticPose: (e) => n().setDiagnosticPose(e),
        resetPose: () => r()?.resetPose(),
        runBenchmark: (e, o) => n().runBenchmark(e, o),
        downloadPng: (e) => r()?.downloadPngQuietly(e),
        getSnapshot: () => n().getSnapshot()
      };
    },
    []
  ), f("div", {
    ref: c,
    className: t.className ? `flipdocs ${t.className}` : "flipdocs",
    tabIndex: 0,
    role: "region",
    dir: "ltr",
    "aria-label": t.label ?? t.strings?.reader ?? P.reader
  });
});
export {
  P as DEFAULT_STRINGS,
  C as DIAGNOSTIC_POSE_NAMES,
  D as FlipBook,
  h as FlipBookError,
  b as TUNING_DEFAULTS,
  A as TUNING_RANGES,
  B as configureAssets,
  x as createFlipbook,
  y as detectPdfDirection,
  G as directionFromViewerPreference,
  O as isFlipBookError
};
