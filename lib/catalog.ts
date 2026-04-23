import { CATEGORY_INFO, DEMO_PRODUCTS } from "@/lib/demo-catalog";
import type { Product, CatalogCategory } from "@/lib/types";

type PrintifyProduct = {
  id: string;
  title?: string;
  description?: string;
  images?: Array<{ src?: string }>;
  tags?: string[];
  visible?: boolean;
  variants?: Array<{ id?: number; is_enabled?: boolean; price?: number }>;
  created_at?: string;
};

const CATEGORY_BY_TOKEN: Record<string, Exclude<CatalogCategory, "all">> = {
  hfd: "hfd-duty",
  duty: "hfd-duty",
  explorer: "hfd-explorers",
  explorers: "hfd-explorers",
  off: "off-duty-fire",
  fire: "off-duty-fire",
  gba: "gba-baseball",
  baseball: "gba-baseball",
  flow: "flow-iv",
  iv: "flow-iv",
  ems: "flow-iv",
  patriot: "patriot-essentials",
  freedom: "patriot-essentials",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function detectCategory(title: string, tags: string[]): Exclude<CatalogCategory, "all"> {
  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();

  for (const [token, category] of Object.entries(CATEGORY_BY_TOKEN)) {
    if (haystack.includes(token)) {
      return category;
    }
  }

  return "patriot-essentials";
}

function normalizePrintifyProduct(item: PrintifyProduct): Product | null {
  const title = item.title?.trim() || "Unnamed Product";
  const slug = slugify(title);
  if (!slug || !item.id) {
    return null;
  }

  const enabledVariant = item.variants?.find((variant) => variant.is_enabled !== false);
  const primaryImage = item.images?.[0]?.src;
  if (!primaryImage) {
    return null;
  }

  const tags = item.tags ?? [];
  const category = detectCategory(title, tags);

  return {
    id: item.id,
    slug,
    title,
    description: item.description?.trim() || "Premium apparel built for those who serve.",
    priceCents: enabledVariant?.price ?? 0,
    currency: "USD",
    category,
    badge: item.visible ? undefined : "Draft",
    tags,
    image: primaryImage,
    images: item.images?.map((img) => img.src).filter((value): value is string => Boolean(value)) ?? [primaryImage],
    featured: false,
    inStock: Boolean(enabledVariant),
    source: "printify",
    sourceUrl: `https://printify.com/app/products/${item.id}`,
  };
}

export async function fetchPrintifyCatalog(): Promise<Product[]> {
  const apiKey = process.env.PRINTIFY_API_KEY;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiKey || !shopId) {
    return [];
  }

  const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "defend-freedom-storefront/1.0",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as { data?: PrintifyProduct[] };
  const products = payload.data ?? [];

  return products
    .map(normalizePrintifyProduct)
    .filter((value): value is Product => Boolean(value))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getCatalog(): Promise<Product[]> {
  const printifyProducts = await fetchPrintifyCatalog();
  if (printifyProducts.length > 0) {
    return printifyProducts;
  }

  return DEMO_PRODUCTS;
}

export async function getFeaturedCatalog(limit = 6): Promise<Product[]> {
  const products = await getCatalog();
  const featured = products.filter((product) => product.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getCatalogBySlug(slug: string): Promise<Product | null> {
  const products = await getCatalog();
  return products.find((product) => product.slug === slug) ?? null;
}

export function getCategoryInfo(category: Exclude<CatalogCategory, "all">) {
  return CATEGORY_INFO.find((item) => item.key === category) ?? CATEGORY_INFO[0];
}

export async function getCatalogByCategory(category: Exclude<CatalogCategory, "all">): Promise<Product[]> {
  const products = await getCatalog();
  return products.filter((product) => product.category === category);
}

export function formatPrice(priceCents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(priceCents / 100);
}
