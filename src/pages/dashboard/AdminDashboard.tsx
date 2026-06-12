import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, DollarSign, ShoppingBag, AlertTriangle, Activity,
  CheckCircle, XCircle, Search, Filter, Eye, Trash2, Ban,
  TrendingUp, RefreshCw, Crown, Settings, X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { SAMPLE_CHART_DATA } from "@/lib/utils";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Alex Rivera", email: "alex@example.com", plan: "Pro", joined: "2h ago", status: "active", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=faces" },
  { id: 2, name: "Sam Wilson", email: "sam@agency.com", plan: "Business", joined: "5h ago", status: "active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=faces" },
  { id: 3, name: "Lisa Park", email: "lisa@design.co", plan: "Enterprise", joined: "8h ago", status: "active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces" },
  { id: 4, name: "Jordan Lee", email: "jordan@marketing.com", plan: "Pro", joined: "1d ago", status: "suspended", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces" },
  { id: 5, name: "Emma Wilson", email: "emma@freelance.com", plan: "Free", joined: "2d ago", status: "active", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=faces" },
];

const initialModerationItems = [
  { id: 1, type: "Template", name: "Abstract Waves Bundle", reporter: "Community", flag: "quality" },
  { id: 2, type: "User", name: "designer_pro123", reporter: "System", flag: "spam" },
  { id: 3, type: "Template", name: "Offensive Content Pack", reporter: "User Report", flag: "content" },
  { id: 4, type: "Review", name: "1-star review bomb", reporter: "System", flag: "abuse" },
];

const systemHealth = [
  { name: "API Gateway", status: "healthy", latency: "12ms" },
  { name: "AI Service", status: "healthy", latency: "890ms" },
  { name: "Storage CDN", status: "healthy", latency: "45ms" },
  { name: "Database", status: "degraded", latency: "280ms" },
  { name: "Auth Service", status: "healthy", latency: "8ms" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "moderation" | "revenue">("overview");
  const [users, setUsers] = useState(initialUsers);
  const [moderationItems, setModerationItems] = useState(initialModerationItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  
  const [reviewingItem, setReviewingItem] = useState<typeof initialModerationItems[0] | null>(null);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);

  const stats = [
    { label: "Total Users", value: "2.4M", change: "+12,400", trend: "up" as const, color: "bg-primary-500" },
    { label: "MRR", value: "$284K", change: "+18%", trend: "up" as const, color: "bg-success" },
    { label: "Active Subs", value: "48,200", change: "+2,100", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Pending Reviews", value: String(moderationItems.length), change: `+${moderationItems.length > 3 ? "4" : "1"}`, trend: "down" as const, color: "bg-warning" },
  ];

  const suspendUser = (id: number) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u));
    const user = users.find((u) => u.id === id);
    toast.success(user?.status === "suspended" ? "User reactivated" : "User suspended");
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  const approveModeration = (id: number) => {
    setModerationItems((prev) => prev.filter((m) => m.id !== id));
    if (reviewingItem?.id === id) setReviewingItem(null);
    toast.success("Item approved and restored");
  };

  const rejectModeration = (id: number) => {
    setModerationItems((prev) => prev.filter((m) => m.id !== id));
    if (reviewingItem?.id === id) setReviewingItem(null);
    toast.success("Item removed from platform");
  };

  const downloadRevenueReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Month,Revenue (USD),Subscriptions\n";
    SAMPLE_CHART_DATA.monthlyRevenue.forEach(row => {
      csvContent += `"${row.month}",${row.revenue},${row.subscriptions}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mrr_revenue_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Revenue report downloaded!");
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = planFilter === "all" || u.plan.toLowerCase() === planFilter.toLowerCase();
    return matchSearch && matchPlan;
  });

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "users", label: `Users (${users.length})` },
    { key: "moderation", label: `Moderation${moderationItems.length > 0 ? ` (${moderationItems.length})` : ""}` },
    { key: "revenue", label: "Revenue" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Admin Control Center</h1>
          <p className="text-muted-foreground mt-1">Platform overview, user management, and system health</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/30">
          <Activity className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-success">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all", activeTab === tab.key ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Revenue & Subscriptions</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={SAMPLE_CHART_DATA.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Bar yAxisId="left" dataKey="revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="subscriptions" stroke="#EC4899" strokeWidth={2} dot={false} name="Subs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">System Health</h2>
              <div className="space-y-2">
                {systemHealth.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-2.5 rounded-xl bg-muted">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", s.status === "healthy" ? "bg-success" : "bg-warning")} />
                      <span className="text-sm">{s.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{s.latency}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.info("Refreshing health checks...")} className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm text-muted-foreground transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Recent Signups</h2>
                <button onClick={() => setActiveTab("users")} className="text-xs text-primary-500 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {users.slice(0, 3).map((u) => (
                  <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-all">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 font-medium">{u.plan}</span>
                      <p className="text-xs text-muted-foreground mt-1">{u.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Pending Moderation</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-error/10 text-error font-medium">{moderationItems.length} items</span>
              </div>
              {moderationItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />All cleared!
                </div>
              ) : (
                <div className="space-y-3">
                  {moderationItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type} · {item.flag} · {item.reporter}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => approveModeration(item.id)} className="p-1 rounded-lg bg-success/10 hover:bg-success hover:text-white text-success transition-all">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => rejectModeration(item.id)} className="p-1 rounded-lg bg-error/10 hover:bg-error hover:text-white text-error transition-all">
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} className="px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none">
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Plan</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 font-medium">{u.plan}</span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs hidden lg:table-cell">{u.joined}</td>
                    <td className="p-4">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", u.status === "active" ? "bg-success/10 text-success" : "bg-error/10 text-error")}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button onClick={() => setSelectedUser(u)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="View Details">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => suspendUser(u.id)} className={cn("p-1.5 rounded-lg transition-colors", u.status === "suspended" ? "hover:bg-success/10 text-success hover:text-success" : "hover:bg-warning/10 text-muted-foreground hover:text-warning")}>
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No users found.</div>
            )}
          </div>
        </div>
      )}

      {/* Moderation */}
      {activeTab === "moderation" && (
        <div className="space-y-4">
          <h2 className="font-semibold">Content Moderation Queue</h2>
          {moderationItems.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-16 text-center">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="font-semibold text-lg">All Clear!</p>
              <p className="text-muted-foreground text-sm mt-1">No items pending moderation.</p>
            </div>
          ) : (
            moderationItems.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover-lift">
                <AlertTriangle className={cn("w-5 h-5 flex-shrink-0", item.flag === "content" ? "text-error" : item.flag === "spam" ? "text-warning" : "text-orange-500")} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning">{item.flag}</span>
                    <span className="text-xs text-muted-foreground">Reported by: {item.reporter}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setReviewingItem(item)} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-all">Review</button>
                  <button onClick={() => approveModeration(item.id)} className="px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white font-medium text-sm transition-all">Approve</button>
                  <button onClick={() => rejectModeration(item.id)} className="px-3 py-1.5 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white font-medium text-sm transition-all">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Revenue */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "This Month MRR", value: "$284K", change: "+18%", color: "text-success" },
              { label: "ARR", value: "$3.4M", change: "+22%", color: "text-primary-500" },
              { label: "Avg Revenue per User", value: "$5.90", change: "+0.40", color: "text-secondary-500" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-5 hover-lift">
                <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
                <p className={cn("font-heading font-black text-2xl", s.color)}>{s.value}</p>
                <p className="text-xs text-success mt-1">{s.change} this month</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Revenue Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={SAMPLE_CHART_DATA.monthlyRevenue}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fill="url(#adminRevGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end">
            <button onClick={downloadRevenueReport} className="px-5 py-2.5 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
              Export Revenue Report
            </button>
          </div>
        </div>
      )}

      {/* Moderation Review Modal */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setReviewingItem(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Review Content
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Moderation assessment required for content flagged by reporter.</p>
            <div className="bg-muted rounded-xl p-4 space-y-2 mb-5">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Content Details</p>
              <p className="text-sm font-bold">{reviewingItem.name}</p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1.5">
                <div>
                  <span className="text-muted-foreground">Type:</span> {reviewingItem.type}
                </div>
                <div>
                  <span className="text-muted-foreground">Flag:</span> <span className="text-warning font-medium">{reviewingItem.flag}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Reporter:</span> {reviewingItem.reporter}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => approveModeration(reviewingItem.id)}
                className="flex-1 py-2.5 rounded-xl bg-success text-white font-semibold text-sm hover-glow transition-all"
              >
                Approve & Keep
              </button>
              <button 
                onClick={() => rejectModeration(reviewingItem.id)}
                className="flex-1 py-2.5 rounded-xl bg-error text-white font-semibold text-sm hover:opacity-90 transition-all"
              >
                Reject & Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <h2 className="font-heading font-bold text-lg">{selectedUser.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-muted p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Plan Level</p>
                <p className="font-bold text-sm text-primary-500 flex items-center gap-1 mt-0.5">
                  <Crown className="w-3.5 h-3.5" /> {selectedUser.plan}
                </p>
              </div>
              <div className="bg-muted p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Joined Date</p>
                <p className="font-bold text-sm mt-0.5">{selectedUser.joined}</p>
              </div>
              <div className="bg-muted p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={cn("inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1", selectedUser.status === "active" ? "bg-success/15 text-success" : "bg-error/15 text-error")}>
                  {selectedUser.status}
                </span>
              </div>
              <div className="bg-muted p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Total Creations</p>
                <p className="font-bold text-sm mt-0.5">148 designs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { suspendUser(selectedUser.id); setSelectedUser(prev => prev ? { ...prev, status: prev.status === "suspended" ? "active" : "suspended" } : null); }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all",
                  selectedUser.status === "suspended" ? "bg-success text-white" : "bg-warning text-white"
                )}
              >
                {selectedUser.status === "suspended" ? "Reactivate User" : "Suspend User"}
              </button>
              <button 
                onClick={() => { deleteUser(selectedUser.id); setSelectedUser(null); }}
                className="py-2.5 px-4 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-medium text-sm transition-all"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
