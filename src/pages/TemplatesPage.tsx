import TemplatesShowcase from "@/components/features/TemplatesShowcase";

export default function TemplatesPage() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 pt-16 pb-4 text-center">
        <h1 className="font-heading font-black text-4xl md:text-6xl mb-4">
          500+ <span className="gradient-text-purple">Templates</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professionally designed templates for every platform, use case, and industry.
        </p>
      </div>
      <TemplatesShowcase />
    </div>
  );
}
