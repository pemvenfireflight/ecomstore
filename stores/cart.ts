import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string | null;
  printifyProductId?: string;
  printifyVariantId?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((x) => x.id === item.id);
      if (!existing) {
        return { items: [...state.items, item] };
      }

      return {
        items: state.items.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + item.quantity } : x,
        ),
      };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set({ items: [] }),
}));
