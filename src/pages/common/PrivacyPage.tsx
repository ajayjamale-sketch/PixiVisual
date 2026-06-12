export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly (name, email, payment info), usage data (designs created, features used), and technical data (browser type, device, IP address). We use this to provide and improve our services." },
    { title: "How We Use Your Information", content: "We use your information to provide our services, process payments, send important updates, improve our AI models (with your consent), and personalize your experience. We never sell your personal data." },
    { title: "Data Security", content: "We implement industry-standard encryption, regular security audits, and strict access controls. Your designs and assets are stored securely on encrypted servers with SOC 2 Type II compliance." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data at any time. You can export all your data from Account Settings. For GDPR/CCPA requests, contact privacy@pixivisual.ai." },
    { title: "Cookies", content: "We use essential cookies for authentication, analytics cookies (with consent) to improve our service, and preference cookies to remember your settings. You can manage cookie preferences in your browser." },
    { title: "Third-Party Services", content: "We use trusted third-party services including Stripe for payments, AWS for storage, and analytics providers. These partners are bound by strict data processing agreements." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10">
          <h1 className="font-heading font-black text-4xl mb-3">Privacy <span className="gradient-text-purple">Policy</span></h1>
          <p className="text-muted-foreground">Last updated: June 12, 2026</p>
        </div>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="border-b border-border pb-8 last:border-0">
              <h2 className="font-heading font-bold text-xl mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-card border border-border rounded-2xl">
          <p className="text-sm text-muted-foreground">Questions about privacy? Contact us at <span className="text-primary-500">privacy@pixivisual.ai</span></p>
        </div>
      </div>
    </div>
  );
}
