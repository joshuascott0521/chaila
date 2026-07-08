import { Reveal } from "@/components/Reveal";
import { RollUpLabel } from "@/components/RollUpLabel";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

/**
 * "Precios" section — one card per service. Cards are equal height via
 * `items-stretch`; each CTA is pinned to the bottom with `mt-auto`
 * regardless of how many feature lines precede it.
 */
export function Pricing({ plans, note }: { plans: PricingPlan[]; note: string }) {
  return (
    <section className="pricing-section bg-page-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1160px] px-6 md:px-10">
        <Reveal className="mb-16 text-center">
          <h2 className="text-[clamp(2rem,3.5vw,46px)] font-medium uppercase text-ink">
            Precios
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
              className={cn(
                "flex flex-col rounded-[22px] p-8 md:p-10",
                plan.featured
                  ? "bg-brand text-white"
                  : "border border-[rgba(201,161,94,0.3)] bg-white text-ink"
              )}
            >
              <h3 className="mb-4 text-[clamp(2rem,3vw,44px)] font-bold">{plan.name}</h3>
              <p className="mb-8 max-w-[360px] text-base italic opacity-80">{plan.description}</p>

              <p className="mb-6">
                <span className="text-[clamp(3rem,5vw,72px)] font-bold">{plan.price}</span>
                <span className="text-base font-medium opacity-80">{plan.period}</span>
              </p>

              <div
                className={cn(
                  "mb-6 h-px w-full",
                  plan.featured ? "bg-white/40" : "bg-[rgba(201,161,94,0.35)]"
                )}
              />

              <p className="mb-5 text-sm font-bold">Incluye</p>
              <ul className="flex flex-col gap-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        plan.featured ? "bg-white text-brand" : "bg-[#6b5638] text-white"
                      )}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-base font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group mt-auto rounded-full py-4 text-center font-semibold transition hover:brightness-110",
                  plan.featured ? "bg-white text-brand" : "bg-brand text-white"
                )}
              >
                <RollUpLabel>{plan.cta}</RollUpLabel>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-lg font-medium text-ink">{note}</p>
      </div>
    </section>
  );
}
