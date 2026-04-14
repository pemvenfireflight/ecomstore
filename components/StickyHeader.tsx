"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export function StickyHeader() {
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Firehouse Apparel
        </Link>

        <Link href="/checkout" className="relative inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700">
          <ShoppingCart size={16} />
          Cart
          <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">
            {itemCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
