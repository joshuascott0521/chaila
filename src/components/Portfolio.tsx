"use client";

import { useEffect, useRef } from "react";
import { WHATSAPP_NUMBER } from "@/lib/content";
import type { Project } from "@/types";

/** Max horizontal drift (px) applied to the grid as the section scrolls through view. */
const DRIFT_RANGE = 80;

/** Prefilled WhatsApp booking link for a specific service. */
function bookingHref(service: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola Chaila, quiero reservar: ${service}.`
  )}`;
}

/** Title split into per-character spans that stagger in once it enters view. */
function AnimatedTitle({ text }: { text: string }) {
  let charIndex = 0;
  return (
    <span className="char-reveal flex max-w-full flex-wrap content-center items-center justify-center gap-x-[0.28em] gap-y-1 text-center text-[clamp(1.25rem,1.9vw,30px)] leading-tight font-normal uppercase tracking-[0.04em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-flex">
          {[...word].map((ch, ci) => (
            <span key={ci} className="char" style={{ transitionDelay: `${charIndex++ * 22}ms` }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/**
 * "Galería" (Works) — the source's peek gallery: a fixed 4-column grid wider
 * than the viewport so cards bleed off both edges, with a subtle horizontal
 * drift as the section scrolls through view. Each card shows the service name
 * centered (revealing letter-by-letter) with a pill beneath it, and books via
 * WhatsApp. On mobile it collapses to a 1/2-column grid and the drift is off.
 */
export function Portfolio({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    // Per-character title reveal (runs regardless of reduced-motion; CSS opts out).
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 }
    );
    grid.querySelectorAll(".char-reveal").forEach((el) => io.observe(el));

    // Horizontal drift (desktop, motion-safe only).
    let rafId = 0;
    let onScroll: (() => void) | null = null;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const update = () => {
        rafId = 0;
        if (window.innerWidth < 768) {
          grid.style.transform = "";
          return;
        }
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        grid.style.transform = `translateX(${DRIFT_RANGE - clamped * DRIFT_RANGE * 2}px)`;
      };
      onScroll = () => {
        if (!rafId) rafId = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative overflow-clip bg-page pt-14 pb-20 md:pt-16 md:pb-28"
    >
      <h2 className="sr-only">Galería</h2>
      {/* Giant faint word sitting ABOVE the cards (cards overlap only its base),
          mirroring the source's watermark treatment. */}
      <div
        aria-hidden
        className="pointer-events-none relative z-0 -mb-[0.22em] w-full -translate-y-2 select-none text-center leading-[0.82] font-medium whitespace-nowrap text-watermark text-[clamp(5rem,20vw,340px)]"
      >
        Galería
      </div>

      <div className="relative z-10 flex justify-center">
        <div
          ref={gridRef}
          className="grid w-full grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:w-max md:shrink-0 md:grid-cols-4 md:gap-[46px] md:px-0"
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={bookingHref(project.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[280px] w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(107,86,56,0.14)] md:h-[322px] md:w-[491px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25" />
              <div className="absolute inset-0 flex items-center justify-center px-5">
                <AnimatedTitle text={project.title} />
              </div>
              <span className="brand-gradient absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white shadow-md">
                Reservar
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
