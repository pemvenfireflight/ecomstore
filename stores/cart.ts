import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

export type { CartItem } from "@/lib/types";

type LegacyCartInput = {
  id: string;
  name: string;
  unitPrice: number;
  quantity?: number;
  imageUrl?: string | null;
  printifyProductId?: string;
  printifyVariantId?: number;
};

type AddItemInput = Product | LegacyCartInput;

type CartState = {
  items: CartItem[];
  isHydrated: boolean;
  addItem: (input: AddItemInput, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  markHydrated: () => void;
};

function isProduct(input: AddItemInput): input is Product {
  return (input as Product).slug !== undefined && (input as Product).priceCents !== undefined;
}

function normalizeToCartItem(input: AddItemInput, quantityOverride?: number): CartItem {
  if (isProduct(input)) {
    const qty = quantityOverride ?? 1;
    return {
      productId: input.id,
      slug: input.slug,
      title: input.title,
      image: input.image,
      priceCents: input.priceCents,
      quantity: qty,
      category: input.category,

      id: `${input.id}-${Date.now()}`,
      name: input.title,
      unitPrice: input.priceCents / 100,
      imageUrl: input.image,
      printifyProductId: input.source === "printify" ? input.id : undefined,
      printifyVariantId: undefined,
    };
  }

  const qty = quantityOverride ?? input.quantity ?? 1;
  const productId = input.printifyProductId ?? input.id;

  return {
    productId,
    slug: productId,
    title: input.name,
    image: input.imageUrl ?? "",
    priceCents: Math.round(input.unitPrice * 100),
    quantity: qty,
    category: "patriot-essentials",

    id: input.id,
    name: input.name,
    unitPrice: input.unitPrice,
    imageUrl: input.imageUrl ?? undefined,
    printifyProductId: input.printifyProductId,
    printifyVariantId: input.printifyVariantId,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isHydrated: false,
      addItem: (input, quantity = 1) =>
        set((state) => {
          const normalized = normalizeToCartItem(input, quantity);
          const existing = state.items.find(
            (item) => item.productId === normalized.productId || item.id === normalized.id,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === normalized.productId || item.id === normalized.id
                  ? { ...item, quantity: Math.min(99, item.quantity + normalized.quantity) }
                  : item,
              ),
            };
          }

          return { items: [...state.items, normalized] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId && item.id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId && item.id !== productId)
              : state.items.map((item) =>
                  item.productId === productId || item.id === productId
                    ? { ...item, quantity: Math.min(99, quantity) }
                    : item,
                ),
        })),
      clearCart: () => set({ items: [] }),
      markHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "defend-freedom-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export const cartSelectors = {
  count: (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0),
  subtotal: (items: CartItem[]) => items.reduce((total, item) => total + item.priceCents * item.quantity, 0),
};
