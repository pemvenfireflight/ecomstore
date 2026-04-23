"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cartSelectors, useCartStore } from "@/stores/cart";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const count = cartSelectors.count(items);

  return (
    <Link
      href="/cart"
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "relative border-white/20 bg-white/5 text-white hover:bg-white/10",
      )}
    >
      <ShoppingCart className="mr-1.5 size-4" />
      Cart
      <span className="ml-1.5 rounded-md bg-amber-400/90 px-1.5 py-0.5 text-xs font-semibold text-neutral-950">
        {count}
      </span>
    </Link>
  );
}
