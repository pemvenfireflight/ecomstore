import { ProductCard } from "@/components/ProductCard";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type ProductRecord = {
  printify_id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  image_urls: string[] | null;
  variants: Array<unknown> | null;
};

export async function ProductGrid() {
  let products: ProductRecord[] = [];
  let errorMessage: string | null = null;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("printify_id,title,description,price,image_url,image_urls,variants")
      .order("created_at", { ascending: false });

    if (error) {
      errorMessage = error.message;
    } else {
      products = (data ?? []) as ProductRecord[];
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to load products.";
  }

  if (errorMessage) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        Could not load products: {errorMessage}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
        No products synced yet. Click Sync to pull from Printify.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.printify_id}
          printifyId={product.printify_id}
          title={product.title}
          description={product.description}
          price={Number(product.price || 0)}
          imageUrl={product.image_url}
          variantCount={Array.isArray(product.variants) ? product.variants.length : 0}
        />
      ))}
    </section>
  );
}
