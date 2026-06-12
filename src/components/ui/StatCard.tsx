import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}

export default function StatCard({ label, value, change, trend, color }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 hover-lift hover:border-primary-500/20 transition-all group cursor-default">
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-xs text-muted-foreground font-medium leading-tight">{label}</p>
        <div className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-0.5", color)} />
      </div>
      <p className="font-heading font-black text-xl lg:text-2xl mb-2 truncate">{value}</p>
      <div className={cn("flex items-center gap-1 text-xs font-semibold", trend === "up" ? "text-success" : "text-error")}>
        {trend === "up" ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span>{change}</span>
        <span className="text-muted-foreground font-normal">vs last month</span>
      </div>
    </div>
  );
}
