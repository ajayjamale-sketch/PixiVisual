import { Link } from "react-router-dom";
import { Handshake, Globe, Zap, BarChart2, ArrowRight, Check, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const partnerTypes = [
  {
    title: "Technology Partners",
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    desc: "Integrate PixiVisual's AI design capabilities into your platform via API.",
    benefits: ["Priority API access", "Co-marketing opportunities", "Technical support", "Revenue sharing"],
  },
  {
    title: "Agency Partners",
    icon: Handshake,
    color: "from-pink-500 to-rose-500",
    desc: "White-label PixiVisual for your clients and earn recurring commissions.",
    benefits: ["White-label solution", "25% recurring commission", "Dedicated partner portal", "Training resources"],
  },
  {
    title: "Reseller Partners",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    desc: "Resell PixiVisual subscriptions in your local market with exclusive pricing.",
    benefits: ["Volume discounts up to 40%", "Regional exclusivity", "Marketing assets", "Sales support"],
  },
  {
    title: "Education Partners",
    icon: BarChart2,
    color: "from-green-500 to-emerald-500",
    desc: "Bring AI design to your students with discounted educational licenses.",
    benefits: ["90% educational discount", "Classroom management", "Curriculum resources", "Student accounts"],
  },
];

const partners = [
  { name: "Shopify", logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=40&fit=crop" },
  { name: "HubSpot", logo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=80&h=40&fit=crop" },
  { name: "WordPress", logo: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=80&h=40&fit=crop" },
  { name: "Slack", logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=40&fit=crop" },
  { name: "Zapier", logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=80&h=40&fit=crop" },
  { name: "Notion", logo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&h=40&fit=crop" },
];

export default function PartnersPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Partnership inquiry submitted! We'll be in touch within 2 business days.");
    setForm({ name: "", email: "", company: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
            <Handshake className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">Partners</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            Grow Together with <span className="gradient-text-purple">PixiVisual</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our partner ecosystem and help businesses create stunning visuals with AI. Multiple partnership tiers to match your goals.
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {partnerTypes.map((pt) => {
            const Icon = pt.icon;
            return (
              <div key={pt.title} className="bg-card border border-border rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pt.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-lg">{pt.title}</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{pt.desc}</p>
                <ul className="space-y-2">
                  {pt.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-center mb-8">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="bg-card border border-border rounded-xl p-3 flex items-center justify-center hover:border-primary-500/30 hover-scale transition-all">
                <img src={p.logo} alt={p.name} className="w-full h-10 object-cover rounded-lg opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Apply Form */}
        <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-3xl p-8">
          <div className="max-w-lg mx-auto">
            <h2 className="font-heading font-bold text-2xl text-center mb-2">Become a Partner</h2>
            <p className="text-muted-foreground text-center text-sm mb-6">Fill out the form and our partnerships team will reach out within 48 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Work Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Partnership Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select type...</option>
                  <option value="technology">Technology Partner</option>
                  <option value="agency">Agency Partner</option>
                  <option value="reseller">Reseller Partner</option>
                  <option value="education">Education Partner</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover-glow transition-all"
              >
                Submit Partnership Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
