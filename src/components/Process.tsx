import { PROCESS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

/**
 * Process — scroll-driven sticky-stacking cards, built with pure CSS
 * `position: sticky`. Each card wrapper pins near the top of the viewport;
 * scrolling past it lets the next card slide up and cover it, building the
 * stack. No client JS is needed for the effect itself.
 */
export function Process() {
  return (
    <section className="relative bg-page-soft py-20 md:py-28">
      <div className="mx-auto mb-16 flex w-full max-w-[1240px] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,4vw,3.84rem)] font-medium text-ink">
            Process
          </h2>
        </Reveal>
        <Reveal delay={1} className="max-w-[440px] text-left md:text-right">
          <p className="text-[18px] text-ink/70">{PROCESS.subtitle}</p>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-4 md:px-10">
        {PROCESS.steps.map((step, index) => (
          <div
            key={step.title}
            className="sticky top-[100px] mb-8 md:top-[calc(140px_+_var(--i))]"
            style={{ ["--i" as string]: `${index * 12}px` }}
          >
            <div
              className="mx-auto flex min-h-[400px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(90deg,#de7ba6,#f6a8c9)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              }}
            >
              <span className="mb-2 text-[15px] font-medium text-white/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-4 text-[clamp(2.5rem,4.5vw,58.4px)] font-bold text-white">
                {step.title}
              </h3>
              <p className="max-w-[560px] text-[18px] leading-[1.5] text-[rgba(240,240,240,0.9)]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
