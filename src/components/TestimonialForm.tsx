"use client";

import { useState } from "react";
import { StarIcon } from "@/components/icons";
import { RollUpLabel } from "@/components/RollUpLabel";
import { cn } from "@/lib/utils";

const SERVICES_OPTIONS = [
  "Semipermanente",
  "Acrílicas",
  "Poly gel",
  "Soft gel",
  "Base rubber",
  "Builder gel",
  "Pedicure",
  "Otro",
];

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulario que las clientas reciben por WhatsApp (/testimonio). Envía a
 * /api/testimonios, que publica el testimonio en la web automáticamente.
 */
export function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/testimonios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          service: data.get("service"),
          quote: data.get("quote"),
          rating,
          web: data.get("web"),
          code: new URLSearchParams(window.location.search).get("c") ?? "",
        }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(payload.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo enviar. Revisa tu conexión e intenta de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-[0_12px_30px_rgba(222,123,166,0.15)] md:p-12">
        <span className="brand-gradient mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full">
          <StarIcon className="h-7 w-7 text-white" />
        </span>
        <h2 className="mb-3 text-2xl font-semibold text-ink">¡Gracias por tu testimonio!</h2>
        <p className="text-ink/70">
          Tu opinión ya está en camino a la página. En unos minutos aparecerá en la
          sección de testimonios.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_12px_30px_rgba(222,123,166,0.15)] md:p-10"
    >
      {/* honeypot anti-bots: oculto para personas, los bots suelen rellenarlo */}
      <input
        type="text"
        name="web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink">Tu nombre</span>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={40}
          placeholder="Ej: María G."
          className="rounded-xl border border-[rgba(107,86,56,0.15)] bg-page px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink">Servicio que te hiciste</span>
        <select
          name="service"
          defaultValue="Semipermanente"
          className="rounded-xl border border-[rgba(107,86,56,0.15)] bg-page px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        >
          {SERVICES_OPTIONS.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink">¿Cómo calificas tu experiencia?</span>
        <div className="flex items-center gap-1.5" onMouseLeave={() => setHovered(0)}>
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHovered(i + 1)}
              aria-label={`${i + 1} ${i === 0 ? "estrella" : "estrellas"}`}
              className="transition-transform hover:scale-110"
            >
              <StarIcon
                className={cn(
                  "h-9 w-9 transition-colors",
                  i < (hovered || rating) ? "text-gold" : "text-ink/15"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink">Tu experiencia</span>
        <textarea
          name="quote"
          required
          minLength={10}
          maxLength={400}
          rows={4}
          placeholder="Cuéntanos cómo te sentiste, cómo quedaron tus uñas…"
          className="resize-none rounded-xl border border-[rgba(107,86,56,0.15)] bg-page px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
      </label>

      {status === "error" && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || rating === 0}
        className="brand-gradient group rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_10px_24px_rgba(222,123,166,0.35)] transition duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        <RollUpLabel>
          {status === "sending" ? "Enviando…" : "Enviar mi testimonio"}
        </RollUpLabel>
      </button>
      {rating === 0 && (
        <p className="-mt-3 text-center text-xs text-ink-muted">
          Selecciona las estrellas para poder enviar.
        </p>
      )}
    </form>
  );
}
