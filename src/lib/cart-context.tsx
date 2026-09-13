"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "hunter3d-cart";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addItem: (slug: string, quantity?: number, optionLabel?: string) => void;
  updateQuantity: (slug: string, quantity: number, optionLabel?: string) => void;
  removeItem: (slug: string, optionLabel?: string) => void;
  clearCart: () => void;
};

function isSameLine(item: CartItem, slug: string, optionLabel?: string) {
  return item.slug === slug && item.optionLabel === optionLabel;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Tracked as state (not a ref) so the persist effect below re-runs and sees
  // the up-to-date value once hydration lands — a ref's mutation wouldn't
  // trigger that re-run, which previously let the persist effect fire with
  // the pre-hydration (empty) closure value and overwrite real stored data.
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount. This must happen after mount (not in a
  // lazy useState initializer) because localStorage doesn't exist during SSR —
  // reading it during render would produce a client/server hydration mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from a browser-only store, not derived/cascading state
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Ignore malformed or inaccessible storage — cart just starts empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable (private mode, quota) — cart still works for this session.
    }
  }, [items, hydrated]);

  function addItem(slug: string, quantity = 1, optionLabel?: string) {
    setItems((current) => {
      const existing = current.find((item) => isSameLine(item, slug, optionLabel));
      if (existing) {
        return current.map((item) =>
          isSameLine(item, slug, optionLabel) ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, { slug, quantity, optionLabel }];
    });
  }

  function updateQuantity(slug: string, quantity: number, optionLabel?: string) {
    if (quantity <= 0) {
      removeItem(slug, optionLabel);
      return;
    }
    setItems((current) =>
      current.map((item) => (isSameLine(item, slug, optionLabel) ? { ...item, quantity } : item)),
    );
  }

  function removeItem(slug: string, optionLabel?: string) {
    setItems((current) => current.filter((item) => !isSameLine(item, slug, optionLabel)));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
