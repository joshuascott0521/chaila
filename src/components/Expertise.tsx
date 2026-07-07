import { Reveal } from "@/components/Reveal";
import { EXPERTISE } from "@/lib/content";

/**
 * "Expertise" section — intro heading + subtitle, followed by three
 * oversized outlined-number stats (count-up animation optional; static
 * numbers with a scroll-reveal entrance satisfy the source's effect here).
 */
export function Expertise() {
  return (
    <section id="how-it-works" className="bg-page py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Reveal>
            <h2 className="text-[clamp(2.25rem,4vw,3.84rem)] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-ink">
              Experiencia
            </h2>
          </Reveal>
          <Reveal delay={1} className="max-w-[420px] text-lg text-ink/70 md:text-right">
            <p>{EXPERTISE.subtitle}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {EXPERTISE.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={(i + 1) as 1 | 2 | 3}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="gold-gradient h-[2px] w-full max-w-[280px]" />
              <span className="flex items-start justify-center text-[clamp(5rem,9vw,138px)] font-black leading-none">
                <span className="text-outline">{stat.value}</span>
                <span className="text-brand">{stat.suffix}</span>
              </span>
              <span className="mt-2 text-base font-medium text-ink">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
