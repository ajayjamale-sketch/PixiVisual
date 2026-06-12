import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus, Image, Share2, TrendingUp, Eye, Wand2, Calendar,
  ArrowRight, BarChart2, Trash2, Edit3, Download, Clock,
  CheckCircle, Play, Star, Filter, Search, Grid, List, X
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import StatCard from "@/components/ui/StatCard";
import { SAMPLE_CHART_DATA } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const recentProjects = [
  { id: 1, title: "Summer Campaign Post", type: "Social Media", thumb: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop", status: "published", views: 12400, date: "2 days ago" },
  { id: 2, title: "YouTube Thumbnail", type: "Thumbnail", thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop", status: "draft", views: 0, date: "3 days ago" },
  { id: 3, title: "Instagram Story Set", type: "Story", thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop", status: "published", views: 8900, date: "5 days ago" },
  { id: 4, title: "Brand Announcement", type: "Poster", thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", status: "draft", views: 0, date: "1 week ago" },
  { id: 5, title: "Product Launch Banner", type: "Banner", thumb: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop", status: "published", views: 5600, date: "1 week ago" },
  { id: 6, title: "LinkedIn Header", type: "LinkedIn", thumb: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=200&fit=crop", status: "draft", views: 0, date: "2 weeks ago" },
];

const calendarItems = [
  { day: "Mon", task: "Instagram Post", time: "10:00 AM", done: true },
  { day: "Tue", task: "YouTube Thumbnail", time: "2:00 PM", done: true },
  { day: "Wed", task: "Twitter Banner", time: "11:00 AM", done: false },
  { day: "Thu", task: "Facebook Ad", time: "3:00 PM", done: false },
  { day: "Fri", task: "Newsletter Header", time: "9:00 AM", done: false },
];

const COLORS = ["#7C3AED", "#EC4899", "#2563EB", "#22C55E"];

export default function ContentCreatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "calendar" | "analytics">("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [projects, setProjects] = useState(recentProjects);
  const [calendarTasks, setCalendarTasks] = useState(calendarItems);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newCalendarTask, setNewCalendarTask] = useState({ day: "Mon", task: "", time: "12:00 PM" });

  const stats = [
    { label: "Total Designs", value: "248", change: "+18%", trend: "up" as const, color: "bg-primary-500" },
    { label: "Total Views", value: "124K", change: "+32%", trend: "up" as const, color: "bg-secondary-500" },
    { label: "Engagement Rate", value: "8.4%", change: "+2.1%", trend: "up" as const, color: "bg-accent" },
    { label: "AI Generations", value: "892", change: "+45%", trend: "up" as const, color: "bg-success" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const publishProject = (id: number) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status: "published" } : p));
    toast.success("Project published!");
  };

  const handleEditProject = (project: typeof recentProjects[0]) => {
    navigate("/editor", {
      state: {
        backgroundImage: project.thumb,
        title: project.title
      }
    });
    toast.success(`Loaded project "${project.title}" in editor!`);
  };

  const handleDownloadProject = (project: typeof recentProjects[0]) => {
    const link = document.createElement("a");
    link.href = project.thumb;
    link.download = `${project.title.toLowerCase().replace(/\s/g, "-")}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Started download of "${project.title}"!`);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCalendarTask.task.trim()) {
      toast.error("Please enter a task description");
      return;
    }
    const newTask = {
      day: newCalendarTask.day,
      task: newCalendarTask.task,
      time: newCalendarTask.time,
      done: false
    };
    setCalendarTasks(prev => [...prev, newTask]);
    setNewCalendarTask({ day: "Mon", task: "", time: "12:00 PM" });
    setShowTaskModal(false);
    toast.success("Task scheduled on calendar!");
  };

  const toggleTaskDone = (taskText: string) => {
    setCalendarTasks(prev => prev.map(t => t.task === taskText ? { ...t, done: !t.done } : t));
    const task = calendarTasks.find(t => t.task === taskText);
    toast.success(task?.done ? "Marked as scheduled" : "Marked as completed!");
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects" },
    { key: "calendar", label: "Content Calendar" },
    { key: "analytics", label: "Analytics" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your content today</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/studio" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all">
            <Wand2 className="w-4 h-4" /> AI Create
          </Link>
          <Link to="/editor" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-all">
            <Plus className="w-4 h-4" /> New Design
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all", activeTab === tab.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-base">Weekly Activity</h2>
                  <p className="text-xs text-muted-foreground">Designs, AI generations & exports</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-500" />Designs</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary-500" />AI</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={SAMPLE_CHART_DATA.weeklyActivity}>
                  <defs>
                    <linearGradient id="colorDesigns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="designs" stroke="#7C3AED" fill="url(#colorDesigns)" strokeWidth={2} />
                  <Area type="monotone" dataKey="ai" stroke="#EC4899" fill="url(#colorAi)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold text-base mb-1">Content Mix</h2>
              <p className="text-xs text-muted-foreground mb-3">Distribution by type</p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={SAMPLE_CHART_DATA.trafficSources} innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {SAMPLE_CHART_DATA.trafficSources.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {SAMPLE_CHART_DATA.trafficSources.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                      <span className="text-muted-foreground text-xs">{item.name}</span>
                    </div>
                    <span className="font-semibold text-xs">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base">Recent Projects</h2>
              <button onClick={() => setActiveTab("projects")} className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="group rounded-xl overflow-hidden border border-border hover:border-primary-500/30 hover-lift transition-all cursor-pointer">
                  <div className="relative">
                    <img src={project.thumb} alt={project.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className={cn("absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium", project.status === "published" ? "bg-success/20 text-success" : "bg-black/50 text-white")}>
                      {project.status}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-5">
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-primary-500" /> AI Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Instagram Post", icon: Image, href: "/studio/image", color: "from-violet-500 to-purple-600" },
                { label: "YouTube Thumb", icon: Play, href: "/studio/image", color: "from-red-500 to-rose-600" },
                { label: "Story Template", icon: Share2, href: "/social", color: "from-pink-500 to-rose-500" },
                { label: "Content Calendar", icon: Calendar, href: "/dashboard/creator", color: "from-green-500 to-emerald-500" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} to={action.href} className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border hover:border-primary-500/30 hover-lift transition-all">
                    <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0", action.color)}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
                className="px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button onClick={() => setViewMode("grid")} className={cn("p-2.5 rounded-xl border transition-all", viewMode === "grid" ? "border-primary-500 bg-primary-500/10 text-primary-500" : "border-border hover:bg-muted")}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={cn("p-2.5 rounded-xl border transition-all", viewMode === "list" ? "border-primary-500 bg-primary-500/10 text-primary-500" : "border-border hover:bg-muted")}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group rounded-2xl overflow-hidden border border-border hover:border-primary-500/30 hover-lift bg-card">
                  <div className="relative">
                    <img src={project.thumb} alt={project.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className={cn("absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium", project.status === "published" ? "bg-success/80 text-white" : "bg-black/60 text-white")}>
                      {project.status}
                    </span>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <button onClick={() => handleEditProject(project)} className="p-1.5 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Edit3 className="w-3 h-3 text-gray-700" />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-1.5 bg-white/90 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.type} · {project.date}</p>
                    {project.views > 0 && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {project.views.toLocaleString()} views
                      </p>
                    )}
                    {project.status === "draft" && (
                      <button onClick={() => publishProject(project.id)} className="mt-2 w-full text-xs py-1.5 rounded-lg bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-all font-medium">
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/editor" className="flex flex-col items-center justify-center h-48 rounded-2xl border-2 border-dashed border-border hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary-500 transition-colors" />
                <p className="text-sm text-muted-foreground group-hover:text-primary-500 mt-2 transition-colors">New Design</p>
              </Link>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Project</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Type</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Views</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={project.thumb} alt={project.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <span className="font-medium">{project.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{project.type}</td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", project.status === "published" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                          {project.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{project.views > 0 ? project.views.toLocaleString() : "—"}</td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell text-xs">{project.date}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditProject(project)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDownloadProject(project)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteProject(project.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProjects.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No projects found matching your search.</p>
                  <button onClick={() => { setSearchQuery(""); setFilterStatus("all"); }} className="mt-2 text-primary-500 hover:underline text-sm">Clear filters</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Content Calendar — This Week</h2>
            <button onClick={() => setShowTaskModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-semibold hover-glow transition-all">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
          <div className="grid gap-3">
            {calendarTasks.map((item, idx) => (
              <div key={idx} className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-all hover-lift", item.done ? "border-success/30 bg-success/5" : "border-border bg-card hover:border-primary-500/30")}>
                <div className="w-12 text-center flex-shrink-0">
                  <p className="text-xs text-muted-foreground">{item.day}</p>
                  <p className="text-sm font-mono font-semibold">{item.time.split(" ")[0]}</p>
                  <p className="text-xs text-muted-foreground">{item.time.split(" ")[1]}</p>
                </div>
                <div className="flex-1">
                  <p className={cn("font-semibold text-sm", item.done && "line-through text-muted-foreground")}>{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.done ? "Completed" : "Scheduled"}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!item.done && (
                    <Link to="/editor" className="px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-medium hover:bg-primary-500 hover:text-white transition-all">
                      Create
                    </Link>
                  )}
                  <button
                    onClick={() => toggleTaskDone(item.task)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-success"
                    title={item.done ? "Mark as active" : "Mark as completed"}
                  >
                    {item.done ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border hover:border-success transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowTaskModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading font-bold text-lg mb-4">Add Calendar Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Day of the Week</label>
                <select
                  value={newCalendarTask.day}
                  onChange={(e) => setNewCalendarTask(prev => ({ ...prev, day: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Task Description</label>
                <input
                  type="text"
                  placeholder="e.g. Instagram Video post"
                  value={newCalendarTask.task}
                  onChange={(e) => setNewCalendarTask(prev => ({ ...prev, task: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Time</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM"
                  value={newCalendarTask.time}
                  onChange={(e) => setNewCalendarTask(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-500 text-white font-semibold text-sm hover-glow transition-all"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Impressions", value: "2.4M", change: "+28%" },
              { label: "Click-through Rate", value: "4.2%", change: "+0.8%" },
              { label: "Saves & Shares", value: "18.4K", change: "+42%" },
              { label: "Profile Visits", value: "92K", change: "+15%" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-4 hover-lift">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="font-heading font-black text-2xl">{s.value}</p>
                <p className="text-xs text-success mt-1">{s.change} this month</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Performance Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={SAMPLE_CHART_DATA.weeklyActivity}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="designs" stroke="#7C3AED" fill="url(#perfGrad)" strokeWidth={2} name="Designs" />
                <Area type="monotone" dataKey="exports" stroke="#EC4899" strokeWidth={2} fill="none" name="Exports" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
