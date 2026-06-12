import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Mail, Lock, ArrowRight, Zap, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_USERS } from "@/constants";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login, loginDemo, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [activeDemo, setActiveDemo] = useState<UserRole | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const user = await login(email, password);
    toast.success(`Welcome back, ${user.name}!`);
    navigate("/dashboard/creator");
  };

  const handleDemoLogin = async (role: UserRole, dashboardPath: string) => {
    setActiveDemo(role);
    const user = await loginDemo(role);
    toast.success(`Welcome, ${user.name}! Loading your dashboard...`);
    navigate(dashboardPath);
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text-purple">PixiVisual</span>
          </Link>

          <h1 className="font-heading font-black text-3xl mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your creative workspace</p>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map((provider) => (
              <button
                key={provider}
                onClick={() => toast.info(`${provider} login coming soon`)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-xl hover:bg-muted transition-all text-sm font-medium"
              >
                <img
                  src={provider === "Google"
                    ? "https://www.google.com/favicon.ico"
                    : "https://github.com/favicon.ico"}
                  alt={provider}
                  className="w-4 h-4"
                />
                {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary-500 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mb-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-500 font-semibold hover:underline">Sign up free</Link>
          </p>

          <Link
            to="/login/otp"
            className="w-full mb-8 flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-xl hover:bg-muted hover:border-primary-500/30 transition-all text-sm font-medium group"
          >
            <Phone className="w-4 h-4 text-primary-500" />
            Login with Mobile OTP
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* Demo Login Section */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-warning" />
              <p className="text-sm font-semibold">Quick Demo Access</p>
              <span className="text-xs text-muted-foreground">— No credentials needed</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((demoUser) => (
                <button
                  key={demoUser.role}
                  onClick={() => handleDemoLogin(demoUser.role, demoUser.dashboard)}
                  disabled={isLoading}
                  className={cn(
                    "relative flex items-center gap-2.5 p-3 rounded-xl border border-border hover:border-primary-500/30 bg-card hover:bg-primary-500/5 transition-all text-left group",
                    activeDemo === demoUser.role && "opacity-70 pointer-events-none"
                  )}
                >
                  <div className={cn("w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0", demoUser.color)}>
                    {demoUser.label[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{demoUser.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{demoUser.description}</p>
                  </div>
                  {activeDemo === demoUser.role && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <h2 className="font-heading font-black text-4xl text-white mb-4">
            Create Anything
            <br />
            <span className="gradient-text-purple">With AI</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-sm">
            Join 2.4M+ creators using PixiVisual to generate stunning designs in seconds.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[
              { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop", label: "AI Poster" },
              { img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=150&fit=crop", label: "Brand Kit" },
              { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=150&fit=crop", label: "Social Post" },
              { img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=150&fit=crop", label: "Ad Creative" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl overflow-hidden glass-card">
                <img src={item.img} alt={item.label} className="w-full h-24 object-cover" />
                <p className="text-xs text-white/80 font-medium p-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
