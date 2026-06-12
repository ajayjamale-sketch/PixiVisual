import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Wand2, Image, Sparkles, Send, Heart, Download, RefreshCw,
  History, Star, Clock, Sliders, ChevronDown, Zap
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AI_CAPABILITIES } from "@/constants";

const stylePresets = [
  "Photorealistic", "Illustration", "Flat Design", "3D Render",
  "Watercolor", "Minimalist", "Vintage", "Cyberpunk",
];

const sampleOutputs = [
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
];

const history = [
  { prompt: "Vibrant summer festival poster with tropical colors", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&h=80&fit=crop", isFavorite: true },
  { prompt: "Minimalist tech startup logo with purple gradient", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=80&h=80&fit=crop", isFavorite: false },
  { prompt: "Abstract AI-themed banner for SaaS product", img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=80&h=80&fit=crop", isFavorite: true },
];

export default function AIStudio() {
  const { type } = useParams();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"generate" | "history" | "favorites">("generate");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedOutput, setSelectedOutput] = useState(0);

  const activeCapability = AI_CAPABILITIES.find((c) => c.id === (type || "image")) ?? AI_CAPABILITIES[0];

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast.error("Please enter a prompt first"); return; }
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsGenerating(false);
    setGenerated(true);
    toast.success("4 variations generated successfully!");
  };

  const toggleFavorite = (i: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
    toast.success(favorites.has(i) ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            AI Studio
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Generate stunning visuals with AI</p>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {AI_CAPABILITIES.slice(0, 5).map((cap) => (
            <Link
              key={cap.id}
              to={`/studio/${cap.id}`}
              className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                cap.id === (type || "image")
                  ? `bg-gradient-to-r ${cap.gradient} text-white shadow-glow`
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cap.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 flex-1">
        {/* Controls Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl">
            {(["generate", "history", "favorites"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium capitalize transition-all",
                  activeTab === tab ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "generate" ? <Wand2 className="w-3.5 h-3.5" /> : tab === "history" ? <History className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "generate" && (
            <div className="space-y-4">
              {/* Prompt Input */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <label className="text-sm font-semibold block mb-2">Describe your vision</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe what you want to create... e.g., "A vibrant ${activeCapability.title.toLowerCase()} with purple gradient and modern typography"`}
                  rows={4}
                  className="w-full bg-muted rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-muted-foreground"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{prompt.length}/500</span>
                  <button className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Enhance prompt
                  </button>
                </div>
              </div>

              {/* Style Presets */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <label className="text-sm font-semibold block mb-3">Style</label>
                <div className="flex flex-wrap gap-2">
                  {stylePresets.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        selectedStyle === style
                          ? "bg-primary-500 text-white"
                          : "bg-muted text-muted-foreground hover:bg-primary-500/10 hover:text-primary-500"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <label className="text-sm font-semibold block">Settings</label>
                {[
                  { label: "Aspect Ratio", value: "Square (1:1)", options: ["Square (1:1)", "Portrait (9:16)", "Landscape (16:9)", "Wide (21:9)"] },
                  { label: "Quality", value: "High", options: ["Draft", "Standard", "High", "Ultra"] },
                  { label: "Variations", value: "4", options: ["1", "2", "4", "8"] },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{setting.label}</span>
                    <select className="text-sm bg-muted border-0 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                      {setting.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Your recent generations</p>
              {history.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary-500/30 cursor-pointer transition-all">
                  <img src={item.img} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{item.prompt}</p>
                    <button
                      onClick={() => setPrompt(item.prompt)}
                      className="text-xs text-primary-500 hover:underline mt-1"
                    >
                      Use this prompt
                    </button>
                  </div>
                  {item.isFavorite && <Heart className="w-3.5 h-3.5 text-secondary-500 fill-secondary-500 flex-shrink-0" />}
                </div>
              ))}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Heart className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Your favorited generations appear here</p>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3">
          {isGenerating && (
            <div className="h-full min-h-[400px] bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Generating your design...</p>
                <p className="text-sm text-muted-foreground mt-1">AI is creating 4 unique variations</p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          )}

          {!isGenerating && !generated && (
            <div className="h-full min-h-[400px] bg-card border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-muted-foreground">Your AI generations will appear here</p>
              <p className="text-sm text-muted-foreground">Enter a prompt and click Generate</p>
            </div>
          )}

          {!isGenerating && generated && (
            <div className="space-y-4">
              {/* Main Output */}
              <div className="relative rounded-2xl overflow-hidden border border-border group">
                <img
                  src={sampleOutputs[selectedOutput]}
                  alt="Generated"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() => toast.success("Downloading...")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-primary-500 hover:text-white transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedOutput)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/40 transition-all"
                  >
                    <Heart className={cn("w-3.5 h-3.5", favorites.has(selectedOutput) ? "fill-secondary-500 text-secondary-500" : "text-white")} />
                  </button>
                  <Link
                    to="/editor"
                    className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-all"
                  >
                    Edit in Canvas
                  </Link>
                </div>
              </div>

              {/* Variations Grid */}
              <div className="grid grid-cols-4 gap-2">
                {sampleOutputs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOutput(i)}
                    className={cn(
                      "relative rounded-xl overflow-hidden aspect-square border-2 transition-all",
                      selectedOutput === i ? "border-primary-500" : "border-transparent hover:border-border"
                    )}
                  >
                    <img src={img} alt={`Variation ${i + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 text-white px-1 rounded">{i + 1}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => { setGenerated(false); setPrompt(""); }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> New Generation
                </button>
                <button
                  onClick={() => toast.success("Opening in editor...")}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:shadow-glow transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" /> Customize in Editor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
