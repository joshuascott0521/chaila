import type {
  NavLink,
  ServiceCard,
  ProcessStep,
  Project,
  Stat,
  Testimonial,
  PricingPlan,
  SocialLink,
} from "@/types";
import testimonialsData from "@/data/testimonials.json";

/** All copy + asset references extracted verbatim from unleay.webflow.io */

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#services" },
  { label: "Galería", href: "/#portfolio" },
  { label: "Contacto", href: "/#contact" },
];

export const HERO = {
  badge: "Manos que enamoran",
  heading: "Diseño de uñas con alma dorada",
  subtext: "Diseños de uñas hechos con detalle, para que tus manos hablen por ti.",
  ctaPrimary: "Reservar ahora",
  ctaSecondary: "Ver diseños",
  // WhatsApp de reservas: +57 323 4664031 (con mensaje pre-rellenado)
  whatsappHref:
    "https://wa.me/573234664031?text=Hola%20Chaila%2C%20quiero%20reservar%20una%20cita%20de%20u%C3%B1as.",
};

export const ABOUT = {
  // "Chaila Beauty Nails" is rendered in brand pink, the rest in ink.
  highlight: "Chaila Beauty Nails",
  headingRest: " es un estudio de uñas dedicado al cuidado, el detalle y los diseños que enamoran",
  subtext: "Todos nuestros servicios incluyen exfoliación.",
};

export const ABOUT_PAGE = {
  intro: {
    heading:
      "We're a design and motion studio focused on creating bold visuals and dynamic brand experiences.",
    subtitle:
      "We're a team of architects and designers dedicated to building smarter, more sustainable homes tailored to the way you live today, and ready for the demands of tomorrow.",
    statement:
      "Purpose-driven brands and experiences take form through thoughtful storytelling, strong visuals, and purposeful interaction.",
    image1: "/images/about-1.webp",
    image2: "/images/about-2.webp",
  },
  statement:
    "Purpose-driven brands and experiences take form through thoughtful storytelling, strong visuals, and purposeful interaction that truly connect meaningfully.",
  team: {
    label: "The Team",
    bio: "A designer who blends creativity and strategy to turn bold ideas into meaningful experiences, crafting visuals that not only look good but truly connect with people.",
    members: [
      { name: "Felipe motive", role: "the founder", photo: "/images/team-felipe.webp" },
      { name: "María motive", role: "Creative Lead", photo: "/images/team-maria.webp" },
      { name: "mara sanchez", role: "designer", photo: "/images/team-mara.webp" },
    ],
  },
};

export const SERVICES: ServiceCard[] = [
  { title: "SEMIPERMANENTE", image: "/images/work-semipermanente.jpg" },
  { title: "ACRÍLICAS", image: "/images/work-acrilico.jpg" },
  { title: "POLY GEL", image: "/images/work-poly-gel.webp" },
];

export const PROCESS = {
  subtitle:
    "Así es una cita en Chaila: un proceso sencillo y transparente, pensado para que solo te preocupes por disfrutar el resultado.",
  steps: [
    {
      title: "Reserva tu cita",
      description:
        "Escríbenos por WhatsApp, cuéntanos qué servicio quieres y elige el horario que mejor te convenga. Te confirmamos de inmediato.",
    },
    {
      title: "Preparación y exfoliación",
      description:
        "Comenzamos con la limpieza y preparación de tus uñas. Todos nuestros servicios incluyen exfoliación, para que tus manos queden suaves y cuidadas.",
    },
    {
      title: "Diseño",
      description:
        "Aplicamos la técnica que elegiste — semipermanente, acrílicas, poly gel y más — con dedicación en cada detalle para lograr el diseño que quieres.",
    },
    {
      title: "Acabado y cuidado",
      description:
        "Sellamos el trabajo con un acabado impecable y te damos recomendaciones para que tus uñas luzcan perfectas por más tiempo.",
    },
  ] satisfies ProcessStep[],
};

