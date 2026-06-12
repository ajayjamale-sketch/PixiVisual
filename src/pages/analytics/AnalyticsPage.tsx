import { BarChart2, TrendingUp, Users, Eye, Download, ArrowUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { SAMPLE_CHART_DATA } from "@/lib/utils";
import { cn } from "@/lib/utils";

const COLORS = ["#7C3AED", "#EC4899", "#2563EB", "#22C55E"];

const topContent = [
  { title: "Summer Sale Poster", views: 24800, eng: "12.4%", type: "Poster", change: "+42%" },
  { title: "Brand Identity Kit", views: 18200, eng: "9.8%", type: "Template", change: "+28%" },
  { title: "Instagram Carousel", views: 14600, eng: "15.2%", type: "Social", change: "+61%" },
  { title: "Product Ad Creative", views: 11400, eng: "7.3%", type: "Ad", change: "+19%" },
];

export default function AnalyticsPage() {
  const kpis = [
    { label: "Total Views", value: "248K", change: "+32%", icon: Eye, color: "text-primary-500", bg: "bg-primary-500/10" },
    { label: "Total Downloads", value: "12.4K", change: "+18%", icon: Download, color: "text-secondary-500", bg: "bg-secondary-500/10" },
    { label: "Engagement Rate", value: "8.4%", change: "+2.1%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
    { label: "Active Users", value: "2,840", change: "+240", icon: Users, color: "text-accent", bg: "bg-accent/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl lg:text-3xl">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track performance, engagement, and creative impact</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{kpi.label}</span>
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", kpi.bg)}>
                  <Icon className={cn("w-4 h-4", kpi.color)} />
                </div>
              </div>
              <p className="text-2xl font-black mb-1">{kpi.value}</p>
              <div className="flex items-center gap-1 text-success text-xs font-medium">
                <ArrowUp className="w-3 h-3" /> {kpi.change} this month
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">Views & Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={SAMPLE_CHART_DATA.weeklyActivity}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="designs" name="Views" stroke="#7C3AED" fill="url(#colorViews)" strokeWidth={2} />
              <Area type="monotone" dataKey="ai" name="Engagements" stroke="#EC4899" fill="none" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SAMPLE_CHART_DATA.trafficSources} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {SAMPLE_CHART_DATA.trafficSources.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
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

      {/* Top Content */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h2 className="font-semibold mb-4">Top Performing Content</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Content</th>
                <th className="pb-3 font-medium text-muted-foreground">Type</th>
                <th className="pb-3 font-medium text-muted-foreground">Views</th>
                <th className="pb-3 font-medium text-muted-foreground">Engagement</th>
                <th className="pb-3 font-medium text-muted-foreground">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((c) => (
                <tr key={c.title} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-500">{c.type}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.views.toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">{c.eng}</td>
                  <td className="py-3 text-success font-medium">{c.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
