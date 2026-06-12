export type UserRole =
  | "content-creator"
  | "business-owner"
  | "designer"
  | "agency"
  | "freelancer"
  | "enterprise"
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  plan: "free" | "pro" | "business" | "enterprise";
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  isPremium: boolean;
  tags: string[];
  downloads: number;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
  type: string;
  status: "draft" | "published" | "archived";
}

export interface AIGeneration {
  id: string;
  prompt: string;
  result: string;
  type: "image" | "poster" | "banner" | "logo";
  createdAt: string;
  isFavorite: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  rating: number;
  sales: number;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface DashboardStats {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}
