import { Link } from "react-router-dom";
import { Newspaper, Award, Download, ArrowRight, ExternalLink, Mail } from "lucide-react";

const pressReleases = [
  {
    date: "May 28, 2026",
    title: "PixiVisual Raises $42M Series B to Accelerate AI Design Innovation",
    source: "Business Wire",
    tag: "Funding",
  },
  {
    date: "April 10, 2026",
    title: "PixiVisual Launches AI Video Studio — The Future of Creative Content",
    source: "TechCrunch",
    tag: "Product Launch",
  },
  {
    date: "March 3, 2026",
    title: "PixiVisual Surpasses 2 Million Active Creators Worldwide",
    source: "PR Newswire",
    tag: "Milestone",
  },
  {
    date: "January 15, 2026",
    title: "PixiVisual Named #1 AI Design Platform by ProductHunt",
    source: "ProductHunt",
    tag: "Award",
  },
];

const awards = [
  { name: "Best AI Design Tool 2026", org: "Design Awards", icon: "🏆" },
  { name: "Top 50 SaaS Startups", org: "Forbes Tech", icon: "⭐" },
  { name: "People's Choice — Creativity", org: "ProductHunt", icon: "🎨" },
  { name: "Best Developer Tool API", org: "API World", icon: "🔧" },
];

const brandAssets = [
  { name: "PixiVisual Logo (SVG)", size: "12KB", format: "SVG" },
  { name: "PixiVisual Logo (PNG)", size: "48KB", format: "PNG" },
  { name: "Brand Guidelines PDF", size: "2.4MB", format: "PDF" },
  { name: "Press Kit (ZIP)", size: "8.2MB", format: "ZIP" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Newspaper className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Press & Media</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            PixiVisual in the <span className="gradient-text-purple">News</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Media resources, press releases, and brand assets for journalists and media professionals.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Press inquiries:</span>
            <a href="mailto:press@pixivisual.ai" className="text-primary-500 hover:underline font-medium">press@pixivisual.ai</a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "2M+", label: "Active Creators" },
            { value: "$42M", label: "Total Funding" },
            { value: "140+", label: "Countries" },
            { value: "48M+", label: "Designs Created" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center hover-lift">
              <p className="font-heading font-black text-3xl gradient-text-purple">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Press Releases */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-6">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((pr) => (
              <div key={pr.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary-500/30 hover-lift transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 font-medium">{pr.tag}</span>
                      <span className="text-xs text-muted-foreground">{pr.date}</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary-500 transition-colors">{pr.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">via {pr.source}</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-sm text-primary-500 hover:underline flex-shrink-0">
                    Read More <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-warning" /> Awards & Recognition
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map((a) => (
              <div key={a.name} className="bg-card border border-border rounded-2xl p-4 text-center hover-lift">
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className="font-semibold text-sm">{a.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.org}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Assets */}
        <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-6">
          <h2 className="font-heading font-bold text-xl mb-4">Brand Assets & Press Kit</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {brandAssets.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border hover:border-primary-500/30 transition-all">
                <div>
                  <p className="text-sm font-semibold">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.format} · {asset.size}</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-primary-500 hover:underline">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
