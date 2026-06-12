import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Square, Circle, Type, Image as ImageIcon, Layers, AlignLeft, Bold, Italic,
  Undo, Redo, ZoomIn, ZoomOut, Download, Save, Grid, Eye, EyeOff,
  Trash2, Copy, Move, Minus, Plus, Palette, Sliders, Lock, Unlock
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DesignLayer {
  id: number;
  name: string;
  type: "shape" | "text" | "image";
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
  text?: string;
  image?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
}

const toolbarItems = [
  { id: "select", icon: Move, label: "Select" },
  { id: "text", icon: Type, label: "Text" },
  { id: "shape", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
];

const initialLayers: DesignLayer[] = [
  { id: 1, name: "Background Gradient", type: "shape", visible: true, locked: false, x: 0, y: 0, width: 600, height: 450, fill: "#7C3AED", opacity: 100 },
  { id: 2, name: "Hero Image", type: "image", visible: true, locked: false, x: 50, y: 50, width: 500, height: 350, fill: "#ffffff", opacity: 100, image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=450&fit=crop" },
  { id: 3, name: "Headline Text", type: "text", visible: true, locked: false, x: 100, y: 150, width: 400, height: 60, fill: "#FFFFFF", opacity: 100, text: "Your Design Here", fontSize: 32, bold: true, italic: false },
  { id: 4, name: "Body Text", type: "text", visible: true, locked: false, x: 150, y: 220, width: 300, height: 40, fill: "#E2E8F0", opacity: 80, text: "Click elements to edit", fontSize: 16, bold: false, italic: true },
  { id: 5, name: "CTA Button", type: "shape", visible: true, locked: true, x: 200, y: 300, width: 200, height: 50, fill: "#EC4899", opacity: 100 },
];

const stockImages = [
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop", label: "Branding elements" },
  { img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop", label: "UI Mockups" },
  { img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=150&h=150&fit=crop", label: "Office workspace" },
  { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=150&fit=crop", label: "Colorful patterns" },
];

export default function GraphicEditor() {
  const location = useLocation();
  const [activeTool, setActiveTool] = useState("select");
  const [activePanel, setActivePanel] = useState<"layers" | "assets" | "properties">("layers");
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [layersList, setLayersList] = useState<DesignLayer[]>(initialLayers);
  const [selectedLayerId, setSelectedLayerId] = useState<number | null>(3);
  const [historyStack, setHistoryStack] = useState<DesignLayer[][]>([initialLayers]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load state from navigation if passed
  useEffect(() => {
    if (location.state && (location.state as any).backgroundImage) {
      const bgImg = (location.state as any).backgroundImage;
      const titleText = (location.state as any).title || "AI Created Design";
      const updated = initialLayers.map(l => {
        if (l.id === 2) return { ...l, image: bgImg };
        if (l.id === 3) return { ...l, text: titleText };
        return l;
      });
      setLayersList(updated);
      setHistoryStack([updated]);
      setHistoryIndex(0);
      toast.success("Loaded AI generation into editor canvas!");
    } else {
      const saved = localStorage.getItem("pixivisual-last-design");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLayersList(parsed);
          setHistoryStack([parsed]);
          setHistoryIndex(0);
        } catch {}
      }
    }
  }, [location.state]);

  const updateHistory = (newLayers: DesignLayer[]) => {
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(newLayers);
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  };

  const handleSave = () => {
    localStorage.setItem("pixivisual-last-design", JSON.stringify(layersList));
    toast.success("Design saved successfully!");
  };

  const handleExport = () => {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">\n`;
    layersList.filter(l => l.visible).forEach(l => {
      const opacity = l.opacity / 100;
      if (l.type === "image") {
        svgContent += `  <image href="${l.image}" x="${l.x}" y="${l.y}" width="${l.width}" height="${l.height}" opacity="${opacity}" />\n`;
      } else if (l.type === "text") {
        svgContent += `  <text x="${l.x + l.width / 2}" y="${l.y + l.height / 2}" fill="${l.fill}" font-size="${l.fontSize || 16}" font-weight="${l.bold ? "bold" : "normal"}" font-style="${l.italic ? "italic" : "normal"}" text-anchor="middle" dominant-baseline="middle" opacity="${opacity}">${l.text}</text>\n`;
      } else {
        const isCircle = l.name.includes("Circle");
        if (isCircle) {
          const r = l.width / 2;
          svgContent += `  <circle cx="${l.x + r}" cy="${l.y + r}" r="${r}" fill="${l.fill}" opacity="${opacity}" />\n`;
        } else {
          svgContent += `  <rect x="${l.x}" y="${l.y}" width="${l.width}" height="${l.height}" fill="${l.fill}" rx="8" ry="8" opacity="${opacity}" />\n`;
        }
      }
    });
    svgContent += `</svg>`;
    
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixivisual-design.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Design exported as SVG successfully!");
  };

  const toggleLayerVisibility = (id: number) => {
    const updated = layersList.map((l) => l.id === id ? { ...l, visible: !l.visible } : l);
    setLayersList(updated);
    updateHistory(updated);
  };

  const toggleLayerLock = (id: number) => {
    const updated = layersList.map((l) => l.id === id ? { ...l, locked: !l.locked } : l);
    setLayersList(updated);
    updateHistory(updated);
  };

  const deleteLayer = () => {
    if (selectedLayerId === null) {
      toast.error("Please select a layer to delete");
      return;
    }
    const layer = layersList.find(l => l.id === selectedLayerId);
    if (layer?.locked) {
      toast.error("Locked layers cannot be deleted");
      return;
    }
    const updated = layersList.filter(l => l.id !== selectedLayerId);
    setLayersList(updated);
    setSelectedLayerId(null);
    updateHistory(updated);
    toast.success("Layer deleted");
  };

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    if (toolId === "text") {
      const newLayer: DesignLayer = {
        id: Date.now(),
        name: `Text Layer ${layersList.length + 1}`,
        type: "text",
        visible: true,
        locked: false,
        x: 150,
        y: 150,
        width: 250,
        height: 60,
        fill: "#FFFFFF",
        opacity: 100,
        text: "Edit text properties",
        fontSize: 22,
        bold: false,
        italic: false
      };
      const updated = [...layersList, newLayer];
      setLayersList(updated);
      setSelectedLayerId(newLayer.id);
      setActivePanel("properties");
      updateHistory(updated);
      toast.success("Added text layer to canvas");
    } else if (toolId === "shape") {
      const newLayer: DesignLayer = {
        id: Date.now(),
        name: `Rectangle ${layersList.length + 1}`,
        type: "shape",
        visible: true,
        locked: false,
        x: 180,
        y: 180,
        width: 150,
        height: 100,
        fill: "#2563EB",
        opacity: 100
      };
      const updated = [...layersList, newLayer];
      setLayersList(updated);
      setSelectedLayerId(newLayer.id);
      setActivePanel("properties");
      updateHistory(updated);
      toast.success("Added rectangle layer to canvas");
    } else if (toolId === "circle") {
      const newLayer: DesignLayer = {
        id: Date.now(),
        name: `Circle ${layersList.length + 1}`,
        type: "shape",
        visible: true,
        locked: false,
        x: 180,
        y: 180,
        width: 120,
        height: 120,
        fill: "#EC4899",
        opacity: 100
      };
      const updated = [...layersList, newLayer];
      setLayersList(updated);
      setSelectedLayerId(newLayer.id);
      setActivePanel("properties");
      updateHistory(updated);
      toast.success("Added circle layer to canvas");
    }
  };

  const addAssetToCanvas = (imgUrl: string) => {
    const newLayer: DesignLayer = {
      id: Date.now(),
      name: `Asset Image ${layersList.length + 1}`,
      type: "image",
      visible: true,
      locked: false,
      x: 100,
      y: 100,
      width: 240,
      height: 180,
      fill: "#ffffff",
      opacity: 100,
      image: imgUrl
    };
    const updated = [...layersList, newLayer];
    setLayersList(updated);
    setSelectedLayerId(newLayer.id);
    setActivePanel("properties");
    updateHistory(updated);
    toast.success("Asset image added to canvas");
  };

  const updateSelectedLayerProperty = (key: keyof DesignLayer, value: any) => {
    if (selectedLayerId === null) return;
    const updated = layersList.map(l => l.id === selectedLayerId ? { ...l, [key]: value } : l);
    setLayersList(updated);
    updateHistory(updated);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayersList(historyStack[historyIndex - 1]);
      toast.info("Undo action");
    } else {
      toast.error("Nothing to undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayersList(historyStack[historyIndex + 1]);
      toast.info("Redo action");
    } else {
      toast.error("Nothing to redo");
    }
  };

  const selectedLayer = layersList.find(l => l.id === selectedLayerId);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col -m-4 lg:-m-6">
      {/* Top Bar */}
      <div className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
        <span className="font-semibold text-sm hidden md:block">Interactive Creative Canvas</span>
        <div className="flex items-center gap-1 ml-auto">
          {/* Undo/Redo */}
          <button onClick={handleUndo} className="p-1.5 rounded-lg hover:bg-muted transition-all" title="Undo"><Undo className="w-4 h-4" /></button>
          <button onClick={handleRedo} className="p-1.5 rounded-lg hover:bg-muted transition-all" title="Redo"><Redo className="w-4 h-4" /></button>
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
            <Download className="w-3.5 h-3.5" /> Export SVG
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
                onClick={() => handleToolClick(tool.id)}
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
          <button
            onClick={deleteLayer}
            title="Delete Layer"
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-error/10 hover:text-error text-muted-foreground transition-all"
          >
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
            {layersList.filter(l => l.visible).map((layer) => {
              const scale = zoom / 100;
              const style = {
                position: "absolute" as const,
                left: `${layer.x * scale}px`,
                top: `${layer.y * scale}px`,
                width: `${layer.width * scale}px`,
                height: `${layer.height * scale}px`,
                opacity: layer.opacity / 100,
                zIndex: layer.id,
              };

              if (layer.type === "image") {
                return (
                  <img
                    key={layer.id}
                    src={layer.image}
                    alt=""
                    style={style}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={cn("object-cover cursor-pointer", selectedLayerId === layer.id && "outline outline-2 outline-primary-500")}
                  />
                );
              }

              if (layer.type === "text") {
                return (
                  <div
                    key={layer.id}
                    style={{
                      ...style,
                      color: layer.fill,
                      fontSize: `${(layer.fontSize || 16) * scale}px`,
                      fontWeight: layer.bold ? "bold" : "normal",
                      fontStyle: layer.italic ? "italic" : "normal",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={cn("cursor-pointer select-none", selectedLayerId === layer.id && "outline outline-2 outline-primary-500 outline-dashed")}
                  >
                    {layer.text}
                  </div>
                );
              }

              return (
                <div
                  key={layer.id}
                  style={{
                    ...style,
                    backgroundColor: layer.fill,
                    borderRadius: layer.name.includes("Circle") ? "9999px" : "8px",
                  }}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={cn("cursor-pointer", selectedLayerId === layer.id && "outline outline-2 outline-primary-500")}
                />
              );
            })}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-4 py-2 text-xs text-muted-foreground shadow-sm">
            Canvas size: 600×450px · Selected: {selectedLayer ? selectedLayer.name : "None"}
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
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-muted-foreground">Layers ({layersList.length})</p>
                  {selectedLayerId !== null && (
                    <button onClick={deleteLayer} className="text-xs text-red-500 hover:underline flex items-center gap-0.5">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  )}
                </div>
                {layersList.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg cursor-pointer group transition-all",
                      selectedLayerId === layer.id ? "bg-primary-500/10 border border-primary-500/30" : "hover:bg-muted border border-transparent"
                    )}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLayerVisibility(layer.id); }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 opacity-60" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLayerLock(layer.id); }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {layer.locked ? <Lock className="w-3 h-3 text-secondary-500" /> : <Unlock className="w-3 h-3 opacity-30 group-hover:opacity-100" />}
                    </button>
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-muted flex-shrink-0">
                      {layer.type === "text" ? <Type className="w-3 h-3" /> : layer.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                    </div>
                    <span className="text-xs flex-1 truncate font-medium">{layer.name}</span>
                  </div>
                ))}
              </div>
            )}

            {activePanel === "assets" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-semibold">Stock Images</p>
                <div className="grid grid-cols-2 gap-2">
                  {stockImages.map((el, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all aspect-square group"
                      onClick={() => addAssetToCanvas(el.img)}
                    >
                      <img src={el.img} alt={el.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === "properties" && (
              <div className="space-y-4">
                {selectedLayer ? (
                  <>
                    <div className="p-2.5 rounded-xl bg-muted/50 border border-border">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Selected Layer</p>
                      <input
                        type="text"
                        value={selectedLayer.name}
                        onChange={(e) => updateSelectedLayerProperty("name", e.target.value)}
                        className="w-full mt-1.5 px-2.5 py-1.5 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>

                    {selectedLayer.type === "text" && (
                      <div className="space-y-2.5">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground block">TEXT CONTENT</label>
                          <textarea
                            value={selectedLayer.text || ""}
                            onChange={(e) => updateSelectedLayerProperty("text", e.target.value)}
                            rows={3}
                            className="w-full mt-1 px-2.5 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-xs font-semibold text-muted-foreground block">FONT SIZE</label>
                            <input
                              type="number"
                              value={selectedLayer.fontSize || 16}
                              onChange={(e) => updateSelectedLayerProperty("fontSize", Number(e.target.value))}
                              className="w-full mt-1 px-2.5 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                          </div>
                          <div className="flex items-end gap-1">
                            <button
                              onClick={() => updateSelectedLayerProperty("bold", !selectedLayer.bold)}
                              className={cn("p-2 rounded-lg border border-border text-xs font-bold", selectedLayer.bold ? "bg-primary-500 text-white" : "bg-background")}
                            >
                              <Bold className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => updateSelectedLayerProperty("italic", !selectedLayer.italic)}
                              className={cn("p-2 rounded-lg border border-border text-xs font-italic", selectedLayer.italic ? "bg-primary-500 text-white" : "bg-background")}
                            >
                              <Italic className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1.5">POSITION</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase">X Position</span>
                          <input
                            type="number"
                            value={selectedLayer.x}
                            onChange={(e) => updateSelectedLayerProperty("x", Number(e.target.value))}
                            className="w-full mt-1 px-2 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase">Y Position</span>
                          <input
                            type="number"
                            value={selectedLayer.y}
                            onChange={(e) => updateSelectedLayerProperty("y", Number(e.target.value))}
                            className="w-full mt-1 px-2 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1.5">SIZE</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase">Width (px)</span>
                          <input
                            type="number"
                            value={selectedLayer.width}
                            onChange={(e) => updateSelectedLayerProperty("width", Number(e.target.value))}
                            className="w-full mt-1 px-2 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none"
                            disabled={selectedLayer.locked}
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase">Height (px)</span>
                          <input
                            type="number"
                            value={selectedLayer.height}
                            onChange={(e) => updateSelectedLayerProperty("height", Number(e.target.value))}
                            className="w-full mt-1 px-2 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none"
                            disabled={selectedLayer.locked}
                          />
                        </div>
                      </div>
                    </div>

                    {selectedLayer.type !== "image" && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-2">FILL COLOR</label>
                        <div className="flex gap-2 flex-wrap">
                          {["#7C3AED", "#EC4899", "#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#FFFFFF", "#000000"].map((color) => (
                            <button
                              key={color}
                              onClick={() => updateSelectedLayerProperty("fill", color)}
                              className={cn(
                                "w-7 h-7 rounded-lg border-2 transition-all",
                                selectedLayer.fill === color ? "border-primary-500 ring-2 ring-primary-500/20" : "border-border hover:scale-105"
                              )}
                              style={{ background: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                        <span>OPACITY</span>
                        <span>{selectedLayer.opacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedLayer.opacity}
                        onChange={(e) => updateSelectedLayerProperty("opacity", Number(e.target.value))}
                        className="w-full accent-primary-500"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    <Sliders className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>Select a layer to customize properties</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
