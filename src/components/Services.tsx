import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

const BAND_REPEAT = 8;
const LABEL_REPEAT = 6;

/**
 * Services section — a giant "Services *" band marquee overlapping a row of
 * three image cards, each carrying its own looping label marquee. Both
 * marquees are pure CSS (`.marquee` / `.marquee-track` in globals.css), so
 * this component needs no client JS.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services relative overflow-x-clip bg-page py-16 md:py-24"
    >
      <h2 id="services-heading" className="sr-only">
        Services
      </h2>

      {/* Layer 1 — giant faint "Services *" band, sitting just above the cards */}
      <Reveal className="relative z-0 mb-[-2.5rem] overflow-hidden md:mb-[-4rem]">
        <div
          aria-hidden="true"
          className="marquee"
          style={{ ["--marquee-duration" as string]: "28s" }}
        >
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {Array.from({ length: BAND_REPEAT }).map((_, i) => (
                  <span
                    key={i}
                    className="pr-[0.3em] text-[clamp(6rem,23vw,360px)] leading-[0.9] font-medium whitespace-nowrap text-watermark select-none"
                  >
                    Services *
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Layer 2 — three image cards, each with a per-card label marquee */}
      <div className="relative z-10 mx-auto grid max-w-[1240px] grid-cols-1 gap-4 px-4 md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal
            key={service.title}
            delay={(i + 1) as 1 | 2 | 3}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl md:aspect-auto md:h-[640px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[0.6s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div
              aria-hidden="true"
              className="marquee absolute inset-0 flex items-center"
              style={{ ["--marquee-duration" as string]: "18s" }}
            >
              <div className="marquee-track">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex shrink-0 items-center">
                    {Array.from({ length: LABEL_REPEAT }).map((_, j) => (
                      <span
                        key={j}
                        className="flex items-center text-[clamp(1.75rem,3.7vw,57.8px)] font-medium whitespace-nowrap text-white uppercase"
                      >
                        {service.title}
                        <span className="mx-[0.4em] text-white">·</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
