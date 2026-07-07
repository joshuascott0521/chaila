import { Reveal } from "@/components/Reveal";
import { StarIcon } from "@/components/icons";
import { TESTIMONIALS } from "@/lib/content";

/**
 * "Testimonios" section — a time-driven horizontal marquee of client quote
 * cards, looping seamlessly via the shared `.marquee` / `.marquee-track` CSS.
 */
export function Testimonials() {
  const cards = [...TESTIMONIALS.items, ...TESTIMONIALS.items];

  return (
    <section className="overflow-x-clip bg-page py-20 md:py-28">
      <div className="mx-auto mb-14 flex w-full max-w-[1240px] flex-col gap-6 px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,4vw,3.84rem)] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-ink">
            Testimonios
          </h2>
        </Reveal>
        <Reveal delay={1} className="max-w-[520px] md:text-right">
          <p className="text-lg text-ink/70">{TESTIMONIALS.subtitle}</p>
        </Reveal>
      </div>

      <div className="marquee overflow-x-clip">
        <div
          className="marquee-track gap-6"
          data-pause="true"
          style={{ ["--marquee-duration" as string]: "40s" }}
        >
          {cards.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex w-[346px] shrink-0 flex-col gap-8 rounded-2xl border border-[rgba(201,161,94,0.35)] p-8 shadow-[0_12px_30px_rgba(222,123,166,0.15)]"
              style={{ background: "radial-gradient(circle at 100% 0%, #fecce3, #ffe9f2)" }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    className={
                      starIndex < (item.rating ?? 5)
                        ? "h-5 w-5 text-gold"
                        : "h-5 w-5 text-gold/25"
                    }
                  />
                ))}
              </div>
              <p className="text-lg font-light leading-[1.5] text-ink">{item.quote}</p>
              <div className="mt-auto flex items-center gap-3">
                {item.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
                  >
                    {item.name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-ink">{item.name}</span>
                  <span className="text-sm text-ink-muted">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
