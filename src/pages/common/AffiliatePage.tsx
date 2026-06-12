import { Link } from "react-router-dom";
import { DollarSign, Users, Share2, ArrowRight, Check, Gift, TrendingUp, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const tiers = [
  {
    name: "Starter",
    commission: "20%",
    threshold: "$0",
    color: "from-gray-500 to-slate-500",
    perks: ["Unique referral link", "Real-time dashboard", "Monthly payouts", "Email support"],
  },
  {
    name: "Growth",
    commission: "25%",
    threshold: "$500/mo",
    color: "from-violet-500 to-purple-600",
    isPopular: true,
    perks: ["Everything in Starter", "Co-branded landing page", "Priority support", "Bi-weekly payouts"],
  },
  {
    name: "Elite",
    commission: "35%",
    threshold: "$2,000/mo",
    color: "from-pink-500 to-rose-500",
    perks: ["Everything in Growth", "Dedicated affiliate manager", "Custom promo codes", "Weekly payouts", "Performance bonuses"],
  },
];

const stats = [
  { value: "$2.8M", label: "Paid to affiliates" },
  { value: "12,400+", label: "Active affiliates" },
  { value: "35%", label: "Max commission" },
  { value: "$247", label: "Avg monthly earnings" },
];

export default function AffiliatePage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const demoCode = "PIXI-DEMO-2026";

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setJoined(true);
    toast.success("You're on the affiliate waitlist! Check your email for details.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">Affiliate Program</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            Earn Up to <span className="gradient-text-purple">35% Commission</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of creators, bloggers, and influencers earning recurring commissions by recommending PixiVisual.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center hover-lift">
              <p className="font-heading font-black text-3xl gradient-text-purple">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", icon: Share2, title: "Sign Up & Get Your Link", desc: "Join the program for free and receive your unique referral link instantly." },
              { step: "2", icon: Users, title: "Share & Promote", desc: "Share your link on your blog, social media, YouTube, or anywhere your audience is." },
              { step: "3", icon: DollarSign, title: "Earn Recurring Commissions", desc: "Earn a percentage of every subscription payment — for the lifetime of the customer." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-card border border-border rounded-2xl p-6 text-center hover-lift">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commission Tiers */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-center mb-8">Commission Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-card border rounded-2xl p-6 hover-lift ${tier.isPopular ? "border-primary-500/50 shadow-glow" : "border-border"}`}
              >
                {tier.isPopular && (
                  <div className="text-center mb-3">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">Most Popular</span>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-1">{tier.name}</h3>
                <p className="text-3xl font-black gradient-text-purple mb-1">{tier.commission}</p>
                <p className="text-xs text-muted-foreground mb-4">Recurring commission · Unlocks at {tier.threshold} referred MRR</p>
                <ul className="space-y-2">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Referral Code */}
        <div className="bg-gradient-to-br from-success/10 to-primary-500/10 border border-success/20 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-success" />
            <h3 className="font-bold text-lg">Your Demo Referral Code</h3>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm font-mono">{demoCode}</code>
            <button
              onClick={() => { navigator.clipboard.writeText(demoCode); toast.success("Code copied!"); }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold hover-glow"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Gives new users 30% off their first 3 months. You earn 25% commission.</p>
        </div>

        {/* Join Form */}
        {!joined ? (
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-heading font-bold text-2xl mb-3">Join the Affiliate Program</h2>
            <p className="text-muted-foreground text-sm mb-6">Free to join. Start earning immediately. No minimum payout.</p>
            <form onSubmit={handleJoin} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow whitespace-nowrap"
              >
                Join Now
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center bg-success/10 border border-success/20 rounded-2xl p-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-xl mb-2">You're on the list!</h3>
            <p className="text-muted-foreground text-sm">Check your inbox for your affiliate dashboard link and unique referral code.</p>
          </div>
        )}
      </div>
    </div>
  );
}
