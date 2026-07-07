export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  image: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  image: string;
}

export interface Stat {
  value: string; // outlined number, e.g. "98"
  suffix: string; // "+" or "%"
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** foto opcional; si falta se muestra un círculo con la inicial */
  avatar?: string;
  /** estrellas 1-5; si falta se asume 5 */
  rating?: number;
  /** fecha ISO (yyyy-mm-dd) de envíos del formulario */
  date?: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string; // e.g. " COP"
  features: string[];
  cta: string;
  ctaHref: string; // WhatsApp booking link
  featured: boolean; // pink (true) vs white (false)
}

export interface SocialLink {
  label: string;
  href: string;
}
