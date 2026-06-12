import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Youtube, Share2, Layout, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "instagram", label: "Instagram", icon: "📷", sizes: ["Post (1:1)", "Story (9:16)", "Reel Cover", "Carousel"] },
  { id: "youtube", label: "YouTube", icon: "▶️", sizes: ["Thumbnail (16:9)", "Channel Art", "Community Post", "Shorts Cover"] },
  { id: "linkedin", label: "LinkedIn", icon: "💼", sizes: ["Post (1.91:1)", "Profile Banner", "Company Cover", "Article Header"] },
  { id: "twitter", label: "Twitter/X", icon: "🐦", sizes: ["Post (16:9)", "Profile Header", "Card Image"] },
  { id: "pinterest", label: "Pinterest", icon: "📌", sizes: ["Pin (2:3)", "Board Cover", "Idea Pin"] },
  { id: "facebook", label: "Facebook", icon: "👤", sizes: ["Post (1.91:1)", "Cover (2.7:1)", "Story (9:16)", "Ad (1:1)"] },
];

const templates = [
  { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop", label: "Product Promo", platform: "Instagram" },
  { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop", label: "Food & Lifestyle", platform: "Instagram" },
  { img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=350&fit=crop", label: "Story Template", platform: "Story" },
  { img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=360&h=200&fit=crop", label: "YouTube Thumb", platform: "YouTube" },
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", label: "Brand Announcement", platform: "LinkedIn" },
  { img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=200&fit=crop", label: "Product Launch", platform: "All" },
];

export default function SocialCreatorPage() {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState("instagram");
  const [activeSize, setActiveSize] = useState("Post (1:1)");

  const handleUseTemplate = (imgUrl: string, label: string) => {
    navigate("/editor", {
      state: {
        backgroundImage: imgUrl,
        title: `${label} - ${activePlatform.toUpperCase()}`
      }
    });
    toast.success(`Loaded ${label} template!`);
  };

  const platform = platforms.find((p) => p.id === activePlatform)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Social Media Creator</h1>
          <p className="text-muted-foreground mt-1">Design content optimized for every platform</p>
        </div>
        <Link to="/studio" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:shadow-glow transition-all">
          <Plus className="w-4 h-4" /> AI Generate
        </Link>
      </div>

      {/* Platform Selector */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => { setActivePlatform(p.id); setActiveSize(p.sizes[0]); }}
            className={cn(
              "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
              activePlatform === p.id ? "border-primary-500 bg-primary-500/10 text-primary-500" : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{p.icon}</span> {p.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Size Selector */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-3">Canvas Size</h2>
          <div className="space-y-2">
            {platform.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(size)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all",
                  activeSize === size ? "bg-primary-500 text-white" : "bg-muted hover:bg-primary-500/10 hover:text-primary-500"
                )}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-muted rounded-xl">
            <p className="text-xs font-semibold mb-1">Selected Size</p>
            <p className="text-sm text-primary-500 font-medium">{activeSize}</p>
            <p className="text-xs text-muted-foreground mt-1">Optimized for {platform.label}</p>
          </div>
        </div>

        {/* Templates */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">Templates for {platform.label}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((t, i) => (
              <div
                key={i}
                onClick={() => handleUseTemplate(t.img, t.label)}
                className="group rounded-xl overflow-hidden border border-border hover:border-primary-500/30 hover:shadow-card transition-all cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img src={t.img} alt={t.label} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUseTemplate(t.img, t.label); }}
                      className="w-full text-center py-1.5 bg-white text-black rounded-lg text-xs font-semibold hover:bg-primary-500 hover:text-white transition-all"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
