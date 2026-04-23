import { notFound } from "next/navigation";
import { CategoryPills } from "@/components/category-pills";
import { ProductGrid } from "@/components/product-grid";
import { getCatalogByCategory, getCategoryInfo } from "@/lib/catalog";
import type { CatalogCategory } from "@/lib/types";

const ALLOWED = new Set<CatalogCategory>([
  "hfd-duty",
  "hfd-explorers",
  "off-duty-fire",
  "gba-baseball",
  "flow-iv",
  "patriot-essentials",
]);

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: CatalogCategory }>;
}) {
  const { category } = await params;

  if (!ALLOWED.has(category) || category === "all") {
    notFound();
  }

  const info = getCategoryInfo(category);
  const products = await getCatalogByCategory(category);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6">
        <p className="text-xs uppercase tracking-wide text-red-200">Category</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{info.label}</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">{info.description}</p>
        <div className="mt-4">
          <CategoryPills active={category} />
        </div>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
