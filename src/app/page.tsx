import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Expertise } from "@/components/Expertise";
import { Awards } from "@/components/Awards";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { getGallery, getPricing, getServices } from "@/lib/sanity";

export default async function Home() {
  const [services, projects, pricing] = await Promise.all([
    getServices(),
    getGallery(),
    getPricing(),
  ]);

  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Services services={services} />
        <Process />
        <Portfolio projects={projects} />
        <Expertise />
        <Awards />
        <Testimonials />
        <Pricing plans={pricing.plans} note={pricing.note} />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
