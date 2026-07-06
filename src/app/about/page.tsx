import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutIntro } from "@/components/AboutIntro";
import { Expertise } from "@/components/Expertise";
import { Awards } from "@/components/Awards";
import { AboutStatement } from "@/components/AboutStatement";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre nosotras — Chaila Beauty Nails",
  description:
    "Conoce al equipo detrás de Chaila Beauty Nails y nuestra forma de trabajar.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <AboutIntro />
        <Expertise />
        <Awards />
        <AboutStatement />
        <Team />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
