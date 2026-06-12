import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const SAMPLE_CHART_DATA = {
  weeklyActivity: [
    { day: "Mon", designs: 12, ai: 8, exports: 5 },
    { day: "Tue", designs: 18, ai: 14, exports: 9 },
    { day: "Wed", designs: 8, ai: 6, exports: 4 },
    { day: "Thu", designs: 24, ai: 20, exports: 15 },
    { day: "Fri", designs: 32, ai: 28, exports: 18 },
    { day: "Sat", designs: 16, ai: 12, exports: 8 },
    { day: "Sun", designs: 10, ai: 7, exports: 3 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 4200, subscriptions: 38 },
    { month: "Feb", revenue: 5800, subscriptions: 52 },
    { month: "Mar", revenue: 7200, subscriptions: 67 },
    { month: "Apr", revenue: 6100, subscriptions: 55 },
    { month: "May", revenue: 8900, subscriptions: 81 },
    { month: "Jun", revenue: 11200, subscriptions: 98 },
  ],
  trafficSources: [
    { name: "Organic", value: 45 },
    { name: "Social", value: 28 },
    { name: "Referral", value: 15 },
    { name: "Direct", value: 12 },
  ],
};
