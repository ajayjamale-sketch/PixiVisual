import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag, Star, DollarSign, Eye, ArrowRight, Plus,
  Edit3, Trash2, MessageSquare, Filter, Download, Send, X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const initialPortfolio = [
  { id: 1, title: "Minimal Brand System", sales: 142, rating: 4.9, price: 49, img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop", category: "Brand" },
  { id: 2, title: "Social Media Pack Pro", sales: 89, rating: 4.8, price: 29, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop", category: "Social" },
  { id: 3, title: "UI Component Library", sales: 215, rating: 5.0, price: 79, img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=200&fit=crop", category: "UI Kit" },
  { id: 4, title: "Logo Design Bundle", sales: 67, rating: 4.7, price: 39, img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", category: "Logo" },
];

const messages = [
  { id: 1, name: "James Carter", msg: "Love your brand kit! Any custom work available?", time: "2h ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces", unread: true },
  { id: 2, name: "Lisa Park", msg: "Can you create a logo for my startup?", time: "5h ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces", unread: true },
  { id: 3, name: "Tom Wilson", msg: "Purchased your UI kit. Amazing work!", time: "1d ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=faces", unread: false },
  { id: 4, name: "Anna Kim", msg: "Is the Social Media Pack compatible with Figma?", time: "2d ago", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=faces", unread: false },
];

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2400 },
  { month: "Apr", revenue: 1900 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 4100 },
];

export default function DesignerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "messages" | "earnings">("overview");
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [selectedMsg, setSelectedMsg] = useState<typeof messages[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [readMessages, setReadMessages] = useState<Set<number>>(new Set());

  const stats = [
    { label: "Total Revenue", value: "$14,680", change: "+28%", trend: "up" as const, color: "bg-success" },
    { label: "Template Sales", value: "513", change: "+42%", trend: "up" as const, color: "bg-primary-500" },
    { label: "Portfolio Views", value: "48.2K", change: "+15%", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Avg Rating", value: "4.9 ★", change: "+0.1", trend: "up" as const, color: "bg-warning" },
  ];

  const deleteTemplate = (id: number) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    toast.success("Template removed from portfolio");
  };

  const openMessage = (msg: typeof messages[0]) => {
    setSelectedMsg(msg);
    setReadMessages((prev) => new Set([...prev, msg.id]));
  };

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast.success(`Reply sent to ${selectedMsg?.name}`);
    setReplyText("");
    setSelectedMsg(null);
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "portfolio", label: "Portfolio" },
    { key: "messages", label: "Messages", badge: messages.filter(m => !readMessages.has(m.id) && m.unread).length },
    { key: "earnings", label: "Earnings" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Designer Studio</h1>
          <p className="text-muted-foreground mt-1">Your portfolio, sales, and client overview</p>
        </div>
        <div className="flex gap-2">
          <Link to="/marketplace" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
            <ShoppingBag className="w-4 h-4" /> Marketplace
          </Link>
          <Link to="/editor" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all">
            <Plus className="w-4 h-4" /> New Template
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn("relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all", activeTab === tab.key ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            {tab.label}
            {"badge" in tab && (tab as { badge: number }).badge > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {(tab as { badge: number }).badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#EC4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Recent Messages</h2>
              <div className="space-y-3">
                {messages.slice(0, 3).map((m) => (
                  <button key={m.id} onClick={() => openMessage(m)} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-all text-left group">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{m.name}</p>
                        {m.unread && !readMessages.has(m.id) && <span className="w-2 h-2 bg-secondary-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Top Selling Templates</h2>
              <button onClick={() => setActiveTab("portfolio")} className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <div key={item.id} className="rounded-xl border border-border overflow-hidden hover-lift hover:border-primary-500/30 transition-all">
                  <img src={item.img} alt={item.title} className="w-full h-28 object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate">{item.title}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-sm font-bold text-primary-500">${item.price}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-warning text-warning" />{item.rating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio */}
      {activeTab === "portfolio" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">My Templates ({portfolio.length})</h2>
            <Link to="/editor" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Add Template
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolio.map((item) => (
              <div key={item.id} className="group rounded-2xl border border-border overflow-hidden bg-card hover-lift hover:border-primary-500/30 transition-all">
                <div className="relative">
                  <img src={item.img} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity">
                    <button onClick={() => toast.info("Edit template...")} className="p-1.5 bg-white/90 rounded-lg hover:bg-white transition-colors shadow-sm">
                      <Edit3 className="w-3 h-3 text-gray-700" />
                    </button>
                    <button onClick={() => deleteTemplate(item.id)} className="p-1.5 bg-white/90 rounded-lg hover:bg-red-50 transition-colors shadow-sm">
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs font-medium">{item.category}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold truncate">{item.title}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-bold text-primary-500">${item.price}</span>
                    <span className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 fill-warning text-warning" />{item.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.sales} sales · ${item.price * item.sales} total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {activeTab === "messages" && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold">Messages ({messages.length})</h2>
          </div>
          <div className="divide-y divide-border">
            {messages.map((m) => (
              <button key={m.id} onClick={() => openMessage(m)} className="w-full flex items-start gap-4 p-4 hover:bg-muted transition-all text-left">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{m.name}</p>
                    <span className="text-xs text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{m.msg}</p>
                </div>
                {m.unread && !readMessages.has(m.id) && <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full mt-1 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Earnings */}
      {activeTab === "earnings" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "This Month", value: "$4,100", icon: DollarSign, color: "text-success bg-success/10" },
              { label: "Pending Payout", value: "$1,840", icon: DollarSign, color: "text-warning bg-warning/10" },
              { label: "All Time", value: "$14,680", icon: DollarSign, color: "text-primary-500 bg-primary-500/10" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-5 hover-lift">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", s.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="font-heading font-black text-2xl">{s.value}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Earnings History</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Earnings"]} />
                <Area type="monotone" dataKey="revenue" stroke="#22C55E" fill="url(#earnGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end">
            <button onClick={() => toast.success("Payout requested! Processing in 2-3 business days.")} className="px-6 py-2.5 rounded-xl bg-success/10 text-success hover:bg-success hover:text-white font-semibold text-sm transition-all">
              Request Payout ($1,840)
            </button>
          </div>
        </div>
      )}

      {/* Message Reply Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={selectedMsg.avatar} alt={selectedMsg.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold">{selectedMsg.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedMsg.time}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMsg(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <p className="text-sm">{selectedMsg.msg}</p>
            </div>
            <form onSubmit={sendReply} className="space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                autoFocus
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  <Send className="w-4 h-4" /> Send Reply
                </button>
                <button type="button" onClick={() => setSelectedMsg(null)} className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-sm transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
