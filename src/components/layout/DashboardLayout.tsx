import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import CartDrawer from "@/components/features/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import {
  Sparkles, LayoutDashboard, Image, Layers, Palette, BarChart2,
  Users, Settings, LogOut, Menu, X, Bell, Search, ChevronRight,
  FolderOpen, Share2, MessageSquare, Zap, ShoppingBag,
  Sun, Moon, Wand2, Home, Crown
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { getDashboardPath } from "@/lib/auth";

const sidebarItems = {
  "content-creator": [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/creator" },
    { icon: FolderOpen, label: "Projects", href: "/dashboard/creator" },
    { icon: Wand2, label: "AI Generator", href: "/studio" },
    { icon: Share2, label: "Social Posts", href: "/social" },
    { icon: Layers, label: "Templates", href: "/templates" },
    { icon: Image, label: "Media Library", href: "/dashboard/creator" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/creator" },
  ],
  "business-owner": [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/business" },
    { icon: Palette, label: "Brand Kit", href: "/branding" },
    { icon: Zap, label: "Marketing", href: "/dashboard/business" },
    { icon: FolderOpen, label: "Campaigns", href: "/dashboard/business" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Teams", href: "/dashboard/business" },
    { icon: Settings, label: "Settings", href: "/dashboard/business" },
  ],
  designer: [
    { icon: LayoutDashboard, label: "Portfolio", href: "/dashboard/designer" },
    { icon: Layers, label: "Templates", href: "/templates" },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
    { icon: FolderOpen, label: "Projects", href: "/dashboard/designer" },
    { icon: Users, label: "Clients", href: "/dashboard/designer" },
    { icon: BarChart2, label: "Revenue", href: "/analytics" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/designer" },
    { icon: Settings, label: "Settings", href: "/dashboard/designer" },
  ],
  agency: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/agency" },
    { icon: Users, label: "Clients", href: "/dashboard/agency" },
    { icon: Zap, label: "Campaigns", href: "/dashboard/agency" },
    { icon: FolderOpen, label: "Projects", href: "/dashboard/agency" },
    { icon: Image, label: "Creative Hub", href: "/studio" },
    { icon: BarChart2, label: "Performance", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/agency" },
  ],
  freelancer: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/freelancer" },
    { icon: FolderOpen, label: "Projects", href: "/dashboard/freelancer" },
    { icon: Layers, label: "Portfolio", href: "/dashboard/freelancer" },
    { icon: ShoppingBag, label: "Orders", href: "/dashboard/freelancer" },
    { icon: Users, label: "Clients", href: "/dashboard/freelancer" },
    { icon: BarChart2, label: "Payments", href: "/dashboard/freelancer" },
    { icon: Settings, label: "Settings", href: "/dashboard/freelancer" },
  ],
  enterprise: [
    { icon: LayoutDashboard, label: "Workspace", href: "/dashboard/enterprise" },
    { icon: Users, label: "Departments", href: "/dashboard/enterprise" },
    { icon: Palette, label: "Brand Assets", href: "/branding" },
    { icon: Wand2, label: "AI Studio", href: "/studio" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: MessageSquare, label: "Approvals", href: "/collaborate" },
    { icon: Settings, label: "Settings", href: "/dashboard/enterprise" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/admin" },
    { icon: Users, label: "Users", href: "/dashboard/admin" },
    { icon: Crown, label: "Subscriptions", href: "/dashboard/admin" },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
    { icon: BarChart2, label: "Revenue", href: "/analytics" },
    { icon: Settings, label: "System", href: "/dashboard/admin" },
  ],
};

function isNavActive(href: string, pathname: string) {
  if (href === pathname) return true;
  if (href !== "/" && href.length > 1 && pathname.startsWith(href + "/")) return true;
  return false;
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { count: cartCount, openCart } = useCartStore(); // cartCount is a number property
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const role = user.role as keyof typeof sidebarItems;
  const items = sidebarItems[role] || sidebarItems["content-creator"];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border transition-all duration-300 bg-card",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          {isSidebarOpen ? (
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:shadow-glow transition-all">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg gradient-text-purple">PixiVisual</span>
            </Link>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-all"
              title="Collapse sidebar"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          )}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-16 top-3 w-5 h-5 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-all shadow-sm"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = isNavActive(item.href, location.pathname);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-0.5"
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Quick Action */}
        {isSidebarOpen && (
          <div className="p-3 border-t border-border">
            <Link
              to="/studio"
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>AI Studio</span>
            </Link>
          </div>
        )}

        {/* User Profile */}
        <div className={cn("p-3 border-t border-border", !isSidebarOpen && "flex flex-col items-center gap-2")}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-all group">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7C3AED&color=fff`}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role.replace("-", " ")}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-500 transition-all"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-red-500 transition-all"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-card border-r border-border flex flex-col shadow-glass-lg">
            <div className="p-4 border-b border-border flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg gradient-text-purple">PixiVisual</span>
              </Link>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = isNavActive(item.href, location.pathname);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-0.5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-border">
              <Link to="/studio" onClick={() => setIsMobileSidebarOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover-glow">
                <Wand2 className="w-4 h-4" /> AI Studio
              </Link>
            </div>
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search designs, templates..."
                className="w-64 lg:w-80 pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              title="Homepage"
            >
              <Home className="w-4 h-4" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              title="Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-all"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-all relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-2xl shadow-glass-lg p-3 z-50 animate-fade-in-up">
                  <p className="font-semibold text-sm mb-3 px-1">Notifications</p>
                  {[
                    { text: "Your design was approved", time: "2m ago", color: "bg-green-500" },
                    { text: "New template available", time: "1h ago", color: "bg-primary-500" },
                    { text: "AI generation complete", time: "3h ago", color: "bg-secondary-500" },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted cursor-pointer transition-all"
                      onClick={() => setNotifOpen(false)}
                    >
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", n.color)} />
                      <div>
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="w-full text-xs text-center text-primary-500 hover:underline py-1" onClick={() => setNotifOpen(false)}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => { setNotifOpen(false); navigate(getDashboardPath(user.role)); }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-all"
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7C3AED&color=fff`}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="hidden md:block text-sm font-medium max-w-[100px] truncate">{user.name}</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <CartDrawer />
    </div>
  );
}
