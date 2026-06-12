export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using PixiVisual, you agree to be bound by these Terms of Service. If you don't agree to these terms, please don't use our service." },
    { title: "2. Your Account", content: "You're responsible for maintaining the security of your account and all activities that occur under it. Notify us immediately of any unauthorized access at security@pixivisual.ai." },
    { title: "3. Acceptable Use", content: "You may use PixiVisual for lawful purposes only. You may not use our service to create illegal content, infringe on intellectual property, spam others, or attempt to circumvent our AI safety measures." },
    { title: "4. Intellectual Property", content: "Designs you create on PixiVisual are yours. You grant us a limited license to display and process your content to provide the service. Our platform, AI models, and templates remain our intellectual property." },
    { title: "5. Payment Terms", content: "Paid plans are billed in advance. Refunds are available within 14 days of purchase for annual plans. Monthly subscriptions are non-refundable but can be cancelled anytime." },
    { title: "6. Limitation of Liability", content: "PixiVisual is provided 'as is' without warranties. We're not liable for indirect, incidental, or consequential damages arising from your use of the service." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10">
          <h1 className="font-heading font-black text-4xl mb-3">Terms of <span className="gradient-text-purple">Service</span></h1>
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
          <p className="text-sm text-muted-foreground">Questions? Contact us at <span className="text-primary-500">legal@pixivisual.ai</span></p>
        </div>
      </div>
    </div>
  );
}
