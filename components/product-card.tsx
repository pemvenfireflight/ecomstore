"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/catalog";
import { useCartStore } from "@/stores/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 md:text-base">{product.title}</h3>
          {product.badge ? <Badge className="bg-orange-500 text-white">{product.badge}</Badge> : null}
        </div>

        <p className="line-clamp-2 text-xs text-zinc-500 md:text-sm">{product.description}</p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-sm font-bold text-zinc-900 md:text-base">{formatPrice(product.priceCents, product.currency)}</span>
          <Button
            className="bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={() => addItem(product, 1)}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add" : "Sold Out"}
          </Button>
        </div>
      </div>
    </article>
  );
}
