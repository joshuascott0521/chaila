import { Reveal } from "@/components/Reveal";
import { ABOUT_PAGE } from "@/lib/content";

/**
 * About page mission statement (`.expertiseinfo`): a single oversized,
 * centered line on a soft rose band.
 */
export function AboutStatement() {
  return (
    <section className="overflow-hidden bg-page-soft py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <Reveal>
          <p className="text-center text-[clamp(1.6rem,3.2vw,3.2rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
            {ABOUT_PAGE.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
