import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Sparkles, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/constants";

const faqItems = [
  { q: "Is there a free plan?", a: "Yes! Our Free plan includes 5 AI generations/month, 10 projects, and basic templates. No credit card required." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel your subscription anytime from your account settings. No long-term commitments." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and bank transfers for annual enterprise plans." },
  { q: "Is there a team discount?", a: "Yes! Teams of 5+ get 20% off. Teams of 20+ get 35% off. Contact sales for custom enterprise pricing." },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-success" />
            <span className="text-sm font-semibold text-success">Simple Pricing</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4">
            Start Free,{" "}
            <span className="gradient-text-purple">Scale Fast</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your creative needs. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-muted">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-semibold transition-all",
                !isAnnual ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
                isAnnual ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs">Save 30%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-3xl border p-6 transition-all duration-300 hover:shadow-card-hover",
                plan.isPopular
                  ? "border-primary-500/50 bg-gradient-to-b from-primary-500/5 to-card scale-[1.02] shadow-glow"
                  : "border-border bg-card"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className={cn("w-10 h-10 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-3", plan.color)}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black">
                    ${isAnnual ? Math.round(plan.price * 0.7) : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground text-sm mb-1">/month</span>
                  )}
                </div>
                {plan.price === 0 && (
                  <span className="text-sm text-muted-foreground">Forever free</span>
                )}
                {isAnnual && plan.price > 0 && (
                  <p className="text-xs text-success mt-1">Billed annually · Save ${Math.round(plan.price * 0.3 * 12)}/yr</p>
                )}
              </div>

              <Link
                to="/signup"
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all mb-6",
                  plan.isPopular
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow hover:shadow-glow-pink"
                    : plan.price === 0
                    ? "bg-muted hover:bg-muted-foreground/20 text-foreground"
                    : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                )}
              >
                {plan.price === 0 ? "Start Free" : "Get Started"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted transition-all"
                >
                  <span className="font-semibold text-sm">{item.q}</span>
                  <span className={cn("text-lg transition-transform", openFaq === i ? "rotate-45" : "")}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground animate-fade-in-up">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
