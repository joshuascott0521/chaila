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
  avatar: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string; // "/Monthly" | "/One Time"
  features: string[];
  cta: string;
  featured: boolean; // blue (true) vs white (false)
}

export interface SocialLink {
  label: string;
  href: string;
}
