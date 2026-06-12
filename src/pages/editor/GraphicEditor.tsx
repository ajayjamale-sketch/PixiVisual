import { useState } from "react";
import {
  Square, Circle, Type, Image, Layers, AlignLeft, Bold, Italic,
  Undo, Redo, ZoomIn, ZoomOut, Download, Save, Grid, Eye,
  Trash2, Copy, Move, Minus, Plus, Palette, Sliders
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const toolbarItems = [
  { id: "select", icon: Move, label: "Select" },
  { id: "text", icon: Type, label: "Text" },
  { id: "shape", icon: Square, label: "Shape" },
  { id: "image", icon: Image, label: "Image" },
  { id: "circle", icon: Circle, label: "Circle" },
];

const layers = [
  { id: 1, name: "Background Gradient", type: "shape", visible: true, locked: false },
  { id: 2, name: "Hero Image", type: "image", visible: true, locked: false },
  { id: 3, name: "Headline Text", type: "text", visible: true, locked: false },
  { id: 4, name: "Body Text", type: "text", visible: true, locked: false },
  { id: 5, name: "CTA Button", type: "shape", visible: true, locked: true },
];

const templateElements = [
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop", label: "Element 1" },
  { img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop", label: "Element 2" },
  { img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=150&h=150&fit=crop", label: "Element 3" },
  { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=150&fit=crop", label: "Element 4" },
];

export default function GraphicEditor() {
  const [activeTool, setActiveTool] = useState("select");
  const [activePanel, setActivePanel] = useState<"layers" | "assets" | "properties">("layers");
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<Record<number, boolean>>({});

  const handleSave = () => toast.success("Design saved successfully!");
  const handleExport = () => toast.success("Exporting design as PNG...");

  const toggleLayerVisibility = (id: number) => {
    setLayerVisibility((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col -m-4 lg:-m-6">
      {/* Top Bar */}
      <div className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
        <span className="font-semibold text-sm hidden md:block">Untitled Design</span>
        <div className="flex items-center gap-1 ml-auto">
          {/* Undo/Redo */}
          <button onClick={() => toast.info("Undo")} className="p-1.5 rounded-lg hover:bg-muted transition-all"><Undo className="w-4 h-4" /></button>
          <button onClick={() => toast.info("Redo")} className="p-1.5 rounded-lg hover:bg-muted transition-all"><Redo className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-border mx-1" />
          {/* Zoom */}
          <button onClick={() => setZoom((z) => Math.max(25, z - 10))} className="p-1.5 rounded-lg hover:bg-muted"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs font-mono w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(400, z + 10))} className="p-1.5 rounded-lg hover:bg-muted"><ZoomIn className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-border mx-1" />
          <button onClick={() => setShowGrid(!showGrid)} className={cn("p-1.5 rounded-lg transition-all", showGrid ? "bg-primary-500/20 text-primary-500" : "hover:bg-muted")}>
            <Grid className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-all">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium hover:shadow-glow transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-12 border-r border-border bg-card flex flex-col items-center py-3 gap-1 flex-shrink-0">
          {toolbarItems.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                  activeTool === tool.id ? "bg-primary-500 text-white shadow-glow" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
          <div className="flex-1" />
          <button title="Delete" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-error/10 hover:text-error text-muted-foreground transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-muted/30 flex items-center justify-center overflow-hidden relative">
          {showGrid && (
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} />
          )}
          <div
            className="relative bg-white shadow-glass-lg rounded-xl overflow-hidden"
            style={{ width: `${Math.min(600, 600 * zoom / 100)}px`, height: `${Math.min(450, 450 * zoom / 100)}px` }}
          >
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=450&fit=crop"
              alt="Canvas"
              className="w-full h-full object-cover"
            />
            {/* Overlaid text elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h2 className="text-3xl font-black drop-shadow-lg">Your Design Here</h2>
              <p className="text-sm opacity-80 mt-2 drop-shadow-md">Click elements to edit</p>
            </div>
            {/* Selection handles example */}
            <div className="absolute top-4 left-4 right-4 border-2 border-primary-500 border-dashed rounded-lg pointer-events-none opacity-60" style={{ height: "60px" }} />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-4 py-2 text-xs text-muted-foreground shadow-sm">
            Canvas: 1200×900px · Zoom: {zoom}%
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-60 lg:w-72 border-l border-border bg-card flex flex-col flex-shrink-0">
          {/* Panel Tabs */}
          <div className="flex border-b border-border">
            {(["layers", "assets", "properties"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActivePanel(p)}
                className={cn(
                  "flex-1 py-2.5 text-xs font-medium capitalize transition-all",
                  activePanel === p ? "border-b-2 border-primary-500 text-primary-500" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {activePanel === "layers" && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground mb-2">Layers ({layers.length})</p>
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer group transition-all"
                  >
                    <button
                      onClick={() => toggleLayerVisibility(layer.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-muted flex-shrink-0">
                      {layer.type === "text" ? <Type className="w-3 h-3" /> : layer.type === "image" ? <Image className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                    </div>
                    <span className="text-xs flex-1 truncate">{layer.name}</span>
                    {layer.locked && <span className="text-[10px] text-muted-foreground">🔒</span>}
                  </div>
                ))}
              </div>
            )}

            {activePanel === "assets" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Stock Images</p>
                <div className="grid grid-cols-2 gap-2">
                  {templateElements.map((el, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all aspect-square"
                      onClick={() => toast.info("Click to add element to canvas")}
                    >
                      <img src={el.img} alt={el.label} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === "properties" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">POSITION</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ label: "X", value: "120" }, { label: "Y", value: "80" }].map((f) => (
                      <div key={f.label}>
                        <span className="text-xs text-muted-foreground">{f.label}</span>
                        <input type="number" defaultValue={f.value} className="w-full mt-1 px-2 py-1.5 bg-muted rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">SIZE</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ label: "W", value: "400" }, { label: "H", value: "200" }].map((f) => (
                      <div key={f.label}>
                        <span className="text-xs text-muted-foreground">{f.label}</span>
                        <input type="number" defaultValue={f.value} className="w-full mt-1 px-2 py-1.5 bg-muted rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">FILL</label>
                  <div className="flex gap-2 flex-wrap">
                    {["#7C3AED", "#EC4899", "#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#FFFFFF", "#000000"].map((color) => (
                      <button key={color} className="w-7 h-7 rounded-lg border-2 border-transparent hover:border-primary-500 transition-all" style={{ background: color }} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">OPACITY</label>
                  <input type="range" min="0" max="100" defaultValue="100" className="w-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
