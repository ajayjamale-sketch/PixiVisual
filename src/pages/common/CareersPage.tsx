import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight, Zap, X } from "lucide-react";
import { toast } from "sonner";

const jobs = [
  { title: "Senior AI/ML Engineer", dept: "Engineering", location: "San Francisco / Remote", type: "Full-time" },
  { title: "Senior Product Designer", dept: "Design", location: "New York / Remote", type: "Full-time" },
  { title: "Frontend Engineer (React)", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Growth Marketing Manager", dept: "Marketing", location: "San Francisco", type: "Full-time" },
  { title: "Customer Success Lead", dept: "Operations", location: "Remote", type: "Full-time" },
  { title: "Content Strategist", dept: "Marketing", location: "Remote", type: "Part-time" },
];

const perks = [
  { emoji: "🏥", label: "Full Health Insurance" },
  { emoji: "🌴", label: "Unlimited PTO" },
  { emoji: "💻", label: "$3K Equipment Budget" },
  { emoji: "📚", label: "Learning & Development" },
  { emoji: "🏠", label: "Remote-First Culture" },
  { emoji: "🚀", label: "Equity Options" },
];

export default function CareersPage() {
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [cover, setCover] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in required fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(`Application for ${applyingJob} submitted successfully!`);
      setApplyingJob(null);
      setName("");
      setEmail("");
      setResume("");
      setPortfolio("");
      setCover("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">Join the <span className="gradient-text-purple">Team</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We're building the future of AI-powered creativity. Come join us on this journey.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl">
              <span className="text-2xl">{perk.emoji}</span>
              <span className="text-sm font-medium">{perk.label}</span>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-2xl mb-6">Open Positions</h2>
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.title} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary-500/30 hover:shadow-card transition-all group">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.dept}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium">{job.type}</span>
                </div>
              </div>
              <button 
                onClick={() => setApplyingJob(job.title)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:shadow-glow transition-all flex-shrink-0"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl mb-1">Apply for Role</h2>
            <p className="text-sm text-muted-foreground mb-4">{applyingJob}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Resume Link (PDF/Drive) *</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/.../resume.pdf"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Portfolio Link</label>
                <input
                  type="url"
                  placeholder="https://myportfolio.com"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Cover Letter (Brief)</label>
                <textarea
                  placeholder="Why are you a good fit for this role?"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover-glow transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
