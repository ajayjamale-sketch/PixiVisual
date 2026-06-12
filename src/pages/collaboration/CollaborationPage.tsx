import { useState } from "react";
import { Users, MessageSquare, Check, X, Clock, Plus, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const teamMembers = [
  { name: "Sarah Chen", role: "Art Director", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=faces", online: true },
  { name: "Marcus Kim", role: "Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces", online: true },
  { name: "Emma Wilson", role: "Copywriter", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", online: false },
  { name: "David Park", role: "Brand Manager", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", online: true },
];

const approvals = [
  { id: 1, title: "Q3 Campaign Banner Set", submitter: "Marcus Kim", type: "Banner", status: "pending", preview: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop", comments: 3 },
  { id: 2, title: "Product Launch Social Posts", submitter: "Emma Wilson", type: "Social", status: "approved", preview: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=120&fit=crop", comments: 7 },
  { id: 3, title: "Homepage Hero Redesign", submitter: "Sarah Chen", type: "Web", status: "pending", preview: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=200&h=120&fit=crop", comments: 12 },
  { id: 4, title: "Email Newsletter Template", submitter: "David Park", type: "Email", status: "revision", preview: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=120&fit=crop", comments: 5 },
];

const activity = [
  { user: "Sarah Chen", action: "approved", item: "Social Media Pack", time: "5m ago", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=faces" },
  { user: "Marcus Kim", action: "commented on", item: "Banner Set v3", time: "12m ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces" },
  { user: "Emma Wilson", action: "submitted", item: "Email Template", time: "1h ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces" },
];

const statusStyle: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  revision: "bg-error/10 text-error",
};

export default function CollaborationPage() {
  const [approvalList, setApprovalList] = useState(approvals);

  const handleApprove = (id: number) => {
    setApprovalList((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" } : a));
    toast.success("Design approved!");
  };

  const handleReject = (id: number) => {
    setApprovalList((prev) => prev.map((a) => a.id === id ? { ...a, status: "revision" } : a));
    toast.info("Sent back for revision");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Collaboration Hub</h1>
          <p className="text-muted-foreground mt-1">Review, approve, and collaborate on designs</p>
        </div>
        <button
          onClick={() => toast.info("Invite team members")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Team Members */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Team ({teamMembers.length})</h2>
          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="relative">
                  <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card", m.online ? "bg-success" : "bg-muted")} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3">ACTIVITY</h3>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <img src={a.avatar} alt={a.user} className="w-6 h-6 rounded-lg object-cover flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-foreground font-medium">{a.user}</span> {a.action}{" "}
                    <span className="text-primary-500">{a.item}</span> · {a.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Approvals */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-semibold">Pending Reviews</h2>
          {approvalList.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4">
              <img src={item.preview} alt={item.title} className="w-full md:w-40 h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">by {item.submitter} · {item.type}</p>
                  </div>
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0", statusStyle[item.status])}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MessageSquare className="w-3 h-3" /> {item.comments} comments
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.info(`Viewing ${item.title}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={() => toast.info("Leave a comment...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Comment
                  </button>
                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 hover:bg-success/20 text-success text-xs font-medium transition-all"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error text-xs font-medium transition-all"
                      >
                        <X className="w-3.5 h-3.5" /> Revision
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
