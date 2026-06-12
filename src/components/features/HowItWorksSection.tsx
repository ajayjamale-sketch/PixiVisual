import { useState } from "react";
import { MessageSquare, Wand2, Sliders, Download, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Vision",
    desc: "Type a simple text prompt describing what you want to create. Be as creative as you like.",
    example: '"Create a vibrant summer sale poster with tropical vibes and bold typography"',
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Generates It",
    desc: "Our advanced AI models instantly create multiple stunning design options for you to choose from.",
    example: "4 unique designs generated in under 5 seconds",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
  },
  {
    number: "03",
    icon: Sliders,
    title: "Customize & Refine",
    desc: "Fine-tune colors, fonts, layouts, and elements with our intuitive visual editor. No design skills needed.",
    example: "Drag-and-drop editor with 500+ customization options",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    number: "04",
    icon: Download,
    title: "Export Anywhere",
    desc: "Download in any format — PNG, JPG, SVG, PDF, MP4. Auto-resized for every platform and use case.",
    example: "1-click export in 20+ formats",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
  },
  {
    number: "05",
    icon: Share2,
    title: "Publish & Share",
    desc: "Publish directly to social media, embed on your website, or share with your team for review.",
    example: "Direct publishing to 12+ platforms",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
            <ArrowRight className="w-3.5 h-3.5 text-secondary-500" />
            <span className="text-sm font-semibold text-secondary-500">Simple Process</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4">
            From Idea to{" "}
            <span className="gradient-text-purple">Masterpiece</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Create professional designs in under a minute with our AI-powered workflow.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = i < activeStep;

            return (
              <div key={step.number} className="flex gap-6 mb-4">
                {/* Left - Timeline */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(i)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isActive
                        ? `bg-gradient-to-br ${step.color} text-white shadow-glow scale-110`
                        : isPast
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground hover:bg-primary-500/10 hover:text-primary-500"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  {i < steps.length - 1 && (
                    <div className={cn(
                      "w-0.5 flex-1 mt-2 min-h-[2rem]",
                      isPast ? "bg-success/50" : "bg-border"
                    )} />
                  )}
                </div>

                {/* Right - Content */}
                <div
                  className={cn(
                    "flex-1 pb-6 cursor-pointer",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
                  )}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={cn(
                    "rounded-2xl border transition-all duration-300",
                    isActive ? "border-primary-500/30 bg-card shadow-glass p-5" : "border-transparent p-3"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        isActive ? `${step.bg}` : "text-muted-foreground"
                      )}>
                        Step {step.number}
                      </span>
                      <h3 className="font-heading font-bold text-lg">{step.title}</h3>
                    </div>
                    {isActive && (
                      <div className="animate-fade-in-up">
                        <p className="text-muted-foreground mb-3 leading-relaxed">{step.desc}</p>
                        <div className={cn("px-4 py-3 rounded-xl text-sm font-medium italic", step.bg)}>
                          {step.example}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-6 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Progress:</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-primary-500">{activeStep + 1}/{steps.length}</span>
        </div>
      </div>
    </section>
  );
}
