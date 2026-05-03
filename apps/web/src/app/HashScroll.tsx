import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element matching the URL hash. Use with BrowserRouter
 * (ScrollRestoration requires a data router).
 */
export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || hash === "#") return;
    const id = hash.slice(1);
    if (!id) return;

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      el.scrollIntoView({ behavior, block: "start" });
    };

    const t = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(t);
  }, [pathname, hash]);

  return null;
}
