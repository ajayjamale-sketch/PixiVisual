import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Play, ArrowRight, Star, Zap, Shield, X } from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";
import { useState } from "react";

const stats = [
  { label: "Active Creators", value: "2.4M+" },
  { label: "Designs Created", value: "48M+" },
  { label: "AI Generations", value: "120M+" },
  { label: "Satisfaction", value: "98%" },
];

const trustedBrands = ["Adobe", "Figma", "Canva", "Shopify", "HubSpot", "Stripe"];

const floatingCards = [
  {
    id: 1,
    title: "AI Poster",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=140&fit=crop",
    badge: "Just created",
    color: "from-violet-500/20 to-purple-500/20",
    position: "top-[10%] left-[5%] -rotate-6",
  },
  {
    id: 2,
    title: "Brand Kit",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=140&fit=crop",
    badge: "New",
    color: "from-pink-500/20 to-rose-500/20",
    position: "top-[15%] right-[3%] rotate-6",
  },
  {
    id: 3,
    title: "Social Post",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=140&fit=crop",
    badge: "Trending",
    color: "from-blue-500/20 to-cyan-500/20",
    position: "bottom-[20%] left-[2%] rotate-3",
  },
];

const demoVideos = [
  { label: "AI Image Generation", duration: "1:20", color: "from-violet-500 to-purple-600" },
  { label: "Brand Kit Builder", duration: "2:05", color: "from-pink-500 to-rose-500" },
  { label: "Social Media Creator", duration: "1:45", color: "from-blue-500 to-cyan-500" },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animated-gradient opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating Cards */}
      {floatingCards.map((card) => (
        <div
          key={card.id}
          className={`absolute ${card.position} hidden xl:block w-48 animate-float`}
          style={{ animationDelay: `${card.id * 0.5}s` }}
        >
          <div className={`glass-card rounded-2xl p-2 bg-gradient-to-br ${card.color}`}>
            <img src={card.img} alt={card.title} className="w-full h-28 rounded-xl object-cover mb-2" />
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-white">{card.title}</span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{card.badge}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowDemo(false)}>
          <div className="bg-card border border-border rounded-3xl shadow-glass-lg w-full max-w-xl overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-primary-500" />
                <h2 className="font-bold text-lg">Product Demos</h2>
              </div>
              <button onClick={() => setShowDemo(false)} className="p-2 rounded-xl hover:bg-muted transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Choose a demo to see PixiVisual in action:</p>
              {demoVideos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowDemo(false);
                    navigate("/studio");
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary-500/30 hover:bg-primary-500/5 transition-all group text-left"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm group-hover:text-primary-500 transition-colors">{v.label}</p>
                    <p className="text-xs text-muted-foreground">{v.duration} · HD video</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
              <div className="pt-2">
                <Link
                  to="/signup"
                  onClick={() => setShowDemo(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-sm hover-glow transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Try it yourself — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-8 animate-fade-in-up">
            <Zap className="w-3.5 h-3.5 text-warning" />
            <span className="text-sm text-white/90">Powered by GPT-5 & Stable Diffusion XL</span>
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">New</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Create Stunning
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent bg-clip-text text-transparent">
                AI Visuals
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none">
                <path d="M0 10 Q100 0 200 6 Q300 12 400 4" stroke="url(#grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="50%" stopColor="#EC4899"/>
                    <stop offset="100%" stopColor="#2563EB"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            In Seconds
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            The all-in-one AI creative platform. Generate images, design posters, build brands, create videos — all with a simple text prompt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/signup"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg shadow-glow hover:shadow-glow-pink transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Generate Design — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setShowDemo(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/20 text-white font-bold text-lg hover:border-white/40 transition-all hover:scale-105"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
              <span className="ml-2 text-white/80 text-sm font-medium">4.9/5 from 12,400+ reviews</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Shield className="w-4 h-4 text-success" />
              No credit card required
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 via-secondary-500/20 to-accent/30 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-glass-lg cursor-pointer group" onClick={() => navigate("/studio")}>
              <img
                src={heroImg}
                alt="PixiVisual AI Design Platform"
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold">
                  <Sparkles className="w-5 h-5" /> Try AI Studio
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10 hover-lift cursor-default">
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Trusted Brands */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <p className="text-white/40 text-sm mb-4 uppercase tracking-widest">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustedBrands.map((brand) => (
                <span key={brand} className="text-white/30 font-bold text-lg hover:text-white/60 transition-colors cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
