import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 text-center max-w-lg">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-6 animate-float">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-heading font-black text-8xl gradient-text-purple mb-4">404</h1>
        <h2 className="font-heading font-bold text-2xl mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Looks like this page went on a creative adventure and didn't come back.
          Let's get you back to designing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:shadow-glow transition-all"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
