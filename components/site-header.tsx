import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CartButton } from "@/components/cart-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/categories/hfd-duty", label: "HFD Duty" },
  { href: "/categories/off-duty-fire", label: "Off Duty Fire" },
  { href: "/categories/flow-iv", label: "Flow IV" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="rounded-md border border-red-400/50 bg-red-500/20 px-2 py-1 text-xs font-semibold tracking-widest text-red-100">
            DFI
          </span>
          <span className="text-sm font-semibold tracking-wide text-white group-hover:text-amber-200">
            Defend Freedom Industries
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-neutral-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden bg-red-600 text-white hover:bg-red-500 md:inline-flex",
            )}
          >
            Explore Gear
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
