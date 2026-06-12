import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sun, Moon, Bell, ChevronDown, Menu, X, Sparkles,
  LogOut, User, Settings, LayoutDashboard, ShoppingCart
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { getDashboardPath } from "@/lib/auth";

const megaMenuFeatures = [
  { label: "AI Image Generator", desc: "Text to image", href: "/studio/image", color: "text-violet-500", dot: "bg-violet-500" },
  { label: "AI Poster Maker", desc: "Instant posters", href: "/studio/poster", color: "text-pink-500", dot: "bg-pink-500" },
  { label: "Brand Kit Builder", desc: "Cohesive branding", href: "/branding", color: "text-blue-500", dot: "bg-blue-500" },
  { label: "Graphic Editor", desc: "Full canvas editor", href: "/editor", color: "text-orange-500", dot: "bg-orange-500" },
  { label: "Social Creator", desc: "Platform templates", href: "/social", color: "text-green-500", dot: "bg-green-500" },
  { label: "Analytics Hub", desc: "Performance insights", href: "/analytics", color: "text-red-500", dot: "bg-red-500" },
];

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const { count, openCart } = useCartStore(); // count is a number property
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Is this the landing page? (hero has dark bg)
  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMega(null);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close menus on outside click
  useEffect(() => {
    const handler = () => { setUserMenuOpen(false); setActiveMega(null); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  // On the landing page (dark hero bg), show white text when NOT scrolled
  // On all other pages OR when scrolled, show standard foreground text
  const isTransparentDark = isHeroPage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHeroPage
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow group-hover:shadow-glow transition-all">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text-purple">PixiVisual</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.label === "Features" ? setActiveMega("features") : setActiveMega(null)}
                onMouseLeave={() => setActiveMega(null)}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                    location.pathname === link.href
                      ? "text-primary-500 bg-primary-500/10"
                      : isTransparentDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-foreground hover:text-primary-500 hover:bg-muted"
                  )}
                >
                  {link.label}
                  {link.label === "Features" && (
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "features" && "rotate-180")} />
                  )}
                </Link>

                {/* Mega Menu */}
                {link.label === "Features" && activeMega === "features" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-popover border border-border rounded-2xl shadow-glass-lg p-4 grid grid-cols-2 gap-2 z-50 animate-fade-in-up">
                    {megaMenuFeatures.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-all group"
                      >
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", item.dot)} />
                        <div>
                          <p className={cn("text-sm font-semibold", item.color)}>{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-border">
                      <Link
                        to="/features"
                        className="text-xs text-primary-500 hover:underline flex items-center gap-1 font-medium"
                      >
                        See all features <ChevronDown className="w-3 h-3 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-all",
                isTransparentDark ? "text-white/80 hover:text-white hover:bg-white/10" : "hover:bg-muted"
              )}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className={cn(
                "relative p-2 rounded-lg transition-all",
                isTransparentDark ? "text-white/80 hover:text-white hover:bg-white/10" : "hover:bg-muted"
              )}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button
                  className={cn(
                    "p-2 rounded-lg transition-all relative",
                    isTransparentDark ? "text-white/80 hover:text-white hover:bg-white/10" : "hover:bg-muted"
                  )}
                  onClick={() => navigate(getDashboardPath(user.role))}
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center gap-2 p-1.5 rounded-xl transition-all",
                      isTransparentDark ? "hover:bg-white/10" : "hover:bg-muted"
                    )}
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7C3AED&color=fff`}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <span className={cn(
                      "hidden md:block text-sm font-semibold max-w-[100px] truncate",
                      isTransparentDark ? "text-white" : "text-foreground"
                    )}>
                      {user.name}
                    </span>
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isTransparentDark ? "text-white/70" : "text-muted-foreground", userMenuOpen && "rotate-180")} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-2xl shadow-glass-lg p-2 z-50 animate-fade-in-up">
                      <div className="px-3 py-2 mb-1">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="border-t border-border pt-1">
                        <button
                          onClick={() => { navigate(getDashboardPath(user.role)); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm text-left"
                        >
                          <LayoutDashboard className="w-4 h-4 text-primary-500" /> Dashboard
                        </button>
                        <button
                          onClick={() => { navigate(getDashboardPath(user.role)); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm text-left"
                        >
                          <User className="w-4 h-4 text-muted-foreground" /> Profile
                        </button>
                        <button
                          onClick={() => { navigate(getDashboardPath(user.role)); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm text-left"
                        >
                          <Settings className="w-4 h-4 text-muted-foreground" /> Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 text-sm text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded-lg transition-all",
                    isTransparentDark
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-glow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg",
                isTransparentDark ? "text-white hover:bg-white/10" : "hover:bg-muted"
              )}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  location.pathname === link.href
                    ? "bg-primary-500/10 text-primary-500"
                    : "text-foreground hover:bg-muted hover:text-primary-500"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile feature links */}
            <div className="border-t border-border pt-2 mt-1">
              <p className="text-xs font-semibold text-muted-foreground px-4 py-1 uppercase tracking-wider">Studio</p>
              {megaMenuFeatures.map((f) => (
                <Link key={f.href} to={f.href} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all">
                  <div className={cn("w-1.5 h-1.5 rounded-full", f.dot)} />
                  {f.label}
                </Link>
              ))}
            </div>

            {!user ? (
              <div className="flex gap-2 pt-3 border-t border-border">
                <Link to="/login" className="flex-1 text-center py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground">
                  Login
                </Link>
                <Link to="/signup" className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold">
                  Sign Up Free
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-border space-y-1">
                <button onClick={() => { navigate(getDashboardPath(user.role)); setIsMobileOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all text-left">
                  <LayoutDashboard className="w-4 h-4 text-primary-500" /> Dashboard
                </button>
                <button onClick={() => { handleLogout(); setIsMobileOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
