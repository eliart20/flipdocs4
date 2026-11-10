import { createElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { FlipBookError } from "../errors";
import type { FlipBookHandle, FlipBookProps, FlipbookCreateOptions } from "../types";
import { DEFAULT_STRINGS } from "../ui/strings";
import { FlipbookViewer } from "../ui/viewer";

/**
 * React component. React owns the root element's lifetime, class and props;
 * the viewer owns everything inside it. The engine is created in an effect
 * and destroyed in its cleanup, so a Strict Mode remount leaves exactly one.
 *
 * `source` reloads when its identity changes: memoize it. `startPage` is read
 * once, when the engine mounts; navigate later through the ref.
 */
export const FlipBook = forwardRef<FlipBookHandle, FlipBookProps>(function FlipBook(props, ref) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<FlipbookViewer | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Callbacks are read at call time, so changing them never touches the engine.
    const options: FlipbookCreateOptions = {
      ...propsRef.current,
      onReady: (event) => propsRef.current.onReady?.(event),
      onPageChange: (event) => propsRef.current.onPageChange?.(event),
      onZoomChange: (zoom) => propsRef.current.onZoomChange?.(zoom),
      onError: (error) => propsRef.current.onError?.(error),
      onWarning: (error) => propsRef.current.onWarning?.(error),
    };
    const viewer = new FlipbookViewer(root, options, true);
    viewerRef.current = viewer;
    return () => {
      viewerRef.current = null;
      viewer.destroy();
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const { onReady, onPageChange, onZoomChange, onError, onWarning, startPage, renderer, tuning, ...rest } = props;
    void onReady;
    void onPageChange;
    void onZoomChange;
    void onError;
    void onWarning;
    void startPage;
    void renderer;
    void tuning;
    viewer.update(rest);
  });

  useImperativeHandle(
    ref,
    (): FlipBookHandle => {
      const viewer = () => viewerRef.current;
      const required = () => {
        const current = viewerRef.current;
        if (!current) throw new FlipBookError("DESTROYED", "The reader is not mounted");
        return current;
      };
      return {
        next: () => void viewer()?.next(),
        previous: () => void viewer()?.previous(),
        goToPage: (page) => required().jumpTo(page),
        zoomIn: () => viewer()?.zoomIn(),
        zoomOut: () => viewer()?.zoomOut(),
        resetZoom: () => viewer()?.resetZoom(),
        toggleFullscreen: () => required().toggleFullscreen(),
        setTuning: (values) => required().setTuning(values),
        setDiagnosticPose: (pose) => required().setDiagnosticPose(pose),
        resetPose: () => viewer()?.resetPose(),
        runBenchmark: (durationMs, mode) => required().runBenchmark(durationMs, mode),
        downloadPng: (filename) => viewer()?.downloadPngQuietly(filename),
        getSnapshot: () => required().getSnapshot(),
      };
    },
    [],
  );

  // The root is focusable and labelled from its very first render, before
  // the engine exists, so a host that focuses it as soon as it appears (to
  // give it the keyboard) is never focusing a plain div.
  return createElement("div", {
    ref: rootRef,
    className: props.className ? `flipdocs ${props.className}` : "flipdocs",
    tabIndex: 0,
    role: "region",
    dir: "ltr",
    "aria-label": props.label ?? props.strings?.reader ?? DEFAULT_STRINGS.reader,
  });
});
