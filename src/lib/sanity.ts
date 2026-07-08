import type { PricingPlan, Project, ServiceCard } from "@/types";
import {
  PRICING,
  PRICING_NOTE,
  PROJECTS,
  SERVICES,
  WHATSAPP_NUMBER,
} from "@/lib/content";

/**
 * Lectura de contenido desde Sanity (proyecto "Chaila Beauty Nails").
 * El contenido se edita en https://chaila-beauty-nails.sanity.studio/ y el
 * sitio lo refleja en ~1 minuto (ISR). Si Sanity no responde o una sección
 * está vacía, se usa el contenido estático de `content.ts` como respaldo,
 * así la página nunca queda en blanco.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "qr0wgzym";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const API_VERSION = "2026-07-01";
const REVALIDATE_SECONDS = 60;

async function sanityFetch<T>(query: string): Promise<T | null> {
  const url =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}&perspective=published`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    const body = (await res.json()) as { result?: T };
    return body.result ?? null;
  } catch {
    return null;
  }
}

/** Pide al CDN de Sanity un tamaño razonable y formato moderno (WebP/AVIF). */
function optimized(url: string) {
  return `${url}?w=1600&q=80&auto=format`;
}

interface CardRow {
  title: string | null;
  image: string | null;
}

export async function getServices(): Promise<ServiceCard[]> {
  const rows = await sanityFetch<CardRow[]>(
    `*[_type == "service"] | order(order asc){ title, "image": image.asset->url }`
  );
  const services = (rows ?? []).flatMap((row) =>
    row.title && row.image ? [{ title: row.title, image: optimized(row.image) }] : []
  );
  return services.length > 0 ? services : SERVICES;
}

export async function getGallery(): Promise<Project[]> {
  const rows = await sanityFetch<CardRow[]>(
    `*[_type == "galleryItem"] | order(order asc){ title, "image": image.asset->url }`
  );
  const projects = (rows ?? []).flatMap((row) =>
    row.title && row.image ? [{ title: row.title, image: optimized(row.image) }] : []
  );
  return projects.length > 0 ? projects : PROJECTS;
}

interface PricingRow {
  name: string | null;
  description: string | null;
  price: string | null;
  features: string[] | null;
  featured: boolean | null;
}

export async function getPricing(): Promise<{ plans: PricingPlan[]; note: string }> {
  const [rows, note] = await Promise.all([
    sanityFetch<PricingRow[]>(
      `*[_type == "pricingPlan"] | order(order asc){ name, description, price, features, featured }`
    ),
    sanityFetch<string>(`*[_type == "pricingSection"][0].note`),
  ]);
  const plans = (rows ?? []).flatMap((row) => {
    if (!row.name || !row.price) return [];
    return [
      {
        name: row.name,
        description: row.description ?? "",
        price: row.price,
        period: " COP",
        features: row.features ?? [],
        cta: "Reservar",
        ctaHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hola Chaila, quiero reservar: ${row.name}.`
        )}`,
        featured: row.featured ?? false,
      },
    ];
  });
  return {
    plans: plans.length > 0 ? plans : PRICING,
    note: note ?? PRICING_NOTE,
  };
}
