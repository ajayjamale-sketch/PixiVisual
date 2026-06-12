import { Link } from "react-router-dom";
import { Cookie, Shield, Eye, Settings, ToggleLeft, ToggleRight, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const cookieTypes = [
  {
    id: "essential",
    name: "Essential Cookies",
    desc: "Required for the website to function properly. These cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    desc: "Help us understand how visitors interact with PixiVisual by collecting and reporting information anonymously.",
    required: false,
    enabled: true,
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    desc: "Used to deliver personalized advertisements and track campaign performance across the web.",
    required: false,
    enabled: false,
  },
  {
    id: "preferences",
    name: "Preference Cookies",
    desc: "Allow the website to remember your choices and preferences such as theme, language, and layout.",
    required: false,
    enabled: true,
  },
];

export default function CookiePolicyPage() {
  const [cookies, setCookies] = useState(() => {
    const saved = localStorage.getItem("cookie-preferences");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return cookieTypes.map((c) => ({
          ...c,
          enabled: parsed[c.id] !== undefined ? parsed[c.id] : c.enabled,
        }));
      } catch (e) {
        return cookieTypes;
      }
    }
    return cookieTypes;
  });

  const toggleCookie = (id: string) => {
    setCookies((prev) =>
      prev.map((c) => (c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const savePreferences = () => {
    const preferences = cookies.reduce((acc, curr) => {
      acc[curr.id] = curr.enabled;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    toast.success("Cookie preferences saved!");
  };

  const handleAcceptAll = () => {
    const updated = cookies.map((c) => ({ ...c, enabled: true }));
    setCookies(updated);
    const preferences = updated.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    toast.success("All cookies accepted");
  };

  const handleRejectNonEssential = () => {
    const updated = cookies.map((c) => ({ ...c, enabled: c.required }));
    setCookies(updated);
    const preferences = updated.reduce((acc, curr) => {
      acc[curr.id] = curr.required;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    toast.success("Non-essential cookies rejected");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-4">
            <Cookie className="w-4 h-4 text-warning" />
            <span className="text-sm font-semibold text-warning">Cookie Policy</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            Cookie <span className="gradient-text-purple">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We use cookies to enhance your experience. Learn how we use them and manage your preferences below.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: June 1, 2026</p>
        </div>

        {/* Cookie Preferences Panel */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="font-heading font-bold text-xl mb-2 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-500" /> Manage Cookie Preferences
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Control which cookies you allow PixiVisual to use. Essential cookies are always active.
          </p>
          <div className="space-y-4">
            {cookies.map((cookie) => (
              <div key={cookie.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary-500/30 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{cookie.name}</h3>
                    {cookie.required && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 font-medium">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{cookie.desc}</p>
                </div>
                <button
                  onClick={() => toggleCookie(cookie.id)}
                  disabled={cookie.required}
                  className="flex-shrink-0 mt-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Toggle ${cookie.name}`}
                >
                  {cookie.enabled ? (
                    <ToggleRight className="w-8 h-8 text-primary-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={savePreferences}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all"
            >
              Reject Non-Essential
            </button>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 prose-sm">
          {[
            {
              icon: Info,
              title: "What Are Cookies?",
              content: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and improve functionality. PixiVisual uses cookies to provide a better, more personalized experience.",
            },
            {
              icon: Eye,
              title: "How We Use Cookies",
              content: "We use cookies for authentication (staying logged in), remembering your theme preference (light/dark mode), analytics to improve our platform, and personalized content delivery. We do not sell cookie data to third parties.",
            },
            {
              icon: Shield,
              title: "Third-Party Cookies",
              content: "Some cookies are set by third-party services we use, including Google Analytics for usage insights, Stripe for payment security, and Cloudflare for CDN and security. Each of these providers has their own cookie policies.",
            },
          ].map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-heading font-bold text-xl mb-3 flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary-500" />
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 bg-primary-500/5 border border-primary-500/20 rounded-2xl text-center">
          <p className="text-sm text-muted-foreground">
            Questions about our cookie policy?{" "}
            <Link to="/contact" className="text-primary-500 hover:underline font-medium">Contact us</Link>{" "}
            or read our{" "}
            <Link to="/privacy" className="text-primary-500 hover:underline font-medium">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
