import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";
import { PRODUCTS } from "@/component/menu/MenuSection";

export interface CartItem {
  id: string;
  key: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
  accentColor: string;
  customization?: {
    bun: string;
    protein: string;
    veggies: string[];
    cheese: string | null;
    sauces: string[];
    toast?: string | null;
  };
  dealConfiguration?: {
    stacks: string[];
    drinks: { name: string; size: string }[];
  };
}

interface CartState {
  items: Record<string, CartItem>;
  addItem: (id: string, size?: string) => void;
  removeItem: (id: string, size?: string) => void;
  removeItemCompletely: (key: string) => void;
  clearCart: () => void;
  addCustomItem: (item: CartItem) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      addItem: (id, size) => {
        set((state) => {
          // If the first argument is an existing key in the cart, use it directly
          const key = (size === undefined && state.items[id]) ? id : (size ? `${id}::${size}` : id);
          const existing = state.items[key];
          if (existing) {
            return {
              items: {
                ...state.items,
                [key]: { ...existing, quantity: existing.quantity + 1 },
              },
            };
          }

          const product = PRODUCTS.find((p) => p.id === id);
          if (!product) return state;

          let price = product.price;
          let image = product.image;
          if (size && product.sizes) {
            const sizeOpt = product.sizes.find((s) => s.label === size);
            if (sizeOpt) {
              price = sizeOpt.price;
              if (sizeOpt.image) {
                image = sizeOpt.image;
              }
            }
          }

          const newItem: CartItem = {
            id,
            key,
            name: product.name,
            image,
            price,
            size,
            quantity: 1,
            accentColor: product.accentColor,
          };

          return {
            items: {
              ...state.items,
              [key]: newItem,
            },
          };
        });
      },
      removeItem: (id, size) => {
        set((state) => {
          // If the first argument is an existing key in the cart, use it directly
          const key = (size === undefined && state.items[id]) ? id : (size ? `${id}::${size}` : id);
          const existing = state.items[key];
          if (!existing) return state;

          if (existing.quantity <= 1) {
            const nextItems = { ...state.items };
            delete nextItems[key];
            return { items: nextItems };
          }

          return {
            items: {
              ...state.items,
              [key]: { ...existing, quantity: existing.quantity - 1 },
            },
          };
        });
      },
      removeItemCompletely: (key) => {
        set((state) => {
          const nextItems = { ...state.items };
          delete nextItems[key];
          return { items: nextItems };
        });
      },
      clearCart: () => set({ items: {} }),
      addCustomItem: (customItem) => {
        set((state) => {
          const existing = state.items[customItem.key];
          if (existing) {
            return {
              items: {
                ...state.items,
                [customItem.key]: {
                  ...existing,
                  quantity: existing.quantity + customItem.quantity,
                },
              },
            };
          }
          return {
            items: {
              ...state.items,
              [customItem.key]: customItem,
            },
          };
        });
      },
    }),
    {
      name: "stackd-cart-storage",
    }
  )
);

// Safe hydration selectors for SSR compliance in Next.js
export const useCartCount = () => {
  const items = useCartStore((state) => state.items);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const total = Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  }, [items]);

  return count;
};

export const useCartTotal = () => {
  const items = useCartStore((state) => state.items);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalSum = Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalSum);
  }, [items]);

  return total;
};

export const useCartItemsList = () => {
  const items = useCartStore((state) => state.items);
  const [list, setList] = useState<CartItem[]>([]);

  useEffect(() => {
    setList(Object.values(items));
  }, [items]);

  return list;
};
