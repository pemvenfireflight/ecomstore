import { CategoryPills } from "@/components/category-pills";
import { ProductGrid } from "@/components/product-grid";
import { Input } from "@/components/ui/input";
import { getCatalog } from "@/lib/catalog";

function sortProducts(products: Awaited<ReturnType<typeof getCatalog>>, sort: string) {
  if (sort === "price-asc") {
    return [...products].sort((a, b) => a.priceCents - b.priceCents);
  }
  if (sort === "price-desc") {
    return [...products].sort((a, b) => b.priceCents - a.priceCents);
  }
  return [...products].sort((a, b) => a.title.localeCompare(b.title));
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "featured" } = await searchParams;
  const allProducts = await getCatalog();

  const filtered = allProducts.filter((product) => {
    const haystack = `${product.title} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q.toLowerCase());
  });

  const products = sortProducts(filtered, sort);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-3xl font-black uppercase tracking-[0.08em] text-zinc-900">Shop All Products</h1>
        <p className="mt-2 text-sm text-zinc-600">
          {products.length} item{products.length === 1 ? "" : "s"} available.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
          <form action="/shop" className="space-y-2">
            <Input
              name="q"
              defaultValue={q}
              placeholder="Search by keyword (hoodie, ems, duty, patriot...)"
              className="border-zinc-300 bg-white text-zinc-900"
            />
          </form>
          <form action="/shop">
            <input type="hidden" name="q" value={q} />
            <select
              name="sort"
              defaultValue={sort}
              className="h-8 w-full rounded-lg border border-zinc-300 bg-white px-2 text-sm text-zinc-900"
            >
              <option value="featured">Sort: Featured / A-Z</option>
              <option value="price-asc">Sort: Price low to high</option>
              <option value="price-desc">Sort: Price high to low</option>
            </select>
          </form>
        </div>
        <div className="mt-4">
          <CategoryPills />
        </div>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
