import type { Metadata } from "next";
import { TestimonialForm } from "@/components/TestimonialForm";

export const metadata: Metadata = {
  title: "Cuéntanos tu experiencia — Chaila Beauty Nails",
  description: "Comparte tu experiencia con Chaila Beauty Nails.",
  robots: { index: false, follow: false },
};

export default function TestimonioPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-6 py-14 md:py-20"
      style={{ background: "linear-gradient(var(--page), var(--page-soft) 60%, var(--petal))" }}
    >
      <div className="w-full max-w-[560px]">
        <div className="mb-10 text-center">
          <p className="font-script text-[44px] leading-none text-ink">Chaila</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
            Beauty Nails
          </p>
          <h1 className="mt-8 text-[clamp(1.75rem,5vw,2.5rem)] font-medium tracking-[-0.02em] text-ink">
            Cuéntanos tu experiencia
          </h1>
          <p className="mx-auto mt-3 max-w-[420px] text-ink/70">
            Tu opinión ayuda a otras clientas a conocernos. Solo te toma un minuto
            y aparecerá en nuestra página.
          </p>
        </div>

        <TestimonialForm />
      </div>
    </main>
  );
}