export const WHATSAPP_NUMBER = "573234664031";

export const PROJECTS: Project[] = [
  { title: "Acrílico", image: "/images/work-acrilico.jpg" },
  { title: "Base rubber", image: "/images/work-base-rubber.avif" },
  { title: "Builder gel con tips y nivelación", image: "/images/work-builder-gel.jpg" },
  { title: "Pedicure", image: "/images/work-pedicure.jpg" },
  { title: "Poly gel", image: "/images/work-poly-gel.webp" },
  { title: "Semipermanente", image: "/images/work-semipermanente.jpg" },
  { title: "Soft gel", image: "/images/work-soft-gel.jpg" },
];

export const EXPERTISE = {
  subtitle:
    "Cuidamos cada etapa de tu servicio, desde la preparación hasta el acabado, para que el resultado sea impecable y dure más.",
  // ⚠️ Placeholder: reemplazar con números reales cuando el cliente los confirme.
  stats: [
    { value: "7", suffix: "+", label: "Técnicas de uñas" },
    { value: "100", suffix: "%", label: "Servicios con exfoliación incluida" },
    { value: "100", suffix: "%", label: "Diseños hechos a tu medida" },
  ] satisfies Stat[],
};

export const AWARDS = {
  heading: "Calidad",
  trophy: "/images/esmalte.png",
  items: [
    { icon: "sparkle", label: "Exfoliación incluida en todos los servicios" },
    { icon: "polish", label: "Diseños personalizados" },
    { icon: "whatsapp", label: "Reserva fácil por WhatsApp" },
  ],
} as const;

// Los testimonios viven en src/data/testimonials.json. El formulario /testimonio
// agrega entradas nuevas automáticamente (commit al repo → redeploy en Vercel).
export const TESTIMONIALS = {
  subtitle:
    "Lo que dicen nuestras clientas después de pasar por las manos de Chaila.",
  items: testimonialsData as Testimonial[],
};

/** Reserva por WhatsApp con el servicio prellenado (usado por las tarjetas de precios). */
function pricingWhatsappHref(service: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola Chaila, quiero reservar: ${service}.`
  )}`;
}

export const PRICING: PricingPlan[] = [
  {
    name: "Semipermanente",
    description: "Esmaltado en gel de larga duración con acabado brillante.",
    price: "$35.000",
    period: " COP",
    features: ["Incluye exfoliación", "Reserva por WhatsApp"],
    cta: "Reservar",
    ctaHref: pricingWhatsappHref("Semipermanente"),
    featured: true,
  },
  {
    name: "Acrílicas",
    description: "Extensión y esculpido en acrílico para uñas fuertes y duraderas.",
    price: "$60.000",
    period: " COP",
    features: ["Incluye exfoliación", "Reserva por WhatsApp"],
    cta: "Reservar",
    ctaHref: pricingWhatsappHref("Acrílicas"),
    featured: false,
  },
  {
    name: "Poly gel",
    description: "La fuerza del acrílico con la flexibilidad del gel.",
    price: "$70.000",
    period: " COP",
    features: ["Incluye exfoliación", "Reserva por WhatsApp"],
    cta: "Reservar",
    ctaHref: pricingWhatsappHref("Poly gel"),
    featured: false,
  },
  {
    name: "Pedicure",
    description: "Cuidado completo de pies con esmaltado y un momento de relajación.",
    price: "$20.000",
    period: " COP",
    features: ["Incluye exfoliación", "Reserva por WhatsApp"],
    cta: "Reservar",
    ctaHref: pricingWhatsappHref("Pedicure"),
    featured: false,
  },
];

export const PRICING_NOTE = "Todos los servicios incluyen exfoliación.";

export const CTA = {
  heading: "Reserva tu cita hoy",
  button: "Escríbenos",
};

export const FOOTER = {
  wordmark: "Chaila",
  navLinks: NAV_LINKS,
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Youtube", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Tiktok", href: "#" },
  ] satisfies SocialLink[],
};
