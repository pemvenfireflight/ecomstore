import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CartButton } from "@/components/cart-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "All Products" },
  { href: "/categories/hfd-duty", label: "HFD Duty" },
  { href: "/categories/hfd-explorers", label: "HFD Explorers" },
  { href: "/shop?q=hat", label: "Headwear" },
  { href: "/shop?q=hoodie", label: "Hoodies" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 text-zinc-900 backdrop-blur">
      <div className="bg-orange-500 px-4 py-1 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white">
        First Responder Owned • Fast U.S. Shipping
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-black tracking-[0.3em] text-white">DFI</span>
          <span className="text-sm font-semibold tracking-[0.08em] uppercase group-hover:text-orange-600">Defend Freedom Industries</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 transition hover:text-orange-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/shop" className={cn(buttonVariants({ size: "sm" }), "hidden bg-zinc-900 text-white hover:bg-zinc-800 md:inline-flex")}>
            Shop Now
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
