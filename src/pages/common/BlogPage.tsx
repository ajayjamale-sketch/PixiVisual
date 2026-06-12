import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";

const posts = [
  { title: "10 Ways AI is Transforming Graphic Design in 2026", excerpt: "Discover how AI tools are revolutionizing the way designers work, from concept to final output.", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop", author: "Jordan Miles", date: "Jun 10, 2026", readTime: "5 min", tag: "AI & Design" },
  { title: "The Ultimate Guide to Brand Identity for Startups", excerpt: "Build a compelling brand identity from scratch with step-by-step guidance and AI-powered tools.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop", author: "Priya Sharma", date: "Jun 8, 2026", readTime: "8 min", tag: "Branding" },
  { title: "Social Media Design Trends to Watch in 2026", excerpt: "Stay ahead of the curve with the latest social media design trends that are dominating platforms.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop", author: "Maya Johnson", date: "Jun 5, 2026", readTime: "6 min", tag: "Social Media" },
  { title: "How to Create a Winning YouTube Thumbnail", excerpt: "Learn the psychology behind click-worthy thumbnails and how to create them in minutes with AI.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop", author: "Alex Chen", date: "Jun 2, 2026", readTime: "4 min", tag: "Tutorial" },
  { title: "Building a Consistent Visual Brand Across All Platforms", excerpt: "Maintain brand consistency whether you're designing for Instagram, LinkedIn, or print media.", img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&h=250&fit=crop", author: "Zoe Martinez", date: "May 29, 2026", readTime: "7 min", tag: "Branding" },
  { title: "From Prompt to Masterpiece: AI Image Generation Tips", excerpt: "Master the art of writing effective prompts to generate exactly the images you envision.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop", author: "Sam Park", date: "May 25, 2026", readTime: "6 min", tag: "AI & Design" },
];

const tagColors: Record<string, string> = {
  "AI & Design": "bg-primary-500/10 text-primary-500",
  "Branding": "bg-secondary-500/10 text-secondary-500",
  "Social Media": "bg-blue-500/10 text-blue-500",
  "Tutorial": "bg-green-500/10 text-green-500",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">PixiVisual <span className="gradient-text-purple">Blog</span></h1>
          <p className="text-lg text-muted-foreground">Design tips, AI insights, and creative inspiration</p>
        </div>

        {/* Featured Post */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-8 group hover:shadow-card-hover transition-all cursor-pointer">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={posts[0].img} alt={posts[0].title} className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-500 mb-3 w-fit">Featured</span>
              <h2 className="font-heading font-black text-2xl md:text-3xl mb-3">{posts[0].title}</h2>
              <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {posts[0].author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {posts[0].readTime} read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <div key={post.title} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover transition-all cursor-pointer">
              <div className="overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${tagColors[post.tag] || "bg-muted text-muted-foreground"}`}>{post.tag}</span>
                <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
