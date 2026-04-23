import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { getCatalog, getCatalogBySlug, formatPrice } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCatalogBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = (await getCatalog())
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(0, 3).map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                <Image src={image} alt={product.title} fill className="object-cover" sizes="200px" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <Link href="/shop" className="text-sm text-neutral-400 hover:text-neutral-300">← Back to shop</Link>
          <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500/20 text-red-100">{product.category.replace(/-/g, " ")}</Badge>
            {product.badge ? <Badge className="bg-amber-400/80 text-neutral-950">{product.badge}</Badge> : null}
          </div>
          <p className="text-neutral-300">{product.description}</p>
          <p className="text-3xl font-extrabold text-amber-300">{formatPrice(product.priceCents, product.currency)}</p>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4 text-sm text-neutral-300">
            <p>• Source: {product.source === "printify" ? "Live Printify Catalog" : "Curated Store Demo"}</p>
            <p>• Stock status: {product.inStock ? "In stock" : "Sold out"}</p>
            <p>• Category: {product.category.replace(/-/g, " ")}</p>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Related Gear</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
