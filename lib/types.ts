export type CatalogCategory =
  | "all"
  | "hfd-duty"
  | "hfd-explorers"
  | "off-duty-fire"
  | "gba-baseball"
  | "flow-iv"
  | "patriot-essentials";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  category: Exclude<CatalogCategory, "all">;
  badge?: string;
  tags: string[];
  image: string;
  images: string[];
  featured?: boolean;
  inStock: boolean;
  sourceUrl?: string;
  source: "demo" | "printify";
};

export type CategoryInfo = {
  key: Exclude<CatalogCategory, "all">;
  label: string;
  description: string;
};

export type CartItem = {
  // New storefront fields
  productId: string;
  slug: string;
  title: string;
  image: string;
  priceCents: number;
  quantity: number;
  category: Exclude<CatalogCategory, "all">;

  // Backward-compatible fields used by legacy checkout flow
  id: string;
  name: string;
  unitPrice: number;
  imageUrl?: string;
  printifyProductId?: string;
  printifyVariantId?: number;
};
