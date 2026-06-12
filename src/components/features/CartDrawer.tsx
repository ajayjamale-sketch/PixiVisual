import { useCartStore } from "@/stores/cartStore";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, total, count } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "PIXI20") {
      setDiscount(20);
      toast.success("Promo code applied! 20% off");
    } else if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
      toast.success("Promo code applied! $10 off");
    } else {
      toast.error("Invalid promo code. Try PIXI20 or SAVE10");
    }
    setPromoCode("");
  };

  const subtotal = total;
  const discountAmount = discount > 0 && discount <= 100
    ? (subtotal * discount) / 100
    : Math.min(discount, subtotal);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      toast.success("Order placed successfully! Check your email for receipt.", { duration: 5000 });
      clearCart();
      closeCart();
      setIsCheckingOut(false);
      setDiscount(0);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-md bg-background border-l border-border shadow-glass-lg flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-primary-500" />
            <h2 className="font-heading font-bold text-lg">Your Cart</h2>
            {count > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary-500 text-white text-xs font-bold">
                {count}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={() => { clearCart(); toast.success("Cart cleared"); }}
                className="text-xs text-muted-foreground hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-2 rounded-xl hover:bg-muted transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-40" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Discover premium templates and assets in our marketplace</p>
              </div>
              <Link
                to="/marketplace"
                onClick={closeCart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover-glow transition-all"
              >
                Browse Marketplace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-card border border-border rounded-2xl hover:border-primary-500/20 transition-all group"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">by {item.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-muted hover:bg-primary-500/10 hover:text-primary-500 flex items-center justify-center transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-muted hover:bg-primary-500/10 hover:text-primary-500 flex items-center justify-center transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-primary-500">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { removeItem(item.id); toast.success("Item removed"); }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all self-start mt-1 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4">
            {/* Promo Code */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Promo code (try PIXI20)"
                  className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all"
              >
                Apply
              </button>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({count} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success font-medium">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Processing fee</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary-500">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover-glow transition-all disabled:opacity-70"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Checkout — ${finalTotal.toFixed(2)}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground">
              🔒 Secure checkout · Instant download after payment
            </p>
          </div>
        )}
      </div>
    </>
  );
}
