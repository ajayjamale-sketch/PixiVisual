import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const perks = [
  "5 free AI generations every month",
  "Access to 500+ premium templates",
  "No credit card required",
  "Cancel anytime",
];

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!agreed) {
      toast.error("Please accept the terms of service");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    const user = await signup(name, email, password);
    toast.success(`Welcome to PixiVisual, ${user.name}!`);
    navigate("/dashboard/creator");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-secondary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-heading font-black text-4xl text-white mb-4">
              Start Creating for Free
            </h2>
            <p className="text-white/60 text-lg max-w-sm">
              Join the world's most powerful AI creative platform. No design skills needed.
            </p>
          </div>

          <div className="space-y-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-success" />
                </div>
                <span className="text-white/80 text-sm">{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop",
              "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=150&h=150&fit=crop",
              "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop",
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden glass-card aspect-square">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text-purple">PixiVisual</span>
          </Link>

          <h1 className="font-heading font-black text-3xl mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start creating stunning designs with AI</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map((provider) => (
              <button
                key={provider}
                onClick={() => toast.info(`${provider} signup coming soon`)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-xl hover:bg-muted transition-all text-sm font-medium"
              >
                <img
                  src={provider === "Google" ? "https://www.google.com/favicon.ico" : "https://github.com/favicon.ico"}
                  alt={provider}
                  className="w-4 h-4"
                />
                {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Email Address</label>
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
              <label className="text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${password.length >= i * 3 ? "bg-success" : "bg-muted"}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {password.length < 4 ? "Weak" : password.length < 8 ? "Fair" : password.length < 12 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border text-primary-500"
              />
              <span className="text-xs text-muted-foreground">
                I agree to PixiVisual's{" "}
                <Link to="/terms" className="text-primary-500 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-500 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
