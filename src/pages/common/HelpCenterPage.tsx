import { useState } from "react";
import { Search, ChevronRight, BookOpen, Wand2, CreditCard, Users, Settings } from "lucide-react";

const categories = [
  { icon: Wand2, label: "AI Features", count: 24, color: "from-violet-500 to-purple-600" },
  { icon: BookOpen, label: "Getting Started", count: 18, color: "from-blue-500 to-cyan-500" },
  { icon: CreditCard, label: "Billing & Plans", count: 12, color: "from-green-500 to-emerald-500" },
  { icon: Users, label: "Teams & Collaboration", count: 15, color: "from-orange-500 to-amber-500" },
  { icon: Settings, label: "Account Settings", count: 20, color: "from-pink-500 to-rose-500" },
];

const popular = [
  "How do I generate an AI image?",
  "How to upgrade my plan?",
  "Can I share designs with my team?",
  "What file formats can I export?",
  "How do I create a brand kit?",
  "How to use AI for social media posts?",
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 pt-24 pb-12 px-4 border-b border-border">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">How can we <span className="gradient-text-purple">help?</span></h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-card"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="font-semibold text-lg mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.label} className="group p-4 bg-card border border-border rounded-2xl hover:shadow-card-hover transition-all cursor-pointer text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.count} articles</p>
              </div>
            );
          })}
        </div>

        <h2 className="font-semibold text-lg mb-4">Popular Questions</h2>
        <div className="space-y-2">
          {popular.map((q) => (
            <button key={q} className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary-500/30 hover:bg-primary-500/5 transition-all text-left group">
              <span className="text-sm font-medium">{q}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-500 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
