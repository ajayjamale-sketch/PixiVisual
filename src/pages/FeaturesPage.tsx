import FeaturesSection from "@/components/features/FeaturesSection";
import AiCapabilitiesSection from "@/components/features/AiCapabilitiesSection";
import HowItWorksSection from "@/components/features/HowItWorksSection";

export default function FeaturesPage() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 pt-16 pb-4 text-center">
        <h1 className="font-heading font-black text-4xl md:text-6xl mb-4">
          Everything You Need to <span className="gradient-text-purple">Create</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore all the powerful features that make PixiVisual the world's most comprehensive AI creative platform.
        </p>
      </div>
      <FeaturesSection />
      <AiCapabilitiesSection />
      <HowItWorksSection />
    </div>
  );
}
