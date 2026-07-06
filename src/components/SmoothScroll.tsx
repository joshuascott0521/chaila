"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global Lenis smooth-scroll provider (the source site uses lenis@1.1.20).
 * Because Lenis manages the scroll position, native `#hash` anchor jumps don't
 * work on their own — so we intercept same-page anchor links and drive
 * `lenis.scrollTo` instead (and honor a hash present on initial load).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smoothly resolve in-page anchor links (Lenis-aware).
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // Only handle links that stay on the current page.
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      if (url.hash) {
        const target = document.querySelector(url.hash);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
        window.history.pushState(null, "", url.hash);
      } else {
        // e.g. "Inicio" (href="/") while already on home → scroll to top.
        event.preventDefault();
        lenis.scrollTo(0);
        window.history.pushState(null, "", url.pathname);
      }
    };
    document.addEventListener("click", onClick);

    // Honor a hash present on initial load (e.g. arriving at "/#services").
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() =>
          lenis.scrollTo(target as HTMLElement, { offset: 0, immediate: false })
        );
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
