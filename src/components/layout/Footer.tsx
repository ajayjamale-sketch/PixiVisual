import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Instagram, Youtube, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Templates", href: "/templates" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "AI Studio", href: "/studio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api-docs" },
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/help" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Affiliate", href: "/affiliate" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed! Welcome to PixiVisual newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:shadow-glow transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl gradient-text-purple">PixiVisual</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              The AI-powered creative platform for designers, creators, and businesses. Generate stunning visuals in seconds.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="space-y-2">
              <p className="text-sm font-semibold">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-glow hover:scale-105 transition-all"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* App Downloads */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => toast.info("iOS app coming soon!")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:border-primary-500/50 hover:bg-muted text-xs font-medium transition-all group"
              >
                <span>🍎</span> App Store
              </button>
              <button
                onClick={() => toast.info("Android app coming soon!")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:border-primary-500/50 hover:bg-muted text-xs font-medium transition-all"
              >
                <span>🤖</span> Google Play
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary-500 hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center md:justify-start">
            <span>© 2026 PixiVisual Inc. All rights reserved.</span>
            <span className="hidden md:inline text-border">|</span>
            <a href="mailto:hello@pixivisual.ai" className="flex items-center gap-1.5 hover:text-primary-500 transition-colors">
              <Mail className="w-3.5 h-3.5" /> hello@pixivisual.ai
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-muted hover:bg-primary-500 hover:text-white hover:scale-110 flex items-center justify-center transition-all duration-150"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>🌐</span>
            <select className="bg-transparent border-none text-xs text-muted-foreground focus:outline-none cursor-pointer">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>日本語</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
