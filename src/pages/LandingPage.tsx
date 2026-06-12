import HeroSection from "@/components/features/HeroSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import HowItWorksSection from "@/components/features/HowItWorksSection";
import TemplatesShowcase from "@/components/features/TemplatesShowcase";
import AiCapabilitiesSection from "@/components/features/AiCapabilitiesSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import PricingSection from "@/components/features/PricingSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TemplatesShowcase />
      <AiCapabilitiesSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
}
