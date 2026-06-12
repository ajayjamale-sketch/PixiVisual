import type { UserRole } from "@/types";

export const DEMO_USERS: Array<{
  role: UserRole;
  label: string;
  description: string;
  color: string;
  dashboard: string;
  name: string;
  email: string;
  avatar: string;
}> = [
  {
    role: "content-creator",
    label: "Content Creator",
    description: "Social media & content",
    color: "from-pink-500 to-rose-500",
    dashboard: "/dashboard/creator",
    name: "Alex Rivera",
    email: "creator@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "business-owner",
    label: "Business Owner",
    description: "Marketing & branding",
    color: "from-blue-500 to-cyan-500",
    dashboard: "/dashboard/business",
    name: "Sarah Chen",
    email: "business@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "designer",
    label: "Designer",
    description: "Portfolio & marketplace",
    color: "from-violet-500 to-purple-500",
    dashboard: "/dashboard/designer",
    name: "Marcus Kim",
    email: "designer@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "agency",
    label: "Agency",
    description: "Client campaigns & projects",
    color: "from-orange-500 to-amber-500",
    dashboard: "/dashboard/agency",
    name: "Jordan Lee",
    email: "agency@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "freelancer",
    label: "Freelancer",
    description: "Orders & client work",
    color: "from-green-500 to-emerald-500",
    dashboard: "/dashboard/freelancer",
    name: "Emma Wilson",
    email: "freelancer@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "enterprise",
    label: "Enterprise",
    description: "Team workspace & assets",
    color: "from-indigo-500 to-blue-600",
    dashboard: "/dashboard/enterprise",
    name: "David Park",
    email: "enterprise@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    role: "admin",
    label: "Admin",
    description: "Platform management",
    color: "from-red-500 to-rose-600",
    dashboard: "/dashboard/admin",
    name: "Taylor Admin",
    email: "admin@pixivisual.ai",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=faces",
  },
];

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for individuals getting started",
    color: "from-gray-500 to-slate-500",
    features: [
      "5 AI Generations/month",
      "10 Projects",
      "Basic Templates",
      "2GB Storage",
      "Export PNG/JPG",
      "Community Support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For creators and freelancers",
    color: "from-violet-500 to-purple-600",
    isPopular: true,
    features: [
      "200 AI Generations/month",
      "Unlimited Projects",
      "Premium Templates",
      "50GB Storage",
      "Export All Formats",
      "Brand Kit",
      "Priority Support",
      "API Access",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    description: "For growing teams and agencies",
    color: "from-pink-500 to-rose-500",
    features: [
      "1000 AI Generations/month",
      "Unlimited Projects",
      "All Templates",
      "200GB Storage",
      "Team Collaboration",
      "Custom Brand Kit",
      "Analytics Dashboard",
      "White Label Export",
      "Dedicated Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 149,
    description: "For large organizations",
    color: "from-blue-500 to-indigo-600",
    features: [
      "Unlimited AI Generations",
      "Unlimited Everything",
      "Custom Templates",
      "1TB Storage",
      "SSO/SAML",
      "Advanced Analytics",
      "SLA Guarantee",
      "Custom Integrations",
      "Dedicated Account Manager",
      "On-premise Option",
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export const TEMPLATE_CATEGORIES = [
  "Social Media",
  "Poster",
  "Logo",
  "Presentation",
  "Ads",
  "Carousel",
  "Email",
  "Banner",
];

export const AI_CAPABILITIES = [
  {
    id: "image",
    title: "AI Image",
    desc: "Generate stunning visuals from text prompts",
    icon: "Image",
    gradient: "from-violet-500 to-purple-600",
    href: "/studio/image",
  },
  {
    id: "poster",
    title: "AI Poster",
    desc: "Create eye-catching posters instantly",
    icon: "Layout",
    gradient: "from-pink-500 to-rose-500",
    href: "/studio/poster",
  },
  {
    id: "banner",
    title: "AI Banner",
    desc: "Design perfect banners for any platform",
    icon: "Layers",
    gradient: "from-blue-500 to-cyan-500",
    href: "/studio/banner",
  },
  {
    id: "ads",
    title: "AI Ads",
    desc: "Generate high-converting ad creatives",
    icon: "Megaphone",
    gradient: "from-orange-500 to-amber-500",
    href: "/studio/ads",
  },
  {
    id: "presentation",
    title: "AI Presentation",
    desc: "Build professional slide decks with AI",
    icon: "Monitor",
    gradient: "from-green-500 to-emerald-500",
    href: "/studio/presentation",
  },
  {
    id: "video",
    title: "AI Video",
    desc: "Create videos from text descriptions",
    icon: "Video",
    gradient: "from-red-500 to-rose-600",
    href: "/studio/video",
  },
  {
    id: "mockup",
    title: "AI Mockups",
    desc: "Generate product mockups instantly",
    icon: "Box",
    gradient: "from-indigo-500 to-violet-500",
    href: "/studio/mockup",
  },
  {
    id: "social",
    title: "AI Social Post",
    desc: "Craft perfect social media content",
    icon: "Share2",
    gradient: "from-teal-500 to-cyan-500",
    href: "/studio/social",
  },
];
