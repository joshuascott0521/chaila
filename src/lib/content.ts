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
  partners: ["NALIRA", "VELIX", "KLKRO"],
};

export const ABOUT = {
  // "Studio Unleay" is rendered in brand blue, the rest in ink.
  highlight: "Studio Unleay",
  headingRest: " is a creative studio focused on design and visual storytelling",
  subtext: "Rooted in California. Designed for global impact.",
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
  { title: "BRANDING", image: "/images/service-branding.webp" },
  { title: "DESIGN UX/UI", image: "/images/service-design.webp" },
  { title: "DEVELOPMENT", image: "/images/service-development.webp" },
];

export const PROCESS = {
  subtitle:
    "After hundreds of projects, we've refined a clear, effective process designed to make every step simple, transparent, and easy to follow.",
  steps: [
    {
      title: "Planning",
      description:
        "We analyze the project goals, target audience, and requirements. This phase defines the scope, features, timeline, and technical strategy to ensure a solid foundation.",
    },
    {
      title: "User Experience",
      description:
        "We create wireframes and visual designs focused on usability and aesthetics. The goal is to deliver an intuitive, engaging user experience aligned with the brand.",
    },
    {
      title: "Implementation",
      description:
        "We build the website using modern technologies and best practices. This includes frontend and backend development, integrations, and performance optimization.",
    },
    {
      title: "Deployment",
      description:
        "We test the website across devices and browsers, fix issues, and prepare for launch. After deployment, we provide ongoing maintenance and improvements.",
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
    "We handle every stage of digital projects, applying clear, efficient methods to deliver high-quality, reliable results at every stage.",
  stats: [
    { value: "98", suffix: "+", label: "Clients worldwide" },
    { value: "20", suffix: "+", label: "Years of Experience" },
    { value: "95", suffix: "%", label: "Client Satisfaction" },
  ] satisfies Stat[],
};

export const AWARDS = {
  heading: "Awards",
  trophy: "/images/trophy.png",
  items: [
    "🏆 Creative Excellence Award 2017",
    "🏆 Brand Impact Award 2022",
    "🏆 Digital Experience Award 2025",
  ],
};

const TESTIMONIAL_QUOTE =
  "Unleay brought my ideas to life with remarkable clarity and creativity. Their animations combine precision and artistry, communicating concepts and emotions far beyond what words alone could achieve.";

export const TESTIMONIALS = {
  subtitle:
    "Client testimonials reflect trust, collaboration, and results, built through a clear, transparent process focused on quality and long-term success.",
  items: [
    { quote: TESTIMONIAL_QUOTE, name: "Cris Evans", role: "Veauly Lead", avatar: "/images/avatar-1.jpg" },
    { quote: TESTIMONIAL_QUOTE, name: "Marty Clue", role: "Natale CEO", avatar: "/images/avatar-2.jpg" },
    { quote: TESTIMONIAL_QUOTE, name: "John Clewi", role: "Marketing Coordinator", avatar: "/images/avatar-3.jpg" },
    { quote: TESTIMONIAL_QUOTE, name: "Zaire Amari", role: "Marketing Lead", avatar: "/images/avatar-1.jpg" },
    { quote: TESTIMONIAL_QUOTE, name: "Nora Leiva", role: "Product Lead", avatar: "/images/avatar-2.jpg" },
  ] satisfies Testimonial[],
};

export const PRICING: PricingPlan[] = [
  {
    name: "Subscription",
    description: "For teams needing on-demand, fast design support. Unlimited requests. One flat fee.",
    price: "$4,899",
    period: "/Monthly",
    features: [
      "One task handled at a time",
      "Ongoing collaboration with expert designers",
      "Quick delivery focused on quality",
      "Endless design tasks as needed",
      "Monthly workload scaled to your needs",
      "Continuous creative oversight",
      "Choose how you stay in touch",
      "Webflow builds included at no cost",
    ],
    cta: "Subscribe",
    featured: true,
  },
  {
    name: "One Page",
    description: "For founders who need a full website launched in days, not months. Clear scope Pro.",
    price: "$1,480",
    period: "/One Time",
    features: [
      "Tailored page structures from scratch",
      "Design aligned to your visual identity",
      "Optimized layouts for every screen",
      "Source files and design documentation",
      "Fast feedback cycles under 48 hours",
      "Refinements until final approval",
      "Extra pages available on request (+$200)",
      "Project-based email assistance",
    ],
    cta: "Subscribe",
    featured: false,
  },
];

export const CTA = {
  heading: "The first step matters",
  button: "Contact",
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
