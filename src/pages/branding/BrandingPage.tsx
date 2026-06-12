import { useState } from "react";
import { Palette, Type, Image, Download, Plus, Sparkles, X, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const initialPalettes = [
  { name: "Ocean Blue", colors: ["#1E40AF", "#3B82F6", "#93C5FD", "#DBEAFE", "#EFF6FF"] },
  { name: "Purple Magic", colors: ["#5B21B6", "#7C3AED", "#A78BFA", "#DDD6FE", "#F5F3FF"] },
  { name: "Sunset Pink", colors: ["#9D174D", "#EC4899", "#F9A8D4", "#FCE7F3", "#FDF2F8"] },
  { name: "Forest Green", colors: ["#14532D", "#16A34A", "#86EFAC", "#DCFCE7", "#F0FDF4"] },
];

const initialFonts = [
  { name: "Inter", style: "font-sans", category: "Modern" },
  { name: "Plus Jakarta Sans", style: "font-heading", category: "Contemporary" },
  { name: "Playfair Display", style: "font-serif", category: "Elegant" },
  { name: "Space Grotesk", style: "font-mono", category: "Technical" },
];

const initialAssets = [
  { type: "Logo (Light)", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=100&fit=crop", format: "SVG, PNG" },
  { type: "Logo (Dark)", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=100&fit=crop", format: "SVG, PNG" },
  { type: "Favicon", img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=100&fit=crop", format: "ICO, PNG" },
  { type: "Social Cover", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop", format: "PNG, JPG" },
];

const googleFontsPreset = [
  { name: "Inter", category: "Modern" },
  { name: "Plus Jakarta Sans", category: "Contemporary" },
  { name: "Playfair Display", category: "Elegant" },
  { name: "Space Grotesk", category: "Technical" },
  { name: "Montserrat", category: "Modern" },
  { name: "Lora", category: "Elegant" },
  { name: "Roboto Mono", category: "Technical" },
  { name: "Outfit", category: "Contemporary" }
];

export default function BrandingPage() {
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [activeTab, setActiveTab] = useState<"kit" | "logo" | "guidelines">("kit");

  // State Management
  const [palettes, setPalettes] = useState(initialPalettes);
  const [fontsList, setFontsList] = useState(initialFonts);
  const [assetsList, setAssetsList] = useState(initialAssets);

  // Modals Visibility
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  // Modal Inputs
  const [palettePrompt, setPalettePrompt] = useState("");
  const [newAsset, setNewAsset] = useState({ type: "", img: "", format: "PNG" });

  // AI Logo Builder Inputs
  const [logoPrompt, setLogoPrompt] = useState("");
  const [isBuildingLogo, setIsBuildingLogo] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);

  // Export Brand Kit Functionality
  const handleExportBrandKit = () => {
    const brandKitData = {
      name: "PixiVisual Exported Brand Kit",
      primaryPalette: palettes[selectedPalette],
      palettes: palettes,
      fonts: fontsList,
      assets: assetsList.map(a => ({ type: a.type, format: a.format, url: a.img }))
    };

    const blob = new Blob([JSON.stringify(brandKitData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixivisual-brand-kit.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Brand kit exported as JSON file!");
  };

  // Generate Palette
  const handleGeneratePalette = (e: React.FormEvent) => {
    e.preventDefault();
    if (!palettePrompt.trim()) {
      toast.error("Please enter a palette description");
      return;
    }
    const colorSchemes: Record<string, string[]> = {
      neon: ["#00F2FE", "#4FACFE", "#EC008C", "#FC6767", "#39FF14"],
      sunset: ["#F857A6", "#FF5858", "#FF8C00", "#FFA07A", "#FFE4E1"],
      forest: ["#11998E", "#38EF7D", "#134E5E", "#71B280", "#2E8B57"],
      ocean: ["#2B5876", "#4E4376", "#00C6FF", "#0072FF", "#E0F7FA"],
      pastel: ["#FFC3A0", "#FFAFBD", "#D4FC79", "#96E6A1", "#FAD0C4"]
    };

    const key = Object.keys(colorSchemes).find(k => palettePrompt.toLowerCase().includes(k)) || "pastel";
    const colors = colorSchemes[key];
    
    const newPalette = {
      name: palettePrompt.trim().substring(0, 20),
      colors
    };

    setPalettes(prev => [newPalette, ...prev]);
    setSelectedPalette(0);
    setPalettePrompt("");
    setShowPaletteModal(false);
    toast.success(`Generated palette "${newPalette.name}" using AI!`);
  };

  // Change Font
  const handleSelectFont = (fontName: string, category: string, index: number) => {
    setFontsList(prev => prev.map((f, i) => i === index ? { ...f, name: fontName, style: `font-${fontName.toLowerCase().replace(/\s/g, "-")}`, category } : f));
    setShowFontModal(false);
    toast.success(`Brand font changed to ${fontName}!`);
  };

  // Add Asset
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.type.trim() || !newAsset.img.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setAssetsList(prev => [
      { type: newAsset.type, img: newAsset.img, format: newAsset.format },
      ...prev
    ]);
    setNewAsset({ type: "", img: "", format: "PNG" });
    setShowAssetModal(false);
    toast.success("New brand asset uploaded!");
  };

  // Download Asset
  const handleDownloadAsset = (asset: typeof assetsList[0]) => {
    const link = document.createElement("a");
    link.href = asset.img;
    link.download = `${asset.type.toLowerCase().replace(/\s/g, "-")}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Download started for ${asset.type}`);
  };

  // Generate Logo Concepts
  const handleGenerateLogo = async () => {
    if (!logoPrompt.trim()) {
      toast.error("Please write a description for your brand first.");
      return;
    }
    setIsBuildingLogo(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGeneratedLogos([
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop",
    ]);
    setIsBuildingLogo(false);
    toast.success("AI generated 4 logo concepts successfully!");
  };

  // Save Logo Concept
  const handleSaveLogo = (url: string) => {
    setAssetsList(prev => [
      { type: `Logo Custom Concept`, img: url, format: "SVG, PNG" },
      ...prev
    ]);
    toast.success("Saved concept logo to brand kit assets!");
    setGeneratedLogos([]);
    setLogoPrompt("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Brand Studio</h1>
          <p className="text-muted-foreground mt-1">Build and manage your complete brand identity</p>
        </div>
        <button
          onClick={handleExportBrandKit}
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
              <button onClick={() => setShowPaletteModal(true)} className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Generate
              </button>
            </div>
            <div className="space-y-3">
              {palettes.map((palette, i) => (
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
              <button onClick={() => setShowFontModal(true)} className="text-xs text-primary-500 hover:underline">Browse Fonts</button>
            </div>
            <div className="space-y-3">
              {fontsList.map((font, i) => (
                <div key={font.name} className="p-3 rounded-xl border border-border hover:border-primary-500/30 transition-all flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{font.category}</span>
                      <span className="text-[10px] bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded-full font-medium">
                        {i === 0 ? "Primary" : i === 1 ? "Secondary" : i === 2 ? "Accent" : "Body"}
                      </span>
                    </div>
                    <p className="text-xl font-bold">{font.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">Aa Bb Cc Dd Ee Ff Gg 1234567890</p>
                  </div>
                  <button onClick={() => setShowFontModal(true)} className="text-xs text-primary-500 hover:underline">Change</button>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Assets */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2"><Image className="w-4 h-4 text-accent" /> Brand Assets</h2>
              <button onClick={() => setShowAssetModal(true)} className="flex items-center gap-1.5 text-xs text-primary-500 hover:underline">
                <Plus className="w-3 h-3" /> Add Asset
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {assetsList.map((asset, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden hover:shadow-card transition-all flex flex-col justify-between">
                  <img src={asset.img} alt={asset.type} className="w-full h-24 object-cover" />
                  <div className="p-2.5">
                    <p className="text-xs font-semibold">{asset.type}</p>
                    <p className="text-xs text-muted-foreground">{asset.format}</p>
                    <button
                      onClick={() => handleDownloadAsset(asset)}
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
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-2">AI Logo Builder</h2>
            <p className="text-muted-foreground mb-6">Describe your brand and let AI create the perfect logo concepts</p>
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                value={logoPrompt}
                onChange={(e) => setLogoPrompt(e.target.value)}
                placeholder="e.g., A minimalist geometric logo for a coffee shop..."
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleGenerateLogo}
                disabled={isBuildingLogo}
                className="px-6 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:shadow-glow transition-all disabled:opacity-50"
              >
                {isBuildingLogo ? "Building..." : "Generate"}
              </button>
            </div>
          </div>

          {generatedLogos.length > 0 && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <h3 className="font-bold text-sm text-center">Select a logo concept to add to assets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generatedLogos.map((url, index) => (
                  <div key={index} className="relative group border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 transition-all">
                    <img src={url} alt={`Concept ${index + 1}`} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <button
                        onClick={() => handleSaveLogo(url)}
                        className="px-3 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Select Logo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                  <button onClick={() => toast.success(`Viewing guidelines: ${section}`)} className="text-xs text-primary-500 hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Palette Modal */}
      {showPaletteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-1.5"><Sparkles className="w-5 h-5 text-primary-500" /> AI Palette Generator</h3>
              <button onClick={() => setShowPaletteModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleGeneratePalette} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Describe the brand palette vibe</label>
                <input
                  type="text"
                  value={palettePrompt}
                  onChange={(e) => setPalettePrompt(e.target.value)}
                  placeholder="e.g. Electric neon cyber vibes or Warm sunset beach cafe"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  autoFocus
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl">
                Generate Palette
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Font Picker Modal */}
      {showFontModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Select Brand Font</h3>
              <button onClick={() => setShowFontModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Choose a font to replace your primary brand font</p>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {googleFontsPreset.map((font) => (
                <button
                  key={font.name}
                  onClick={() => handleSelectFont(font.name, font.category, 0)}
                  className="p-3 text-left border border-border hover:border-primary-500 rounded-xl hover:bg-primary-500/5 transition-all"
                >
                  <p className="text-xs text-muted-foreground">{font.category}</p>
                  <p className="font-bold text-sm mt-0.5">{font.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Asset Upload Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Add Brand Asset</h3>
              <button onClick={() => setShowAssetModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Asset Name *</label>
                <input
                  type="text"
                  value={newAsset.type}
                  onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                  placeholder="e.g. SVG Logo Primary"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Image URL / Reference *</label>
                <input
                  type="text"
                  value={newAsset.img}
                  onChange={(e) => setNewAsset({ ...newAsset, img: e.target.value })}
                  placeholder="Paste Unsplash or direct image URL"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Format</label>
                  <select
                    value={newAsset.format}
                    onChange={(e) => setNewAsset({ ...newAsset, format: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm"
                  >
                    <option value="PNG">PNG</option>
                    <option value="SVG">SVG</option>
                    <option value="JPG">JPG</option>
                    <option value="ICO">ICO</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl">
                  Save Asset
                </button>
                <button type="button" onClick={() => setShowAssetModal(false)} className="flex-1 py-2.5 border border-border hover:bg-muted text-sm font-medium rounded-xl">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
