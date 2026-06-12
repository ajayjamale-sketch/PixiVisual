import { Link } from "react-router-dom";
import { FileText, Book, Code, Terminal, Zap, ArrowRight, Search, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const docSections = [
  {
    category: "Getting Started",
    color: "from-violet-500 to-purple-600",
    icon: Zap,
    articles: [
      { title: "Quick Start Guide", desc: "Get up and running in 5 minutes", time: "5 min read" },
      { title: "Platform Overview", desc: "Understand the PixiVisual ecosystem", time: "8 min read" },
      { title: "Creating Your First Design", desc: "Step-by-step design walkthrough", time: "10 min read" },
      { title: "Account & Billing", desc: "Manage your subscription and billing", time: "4 min read" },
    ],
  },
  {
    category: "AI Studio",
    color: "from-pink-500 to-rose-500",
    icon: Code,
    articles: [
      { title: "AI Image Generation", desc: "Prompting tips and best practices", time: "12 min read" },
      { title: "AI Poster & Banner Maker", desc: "Create marketing materials with AI", time: "8 min read" },
      { title: "Prompt Engineering Guide", desc: "Write effective AI prompts", time: "15 min read" },
      { title: "AI Generation Limits", desc: "Understanding your plan quotas", time: "3 min read" },
    ],
  },
  {
    category: "Graphic Editor",
    color: "from-blue-500 to-cyan-500",
    icon: FileText,
    articles: [
      { title: "Canvas Editor Overview", desc: "Tools, layers, and workspace", time: "10 min read" },
      { title: "Working with Layers", desc: "Layer management and operations", time: "8 min read" },
      { title: "Export & Download", desc: "Supported formats and settings", time: "5 min read" },
      { title: "Keyboard Shortcuts", desc: "Speed up your workflow", time: "3 min read" },
    ],
  },
  {
    category: "API Reference",
    color: "from-green-500 to-emerald-500",
    icon: Terminal,
    articles: [
      { title: "Authentication", desc: "API keys and OAuth 2.0", time: "7 min read" },
      { title: "Image Generation API", desc: "Endpoints and parameters", time: "12 min read" },
      { title: "Template API", desc: "Access and render templates", time: "9 min read" },
      { title: "Webhooks", desc: "Real-time event notifications", time: "6 min read" },
    ],
  },
];

const docArticlesDetail: Record<string, string> = {
  "Quick Start Guide": "Welcome to PixiVisual! To get started, register or log in using OTP authentication. Once on your dashboard, explore the AI Design Studio or select from hundreds of ready-to-use template canvases. You can edit shape positions, colors, gradients, and export them directly.",
  "Platform Overview": "PixiVisual is a modular creative suite designed to facilitate AI design workflows. It consists of the AI Generator Studio, the Canvas Graphic Editor, and specialized dashboards tailored for Agencies, Enterprises, Freelancers, and Designers.",
  "Creating Your First Design": "Navigate to /editor to launch the Canvas editor. You can insert text boxes, circles, rectangles, or stock images. Drag layers to adjust layering order, change opacities, lock assets, or resize dimensions instantly.",
  "Account & Billing": "Review your plan status from the User Details dialog or Dashboard sections. PixiVisual features flexible subscription models (Pro, Business, Enterprise) that grant customizable AI prompt limits and quota options.",
  "AI Image Generation": "Inside the AI Studio, write detailed descriptive prompts. For instance, 'photo of a sleek tech office, HSL ambient lighting, 8k, modern interior'. Select preset modifiers like realistic or cartoon to adjust output styles.",
  "AI Poster & Banner Maker": "Preload aspect ratios specifically optimized for posters or banner creatives. The AI generation engine layout analysis preserves central focus zones to ensure legible custom text overlays.",
  "Prompt Engineering Guide": "Optimize your results by specifying clear lighting instructions (e.g. volumetric rays, golden hour), quality tokens (award-winning rendering), color codes, and HSL palettes.",
  "AI Generation Limits": "Usage quota metrics depend on subscription plans. Standard users receive 100 AI credits monthly. Enterprise users benefit from customized workspace shared pools managed by administrators.",
  "Canvas Editor Overview": "Our editor runs fully client-side using responsive state management. Control panels let you add shapes, adjust layer visibility, and modify exact X/Y coordinate systems.",
  "Working with Layers": "The layers panel lists active shapes, images, and text. Toggle the eye icon to control visibility, click the padlock to toggle lock status, or press delete to prune unused assets.",
  "Export & Download": "Export your work as production-ready SVG vectors or standard PNG images. SVGs preserve clean mathematical equations, making them ideal for high-resolution print workflows.",
  "Keyboard Shortcuts": "Boost your design speed! Press [Ctrl + S] to commit progress to local storage, and [Ctrl + E] to trigger dynamic SVG downloads in your browser.",
  "Authentication": "Secure your requests via standard Bearer tokens. Generate your API key in the account dashboard, and include it in your authorization header as Bearer YOUR_API_KEY.",
  "Image Generation API": "Trigger AI image creations programmatically by calling POST /v1/generate/image. Parameters include prompt, style, resolution, and HSL theme color arrays.",
  "Template API": "Retrieve predefined template structures by calling GET /v1/templates. Ideal for automated social media marketing generation systems.",
  "Webhooks": "Register webhook listener endpoints to receive live status notifications, such as when async AI video rendering batches complete."
};

export default function DocumentationPage() {
  const [search, setSearch] = useState("");
  const [activeArticle, setActiveArticle] = useState<typeof docSections[0]["articles"][0] | null>(null);

  const filtered = docSections.map((s) => ({
    ...s,
    articles: s.articles.filter(
      (a) =>
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500/10 via-background to-secondary-500/10 border-b border-border py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Book className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-semibold text-primary-500">Documentation</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            PixiVisual <span className="gradient-text-purple">Docs</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Everything you need to know about using PixiVisual — from beginner guides to API references.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.category} className="bg-card border border-border rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-lg">{section.category}</h2>
                </div>
                <div className="space-y-3">
                  {section.articles.map((article) => (
                    <button
                      key={article.title}
                      onClick={() => setActiveArticle(article)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all group text-left"
                    >
                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold group-hover:text-primary-500 transition-colors">{article.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{article.desc}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{article.time}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No results found for "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-3 text-primary-500 hover:underline text-sm">Clear search</button>
          </div>
        )}

        {/* API Quick Link */}
        <div className="mt-12 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg mb-1">Looking for the API Reference?</h3>
            <p className="text-muted-foreground text-sm">Full OpenAPI specification, SDKs, and code examples.</p>
          </div>
          <Link
            to="/api-docs"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" /> API Docs
          </Link>
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg bg-background/80"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs text-primary-500 font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" /> Documentation
            </div>
            <h2 className="font-heading font-bold text-xl mb-1">{activeArticle.title}</h2>
            <span className="text-xs text-muted-foreground block mb-4">{activeArticle.time} · Platform Reference</span>
            <div className="bg-muted rounded-xl p-4 text-xs text-muted-foreground leading-relaxed mb-6">
              <p className="font-semibold text-foreground mb-1">{activeArticle.desc}</p>
              <p className="mt-2 text-muted-foreground">
                {docArticlesDetail[activeArticle.title] || "Detailed documentation guidelines are currently being compiled. Please check back for updates or contact our support channels."}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + `/docs#${activeArticle.title.toLowerCase().replace(/\s+/g, "-")}`);
                  toast.success("Article link copied!");
                }}
                className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium transition-all"
              >
                Share Link
              </button>
              <button 
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-primary-500 text-white font-semibold text-xs hover-glow transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
