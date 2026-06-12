import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building, Users, Shield, BarChart2, Cpu, Lock, Plus,
  Trash2, Edit3, Search, Settings, TrendingUp, X, CheckCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialDepartments = [
  { id: 1, name: "Marketing", members: 24, assets: 1240, usage: 89, color: "bg-primary-500" },
  { id: 2, name: "Product", members: 18, assets: 876, usage: 72, color: "bg-secondary-500" },
  { id: 3, name: "Sales", members: 32, assets: 540, usage: 61, color: "bg-accent" },
  { id: 4, name: "HR", members: 8, assets: 280, usage: 45, color: "bg-success" },
];

const usageData = [
  { month: "Jan", users: 45, designs: 1200, ai: 800 },
  { month: "Feb", users: 52, designs: 1600, ai: 1100 },
  { month: "Mar", users: 61, designs: 2100, ai: 1500 },
  { month: "Apr", users: 58, designs: 1900, ai: 1300 },
  { month: "May", users: 74, designs: 2800, ai: 2100 },
  { month: "Jun", users: 89, designs: 3400, ai: 2600 },
];

const securitySettings = [
  { id: "sso", label: "SSO Enabled", status: true, locked: true },
  { id: "2fa", label: "2FA Enforced", status: true, locked: false },
  { id: "audit", label: "Audit Logs", status: true, locked: false },
  { id: "ipallow", label: "IP Allowlist", status: false, locked: false },
  { id: "residency", label: "Data Residency", status: true, locked: false },
];

