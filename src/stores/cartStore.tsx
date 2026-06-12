import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  author: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("pixivisual-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("pixivisual-cart", JSON.stringify(newItems));
  };

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const next = existing
        ? prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
      localStorage.setItem("pixivisual-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem("pixivisual-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems((prev) => {
      const next = prev.map((i) => i.id === id ? { ...i, quantity: qty } : i);
      localStorage.setItem("pixivisual-cart", JSON.stringify(next));
      return next;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("pixivisual-cart");
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartStore must be used within CartProvider");
  return ctx;
}
