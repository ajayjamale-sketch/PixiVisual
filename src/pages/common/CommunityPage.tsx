import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, MessageSquare, Trophy, Star, ArrowRight, Hash, Send, Heart, Bookmark, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const channels = [
  { name: "general", members: 24800, desc: "General discussion about design and AI" },
  { name: "showcase", members: 18600, desc: "Share your amazing creations" },
  { name: "feedback", members: 12400, desc: "Product feedback and feature requests" },
  { name: "tutorials", members: 9200, desc: "Tips, tricks, and how-to guides" },
  { name: "jobs", members: 6800, desc: "Design job opportunities" },
];

const featured = [
  { id: 1, name: "Alex Rivera", title: "Gradient Masterclass Collection", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop", likes: 2840, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=faces" },
  { id: 2, name: "Marcus Kim", title: "AI Brand Identity System", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", likes: 1920, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
  { id: 3, name: "Emma Wilson", title: "Social Media Trend Pack 2026", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop", likes: 3100, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
];

const initialChannelFeed: Record<string, Array<{ id: number; author: string; avatar: string; text: string; time: string }>> = {
  general: [
    { id: 1, author: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=faces", text: "Has anyone tried using the new HSL palette tool? It is a lifesaver for brand alignment!", time: "10m ago" },
    { id: 2, author: "David Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces", text: "PixiVisual is amazing. Looking forward to the presentation builder roadmap drop.", time: "1h ago" }
  ],
  showcase: [
    { id: 1, author: "Marcus Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces", text: "Just completed my startup pitch deck using slides and custom generated textures!", time: "2h ago" }
  ],
  feedback: [
    { id: 1, author: "Lisa Park", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces", text: "Feature request: Can we get keyboard shortcut support for locking layers in canvas editor?", time: "3h ago" }
  ],
  tutorials: [
    { id: 1, author: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces", text: "Protip: If you add HSL values directly, vector graphics render with smoother gradients.", time: "4h ago" }
  ],
  jobs: [
    { id: 1, author: "HR Global", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces", text: "Hiring: Freelance Web Designer (Remote). Must know Figma and React. Post portfolio links below.", time: "1d ago" }
  ]
};

export default function CommunityPage() {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState("general");
  const [channelFeeds, setChannelFeeds] = useState(initialChannelFeed);
  const [newPostText, setNewPostText] = useState("");
  const [creationsList, setCreationsList] = useState(featured);
  const [likedCreations, setLikedCreations] = useState<Set<number>>(new Set());
  const [savedCreations, setSavedCreations] = useState<Set<number>>(new Set());
  const [selectedCreation, setSelectedCreation] = useState<typeof featured[0] | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces",
      text: newPostText,
      time: "Just now"
    };
    setChannelFeeds(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg]
    }));
    setNewPostText("");
    toast.success("Post submitted to channel!");
  };

  const handleLikeCreation = (id: number) => {
    const next = new Set(likedCreations);
    if (next.has(id)) {
      next.delete(id);
      setCreationsList(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes - 1 } : c));
      if (selectedCreation?.id === id) {
        setSelectedCreation(prev => prev ? { ...prev, likes: prev.likes - 1 } : null);
      }
      toast.success("Like removed");
    } else {
      next.add(id);
      setCreationsList(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
      if (selectedCreation?.id === id) {
        setSelectedCreation(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      }
      toast.success("Design liked!");
    }
    setLikedCreations(next);
  };

  const handleRemix = (creation: typeof featured[0]) => {
    navigate("/editor", {
      state: {
        backgroundImage: creation.img,
        title: `Remix - ${creation.title}`
      }
    });
    toast.success(`Loaded "${creation.title}" in Canvas Editor!`);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Channels List */}
          <div className="bg-card border border-border rounded-2xl p-5 h-fit lg:col-span-1">
            <h2 className="font-semibold mb-4">Channels</h2>
            <div className="space-y-1.5">
              {channels.map((ch) => (
                <button 
                  key={ch.name} 
                  onClick={() => { setActiveChannel(ch.name); setNewPostText(""); }}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left border border-transparent",
                    activeChannel === ch.name 
                      ? "bg-primary-500/10 border-primary-500/20 text-primary-500 font-semibold" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Hash className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{ch.name}</p>
                    <p className="text-[10px] opacity-80 line-clamp-1">{ch.desc}</p>
                    <p className="text-[10px] text-primary-500 mt-0.5 font-medium">{ch.members.toLocaleString()} members</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Channel Chat Feed */}
          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col h-[520px] lg:col-span-2 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center gap-1.5 border-b border-border pb-3">
              <Hash className="w-4 h-4 text-primary-500 animate-pulse" /> #{activeChannel} Feed
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {(channelFeeds[activeChannel] || []).map((msg) => (
                <div key={msg.id} className="flex gap-2.5 p-2.5 rounded-xl hover:bg-muted/40 transition-colors">
                  <img src={msg.avatar} alt={msg.author} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-foreground">{msg.author}</p>
                      <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed break-words">{msg.text}</p>
                  </div>
                </div>
              ))}
              {(!channelFeeds[activeChannel] || channelFeeds[activeChannel].length === 0) && (
                <p className="text-xs text-muted-foreground text-center py-12">No posts yet in this channel.</p>
              )}
            </div>
            <form onSubmit={handlePostSubmit} className="mt-4 flex gap-2 pt-3 border-t border-border">
              <input
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder={`Send a message to #${activeChannel}...`}
                className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button type="submit" className="p-2.5 bg-primary-500 text-white rounded-xl hover:shadow-glow transition-all flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Featured creations list */}
          <div className="bg-card border border-border rounded-2xl p-5 h-fit lg:col-span-1">
            <h2 className="font-semibold mb-4">Featured Creations</h2>
            <div className="grid grid-cols-1 gap-4">
              {creationsList.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedCreation(item)} 
                  className="group rounded-2xl overflow-hidden border border-border hover:shadow-card bg-card/50 hover:bg-card transition-all cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <img src={item.avatar} alt={item.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-[10px] font-medium">{item.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                    <p className="text-xs text-secondary-500 mt-1 flex items-center gap-1 font-semibold">
                      <Star className="w-3 h-3 fill-secondary-500 text-secondary-500" /> {item.likes.toLocaleString()} likes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Creation Preview Modal */}
      {selectedCreation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedCreation(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg bg-background/80"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedCreation.img} alt={selectedCreation.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <div className="flex items-center gap-2.5 mb-3">
              <img src={selectedCreation.avatar} alt={selectedCreation.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-sm">{selectedCreation.name}</p>
                <p className="text-xs text-muted-foreground">Community Featured Creator</p>
              </div>
            </div>
            <h3 className="font-heading font-bold text-base mb-2">{selectedCreation.title}</h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Created using PixiVisual AI prompt generation and layered shapes editor. Standard commercial design license included.
            </p>
            <div className="flex items-center justify-between border-t border-border pt-4 mb-4">
              <button 
                onClick={() => handleLikeCreation(selectedCreation.id)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all",
                  likedCreations.has(selectedCreation.id)
                    ? "bg-secondary-500/10 text-secondary-500 border-secondary-500/30"
                    : "hover:bg-muted text-muted-foreground border-border"
                )}
              >
                <Heart className={cn("w-4 h-4", likedCreations.has(selectedCreation.id) && "fill-secondary-500")} />
                {selectedCreation.likes} Likes
              </button>
              <button 
                onClick={() => {
                  const next = new Set(savedCreations);
                  if (next.has(selectedCreation.id)) {
                    next.delete(selectedCreation.id);
                    toast.success("Removed from bookmarks");
                  } else {
                    next.add(selectedCreation.id);
                    toast.success("Saved to bookmarks!");
                  }
                  setSavedCreations(next);
                }}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all",
                  savedCreations.has(selectedCreation.id)
                    ? "bg-primary-500/10 text-primary-500 border-primary-500/30"
                    : "hover:bg-muted text-muted-foreground border-border"
                )}
              >
                <Bookmark className={cn("w-4 h-4", savedCreations.has(selectedCreation.id) && "fill-primary-500")} />
                Bookmark
              </button>
            </div>
            <button 
              onClick={() => { handleRemix(selectedCreation); setSelectedCreation(null); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover-glow transition-all"
            >
              <Sparkles className="w-4 h-4" /> Remix in Canvas Editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
