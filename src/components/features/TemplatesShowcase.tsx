import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Social Media", "Poster", "Logo", "Presentation", "Ads", "Carousel"];

const templates = [
  {
    id: 1, title: "Summer Sale Collection", category: "Social Media",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=400&fit=crop",
    rating: 4.9, downloads: 12400, isPremium: false,
  },
  {
    id: 2, title: "Tech Event Poster", category: "Poster",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=400&fit=crop",
    rating: 4.8, downloads: 8900, isPremium: true,
  },
  {
    id: 3, title: "Minimal Logo Kit", category: "Logo",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=400&fit=crop",
    rating: 4.7, downloads: 15200, isPremium: false,
  },
  {
    id: 4, title: "Startup Pitch Deck", category: "Presentation",
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=300&h=400&fit=crop",
    rating: 4.9, downloads: 7800, isPremium: true,
  },
  {
    id: 5, title: "Product Ad Creative", category: "Ads",
    img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=300&h=400&fit=crop",
    rating: 4.6, downloads: 9300, isPremium: false,
  },
  {
    id: 6, title: "Instagram Carousel", category: "Carousel",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=400&fit=crop",
    rating: 4.8, downloads: 11600, isPremium: false,
  },
  {
    id: 7, title: "Food & Restaurant", category: "Social Media",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop",
    rating: 4.7, downloads: 6700, isPremium: true,
  },
  {
    id: 8, title: "Fashion Collection", category: "Poster",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
    rating: 4.9, downloads: 13400, isPremium: false,
  },
];

export default function TemplatesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = templates.filter(
    (t) => activeCategory === "All" || t.category === activeCategory
  );

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Star className="w-3.5 h-3.5 text-accent" fill="currentColor" />
              <span className="text-sm font-semibold text-accent">500+ Templates</span>
            </div>
            <h2 className="font-heading font-black text-4xl md:text-5xl">
              Ready-Made{" "}
              <span className="gradient-text-purple">Templates</span>
            </h2>
          </div>
          <Link
            to="/templates"
            className="flex items-center gap-2 text-primary-500 hover:text-secondary-500 font-semibold text-sm transition-colors"
          >
            Browse All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((template) => (
            <div
              key={template.id}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={template.img}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
                  hoveredId === template.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />

                {/* Premium Badge */}
                {template.isPremium && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-warning to-orange-500 text-white text-xs font-bold">
                    PRO
                  </span>
                )}

                {/* Hover Content */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
                  hoveredId === template.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  <p className="text-white font-semibold text-sm mb-2 truncate">{template.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span className="text-xs text-white/80">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70">
                      <Download className="w-3 h-3" />
                      <span className="text-xs">{(template.downloads / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <Link
                    to="/editor"
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-primary-500 hover:text-white transition-all"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
