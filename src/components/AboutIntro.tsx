import { Reveal } from "@/components/Reveal";
import { ABOUT_PAGE } from "@/lib/content";

/**
 * About page intro (`.containgrillsection`): a large statement heading with a
 * supporting paragraph, two full-width feature images, and a centered
 * mission line between them.
 */
export function AboutIntro() {
  const { intro } = ABOUT_PAGE;

  return (
    <section className="overflow-hidden bg-page pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h1 className="max-w-[820px] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
              {intro.heading}
            </h1>
          </Reveal>
          <Reveal delay={1} className="md:max-w-[380px]">
            <p className="text-base leading-[1.5] text-ink/70 md:text-right">
              {intro.subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={1} className="mt-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={intro.image1}
            alt=""
            className="mx-auto aspect-[16/9] w-full max-w-[922px] rounded-2xl object-cover"
          />
        </Reveal>

        <Reveal className="my-16 md:my-24">
          <p className="mx-auto max-w-[920px] text-center text-[clamp(1.6rem,3.2vw,3.2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
            {intro.statement}
          </p>
        </Reveal>

        <Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={intro.image2}
            alt=""
            className="mx-auto aspect-[16/9] w-full max-w-[922px] rounded-2xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
