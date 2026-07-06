import { Reveal } from "@/components/Reveal";
import { ABOUT_PAGE } from "@/lib/content";

/**
 * Team section (`.teamsection`): a giant faint "The Team" marquee band over a
 * short bio and a grid of member cards (portrait photo + name + role).
 */
export function Team() {
  const { team } = ABOUT_PAGE;

  return (
    <section className="relative overflow-x-clip bg-page py-16 md:py-24">
      {/* Giant faint "The Team" marquee band */}
      <div
        aria-hidden
        className="marquee mb-6 md:mb-10"
        style={{ ["--marquee-duration" as string]: "30s" }}
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="pr-[0.3em] text-[clamp(4rem,18vw,280px)] leading-none font-medium whitespace-nowrap text-watermark select-none"
                >
                  {team.label} *
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <Reveal className="mx-auto mb-14 max-w-[720px] text-center">
          <p className="text-lg leading-[1.6] text-ink/70">{team.bio}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={(i + 1) as 1 | 2 | 3}>
              <div className="group relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                  <p className="text-lg font-semibold capitalize text-white">
                    {member.name}
                  </p>
                  <p className="text-sm capitalize text-white/80">{member.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
