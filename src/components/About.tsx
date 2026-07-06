import { Reveal } from "@/components/Reveal";
import { ABOUT } from "@/lib/content";

/**
 * "About" section — a simple, airy, centered statement introducing the studio.
 */
export function About() {
  return (
    <section
      id="About"
      className="flex flex-col items-center gap-8 overflow-hidden bg-page py-24 text-center md:py-32"
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="mx-auto max-w-[15ch] text-[clamp(2rem,4.2vw,3.84rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink md:max-w-none">
            <span className="text-brand">{ABOUT.highlight}</span>
            {ABOUT.headingRest}
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-2 text-base font-medium text-ink">{ABOUT.subtext}</p>
        </Reveal>
      </div>
    </section>
  );
}
