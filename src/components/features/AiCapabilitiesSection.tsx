import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Image, Layout, Layers, Megaphone, Monitor, Video, Box, Share2,
  Wand2, ArrowRight, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_CAPABILITIES } from "@/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Layout, Layers, Megaphone, Monitor, Video, Box, Share2,
};

const demoOutputs = {
  image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=350&fit=crop",
  poster: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop",
  banner: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=350&fit=crop",
  ads: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=500&h=350&fit=crop",
  presentation: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=500&h=350&fit=crop",
  video: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=350&fit=crop",
  mockup: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=350&fit=crop",
  social: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop",
};

export default function AiCapabilitiesSection() {
  const [activeId, setActiveId] = useState("image");
  const active = AI_CAPABILITIES.find((c) => c.id === activeId) ?? AI_CAPABILITIES[0];
  const ActiveIcon = iconMap[active.icon] ?? Image;

  return (
    <section className="py-24 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-sm font-semibold gradient-text-purple">8 AI Capabilities</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4">
            AI That Creates
            <br />
            <span className="gradient-text-purple">Anything</span> You Imagine
          </h2>
          <p className="text-lg text-muted-foreground">
            One platform. Eight powerful AI creation modes. Unlimited creative potential.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          {/* Capability Selector */}
          <div className="grid grid-cols-2 gap-3">
            {AI_CAPABILITIES.map((cap) => {
              const Icon = iconMap[cap.icon] ?? Image;
              const isActive = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveId(cap.id)}
                  className={cn(
                    "group relative text-left p-4 rounded-2xl border transition-all duration-200",
                    isActive
                      ? `border-transparent bg-gradient-to-br ${cap.gradient} text-white shadow-glow`
                      : "border-border bg-card hover:border-primary-500/30 hover:shadow-card"
                  )}
                >
                  <Icon className={cn("w-6 h-6 mb-2", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary-500")} />
                  <p className={cn("font-semibold text-sm", isActive ? "text-white" : "")}>{cap.title}</p>
                  <p className={cn("text-xs mt-0.5", isActive ? "text-white/80" : "text-muted-foreground")}>{cap.desc}</p>
                  {isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Preview Panel */}
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-card rounded-3xl border border-border overflow-hidden shadow-glass-lg">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", active.gradient)}>
                    <ActiveIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{active.title}</p>
                    <p className="text-xs text-muted-foreground">Live Preview</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Generating...</span>
                </div>
              </div>

              {/* Generated Output */}
              <div className="relative">
                <img
                  src={demoOutputs[activeId as keyof typeof demoOutputs] || demoOutputs.image}
                  alt={active.title}
                  className="w-full h-64 object-cover"
                  key={activeId}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                {/* Prompt Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3 flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground italic flex-1 truncate">
                      "A stunning {active.title.toLowerCase()} with vibrant colors and modern design..."
                    </span>
                    <Link
                      to={active.href}
                      className={cn(
                        "flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r",
                        active.gradient
                      )}
                    >
                      Try Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Generation Time", value: "3.2s" },
                  { label: "Variations", value: "4 options" },
                  { label: "Resolution", value: "4K ready" },
                ].map((m) => (
                  <div key={m.label} className="bg-muted rounded-xl p-3 text-center">
                    <p className="font-bold text-sm">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg shadow-glow hover:shadow-glow-pink transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Try All AI Capabilities Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