export default function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "departments" | "security" | "analytics">("overview");
  const [departments, setDepartments] = useState(initialDepartments);
  const [security, setSecurity] = useState(securitySettings);
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingDept, setEditingDept] = useState<typeof initialDepartments[0] | null>(null);

  const stats = [
    { label: "Total Users", value: "247", change: "+34", trend: "up" as const, color: "bg-primary-500" },
    { label: "Brand Assets", value: "12.4K", change: "+890", trend: "up" as const, color: "bg-secondary-500" },
    { label: "AI Generations", value: "48.2K", change: "+210%", trend: "up" as const, color: "bg-accent" },
    { label: "Storage Used", value: "186GB", change: "+12GB", trend: "up" as const, color: "bg-warning" },
  ];

  const deleteDept = (id: number) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    toast.success("Department removed");
  };

  const toggleSecurity = (id: string) => {
    setSecurity((prev) => prev.map((s) => s.id === id && !s.locked ? { ...s, status: !s.status } : s));
    toast.success("Security setting updated");
  };

  const addDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    const colors = ["bg-primary-500", "bg-secondary-500", "bg-accent", "bg-success", "bg-warning"];
    const newD = {
      id: Date.now(), name: newDeptName, members: 0, assets: 0, usage: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setDepartments((prev) => [...prev, newD]);
    setNewDeptName("");
    setShowAddDept(false);
    toast.success(`Department "${newDeptName}" created!`);
  };

  const saveDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    setDepartments((prev) => prev.map((d) => d.id === editingDept.id ? editingDept : d));
    setEditingDept(null);
    toast.success("Department settings updated!");
  };

  const downloadEnterpriseReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Department ID,Department Name,Members,Assets Count,Usage %,Quota (GB)\n";
    departments.forEach(d => {
      csvContent += `${d.id},"${d.name}",${d.members},${d.assets},${d.usage}%,${Math.round(d.usage * 1.86)}GB\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "enterprise_department_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Enterprise report downloaded!");
  };

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "departments", label: "Departments" },
    { key: "security", label: "Security" },
    { key: "analytics", label: "Analytics" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Enterprise Workspace</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's creative operations</p>
        </div>
        <div className="flex gap-2">
          <Link to="/branding" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
            <Shield className="w-4 h-4" /> Brand Assets
          </Link>
          <button
            onClick={() => setShowAddDept(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Add Department
          </button>
        </div>
      </div>

      {/* Add Department Modal */}
      {showAddDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-glass-lg animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Add Department</h2>
              <button onClick={() => setShowAddDept(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={addDepartment} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Department Name</label>
                <input
                  type="text"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g., Design Team"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Create
                </button>
                <button type="button" onClick={() => setShowAddDept(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted text-sm transition-all">
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
              <h2 className="font-semibold mb-4">Platform Usage Trends</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="designs" stroke="#7C3AED" strokeWidth={2} dot={false} name="Designs" />
                  <Line type="monotone" dataKey="ai" stroke="#EC4899" strokeWidth={2} dot={false} name="AI Gens" />
                  <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} dot={false} name="Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Security Status</h2>
              <div className="space-y-3">
                {security.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer", item.status ? "bg-success/10 text-success" : "bg-muted-foreground/20 text-muted-foreground")} onClick={() => toggleSecurity(item.id)}>
                      {item.status ? "active" : "inactive"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Departments Overview</h2>
              <button onClick={() => setActiveTab("departments")} className="text-xs text-primary-500 hover:underline">Manage All</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="p-4 rounded-2xl border border-border hover-lift hover:border-primary-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{dept.name}</span>
                    <div className={cn("w-3 h-3 rounded-full", dept.color)} />
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{dept.members} members</p>
                    <p>{dept.assets.toLocaleString()} assets</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="font-medium">{dept.usage}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", dept.color)} style={{ width: `${dept.usage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Departments */}
      {activeTab === "departments" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search departments..." className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepts.map((dept) => (
              <div key={dept.id} className="bg-card border border-border rounded-2xl p-5 hover-lift hover:border-primary-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", dept.color)}>
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{dept.name}</h3>
                      <p className="text-xs text-muted-foreground">{dept.members} members</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditingDept(dept)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteDept(dept.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-muted rounded-xl p-2.5 text-center">
                    <p className="font-bold">{dept.assets.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Assets</p>
                  </div>
                  <div className="bg-muted rounded-xl p-2.5 text-center">
                    <p className="font-bold">{dept.usage}%</p>
                    <p className="text-xs text-muted-foreground">Quota Used</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", dept.color)} style={{ width: `${dept.usage}%` }} />
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowAddDept(true)}
              className="flex flex-col items-center justify-center h-48 rounded-2xl border-2 border-dashed border-border hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group"
            >
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary-500 transition-colors" />
              <p className="text-sm text-muted-foreground group-hover:text-primary-500 mt-2 transition-colors">Add Department</p>
            </button>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" /> Security Settings
            </h2>
            <div className="space-y-3">
              {security.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      {item.locked && <p className="text-xs text-muted-foreground">Required by enterprise plan</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-xs font-medium", item.status ? "text-success" : "text-muted-foreground")}>
                      {item.status ? "Enabled" : "Disabled"}
                    </span>
                    <button
                      onClick={() => toggleSecurity(item.id)}
                      disabled={item.locked}
                      className={cn("w-11 h-6 rounded-full transition-all relative disabled:opacity-50 disabled:cursor-not-allowed", item.status ? "bg-success" : "bg-muted")}
                    >
                      <span className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all", item.status ? "right-0.5" : "left-0.5")} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-success/5 border border-success/20 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Your enterprise workspace meets <span className="text-success font-medium">SOC 2 Type II</span> and <span className="text-success font-medium">ISO 27001</span> compliance requirements.</p>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Monthly Design Output</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="designs" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Designs" />
                  <Bar dataKey="ai" fill="#EC4899" radius={[6, 6, 0, 0]} name="AI Gens" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4">Storage Usage by Department</h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-muted-foreground">{Math.round(dept.usage * 1.86)}GB / 186GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", dept.color)} style={{ width: `${dept.usage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={downloadEnterpriseReport} className="px-5 py-2.5 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
              Export Analytics Report
            </button>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {editingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditingDept(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl mb-4">Edit Department</h2>
            <form onSubmit={saveDepartment} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Department Name</label>
                <input
                  type="text"
                  value={editingDept.name}
                  onChange={(e) => setEditingDept(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Members Count</label>
                <input
                  type="number"
                  value={editingDept.members}
                  onChange={(e) => setEditingDept(prev => prev ? ({ ...prev, members: parseInt(e.target.value) || 0 }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Quota Usage (%)</label>
                <input
                  type="number"
                  max="100"
                  min="0"
                  value={editingDept.usage}
                  onChange={(e) => setEditingDept(prev => prev ? ({ ...prev, usage: parseInt(e.target.value) || 0 }) : null)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingDept(null)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted font-medium text-sm transition-all">
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
