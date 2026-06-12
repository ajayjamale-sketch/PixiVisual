import { CheckCircle, AlertCircle, Clock, XCircle, RefreshCw, Activity, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.98%", latency: "12ms" },
  { name: "AI Image Generation", status: "operational", uptime: "99.95%", latency: "890ms" },
  { name: "Graphic Editor", status: "operational", uptime: "99.99%", latency: "45ms" },
  { name: "Authentication (Auth)", status: "operational", uptime: "99.99%", latency: "8ms" },
  { name: "File Storage & CDN", status: "operational", uptime: "99.97%", latency: "28ms" },
  { name: "Marketplace", status: "degraded", uptime: "99.82%", latency: "340ms" },
  { name: "Analytics Pipeline", status: "operational", uptime: "99.90%", latency: "78ms" },
  { name: "Email Notifications", status: "operational", uptime: "99.93%", latency: "95ms" },
];

const incidents = [
  {
    date: "Jun 10, 2026",
    title: "Marketplace Slow Response Times",
    status: "investigating",
    updates: [
      { time: "14:32 UTC", text: "We are investigating increased latency in the Marketplace API. AI Studio and Editor are unaffected." },
      { time: "14:15 UTC", text: "Users may experience slow loading on marketplace pages. Engineering team notified." },
    ],
  },
  {
    date: "Jun 8, 2026",
    title: "AI Generation Queue Delays — Resolved",
    status: "resolved",
    updates: [
      { time: "10:20 UTC", text: "All systems are back to normal. Queue has fully cleared." },
      { time: "09:45 UTC", text: "Fix deployed. Queue processing at normal capacity." },
      { time: "08:30 UTC", text: "Investigating delays in AI generation queue. ETA for fix: 45 minutes." },
    ],
  },
];

const statusConfig = {
  operational: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Operational" },
  degraded: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10", label: "Degraded Performance" },
  outage: { icon: XCircle, color: "text-error", bg: "bg-error/10", label: "Major Outage" },
  maintenance: { icon: Clock, color: "text-accent", bg: "bg-accent/10", label: "Under Maintenance" },
};

const incidentStatusConfig = {
  investigating: { color: "text-warning bg-warning/10", label: "Investigating" },
  resolved: { color: "text-success bg-success/10", label: "Resolved" },
  monitoring: { color: "text-accent bg-accent/10", label: "Monitoring" },
};

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const allOperational = services.every((s) => s.status === "operational");

  const refresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary-500" />
            <span className="font-semibold text-primary-500">PixiVisual Status</span>
          </div>
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${allOperational ? "bg-success/10 border border-success/30" : "bg-warning/10 border border-warning/30"} mb-4`}>
            {allOperational ? (
              <><CheckCircle className="w-6 h-6 text-success" /><span className="font-bold text-success text-lg">All Systems Operational</span></>
            ) : (
              <><AlertCircle className="w-6 h-6 text-warning" /><span className="font-bold text-warning text-lg">Partial Service Disruption</span></>
            )}
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 text-primary-500 hover:underline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="font-heading font-bold text-xl mb-5 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-primary-500" /> Service Status
          </h2>
          <div className="space-y-3">
            {services.map((service) => {
              const config = statusConfig[service.status as keyof typeof statusConfig];
              const Icon = config.icon;
              return (
                <div key={service.name} className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="text-xs text-muted-foreground hidden sm:block">Uptime: <span className="font-semibold text-foreground">{service.uptime}</span></span>
                    <span className="text-xs text-muted-foreground hidden sm:block">Latency: <span className="font-mono">{service.latency}</span></span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 90-Day Uptime */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="font-heading font-bold text-xl mb-4">90-Day Uptime</h2>
          <div className="flex items-end gap-0.5 h-12 mb-2">
            {Array.from({ length: 90 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i === 79 || i === 65 ? "bg-warning/60" : "bg-success/70"}`}
                style={{ height: `${Math.random() * 30 + 70}%` }}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>90 days ago</span>
            <span className="text-success font-semibold">99.96% overall uptime</span>
            <span>Today</span>
          </div>
        </div>

        {/* Incidents */}
        <div>
          <h2 className="font-heading font-bold text-xl mb-5">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident) => {
              const cfg = incidentStatusConfig[incident.status as keyof typeof incidentStatusConfig];
              return (
                <div key={incident.title} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-semibold">{incident.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{incident.date}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color} self-start sm:self-auto`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {incident.updates.map((upd, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="text-xs font-mono text-muted-foreground flex-shrink-0 mt-0.5">{upd.time}</span>
                        <p className="text-muted-foreground">{upd.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Subscribe to status updates at{" "}
          <a href="mailto:status@pixivisual.ai" className="text-primary-500 hover:underline">status@pixivisual.ai</a>
        </p>
      </div>
    </div>
  );
}
