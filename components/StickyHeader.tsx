"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

const navLinks = [
  { href: "/", label: "New In" },
  { href: "/", label: "Men" },
  { href: "/", label: "Women" },
  { href: "/", label: "Collections" },
  { href: "/", label: "Sale" },
];

export function StickyHeader() {
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-orange-200/70 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-black/85">
      <div className="border-b border-rose-300/60 bg-gradient-to-r from-orange-100 via-rose-100 to-fuchsia-100 px-4 py-1 text-center text-[10px] font-semibold tracking-[0.22em] text-rose-700 uppercase md:text-[11px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        Free shipping over $75 · New drops weekly
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.16em] text-zinc-700 uppercase transition-colors hover:text-rose-600 dark:text-zinc-300 dark:hover:text-orange-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="bg-gradient-to-r from-orange-600 via-rose-600 to-fuchsia-600 bg-clip-text text-sm font-semibold tracking-[0.18em] text-transparent uppercase md:text-base">
          Firehouse Apparel
        </Link>

        <Link
          href="/checkout"
          className="relative inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50/60 px-3 py-1.5 text-xs font-medium tracking-[0.14em] text-rose-700 uppercase transition hover:bg-rose-100 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          <ShoppingCart size={14} />
          Cart
          <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-1.5 text-[10px] text-white dark:from-orange-400 dark:to-rose-400 dark:text-zinc-900">
            {itemCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
