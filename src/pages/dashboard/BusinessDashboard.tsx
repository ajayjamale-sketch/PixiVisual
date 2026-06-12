import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette, TrendingUp, Users, BarChart2, Megaphone, Plus,
  ArrowRight, DollarSign, Edit3, Trash2, Eye, Target, Star, X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { SAMPLE_CHART_DATA } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const initialCampaigns = [
  { id: 1, name: "Summer Sale 2026", status: "active", reach: "124K", conversion: "3.2%", budget: "$4,200", startDate: "Jun 1", endDate: "Jul 31" },
  { id: 2, name: "Brand Refresh Q2", status: "draft", reach: "—", conversion: "—", budget: "$8,000", startDate: "Jul 15", endDate: "Sep 30" },
  { id: 3, name: "Product Launch", status: "scheduled", reach: "—", conversion: "—", budget: "$12,000", startDate: "Aug 1", endDate: "Aug 31" },
  { id: 4, name: "Holiday Campaign", status: "completed", reach: "320K", conversion: "5.8%", budget: "$6,500", startDate: "Dec 1", endDate: "Jan 15" },
];

const teamMembers = [
  { name: "Sarah Chen", role: "Marketing Lead", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=faces", designs: 48 },
  { name: "James Miller", role: "Content Creator", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces", designs: 31 },
  { name: "Lisa Park", role: "Brand Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces", designs: 62 },
];

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-warning/10 text-warning",
  completed: "bg-primary-500/10 text-primary-500",
};

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "team" | "reports">("overview");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState("");
  
  const [editingCampaign, setEditingCampaign] = useState<typeof initialCampaigns[0] | null>(null);
  
  const [teamList, setTeamList] = useState(teamMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Marketing Analyst");

  const stats = [
    { label: "Brand Score", value: "94/100", change: "+8pts", trend: "up" as const, color: "bg-primary-500" },
    { label: "Campaign Reach", value: "1.2M", change: "+24%", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Active Assets", value: "1,847", change: "+156", trend: "up" as const, color: "bg-accent" },
    { label: "Team Members", value: "24", change: "+3", trend: "up" as const, color: "bg-success" },
  ];

  const deleteCampaign = (id: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.success("Campaign deleted");
  };

  const launchCampaign = (id: number) => {
    setCampaigns((prev) => prev.map((c) => c.id === id ? { ...c, status: "active" } : c));
    toast.success("Campaign launched!");
  };

  const addCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    const newC = {
      id: Date.now(), name: newCampaignName, status: "draft",
      reach: "—", conversion: "—", budget: "$0", startDate: "TBD", endDate: "TBD",
    };
    setCampaigns((prev) => [newC, ...prev]);
    setNewCampaignName("");
    setShowNewCampaign(false);
    toast.success("Campaign created!");
  };

  const saveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    setCampaigns((prev) => prev.map((c) => c.id === editingCampaign.id ? editingCampaign : c));
    setEditingCampaign(null);
    toast.success("Campaign updated!");
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;
    const newMember = {
      name: inviteName,
      role: inviteRole,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces`,
      designs: 0
    };
    setTeamList((prev) => [newMember, ...prev]);
    setInviteName("");
    setShowInviteModal(false);
    toast.success(`Invitation sent to ${inviteName}!`);
  };

  const downloadReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Campaign Name,Status,Reach,Conversion,Budget,Start Date,End Date\n";
    campaigns.forEach(c => {
      csvContent += `${c.id},"${c.name}",${c.status},"${c.reach}","${c.conversion}","${c.budget}",${c.startDate},${c.endDate}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Campaign report downloaded!");
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "campaigns", label: "Campaigns" },
    { key: "team", label: "Team" },
    { key: "reports", label: "Reports" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Business Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your brand, campaigns, and marketing assets</p>
        </div>
        <div className="flex gap-2">
          <Link to="/branding" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
            <Palette className="w-4 h-4" /> Brand Kit
          </Link>
          <button
            onClick={() => setShowNewCampaign(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up">
            <h2 className="font-heading font-bold text-xl mb-4">Create New Campaign</h2>
            <form onSubmit={addCampaign} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sale 2026"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Create Campaign
                </button>
                <button type="button" onClick={() => setShowNewCampaign(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted font-medium text-sm transition-all">
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
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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
              <h2 className="font-semibold mb-4">Monthly Revenue Impact</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={SAMPLE_CHART_DATA.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Create Brand Kit", icon: Palette, href: "/branding", color: "text-violet-500 bg-violet-500/10" },
                  { label: "Launch Campaign", icon: Megaphone, href: "/studio", color: "text-pink-500 bg-pink-500/10" },
                  { label: "View Analytics", icon: BarChart2, href: "/analytics", color: "text-blue-500 bg-blue-500/10" },
                  { label: "Manage Team", icon: Users, href: "#", color: "text-green-500 bg-green-500/10" },
                  { label: "Billing & Plans", icon: DollarSign, href: "/pricing", color: "text-orange-500 bg-orange-500/10" },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link key={a.label} to={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all group">
                      <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium flex-1">{a.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns */}
      {activeTab === "campaigns" && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">All Campaigns ({campaigns.length})</h2>
            <button onClick={() => setShowNewCampaign(true)} className="flex items-center gap-1.5 text-xs text-primary-500 hover:underline">
              <Plus className="w-3 h-3" /> New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Campaign</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground hidden md:table-cell">Reach</th>
                  <th className="pb-3 font-medium text-muted-foreground hidden md:table-cell">Conversion</th>
                  <th className="pb-3 font-medium text-muted-foreground hidden lg:table-cell">Budget</th>
                  <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">{c.name}</td>
                    <td className="py-3">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[c.status])}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground hidden md:table-cell">{c.reach}</td>
                    <td className="py-3 text-muted-foreground hidden md:table-cell">{c.conversion}</td>
                    <td className="py-3 font-semibold hidden lg:table-cell">{c.budget}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        {c.status === "draft" && (
                          <button onClick={() => launchCampaign(c.id)} className="text-xs px-2.5 py-1 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white transition-all font-medium">
                            Launch
                          </button>
                        )}
                        <button onClick={() => setEditingCampaign(c)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteCampaign(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Team */}
      {activeTab === "team" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Team Members ({teamList.length})</h2>
            <button onClick={() => setShowInviteModal(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-semibold hover-glow transition-all">
              <Plus className="w-4 h-4" /> Invite Member
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamList.map((m, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover-lift">
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                  <p className="text-xs text-primary-500 mt-0.5">{m.designs} designs</p>
                </div>
                <button onClick={() => toast.success(`Viewing profile of ${m.name}`)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={SAMPLE_CHART_DATA.monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Campaign Performance</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={SAMPLE_CHART_DATA.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="subscriptions" stroke="#EC4899" strokeWidth={2} dot={false} name="Leads" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={downloadReport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
              Download Full Report
            </button>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditingCampaign(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl mb-4">Edit Campaign</h2>
            <form onSubmit={saveCampaign} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  value={editingCampaign.name}
                  onChange={(e) => setEditingCampaign(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Budget</label>
                <input
                  type="text"
                  value={editingCampaign.budget}
                  onChange={(e) => setEditingCampaign(prev => prev ? ({ ...prev, budget: e.target.value }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Start Date</label>
                  <input
                    type="text"
                    value={editingCampaign.startDate}
                    onChange={(e) => setEditingCampaign(prev => prev ? ({ ...prev, startDate: e.target.value }) : null)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">End Date</label>
                  <input
                    type="text"
                    value={editingCampaign.endDate}
                    onChange={(e) => setEditingCampaign(prev => prev ? ({ ...prev, endDate: e.target.value }) : null)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Status</label>
                <select
                  value={editingCampaign.status}
                  onChange={(e) => setEditingCampaign(prev => prev ? ({ ...prev, status: e.target.value }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingCampaign(null)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted font-medium text-sm transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl mb-4">Invite Team Member</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Marketing Lead">Marketing Lead</option>
                  <option value="Brand Designer">Brand Designer</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Marketing Analyst">Marketing Analyst</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Send Invitation
                </button>
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted font-medium text-sm transition-all">
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
