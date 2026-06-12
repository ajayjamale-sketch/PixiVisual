import { Code, Copy, Key, Zap } from "lucide-react";
import { toast } from "sonner";

const endpoints = [
  { method: "POST", path: "/v1/generate/image", desc: "Generate an AI image from a text prompt" },
  { method: "POST", path: "/v1/generate/poster", desc: "Create a designed poster with AI" },
  { method: "GET", path: "/v1/templates", desc: "List all available templates" },
  { method: "POST", path: "/v1/designs", desc: "Create a new design project" },
  { method: "PUT", path: "/v1/designs/:id", desc: "Update an existing design" },
  { method: "GET", path: "/v1/assets", desc: "List user's uploaded assets" },
];

const methodColor: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-500",
  POST: "bg-green-500/10 text-green-500",
  PUT: "bg-warning/10 text-warning",
  DELETE: "bg-error/10 text-error",
};

export default function ApiPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">API <span className="gradient-text-purple">Reference</span></h1>
          <p className="text-lg text-muted-foreground">Integrate PixiVisual's AI capabilities into your own applications</p>
        </div>

        {/* Quick Start */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><Key className="w-4 h-4 text-primary-500" /> Quick Start</h2>
          <div className="bg-muted rounded-xl p-4 font-mono text-sm overflow-x-auto">
            <p className="text-muted-foreground"># Get your API key from Account Settings</p>
            <p className="text-success mt-2">curl -X POST https://api.pixivisual.ai/v1/generate/image \</p>
            <p className="ml-4 text-success">-H "Authorization: Bearer YOUR_API_KEY" \</p>
            <p className="ml-4 text-success">-H "Content-Type: application/json" \</p>
            <p className="ml-4 text-success">-d '{`{"prompt": "A modern tech logo", "style": "minimal"}`}'</p>
          </div>
          <button
            onClick={() => toast.success("Copied to clipboard!")}
            className="mt-3 flex items-center gap-1.5 text-xs text-primary-500 hover:underline"
          >
            <Copy className="w-3 h-3" /> Copy code
          </button>
        </div>

        {/* Endpoints */}
        <h2 className="font-semibold text-lg mb-4">Endpoints</h2>
        <div className="space-y-3">
          {endpoints.map((ep) => (
            <div key={ep.path} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary-500/20 transition-all">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono flex-shrink-0 ${methodColor[ep.method]}`}>{ep.method}</span>
              <div>
                <code className="text-sm font-mono text-foreground">{ep.path}</code>
                <p className="text-xs text-muted-foreground mt-1">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl text-center">
          <Zap className="w-6 h-6 text-primary-500 mx-auto mb-2" />
          <p className="font-semibold">Need more endpoints?</p>
          <p className="text-sm text-muted-foreground mt-1">Full API documentation with code samples in Python, JavaScript, and more</p>
        </div>
      </div>
    </div>
  );
}
