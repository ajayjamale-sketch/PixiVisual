import { Users, MessageSquare, Trophy, Star, ArrowRight, Hash } from "lucide-react";
import { Link } from "react-router-dom";

const channels = [
  { name: "general", members: 24800, desc: "General discussion about design and AI" },
  { name: "showcase", members: 18600, desc: "Share your amazing creations" },
  { name: "feedback", members: 12400, desc: "Product feedback and feature requests" },
  { name: "tutorials", members: 9200, desc: "Tips, tricks, and how-to guides" },
  { name: "jobs", members: 6800, desc: "Design job opportunities" },
];

const featured = [
  { name: "Alex Rivera", title: "Gradient Masterclass Collection", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop", likes: 2840, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=faces" },
  { name: "Marcus Kim", title: "AI Brand Identity System", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", likes: 1920, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
  { name: "Emma Wilson", title: "Social Media Trend Pack 2026", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop", likes: 3100, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">PixiVisual <span className="gradient-text-purple">Community</span></h1>
          <p className="text-lg text-muted-foreground">Connect with 200,000+ designers and creators worldwide</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 200K+ Members</span>
            <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> 1.2M Posts</span>
            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4" /> Weekly Challenges</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Channels */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Channels</h2>
            <div className="space-y-2">
              {channels.map((ch) => (
                <button key={ch.name} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-all text-left">
                  <Hash className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{ch.name}</p>
                    <p className="text-xs text-muted-foreground">{ch.desc}</p>
                    <p className="text-xs text-primary-500 mt-0.5">{ch.members.toLocaleString()} members</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Work */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold mb-4">Featured Creations</h2>
            <div className="grid grid-cols-3 gap-4">
              {featured.map((item) => (
                <div key={item.name} className="group rounded-2xl overflow-hidden border border-border hover:shadow-card transition-all cursor-pointer">
                  <div className="relative">
                    <img src={item.img} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <img src={item.avatar} alt={item.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-medium">{item.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                    <p className="text-xs text-secondary-500 mt-1 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary-500" /> {item.likes.toLocaleString()} likes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
