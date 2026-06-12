import { useState } from "react";
import { Wand2, Video, Palette, Users, ShoppingBag, BarChart2, Zap, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Wand2,
    title: "AI Design Generation",
    desc: "Generate stunning visuals, posters, banners, and illustrations from simple text prompts using state-of-the-art AI models.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    tags: ["Text-to-Image", "GPT-5", "SDXL"],
    preview: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop",
  },
  {
    icon: Video,
    title: "AI Video Studio",
    desc: "Transform scripts and prompts into cinematic video content. Add voiceovers, subtitles, transitions, and custom soundtracks.",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-500/10",
    tags: ["Sora", "Voiceover", "Timeline"],
    preview: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=240&fit=crop",
  },
  {
    icon: Palette,
    title: "Brand Builder",
    desc: "Create complete brand identities. Build logos, color systems, typography scales, and exportable brand guidelines.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    tags: ["Logo AI", "Brand Kit", "Guidelines"],
    preview: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    desc: "Work together with your team in real-time. Comment, review, approve, and ship designs faster with built-in workflows.",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    tags: ["Live Edit", "Comments", "Approvals"],
    preview: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=240&fit=crop",
  },
  {
    icon: ShoppingBag,
    title: "Creative Marketplace",
    desc: "Buy and sell premium templates, illustrations, icons, videos, and audio. Support your favorite independent designers.",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    tags: ["Templates", "Stock", "Sell"],
    preview: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=240&fit=crop",
  },
  {
    icon: BarChart2,
    title: "Deep Analytics",
    desc: "Track design performance, brand scores, engagement rates, and creative ROI with beautiful, actionable dashboards.",
    gradient: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
    tags: ["Heatmaps", "Reports", "AI Insights"],
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop",
  },
  {
    icon: Zap,
    title: "Instant Templates",
    desc: "500+ professionally designed templates for every platform and use case. Customize with one click and publish instantly.",
    gradient: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-500/10",
    tags: ["500+ Templates", "Social", "Print"],
    preview: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&h=240&fit=crop",
  },
  {
    icon: Globe,
    title: "Multi-Platform Export",
    desc: "Export your designs in any format for any platform. PNG, JPG, SVG, PDF, MP4, GIF — perfectly sized for every channel.",
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    tags: ["All Formats", "Auto-Resize", "Batch"],
    preview: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=240&fit=crop",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    desc: "SOC2 Type II compliant. SSO, SAML, granular permissions, audit logs, and dedicated infrastructure for enterprise teams.",
    gradient: "from-slate-500 to-gray-600",
    bg: "bg-slate-500/10",
    tags: ["SOC2", "SSO", "Audit Logs"],
    preview: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=240&fit=crop",
  },
];

export default function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary-500/0 to-primary-500/50" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-sm font-semibold text-primary-500">Everything You Need</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4">
            Superpowers for{" "}
            <span className="gradient-text-purple">Every Creator</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-generated images to full brand systems — PixiVisual gives you the tools to create anything, faster than ever.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group relative rounded-2xl border border-border bg-card overflow-hidden cursor-pointer transition-all duration-300",
                  hovered === i ? "shadow-card-hover scale-[1.02] border-primary-500/30" : "hover:shadow-card"
                )}
              >
                {/* Preview Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={feature.preview}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90" />
                  <div className={cn(
                    "absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                    feature.gradient
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span key={tag} className={cn("px-2.5 py-1 rounded-full text-xs font-medium", feature.bg)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                  `bg-gradient-to-br ${feature.gradient} opacity-[0.03]`
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
