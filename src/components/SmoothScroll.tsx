"use client";

import { useEffect } from "react";

const DURATION_MS = 1200;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Scroll suave para la navegación por anclas del menú (`/#services`,
 * `/#portfolio`, `/#contact`) e "Inicio" (subir al tope sin recargar).
 *
 * La animación se hace por JS con pasos instantáneos de `window.scrollTo`
 * en requestAnimationFrame: el scroll suave nativo (CSS `scroll-behavior`,
 * `scrollIntoView({behavior:"smooth"})` y Lenis) no funciona en esta página,
 * así que este es el camino confiable. Respeta `prefers-reduced-motion`
 * (salto directo) y el usuario puede interrumpir con la rueda o el dedo.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let rafId = 0;

    const cancel = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    function animateTo(targetY: number) {
      cancel();
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.max(0, Math.min(targetY, maxY));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, to);
        return;
      }
      const from = window.scrollY;
      if (Math.abs(to - from) < 1) return;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        window.scrollTo(0, from + (to - from) * easeOutExpo(t));
        rafId = t < 1 ? requestAnimationFrame(step) : 0;
      };
      rafId = requestAnimationFrame(step);
    }

    // La rueda o un toque del usuario interrumpen la animación.
    const interrupt = () => cancel();
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      // Ctrl/Cmd+clic abre en otra pestaña: no interceptar.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      if (url.hash) {
        const target = document.querySelector<HTMLElement>(url.hash);
        if (!target) return;
        event.preventDefault();
        animateTo(target.getBoundingClientRect().top + window.scrollY);
        window.history.pushState(null, "", url.hash);
      } else {
        // "Inicio" (href="/") estando ya en la home → subir al tope.
        event.preventDefault();
        animateTo(0);
        window.history.pushState(null, "", url.pathname);
      }
    };
    document.addEventListener("click", onClick);

    // Honra un hash presente al cargar (p. ej. llegar directo a "/#services").
    if (window.location.hash) {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target) {
        requestAnimationFrame(() =>
          animateTo(target.getBoundingClientRect().top + window.scrollY)
        );
      }
    }

    return () => {
      cancel();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
    };
  }, []);

  return <>{children}</>;
}
