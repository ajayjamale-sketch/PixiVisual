import { Link } from "react-router-dom";
import { Sparkles, Users, Globe, Award, ArrowRight } from "lucide-react";

const team = [
  { name: "Jordan Miles", role: "CEO & Co-founder", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces" },
  { name: "Priya Sharma", role: "CTO & Co-founder", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=faces" },
  { name: "Alex Chen", role: "Head of AI/ML", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces" },
  { name: "Maya Johnson", role: "Head of Design", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces" },
  { name: "Sam Park", role: "Head of Growth", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces" },
  { name: "Zoe Martinez", role: "Head of Product", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=faces" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">PixiVisual</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl mb-6">
            We're Building the Future of <span className="gradient-text-purple">Creativity</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            PixiVisual was founded in 2024 with a mission to democratize creative design. We believe everyone deserves to create stunning visuals, regardless of their skill level.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Users", value: "2.4M+", icon: Users },
            { label: "Designs Created", value: "48M+", icon: Award },
            { label: "Countries", value: "180+", icon: Globe },
            { label: "AI Models", value: "12+", icon: Sparkles },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-3xl font-black gradient-text-purple">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-heading font-black text-3xl text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative mb-3 inline-block">
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-2xl object-cover group-hover:scale-105 transition-transform" />
              </div>
              <p className="font-semibold text-sm">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-t border-border py-16 text-center px-4">
        <h2 className="font-heading font-black text-3xl mb-4">Join Our Mission</h2>
        <p className="text-muted-foreground mb-6">We're hiring talented people who want to shape the future of creative AI.</p>
        <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:shadow-glow transition-all">
          View Open Roles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
