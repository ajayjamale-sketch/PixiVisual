import { Link } from "react-router-dom";
import { BookOpen, MessageSquare, Code, HelpCircle, ArrowRight, Youtube } from "lucide-react";

const resources = [
  { icon: BookOpen, title: "Documentation", desc: "Comprehensive guides and API references", href: "/api-docs", color: "from-violet-500 to-purple-600", count: "240+ articles" },
  { icon: MessageSquare, title: "Community", desc: "Connect with 200K+ creators and designers", href: "/community", color: "from-pink-500 to-rose-500", count: "200K members" },
  { icon: Code, title: "API Reference", desc: "Integrate PixiVisual into your applications", href: "/api-docs", color: "from-blue-500 to-cyan-500", count: "50+ endpoints" },
  { icon: HelpCircle, title: "Help Center", desc: "Find answers to common questions", href: "/help", color: "from-orange-500 to-amber-500", count: "500+ articles" },
  { icon: Youtube, title: "Video Tutorials", desc: "Learn with step-by-step video guides", href: "/community", color: "from-red-500 to-rose-600", count: "120+ videos" },
  { icon: BookOpen, title: "Blog", desc: "Design tips, trends, and platform updates", href: "/blog", color: "from-green-500 to-emerald-500", count: "Weekly posts" },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">Resources & <span className="gradient-text-purple">Learning</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to master PixiVisual and level up your creative skills.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link key={resource.title} to={resource.href} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-card-hover hover:border-primary-500/30 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{resource.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-500 font-medium">{resource.count}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
