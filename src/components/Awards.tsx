import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PolishIcon, SparkleIcon, WhatsAppIcon } from "@/components/icons";
import { AWARDS } from "@/lib/content";

const AWARD_ICONS = {
  sparkle: SparkleIcon,
  polish: PolishIcon,
  whatsapp: WhatsAppIcon,
} as const;

/**
 * "Calidad" section — a giant ink watermark sits behind a centered trophy,
 * with a light-to-brand vertical gradient and a bottom highlights marquee.
 */
export function Awards() {
  const marqueeItems = [...AWARDS.items, ...AWARDS.items];

  return (
    <section
      id="innovation"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden pt-20 pb-36 md:min-h-[886px] md:pt-28 md:pb-44"
      style={{ background: "linear-gradient(#fff7fa, #fecce3 45%, #f6a8c9)" }}
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-center font-medium leading-none text-ink"
          style={{ fontSize: "clamp(5rem, 20vw, 300px)" }}
        >
          {AWARDS.heading}
        </span>

        <Reveal className="relative z-10">
          <Image
            src={AWARDS.trophy}
            alt="Esmalte de Chaila Beauty Nails"
            width={1024}
            height={1536}
            className="h-auto w-[220px] translate-y-[22%] md:w-[400px]"
          />
        </Reveal>
      </div>

      <div className="marquee absolute inset-x-0 bottom-8 overflow-hidden md:bottom-12">
        <div className="marquee-track" style={{ ["--marquee-duration" as string]: "25s" }}>
          {marqueeItems.map((item, i) => {
            const Icon = AWARD_ICONS[item.icon];
            return (
              <span
                key={i}
                className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-[18px] font-medium text-ink"
              >
                <Icon className="h-[22px] w-[22px] shrink-0 text-gold-dark" aria-hidden="true" />
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
