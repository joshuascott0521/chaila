import { Reveal } from "@/components/Reveal";
import { CTA, HERO } from "@/lib/content";

/**
 * "CallToAction" section — a full-width gradient panel with a curved
 * (arch) bottom edge, closing the page out before the footer.
 */
export function CallToAction() {
  return (
    <section id="contact" className="overflow-hidden bg-page">
      <div
        className="relative flex min-h-[500px] w-full flex-col items-center justify-center gap-8 rounded-b-[24%] px-6 text-center md:min-h-[615px] md:rounded-b-[25%]"
        style={{ background: "linear-gradient(var(--page), var(--brand))" }}
      >
        <Reveal className="flex flex-col items-center gap-8">
            <h2 className="max-w-[18ch] text-[clamp(2.25rem,4vw,61px)] font-medium tracking-[-0.03em] text-ink">
              {CTA.heading}
            </h2>
            <a
              href={HERO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-12 py-6 text-[clamp(1.25rem,2vw,32px)] font-semibold text-ink transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {CTA.button}
            </a>
        </Reveal>
      </div>
    </section>
  );
}
