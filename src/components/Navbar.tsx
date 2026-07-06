"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { MenuIcon, CloseIcon } from "@/components/icons";

/**
 * Absolute overlay nav that scrolls away with the hero (not sticky).
 * Desktop: logo + pill nav. Mobile (< md): hamburger opens a full-width sheet.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 py-6">
      <div className="mx-auto flex h-[44px] w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <a href="#" aria-label="Chaila Beauty Nails" className="flex flex-col leading-none">
          <span className="font-script text-[30px] text-ink md:text-[34px]">Chaila</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">
            Beauty Nails
          </span>
        </a>

        {/* Desktop pill nav */}
        <nav className="hidden items-center gap-0 rounded-2xl bg-[rgba(246,168,201,0.2)] p-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-[13px] px-[18px] py-[9px] text-[18px] font-semibold tracking-[-0.39px] text-ink transition-colors hover:bg-white/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(246,168,201,0.2)] text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="mx-6 mt-3 rounded-2xl bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[13px] px-[18px] py-3 text-lg font-semibold text-ink transition-colors hover:bg-[rgba(246,168,201,0.2)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
