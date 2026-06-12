import { useState } from "react";
import { Users, MessageSquare, Check, X, Clock, Plus, Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const initialTeamMembers = [
  { name: "Sarah Chen", role: "Art Director", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=faces", online: true },
  { name: "Marcus Kim", role: "Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces", online: true },
  { name: "Emma Wilson", role: "Copywriter", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", online: false },
  { name: "David Park", role: "Brand Manager", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", online: true },
];

const initialApprovals = [
  { id: 1, title: "Q3 Campaign Banner Set", submitter: "Marcus Kim", type: "Banner", status: "pending", preview: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop", comments: 3 },
  { id: 2, title: "Product Launch Social Posts", submitter: "Emma Wilson", type: "Social", status: "approved", preview: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=240&fit=crop", comments: 7 },
  { id: 3, title: "Homepage Hero Redesign", submitter: "Sarah Chen", type: "Web", status: "pending", preview: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&h=240&fit=crop", comments: 12 },
  { id: 4, title: "Email Newsletter Template", submitter: "David Park", type: "Email", status: "revision", preview: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop", comments: 5 },
];

const initialActivity = [
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
  const [approvalList, setApprovalList] = useState(initialApprovals);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [activities, setActivities] = useState(initialActivity);

  // Modal control states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Selection states
  const [activeApprovalId, setActiveApprovalId] = useState<number | null>(null);

  // Invite Member inputs
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Designer");
  const [inviteEmail, setInviteEmail] = useState("");

  // Comment Thread inputs
  const [commentsMap, setCommentsMap] = useState<Record<number, { user: string; text: string; time: string; avatar: string }[]>>({
    1: [
      { user: "Marcus Kim", text: "Please check the typography weights in variations 2.", time: "1h ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" },
      { user: "Sarah Chen", text: "Looks good otherwise, let's fix the contrast.", time: "45m ago", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop" }
    ],
    3: [
      { user: "David Park", text: "Let's change the color of the primary CTA to brand pink.", time: "3h ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop" }
    ]
  });
  const [newCommentText, setNewCommentText] = useState("");

  const handleApprove = (id: number) => {
    setApprovalList((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" } : a));
    const item = approvalList.find(a => a.id === id);
    const newAct = {
      user: "You (Art Director)",
      action: "approved",
      item: item?.title || "Design",
      time: "Just now",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=faces"
    };
    setActivities(prev => [newAct, ...prev]);
    toast.success("Design approved!");
  };

  const handleReject = (id: number) => {
    setApprovalList((prev) => prev.map((a) => a.id === id ? { ...a, status: "revision" } : a));
    const item = approvalList.find(a => a.id === id);
    const newAct = {
      user: "You (Art Director)",
      action: "requested revisions on",
      item: item?.title || "Design",
      time: "Just now",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=faces"
    };
    setActivities(prev => [newAct, ...prev]);
    toast.info("Sent back for revision");
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) {
      toast.error("Please fill in required fields");
      return;
    }
    const newM = {
      name: inviteName,
      role: inviteRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=faces",
      online: false
    };
    setTeamMembers(prev => [...prev, newM]);
    setInviteName("");
    setInviteEmail("");
    setShowInviteModal(false);
    toast.success(`Invite successfully sent to ${inviteEmail}!`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || activeApprovalId === null) return;
    const newComment = {
      user: "You (Art Director)",
      text: newCommentText,
      time: "Just now",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=faces"
    };
    setCommentsMap(prev => ({
      ...prev,
      [activeApprovalId]: [...(prev[activeApprovalId] || []), newComment]
    }));
    setApprovalList(prev => prev.map(a => a.id === activeApprovalId ? { ...a, comments: a.comments + 1 } : a));
    setNewCommentText("");
    toast.success("Comment added!");
  };

  const openCommentDrawer = (id: number) => {
    setActiveApprovalId(id);
    setShowCommentModal(true);
  };

  const openPreviewDrawer = (id: number) => {
    setActiveApprovalId(id);
    setShowPreviewModal(true);
  };

  const activeApproval = approvalList.find(a => a.id === activeApprovalId);
  const activeComments = activeApprovalId !== null ? (commentsMap[activeApprovalId] || []) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl lg:text-3xl">Collaboration Hub</h1>
          <p className="text-muted-foreground mt-1">Review, approve, and collaborate on designs</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
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
              {activities.map((a, i) => (
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
            <div key={item.id} className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4 hover:border-primary-500/20 transition-all">
              <img src={item.preview} alt={item.title} className="w-full md:w-40 h-24 rounded-xl object-cover flex-shrink-0 cursor-pointer" onClick={() => openPreviewDrawer(item.id)} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div onClick={() => openPreviewDrawer(item.id)} className="cursor-pointer">
                    <h3 className="font-semibold hover:text-primary-500 transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">by {item.submitter} · {item.type}</p>
                  </div>
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0", statusStyle[item.status])}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 cursor-pointer hover:text-foreground" onClick={() => openCommentDrawer(item.id)}>
                  <MessageSquare className="w-3 h-3" /> {item.comments} comments
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openPreviewDrawer(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={() => openCommentDrawer(item.id)}
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

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-glass-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Full Name *</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="James Carter"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Email Address *</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="james@company.com"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm"
                >
                  <option value="Designer">Designer</option>
                  <option value="Copywriter">Copywriter</option>
                  <option value="Art Director">Art Director</option>
                  <option value="Brand Manager">Brand Manager</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl">
                  Send Invitation
                </button>
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-2.5 border border-border hover:bg-muted text-sm font-medium rounded-xl">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Design Comment Thread Drawer/Modal */}
      {showCommentModal && activeApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-glass-lg animate-fade-in-up flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-sm truncate">{activeApproval.title}</h3>
                <p className="text-xs text-muted-foreground">Comments Thread</p>
              </div>
              <button onClick={() => setShowCommentModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-1">
              {activeComments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-xs">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  No comments yet. Start the conversation below.
                </div>
              ) : (
                activeComments.map((c, idx) => (
                  <div key={idx} className="flex gap-2.5 p-2 rounded-xl bg-muted/40">
                    <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs">{c.user}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment input form */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Type your feedback..."
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-xl text-xs focus:outline-none"
                autoFocus
              />
              <button type="submit" className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-xl text-xs">
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Design Preview Drawer/Modal */}
      {showPreviewModal && activeApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-xl shadow-glass-lg animate-fade-in-up flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-base">{activeApproval.title}</h3>
                <p className="text-xs text-muted-foreground">Submitted by {activeApproval.submitter} · {activeApproval.type}</p>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>

            {/* Large Preview */}
            <div className="relative rounded-xl overflow-hidden bg-black/5 mb-4 border border-border">
              <img src={activeApproval.preview} alt={activeApproval.title} className="w-full h-80 object-contain mx-auto" />
            </div>

            <div className="flex justify-between items-center">
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusStyle[activeApproval.status])}>
                Status: {activeApproval.status}
              </span>
              <div className="flex gap-2">
                {activeApproval.status === "pending" && (
                  <>
                    <button
                      onClick={() => { handleApprove(activeApproval.id); setShowPreviewModal(false); }}
                      className="flex items-center gap-1 px-4 py-2 bg-success text-white font-semibold rounded-xl text-xs hover:bg-success/90"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => { handleReject(activeApproval.id); setShowPreviewModal(false); }}
                      className="flex items-center gap-1 px-4 py-2 bg-error text-white font-semibold rounded-xl text-xs hover:bg-error/90"
                    >
                      <X className="w-4 h-4" /> Needs Revision
                    </button>
                  </>
                )}
                <button
                  onClick={() => { setShowPreviewModal(false); openCommentDrawer(activeApproval.id); }}
                  className="px-4 py-2 border border-border hover:bg-muted rounded-xl text-xs"
                >
                  Close & Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
