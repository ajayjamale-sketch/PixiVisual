import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, Star, Clock, CheckCircle, Plus, ArrowRight,
  Edit3, Trash2, X, Search, Calendar, TrendingUp, Send, MessageSquare
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialOrders = [
  { id: "#2841", client: "James Miller", service: "Logo Design", amount: "$249", due: "2 days", status: "in-progress" as const },
  { id: "#2840", client: "Sarah Kim", service: "Social Pack", amount: "$149", due: "5 days", status: "pending" as const },
  { id: "#2839", client: "Mike Chen", service: "Brand Kit", amount: "$399", due: "Delivered", status: "completed" as const },
  { id: "#2838", client: "Anna Lee", service: "Poster Set", amount: "$99", due: "Delivered", status: "completed" as const },
  { id: "#2837", client: "David Park", service: "Presentation", amount: "$199", due: "7 days", status: "pending" as const },
];

const earningsData = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 3100 },
  { month: "Mar", earnings: 2800 },
  { month: "Apr", earnings: 4200 },
  { month: "May", earnings: 3900 },
  { month: "Jun", earnings: 5600 },
];

const statusStyle: Record<string, string> = {
  "in-progress": "bg-primary-500/10 text-primary-500",
  pending: "bg-warning/10 text-warning",
  completed: "bg-success/10 text-success",
};

const reviews = [
  { client: "Mike Chen", rating: 5, comment: "Absolutely amazing work! Delivered ahead of schedule and exceeded all expectations.", date: "Jun 10", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=faces" },
  { client: "Anna Lee", rating: 5, comment: "Perfect poster set. Will definitely order again for future campaigns!", date: "Jun 8", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=faces" },
  { client: "Tom Wilson", rating: 4, comment: "Great work overall. Minor revision needed but handled quickly and professionally.", date: "Jun 5", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces" },
];

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "portfolio" | "reviews">("overview");
  const [orders, setOrders] = useState(initialOrders);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({ client: "", service: "", amount: "", due: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = [
    { label: "This Month", value: "$5,600", change: "+44%", trend: "up" as const, color: "bg-success" },
    { label: "Active Orders", value: String(orders.filter(o => o.status !== "completed").length), change: "+2", trend: "up" as const, color: "bg-primary-500" },
    { label: "Completion Rate", value: "97%", change: "+1%", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Avg Rating", value: "4.9 ★", change: "Excellent", trend: "up" as const, color: "bg-warning" },
  ];

  const completeOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "completed" as const, due: "Delivered" } : o));
    toast.success("Order marked as completed!");
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    toast.success("Order removed");
  };

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.client || !newOrder.service) { toast.error("Fill in required fields"); return; }
    const o = {
      id: `#${Math.floor(Math.random() * 1000) + 2900}`,
      client: newOrder.client,
      service: newOrder.service,
      amount: newOrder.amount || "$0",
      due: newOrder.due || "TBD",
      status: "pending" as const,
    };
    setOrders((prev) => [o, ...prev]);
    setNewOrder({ client: "", service: "", amount: "", due: "" });
    setShowNewOrder(false);
    toast.success("New order added!");
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.client.toLowerCase().includes(searchQuery.toLowerCase()) || o.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchFilter;
  });

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "orders", label: "Orders" },
    { key: "portfolio", label: "Portfolio" },
    { key: "reviews", label: "Reviews" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Freelancer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your orders, portfolio, and earnings</p>
        </div>
        <div className="flex gap-2">
          <Link to="/marketplace" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
            <Star className="w-4 h-4" /> My Services
          </Link>
          <button
            onClick={() => setShowNewOrder(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all"
          >
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      {/* Add Order Modal */}
      {showNewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-glass-lg animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Add New Order</h2>
              <button onClick={() => setShowNewOrder(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={addOrder} className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Client Name *</label>
                <input value={newOrder.client} onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })} placeholder="Client name" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Service *</label>
                <input value={newOrder.service} onChange={(e) => setNewOrder({ ...newOrder, service: e.target.value })} placeholder="e.g., Logo Design" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1">Amount</label>
                  <input value={newOrder.amount} onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })} placeholder="$199" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Due Date</label>
                  <input value={newOrder.due} onChange={(e) => setNewOrder({ ...newOrder, due: e.target.value })} placeholder="5 days" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">Add Order</button>
                <button type="button" onClick={() => setShowNewOrder(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted text-sm transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <h2 className="font-semibold mb-4">Earnings Overview</h2>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Earnings"]} />
                  <Area type="monotone" dataKey="earnings" stroke="#22C55E" fill="url(#colorEarnings)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {orders.filter(o => o.status !== "completed").map((o) => (
                  <div key={o.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                    <Clock className={cn("w-4 h-4 mt-0.5 flex-shrink-0", o.status === "in-progress" ? "text-primary-500" : "text-warning")} />
                    <div>
                      <p className="text-sm font-semibold">{o.service}</p>
                      <p className="text-xs text-muted-foreground">{o.client} · Due: {o.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search orders..." className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Service</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Amount</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Due</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{o.id}</td>
                    <td className="p-4 font-medium">{o.client}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{o.service}</td>
                    <td className="p-4 font-bold text-success hidden sm:table-cell">{o.amount}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{o.due}</td>
                    <td className="p-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusStyle[o.status])}>{o.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {o.status !== "completed" && (
                          <button onClick={() => completeOrder(o.id)} title="Mark complete" className="p-1.5 rounded-lg bg-success/10 hover:bg-success hover:text-white text-success transition-all">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button onClick={() => deleteOrder(o.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No orders found.</div>
            )}
          </div>
        </div>
      )}

      {/* Portfolio */}
      {activeTab === "portfolio" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">My Portfolio</h2>
            <Link to="/editor" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Add Work
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Minimal Brand System", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop", views: 1240 },
              { title: "Social Media Kit", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop", views: 890 },
              { title: "UI Component Library", img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=300&h=200&fit=crop", views: 2100 },
              { title: "Logo Designs", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop", views: 540 },
              { title: "Poster Collection", img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=300&h=200&fit=crop", views: 760 },
              { title: "Brand Guidelines", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", views: 430 },
            ].map((item, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-border hover-lift hover:border-primary-500/30">
                <div className="relative">
                  <img src={item.img} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => toast.info("Opening editor...")} className="p-2 bg-white rounded-xl hover:bg-primary-500 hover:text-white transition-all">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <p className="text-sm font-semibold truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-warning/10 to-yellow-500/10 border border-warning/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="text-center">
              <p className="font-black text-4xl gradient-text-purple">4.9</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Overall Rating</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5,4,3,2,1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs w-4 text-muted-foreground">{star}</span>
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: `${[85, 10, 5, 0, 0][5 - star]}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{[85, 10, 5, 0, 0][5 - star]}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 hover-lift">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.client} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{r.client}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
