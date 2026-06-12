import PricingSection from "@/components/features/PricingSection";
import { ArrowRight, Check, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return (
    <div className="pt-16">
      <PricingSection />
      <div className="py-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <Users className="w-10 h-10 text-primary-500 mx-auto mb-4" />
          <h2 className="font-heading font-black text-3xl mb-3">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6">We work with large organizations to provide tailored solutions, custom integrations, and dedicated support.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:shadow-glow transition-all">
            Talk to Sales <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
