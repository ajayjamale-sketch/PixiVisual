import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Creative Director",
    company: "Apex Creative Agency",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces",
    content: "PixiVisual has completely transformed how our agency delivers creative work. What used to take our team 3 days now takes 2 hours. The AI quality is absolutely stunning.",
    rating: 5,
    type: "Agency",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Brand Designer",
    company: "Freelance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
    content: "I've tried every design tool out there. Nothing comes close to PixiVisual. The AI understands context, creates on-brand content, and the editor is incredibly powerful.",
    rating: 5,
    type: "Designer",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Content Creator",
    company: "2.4M Followers",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    content: "My Instagram engagement went up 340% after switching to PixiVisual. The AI creates content that actually resonates with my audience. Game-changer doesn't even begin to describe it.",
    rating: 5,
    type: "Creator",
  },
  {
    id: 4,
    name: "David Park",
    role: "VP Marketing",
    company: "TechFlow Inc",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    content: "We scaled our content production 10x without hiring a single additional designer. The enterprise features, team collaboration, and brand consistency tools are exceptional.",
    rating: 5,
    type: "Business",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "E-commerce Owner",
    company: "StyleVault",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=faces",
    content: "As a small business owner, I was spending thousands on design work. PixiVisual saves me $3,000+ monthly while producing better quality content than most agencies I've worked with.",
    rating: 5,
    type: "Business",
  },
  {
    id: 6,
    name: "Jake Morrison",
    role: "Startup Founder",
    company: "LaunchPad",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
    content: "Built our entire brand identity using PixiVisual AI. Logo, brand guidelines, social assets, pitch deck — everything looked investor-grade from day one. Raised our seed round successfully!",
    rating: 5,
    type: "Business",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const getVisible = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + testimonials.length) % testimonials.length;
      items.push({ ...testimonials[idx], offset: i });
    }
    return items;
  };

  const typeColors: Record<string, string> = {
    Agency: "bg-orange-500/10 text-orange-500",
    Designer: "bg-violet-500/10 text-violet-500",
    Creator: "bg-pink-500/10 text-pink-500",
    Business: "bg-blue-500/10 text-blue-500",
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-4">
            <Star className="w-3.5 h-3.5 text-warning" fill="currentColor" />
            <span className="text-sm font-semibold text-warning">12,400+ Reviews</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4">
            Loved by{" "}
            <span className="gradient-text-purple">Creators</span>
            <br />
            Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join millions of designers, creators, and businesses who've transformed their creative workflow.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex items-center justify-center gap-4">
            {getVisible().map((testimonial) => (
              <div
                key={`${testimonial.id}-${testimonial.offset}`}
                className={cn(
                  "transition-all duration-500 rounded-3xl border p-6",
                  testimonial.offset === 0
                    ? "scale-100 opacity-100 flex-1 max-w-2xl bg-card border-primary-500/30 shadow-glass-lg z-10"
                    : "scale-90 opacity-40 hidden lg:block w-64 bg-card/50 border-border"
                )}
              >
                <Quote className="w-8 h-8 text-primary-500/30 mb-4" />
                <p className="text-base md:text-lg leading-relaxed mb-6 text-foreground/90">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role} · {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[testimonial.type])}>
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-border bg-card hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === currentIndex
                      ? "w-8 bg-gradient-to-r from-primary-500 to-secondary-500"
                      : "w-2 bg-muted hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-border bg-card hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "2.4M+", label: "Happy Users" },
            { value: "12.4K+", label: "Reviews" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-card border border-border">
              <p className="text-2xl font-black gradient-text-purple">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
