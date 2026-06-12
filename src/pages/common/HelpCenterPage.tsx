import { useState } from "react";
import { Search, ChevronRight, BookOpen, Wand2, CreditCard, Users, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { icon: Wand2, label: "AI Features", count: 3, color: "from-violet-500 to-purple-600" },
  { icon: BookOpen, label: "Getting Started", count: 2, color: "from-blue-500 to-cyan-500" },
  { icon: CreditCard, label: "Billing & Plans", count: 1, color: "from-green-500 to-emerald-500" },
  { icon: Users, label: "Teams & Collaboration", count: 1, color: "from-orange-500 to-amber-500" },
  { icon: Settings, label: "Account Settings", count: 1, color: "from-pink-500 to-rose-500" },
];

const popular = [
  "How do I generate an AI image?",
  "How to upgrade my plan?",
  "Can I share designs with my team?",
  "What file formats can I export?",
  "How do I create a brand kit?",
  "How to use AI for social media posts?",
];

const popularAnswers: Record<string, string> = {
  "How do I generate an AI image?": "To generate an AI image, head to the AI Design Studio, enter a descriptive text prompt in the text area (e.g. 'A futuristic city in HSL neon lights'), select a style preset, and click Generate. Your generated images will appear in the output grid.",
  "How to upgrade my plan?": "Go to the Business or Admin Dashboard, click on 'Billing & Plans' in Quick Actions, select your preferred plan (Pro, Business, or Enterprise), and complete the billing details in the checkout modal.",
  "Can I share designs with my team?": "Yes! You can invite team members to your creative workspace by navigating to the Team Collaboration Hub and sending invitations via email. Once they accept, they can view, comment on, and approve designs in real time.",
  "What file formats can I export?": "PixiVisual supports exporting canvas designs as high-quality SVGs (scalable vectors), PNGs, and JSON brand kits. You can select your format inside the Canvas Editor's export dropdown menu.",
  "How do I create a brand kit?": "Go to the Branding page, choose your Google Font options, enter a vibe prompt to generate harmonized HSL color palettes, upload logo assets, and export the entire configuration as a JSON Brand Kit.",
  "How to use AI for social media posts?": "Navigate to the Social Creator page, select your target platform aspect ratio (e.g. Instagram Post, YouTube Thumbnail), and click 'Remix in Canvas Editor' to load template layers directly on the editor workspace."
};

const popularQuestionsByCategory: Record<string, string[]> = {
  "AI Features": ["How do I generate an AI image?", "How to use AI for social media posts?", "How do I create a brand kit?"],
  "Getting Started": ["How do I generate an AI image?", "What file formats can I export?"],
  "Billing & Plans": ["How to upgrade my plan?"],
  "Teams & Collaboration": ["Can I share designs with my team?"],
  "Account Settings": ["How to upgrade my plan?"]
};

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const displayedQuestions = popular.filter((q) => {
    const matchesCategory = activeCategoryFilter
      ? popularQuestionsByCategory[activeCategoryFilter]?.includes(q)
      : true;
    const matchesSearch = q.toLowerCase().includes(search.toLowerCase()) || 
      (popularAnswers[q] && popularAnswers[q].toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-card text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Browse by Category</h2>
          {activeCategoryFilter && (
            <button 
              onClick={() => setActiveCategoryFilter(null)}
              className="text-xs text-primary-500 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategoryFilter === cat.label;
            return (
              <div 
                key={cat.label} 
                onClick={() => {
                  setActiveCategoryFilter(isSelected ? null : cat.label);
                  setExpandedQuestion(null);
                }}
                className={cn(
                  "group p-4 bg-card border rounded-2xl hover:shadow-card-hover transition-all cursor-pointer text-center",
                  isSelected ? "border-primary-500 bg-primary-500/5 shadow-sm" : "border-border"
                )}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold">{cat.label}</p>
                <p className="text-[10px] text-muted-foreground">{cat.count} FAQs</p>
              </div>
            );
          })}
        </div>

        <h2 className="font-semibold text-lg mb-4">
          {activeCategoryFilter ? `${activeCategoryFilter} FAQs` : "Popular Questions"} ({displayedQuestions.length})
        </h2>
        <div className="space-y-3">
          {displayedQuestions.map((q) => {
            const isExpanded = expandedQuestion === q;
            return (
              <div key={q} className="bg-card border border-border rounded-xl hover:border-primary-500/20 transition-all overflow-hidden">
                <button 
                  onClick={() => setExpandedQuestion(isExpanded ? null : q)}
                  className="w-full flex items-center justify-between p-4 text-left group"
                >
                  <span className="text-sm font-medium">{q}</span>
                  <ChevronRight className={cn("w-4 h-4 text-muted-foreground group-hover:text-primary-500 transition-all duration-200", isExpanded && "rotate-90 text-primary-500")} />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed animate-in slide-in-from-top-1 duration-200 border-t border-border/20 mt-1">
                    {popularAnswers[q]}
                  </div>
                )}
              </div>
            );
          })}
          {displayedQuestions.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No results found for your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
