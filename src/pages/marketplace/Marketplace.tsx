import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Heart, ShoppingCart, TrendingUp, X, Eye, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

const categories = ["All", "Templates", "Illustrations", "Icons", "Photos", "Videos", "Audio", "Fonts"];

const items = [
  { id: 1, title: "Premium Brand Kit Pro", price: 49, category: "Templates", rating: 4.9, sales: 2840, img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop", author: "DesignLab", isPremium: true, badge: "Bestseller" },
  { id: 2, title: "Social Media Mega Pack", price: 29, category: "Templates", rating: 4.8, sales: 5200, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop", author: "CreatorCo", isPremium: false, badge: "Hot" },
  { id: 3, title: "Abstract Illustrations Bundle", price: 39, category: "Illustrations", rating: 4.7, sales: 1620, img: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=300&h=200&fit=crop", author: "ArtStudio", isPremium: true, badge: null },
  { id: 4, title: "Minimal Icon Set (500+)", price: 19, category: "Icons", rating: 4.9, sales: 8900, img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop", author: "IconForge", isPremium: false, badge: "New" },
  { id: 5, title: "Startup Pitch Deck", price: 79, category: "Templates", rating: 5.0, sales: 940, img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=300&h=200&fit=crop", author: "SlidePro", isPremium: true, badge: "Featured" },
  { id: 6, title: "E-commerce Photo Pack", price: 59, category: "Photos", rating: 4.6, sales: 3100, img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop", author: "PhotoHub", isPremium: false, badge: null },
  { id: 7, title: "UI Component Library", price: 89, category: "Templates", rating: 4.8, sales: 720, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", author: "UIcrafts", isPremium: true, badge: "Pro" },
  { id: 8, title: "Logo Design Collection", price: 35, category: "Templates", rating: 4.7, sales: 1480, img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop", author: "BrandKing", isPremium: false, badge: null },
  { id: 9, title: "Motion Graphics Pack", price: 65, category: "Videos", rating: 4.8, sales: 890, img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=200&fit=crop", author: "MotionLab", isPremium: true, badge: "New" },
  { id: 10, title: "Typography Bundle", price: 45, category: "Fonts", rating: 4.6, sales: 2100, img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop", author: "TypeCraft", isPremium: false, badge: null },
  { id: 11, title: "Background Textures Vol.2", price: 25, category: "Photos", rating: 4.5, sales: 3800, img: "https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=200&fit=crop", author: "TextureCo", isPremium: false, badge: "Hot" },
  { id: 12, title: "Infographic Templates", price: 55, category: "Templates", rating: 4.9, sales: 1200, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop", author: "InfoPro", isPremium: true, badge: "Bestseller" },
];

const sortOptions = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low", "Top Rated"];

const badgeColor: Record<string, string> = {
  Bestseller: "bg-warning/20 text-warning",
  Hot: "bg-error/20 text-error",
  New: "bg-success/20 text-success",
  Featured: "bg-primary-500/20 text-primary-500",
  Pro: "bg-secondary-500/20 text-secondary-500",
};

interface PreviewItem {
  id: number;
  title: string;
  price: number;
  img: string;
  author: string;
  category: string;
  rating: number;
  sales: number;
}

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Popular");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [preview, setPreview] = useState<PreviewItem | null>(null);

  const { addItem, items: cartItems, openCart, count } = useCartStore();
  const cartIds = new Set(cartItems.map((i) => i.id));

  const sorted = [...items].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Top Rated") return b.rating - a.rating;
    if (sort === "Newest") return b.id - a.id;
    return b.sales - a.sales; // Most Popular
  });

  const filtered = sorted.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(wishlist);
    if (next.has(id)) { next.delete(id); toast.success("Removed from wishlist"); }
    else { next.add(id); toast.success("Added to wishlist ♥"); }
    setWishlist(next);
  };

  const handleAddToCart = (item: typeof items[0], e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (cartIds.has(item.id)) {
      openCart();
      return;
    }
    addItem({ id: item.id, title: item.title, price: item.price, img: item.img, author: item.author, category: item.category });
    toast.success(`"${item.title}" added to cart!`, {
      action: { label: "View Cart", onClick: openCart },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="bg-card border border-border rounded-3xl shadow-glass-lg max-w-2xl w-full overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={preview.img} alt={preview.title} className="w-full h-64 object-cover" />
              <button onClick={() => setPreview(null)} className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all">
                <X className="w-4 h-4" />
              </button>
              {/* Badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                {preview.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="font-heading font-bold text-xl">{preview.title}</h2>
                  <p className="text-sm text-muted-foreground">by {preview.author}</p>
                </div>
                <span className="font-black text-2xl text-primary-500">${preview.price}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" /> {preview.rating}
                </span>
                <span>{preview.sales.toLocaleString()} sales</span>
                <span className="text-success flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Instant download
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { handleAddToCart(preview); setPreview(null); }}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    cartIds.has(preview.id)
                      ? "bg-success/10 text-success"
                      : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover-glow"
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartIds.has(preview.id) ? "In Cart — View" : "Add to Cart"}
                </button>
                <button
                  onClick={(e) => toggleWishlist(preview.id, e)}
                  className={cn(
                    "px-4 py-3 rounded-xl border border-border transition-all",
                    wishlist.has(preview.id) ? "text-secondary-500 border-secondary-500/30 bg-secondary-500/5" : "hover:bg-muted"
                  )}
                >
                  <Heart className={cn("w-5 h-5", wishlist.has(preview.id) && "fill-secondary-500")} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500/10 via-background to-secondary-500/10 border-b border-border pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-3">
            Creative <span className="gradient-text-purple">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">Discover premium templates, assets, and resources from top designers</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates, illustrations, icons..."
              className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-glow"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary-500/30 hover:bg-primary-500/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-card border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold hover-glow transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart {cartIds.size > 0 && `(${cartIds.size})`}
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
          <span><strong className="text-foreground">{filtered.length}</strong> results shown</span>
          <span><strong className="text-foreground">12,400+</strong> total assets</span>
          <span><strong className="text-foreground">840+</strong> creators</span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <strong className="text-foreground">2.1K</strong> sold this week
          </span>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreview(item)}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift hover:border-primary-500/20 cursor-pointer transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.badge && (
                  <span className={cn("absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold", badgeColor[item.badge] || "bg-muted text-muted-foreground")}>
                    {item.badge}
                  </span>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreview(item); }}
                    className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className={cn(
                      "p-2.5 rounded-xl backdrop-blur-sm text-white transition-all",
                      cartIds.has(item.id) ? "bg-success/70 hover:bg-success/90" : "bg-primary-500/70 hover:bg-primary-500/90"
                    )}
                    title="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={(e) => toggleWishlist(item.id, e)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all"
                >
                  <Heart className={cn("w-4 h-4", wishlist.has(item.id) ? "fill-secondary-500 text-secondary-500" : "text-muted-foreground")} />
                </button>
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm mb-1 truncate group-hover:text-primary-500 transition-colors">{item.title}</p>
                <p className="text-xs text-muted-foreground mb-3">by {item.author} · {item.category}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                    <span className="text-xs font-semibold">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.sales.toLocaleString()})</span>
                  </div>
                  <span className="font-black text-primary-500">${item.price}</span>
                </div>
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  className={cn(
                    "w-full py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5",
                    cartIds.has(item.id)
                      ? "bg-success/10 text-success"
                      : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover-glow"
                  )}
                >
                  {cartIds.has(item.id) ? (
                    <>✓ In Cart — View</>
                  ) : (
                    <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <ShoppingCart className="w-14 h-14 mx-auto mb-4 opacity-20" />
            <p className="font-bold text-lg">No items found</p>
            <p className="text-sm mt-1">Try a different category or search term</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 px-5 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">
              Clear filters
            </button>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => toast.info("Loading more assets...")}
              className="px-8 py-3 rounded-xl border border-border font-semibold text-sm hover:bg-muted hover:border-primary-500/30 transition-all flex items-center gap-2 mx-auto"
            >
              Load More Assets <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
