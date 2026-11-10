import { StrictMode, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { FlipBook } from "flipdocs4";
import "flipdocs4/style.css";

const params = new URLSearchParams(location.search);
const url = params.get("pdf") ?? "http://127.0.0.1:5184/fx/pdf/range/p12.pdf";

function App() {
  const ref = useRef(null);
  const source = useMemo(() => ({ type: "pdf", src: url }), []);
  window.flipbookRef = ref;
  return (
    <div style={{ height: "100vh" }}>
      <FlipBook
        ref={ref}
        source={source}
        direction={params.get("direction") === "rtl" ? "rtl" : "ltr"}
        onReady={(event) => (window.flipbookReady = event)}
        onPageChange={(event) => (window.flipbookPage = event)}
        onError={(error) => (window.flipbookError = String(error))}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
