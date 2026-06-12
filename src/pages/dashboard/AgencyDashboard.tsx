import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Briefcase, TrendingUp, CheckCircle, Plus, ArrowRight,
  Edit3, Trash2, X, Search, Eye, BarChart2, Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialClients = [
  { id: 1, name: "Apex Corp", projects: 4, status: "active", budget: "$12,400", avatar: "AC", color: "bg-blue-500", contact: "john@apex.com" },
  { id: 2, name: "TechFlow Inc", projects: 2, status: "active", budget: "$8,200", avatar: "TF", color: "bg-violet-500", contact: "sarah@techflow.com" },
  { id: 3, name: "Bloom Retail", projects: 6, status: "review", budget: "$24,800", avatar: "BR", color: "bg-pink-500", contact: "mike@bloomretail.com" },
  { id: 4, name: "Nova Startup", projects: 1, status: "pending", budget: "$3,600", avatar: "NS", color: "bg-orange-500", contact: "anna@nova.io" },
];

const approvals = [
  { id: 1, project: "Apex — Q3 Campaign", type: "Banner Set", urgency: "high", client: "Apex Corp" },
  { id: 2, project: "TechFlow — Social Pack", type: "Instagram Posts", urgency: "medium", client: "TechFlow Inc" },
  { id: 3, project: "Bloom — Email Template", type: "Email Design", urgency: "low", client: "Bloom Retail" },
  { id: 4, project: "Nova — Logo Final", type: "Brand Identity", urgency: "high", client: "Nova Startup" },
];

const projectData = [
  { week: "W1", completed: 8, inprogress: 12, pending: 5 },
  { week: "W2", completed: 12, inprogress: 10, pending: 3 },
  { week: "W3", completed: 6, inprogress: 14, pending: 7 },
  { week: "W4", completed: 18, inprogress: 8, pending: 2 },
];

const statusStyle: Record<string, string> = {
  active: "bg-success/10 text-success",
  review: "bg-warning/10 text-warning",
  pending: "bg-muted text-muted-foreground",
};

export default function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "approvals" | "performance">("overview");
  const [clients, setClients] = useState(initialClients);
  const [pendingApprovals, setPendingApprovals] = useState(approvals);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Active Clients", value: "34", change: "+5", trend: "up" as const, color: "bg-primary-500" },
    { label: "Live Campaigns", value: "12", change: "+3", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Monthly Revenue", value: "$84K", change: "+18%", trend: "up" as const, color: "bg-success" },
    { label: "Pending Approvals", value: String(pendingApprovals.length), change: String(pendingApprovals.length > 3 ? "-2" : "+1"), trend: "up" as const, color: "bg-warning" },
  ];

  const deleteClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast.success("Client removed");
  };

  const approveItem = (id: number) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
    toast.success("Design approved!");
  };

  const rejectItem = (id: number) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
    toast.info("Revision requested");
  };

  const addClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    const initials = newClientName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const colors = ["bg-blue-500", "bg-violet-500", "bg-pink-500", "bg-orange-500", "bg-green-500"];
    const newC = {
      id: Date.now(), name: newClientName, projects: 0, status: "pending",
      budget: "$0", avatar: initials, color: colors[Math.floor(Math.random() * colors.length)], contact: "",
    };
    setClients((prev) => [newC, ...prev]);
    setNewClientName("");
    setShowAddClient(false);
    toast.success(`Client "${newClientName}" added!`);
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "clients", label: "Clients" },
    { key: "approvals", label: `Approvals${pendingApprovals.length > 0 ? ` (${pendingApprovals.length})` : ""}` },
    { key: "performance", label: "Performance" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Agency Hub</h1>
          <p className="text-muted-foreground mt-1">Manage clients, campaigns, and creative projects</p>
        </div>
        <div className="flex gap-2">
          <Link to="/collaborate" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
            <CheckCircle className="w-4 h-4" /> Approvals
          </Link>
          <button
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-glass-lg animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Add New Client</h2>
              <button onClick={() => setShowAddClient(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={addClient} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g., Apex Corp"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Add Client
                </button>
                <button type="button" onClick={() => setShowAddClient(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted text-sm transition-all">
                  Cancel
                </button>
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
              <h2 className="font-semibold mb-4">Weekly Project Output</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="completed" fill="#22C55E" radius={[4, 4, 0, 0]} stackId="a" name="Completed" />
                  <Bar dataKey="inprogress" fill="#7C3AED" radius={[0, 0, 0, 0]} stackId="a" name="In Progress" />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} stackId="a" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Pending Approvals</h2>
                {pendingApprovals.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">{pendingApprovals.length} items</span>
                )}
              </div>
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p>All caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingApprovals.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", item.urgency === "high" ? "bg-error" : item.urgency === "medium" ? "bg-warning" : "bg-success")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.project}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => approveItem(item.id)} className="p-1 rounded-lg bg-success/10 hover:bg-success hover:text-white text-success transition-all">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => rejectItem(item.id)} className="p-1 rounded-lg bg-error/10 hover:bg-error hover:text-white text-error transition-all">
                          <X className="w-3.5 h-3.5" />
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

      {/* Clients */}
      {activeTab === "clients" && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Projects</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Budget</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0", c.color)}>{c.avatar}</div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          {c.contact && <p className="text-xs text-muted-foreground">{c.contact}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{c.projects} active</td>
                    <td className="p-4 font-semibold hidden md:table-cell">{c.budget}</td>
                    <td className="p-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusStyle[c.status])}>{c.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => toast.info("View client details...")} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteClient(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredClients.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No clients found.</div>
            )}
          </div>
        </div>
      )}

      {/* Approvals */}
      {activeTab === "approvals" && (
        <div className="space-y-3">
          <h2 className="font-semibold">Pending Creative Approvals</h2>
          {pendingApprovals.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="font-semibold">All approvals cleared!</p>
              <p className="text-muted-foreground text-sm mt-1">No pending items.</p>
            </div>
          ) : (
            pendingApprovals.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover-lift">
                <div className={cn("w-3 h-3 rounded-full flex-shrink-0", item.urgency === "high" ? "bg-error" : item.urgency === "medium" ? "bg-warning" : "bg-success")} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{item.project}</p>
                  <p className="text-sm text-muted-foreground">{item.type} · {item.client}</p>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block", item.urgency === "high" ? "bg-error/10 text-error" : item.urgency === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success")}>
                    {item.urgency} priority
                  </span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toast.info("Opening preview...")} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-all">
                    Preview
                  </button>
                  <button onClick={() => approveItem(item.id)} className="px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white font-medium text-sm transition-all">
                    Approve
                  </button>
                  <button onClick={() => rejectItem(item.id)} className="px-3 py-1.5 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white font-medium text-sm transition-all">
                    Revise
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Performance */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Revenue by Week</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[{w:"W1",r:18000},{w:"W2",r:22000},{w:"W3",r:19000},{w:"W4",r:26000}]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="w" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                  <Line type="monotone" dataKey="r" stroke="#7C3AED" strokeWidth={2} dot={{ fill: "#7C3AED" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Client Satisfaction</h2>
              <div className="space-y-3">
                {[
                  { label: "On-time delivery", score: 96 },
                  { label: "Design quality", score: 94 },
                  { label: "Communication", score: 98 },
                  { label: "Revision handling", score: 91 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-semibold">{m.score}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all" style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
