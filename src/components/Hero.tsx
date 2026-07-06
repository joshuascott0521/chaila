import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon, ArrowRight } from "@/components/icons";
import { HERO } from "@/lib/content";

/**
 * `.herosection` — full-bleed wave background behind a centered copy column
 * (badge, heading, subtext, CTA), staggered in on load.
 */
export function Hero() {
  return (
    <section className="herosection relative flex min-h-[86vh] w-full items-center overflow-hidden md:min-h-[770px]">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Re-tint the peach/blue silk wave into the rosa + dorado palette,
          keeping the image's luminosity (soft highlights/shadows). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #fecce3 0%, #ffe9f2 38%, #f6a8c9 72%, #e9d7b8 100%)",
          mixBlendMode: "color",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,247,250,0.35), rgba(255,233,242,0.1) 45%, rgba(246,168,201,0.22))",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center px-6 text-center">
        <Reveal delay={1}>
          <span className="inline-block rounded-full border-[0.8px] border-brand px-3 py-1.5 text-center text-xs font-medium uppercase tracking-[1.44px] text-brand">
            {HERO.badge}
          </span>
        </Reveal>

        <Reveal delay={2}>
          <h1 className="mx-auto mt-6 max-w-[760px] text-[clamp(2.75rem,8vw,6.72rem)] font-medium leading-[1.02] text-ink">
            {HERO.heading}
          </h1>
        </Reveal>

        <Reveal delay={3}>
          <p className="mx-auto mt-6 max-w-[520px] text-xl leading-[1.4] text-ink/70">
            {HERO.subtext}
          </p>
        </Reveal>

        <Reveal
          delay={4}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={HERO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient inline-flex items-center gap-2.5 rounded-full px-7 py-[18px] text-base font-medium tracking-[0.4px] text-white shadow-[0_10px_24px_rgba(222,123,166,0.35)] transition duration-300 hover:scale-[1.03] hover:brightness-110"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {HERO.ctaPrimary}
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-[rgba(201,161,94,0.55)] bg-white/80 px-7 py-[18px] text-base font-medium tracking-[0.4px] text-ink backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:border-brand hover:text-brand"
          >
            {HERO.ctaSecondary}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
