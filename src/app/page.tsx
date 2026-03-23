import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/HeroSection";
// import UniverseHero from "@/components/sections/UniverseHero";
import TechStack from "@/components/sections/TechStack";
import ServicesSection from "@/components/sections/ServicesSection";
import ValueProposition from "@/components/sections/ValueProposition";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="bg-white min-h-screen relative">
      {/* Global Noise Overlay */}
      <div className="bg-noise" />
      
      <Navbar />

      <HeroSection />
      
      <TechStack />

      <ServicesSection />

      <ValueProposition />

      <ProcessSection />

      <CTASection />

      <Footer />
    </main>
  );
}