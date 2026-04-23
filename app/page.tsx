import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Shield, Truck } from "lucide-react";
import { CategoryPills } from "@/components/category-pills";
import { ProductGrid } from "@/components/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedCatalog } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const PROMO_CARDS = [
  {
    title: "Duty Ready",
    copy: "Performance-driven layers, tees, and outerwear built for station and street.",
    image: "/assets/drive/img-5353-jpeg-1TeGQx.jpg",
  },
  {
    title: "Headwear Drop",
    copy: "Snapbacks and trucker styles designed to hold shape and rep the crew.",
    image: "/assets/drive/screenshot-2026-04-21-at-2-00-20-pm-png-1aO_6I.png",
  },
];

const TRUST_POINTS = [
  { label: "First-responder owned", icon: Shield },
  { label: "Fast shipping", icon: Truck },
  { label: "Quality guaranteed", icon: BadgeCheck },
];

export default async function HomePage() {
  const featured = await getFeaturedCatalog(8);

  return (
    <div className="space-y-12">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">Defend Freedom Industries</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[0.04em] text-zinc-900 md:text-5xl">
            Gear Built for Those Who Serve.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-600 md:text-base">
            Updated product lineup sourced from your live DFI catalog and spreadsheet, now merchandised in a denser, storefront-style shopping layout inspired by major responder gear retailers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "bg-zinc-900 text-white hover:bg-zinc-800")}>
              Shop All Products
            </Link>
            <Link href="/categories/hfd-duty" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100")}>
              Explore HFD Duty
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {TRUST_POINTS.map((item) => (
              <div key={item.label} className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-700">
                <item.icon className="size-4 text-orange-500" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {PROMO_CARDS.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="relative aspect-[16/10]">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold uppercase tracking-[0.08em] text-zinc-900">{card.title}</h2>
                <p className="mt-2 text-sm text-zinc-600">{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-zinc-900">Featured Products</h2>
            <p className="mt-1 text-sm text-zinc-600">Complete current DFI assortment with updated merchandising and search/filter support.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.08em] text-orange-600 hover:text-orange-500">
            View full catalog <ArrowRight className="size-4" />
          </Link>
        </div>
        <CategoryPills />
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
