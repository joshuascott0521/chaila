"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger index 1-5 → adds a small transition-delay */
  delay?: 1 | 2 | 3 | 4 | 5;
  /** render as a different element */
  as?: "div" | "section" | "span" | "li" | "header";
};

/**
 * Wraps content in a fade-up reveal that plays once when it scrolls into view,
 * mirroring the source site's on-scroll entrance animations.
 */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("reveal", className)}
      data-delay={delay}
    >
      {children}
    </Tag>
  );
}
