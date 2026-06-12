import { useState } from "react";
import { Palette, Type, Image, Download, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const colorPalettes = [
  { name: "Ocean Blue", colors: ["#1E40AF", "#3B82F6", "#93C5FD", "#DBEAFE", "#EFF6FF"] },
  { name: "Purple Magic", colors: ["#5B21B6", "#7C3AED", "#A78BFA", "#DDD6FE", "#F5F3FF"] },
  { name: "Sunset Pink", colors: ["#9D174D", "#EC4899", "#F9A8D4", "#FCE7F3", "#FDF2F8"] },
  { name: "Forest Green", colors: ["#14532D", "#16A34A", "#86EFAC", "#DCFCE7", "#F0FDF4"] },
];

const fonts = [
  { name: "Inter", style: "font-sans", category: "Modern" },
  { name: "Plus Jakarta Sans", style: "font-heading", category: "Contemporary" },
  { name: "Playfair Display", style: "font-serif", category: "Elegant" },
  { name: "Space Grotesk", style: "font-mono", category: "Technical" },
];

const brandAssets = [
  { type: "Logo (Light)", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=100&fit=crop", format: "SVG, PNG" },
  { type: "Logo (Dark)", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=100&fit=crop", format: "SVG, PNG" },
  { type: "Favicon", img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=100&fit=crop", format: "ICO, PNG" },
  { type: "Social Cover", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop", format: "PNG, JPG" },
];

export default function BrandingPage() {
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [activeTab, setActiveTab] = useState<"kit" | "logo" | "guidelines">("kit");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Brand Studio</h1>
          <p className="text-muted-foreground mt-1">Build and manage your complete brand identity</p>
        </div>
        <button
          onClick={() => toast.success("Downloading brand kit...")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:shadow-glow transition-all"
        >
          <Download className="w-4 h-4" /> Export Brand Kit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {(["kit", "logo", "guidelines"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn("px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all", activeTab === t ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            {t === "kit" ? "Brand Kit" : t === "logo" ? "Logo Builder" : "Guidelines"}
          </button>
        ))}
      </div>

      {activeTab === "kit" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Color Palettes */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2"><Palette className="w-4 h-4 text-primary-500" /> Color System</h2>
              <button onClick={() => toast.info("AI palette generator")} className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Generate
              </button>
            </div>
            <div className="space-y-3">
              {colorPalettes.map((palette, i) => (
                <div
                  key={palette.name}
                  onClick={() => setSelectedPalette(i)}
                  className={cn("p-3 rounded-xl cursor-pointer border transition-all", selectedPalette === i ? "border-primary-500 bg-primary-500/5" : "border-border hover:border-primary-500/30")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{palette.name}</span>
                    {selectedPalette === i && <span className="text-xs text-primary-500 font-medium">Active</span>}
                  </div>
                  <div className="flex gap-1.5">
                    {palette.colors.map((color) => (
                      <div key={color} className="flex-1 h-8 rounded-lg" style={{ background: color }} title={color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2"><Type className="w-4 h-4 text-secondary-500" /> Typography</h2>
              <button onClick={() => toast.info("Font picker")} className="text-xs text-primary-500 hover:underline">Browse Fonts</button>
            </div>
            <div className="space-y-3">
              {fonts.map((font, i) => (
                <div key={font.name} className="p-3 rounded-xl border border-border hover:border-primary-500/30 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{font.category}</span>
                    <span className="text-xs bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded-full font-medium">
                      {i === 0 ? "Primary" : i === 1 ? "Secondary" : "Accent"}
                    </span>
                  </div>
                  <p className="text-xl font-bold">{font.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">Aa Bb Cc Dd Ee Ff Gg 1234567890</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Assets */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2"><Image className="w-4 h-4 text-accent" /> Brand Assets</h2>
              <button onClick={() => toast.info("Upload asset")} className="flex items-center gap-1.5 text-xs text-primary-500 hover:underline">
                <Plus className="w-3 h-3" /> Add Asset
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandAssets.map((asset) => (
                <div key={asset.type} className="border border-border rounded-xl overflow-hidden hover:shadow-card transition-all">
                  <img src={asset.img} alt={asset.type} className="w-full h-24 object-cover" />
                  <div className="p-2.5">
                    <p className="text-xs font-semibold">{asset.type}</p>
                    <p className="text-xs text-muted-foreground">{asset.format}</p>
                    <button
                      onClick={() => toast.success(`Downloading ${asset.type}`)}
                      className="mt-1.5 text-xs text-primary-500 hover:underline"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "logo" && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-2">AI Logo Builder</h2>
          <p className="text-muted-foreground mb-6">Describe your brand and let AI create the perfect logo</p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g., A modern tech startup with purple and minimalist design..."
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            />
            <button
              onClick={() => toast.success("Generating logo concepts...")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:shadow-glow transition-all"
            >
              Generate Logo
            </button>
          </div>
        </div>
      )}

      {activeTab === "guidelines" && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Brand Guidelines</h2>
          <div className="prose prose-sm max-w-none">
            {["Logo Usage", "Color System", "Typography Scale", "Spacing & Layout", "Photography Style", "Voice & Tone"].map((section, i) => (
              <div key={section} className="border-b border-border py-4 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-semibold">{section}</h3>
                  </div>
                  <button className="text-xs text-primary-500 hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
