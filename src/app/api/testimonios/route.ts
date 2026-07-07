import { NextResponse } from "next/server";
import type { Testimonial } from "@/types";

/**
 * Recibe testimonios del formulario /testimonio y los publica agregándolos a
 * src/data/testimonials.json:
 *
 * - Producción (Vercel): commitea el archivo vía GitHub Contents API con
 *   GITHUB_TOKEN; el push dispara el redeploy y el testimonio queda en la web.
 * - Desarrollo local: escribe el archivo directamente (hot reload lo muestra).
 *
 * Si TESTIMONIOS_CODE está definido, el envío debe traer ese código (el link a
 * compartir pasa a ser /testimonio?c=CODIGO), para que solo las clientas con
 * el link puedan publicar.
 */

const FILE_PATH = "src/data/testimonials.json";
const MAX_ITEMS = 60;

type Payload = {
  name?: unknown;
  service?: unknown;
  quote?: unknown;
  rating?: unknown;
  code?: unknown;
  /** honeypot anti-bots: debe venir vacío */
  web?: unknown;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return bad("Solicitud inválida.");
  }

  // Honeypot: los bots lo rellenan; respondemos "ok" sin publicar nada.
  if (typeof body.web === "string" && body.web.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const inviteCode = process.env.TESTIMONIOS_CODE;
  if (inviteCode && clean(body.code, 60) !== inviteCode) {
    return bad("El link de invitación no es válido. Pídele a Chaila el link actualizado.", 403);
  }

  const name = clean(body.name, 40);
  const service = clean(body.service, 30);
  const quote = clean(body.quote, 400);
  const rating = Number(body.rating);

  if (name.length < 2) return bad("Escribe tu nombre.");
  if (quote.length < 10) return bad("Cuéntanos un poco más de tu experiencia (mínimo 10 caracteres).");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return bad("Selecciona de 1 a 5 estrellas.");
  }

  const testimonial: Testimonial = {
    quote,
    name,
    role: service || "Clienta de Chaila",
    rating,
    date: new Date().toISOString().slice(0, 10),
  };

  if (process.env.GITHUB_TOKEN) return publishViaGitHub(testimonial);
  if (process.env.NODE_ENV === "development") return publishToLocalFile(testimonial);
  return bad("La publicación automática no está configurada (falta GITHUB_TOKEN).", 503);
}

/** Producción: agrega el testimonio con un commit al repo (Vercel redespliega). */
async function publishViaGitHub(testimonial: Testimonial) {
  const repo = process.env.GITHUB_REPO ?? "joshuascott0521/chaila";
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const url = `https://api.github.com/repos/${repo}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const currentRes = await fetch(`${url}?ref=${branch}`, { headers, cache: "no-store" });
  if (!currentRes.ok) {
    return bad("No se pudo leer la lista de testimonios en GitHub.", 502);
  }
  const file = (await currentRes.json()) as { sha: string; content: string };
  const items = JSON.parse(
    Buffer.from(file.content, "base64").toString("utf8")
  ) as Testimonial[];

  const updated = [testimonial, ...items].slice(0, MAX_ITEMS);
  const putRes = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `Nuevo testimonio de ${testimonial.name}`,
      content: Buffer.from(JSON.stringify(updated, null, 2) + "\n", "utf8").toString("base64"),
      sha: file.sha,
      branch,
    }),
  });
  if (!putRes.ok) {
    return bad("No se pudo publicar el testimonio. Intenta de nuevo en un minuto.", 502);
  }
  return NextResponse.json({ ok: true });
}

/** Desarrollo: escribe el JSON local; el dev server recarga la página al instante. */
async function publishToLocalFile(testimonial: Testimonial) {
  const { readFile, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const filePath = join(process.cwd(), FILE_PATH);

  const items = JSON.parse(await readFile(filePath, "utf8")) as Testimonial[];
  const updated = [testimonial, ...items].slice(0, MAX_ITEMS);
  await writeFile(filePath, JSON.stringify(updated, null, 2) + "\n", "utf8");
  return NextResponse.json({ ok: true });
}
