import { Link } from "react-router-dom";
import { Map, Rocket, Check, Clock, Lightbulb, Vote, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Status = "shipped" | "in-progress" | "planned" | "considering";

const roadmapItems: Array<{
  quarter: string;
  items: Array<{ title: string; desc: string; status: Status; votes: number; category: string }>;
}> = [
  {
    quarter: "Q2 2026 — Shipped",
    items: [
      { title: "AI Video Generation", desc: "Generate short videos from text prompts using Sora/Veo models", status: "shipped", votes: 2840, category: "AI" },
      { title: "Team Collaboration V2", desc: "Real-time co-editing, comments, and version history", status: "shipped", votes: 1920, category: "Collaboration" },
      { title: "Enterprise SSO (SAML)", desc: "Single sign-on via Okta, Azure AD, and Google Workspace", status: "shipped", votes: 1240, category: "Enterprise" },
    ],
  },
  {
    quarter: "Q3 2026 — In Progress",
    items: [
      { title: "AI Presentation Builder", desc: "Generate full slide decks from a brief or outline", status: "in-progress", votes: 3200, category: "AI" },
      { title: "Mobile App (iOS & Android)", desc: "Full design capabilities on your phone", status: "in-progress", votes: 4100, category: "Mobile" },
      { title: "Custom AI Model Training", desc: "Train personalized style models on your brand assets", status: "in-progress", votes: 2700, category: "AI" },
    ],
  },
  {
    quarter: "Q4 2026 — Planned",
    items: [
      { title: "3D Asset Generator", desc: "Create 3D product renders and scenes with AI", status: "planned", votes: 1890, category: "AI" },
      { title: "Marketplace V2 — Commissions", desc: "Request custom work from designers directly in-app", status: "planned", votes: 1450, category: "Marketplace" },
      { title: "Figma Plugin", desc: "Import/export designs between Figma and PixiVisual", status: "planned", votes: 3600, category: "Integrations" },
    ],
  },
  {
    quarter: "Future — Considering",
    items: [
      { title: "AR/VR Design Preview", desc: "Preview your designs in augmented and virtual reality", status: "considering", votes: 890, category: "Innovation" },
      { title: "AI Brand Voice Generator", desc: "Create consistent copy that matches your brand's tone", status: "considering", votes: 1200, category: "AI" },
    ],
  },
];

const statusConfig: Record<Status, { label: string; color: string; icon: typeof Check }> = {
  shipped: { label: "Shipped", color: "bg-success/10 text-success border-success/20", icon: Check },
  "in-progress": { label: "In Progress", color: "bg-primary-500/10 text-primary-500 border-primary-500/20", icon: Clock },
  planned: { label: "Planned", color: "bg-accent/10 text-accent border-accent/20", icon: Rocket },
  considering: { label: "Considering", color: "bg-muted text-muted-foreground border-border", icon: Lightbulb },
};

export default function RoadmapPage() {
  const [votedItems, setVotedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("pixivisual-roadmap-votes");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [submittedIdeas, setSubmittedIdeas] = useState<Array<{ title: string; desc: string; status: Status; votes: number; category: string }>>(() => {
    const saved = localStorage.getItem("pixivisual-roadmap-ideas");
    return saved ? JSON.parse(saved) : [];
  });

  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaCategory, setIdeaCategory] = useState("AI");
  const [ideaDesc, setIdeaDesc] = useState("");

  const toggleVote = (itemTitle: string) => {
    setVotedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemTitle)) {
        next.delete(itemTitle);
        toast.info("Vote removed");
      } else {
        next.add(itemTitle);
        toast.success("Vote recorded! Thanks for your feedback.");
      }
      localStorage.setItem("pixivisual-roadmap-votes", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const submitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaDesc.trim()) {
      toast.error("Please fill in both the title and description.");
      return;
    }
    const newIdea = {
      title: ideaTitle.trim(),
      desc: ideaDesc.trim(),
      status: "considering" as Status,
      votes: 0,
      category: ideaCategory,
    };
    const updatedIdeas = [...submittedIdeas, newIdea];
    setSubmittedIdeas(updatedIdeas);
    localStorage.setItem("pixivisual-roadmap-ideas", JSON.stringify(updatedIdeas));
    
    // Auto vote for user's own idea
    toggleVote(newIdea.title);

    setIdeaTitle("");
    setIdeaDesc("");
    setIdeaCategory("AI");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Map className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-semibold text-primary-500">Product Roadmap</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            What's <span className="gradient-text-purple">Coming Next</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our team is building, vote on features you want most, and submit your own ideas.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {Object.entries(statusConfig).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <span key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                <Icon className="w-3 h-3" /> {cfg.label}
              </span>
            );
          })}
        </div>

        {/* Roadmap Items */}
        <div className="space-y-12">
          {roadmapItems.map((quarter) => {
            const isConsidering = quarter.quarter === "Future — Considering";
            const itemsToRender = isConsidering
              ? [...quarter.items, ...submittedIdeas]
              : quarter.items;

            return (
              <div key={quarter.quarter}>
                <h2 className="font-heading font-bold text-xl mb-5 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary-500" />
                  {quarter.quarter}
                </h2>
                <div className="space-y-3">
                  {itemsToRender.map((item) => {
                    const cfg = statusConfig[item.status];
                    const Icon = cfg.icon;
                    const isVoted = votedItems.has(item.title);
                    return (
                      <div key={item.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary-500/30 hover-lift transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="font-semibold">{item.title}</h3>
                              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>
                                <Icon className="w-3 h-3" />{cfg.label}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.category}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => toggleVote(item.title)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all flex-shrink-0 ${
                              isVoted
                                ? "bg-primary-500 border-primary-500 text-white"
                                : "border-border hover:border-primary-500/50 hover:text-primary-500"
                            }`}
                          >
                            <Vote className="w-4 h-4" />
                            {item.votes + (isVoted ? 1 : 0)}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Idea */}
        <div className="mt-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-3xl p-8">
          <div className="max-w-lg mx-auto text-center">
            <Lightbulb className="w-10 h-10 text-warning mx-auto mb-3" />
            <h2 className="font-heading font-bold text-2xl mb-2">Have a Feature Idea?</h2>
            <p className="text-muted-foreground text-sm mb-6">Share your idea and our product team will review it. The most-voted ideas get prioritized.</p>
            <form onSubmit={submitIdea} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Feature Title</label>
                  <input
                    type="text"
                    value={ideaTitle}
                    onChange={(e) => setIdeaTitle(e.target.value)}
                    placeholder="e.g. Photoshop Brush Integration"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={ideaCategory}
                    onChange={(e) => setIdeaCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="AI">AI & Generation</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Mobile">Mobile & Apps</option>
                    <option value="Design">Design Tools</option>
                    <option value="Integrations">Integrations</option>
                    <option value="Innovation">Innovation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Description</label>
                <textarea
                  value={ideaDesc}
                  onChange={(e) => setIdeaDesc(e.target.value)}
                  placeholder="Describe your feature idea in detail, detailing what it is and who it helps..."
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover-glow transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Submit Feature Idea
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
