import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Shield, Truck } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedCatalog } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const TRUST_POINTS = [
  { label: "First-responder owned", icon: Shield },
  { label: "Fast shipping", icon: Truck },
  { label: "Quality guaranteed", icon: BadgeCheck },
];

const CATEGORY_SPOTLIGHTS = [
  {
    key: "hfd-duty",
    label: "HFD Duty",
    href: "/categories/hfd-duty",
    image: "/assets/drive/img-5353-jpeg-1TeGQx.jpg",
    copy: "Station-ready uniforms and layers",
  },
  {
    key: "hfd-explorers",
    label: "HFD Explorers",
    href: "/categories/hfd-explorers",
    image: "/assets/drive/screenshot-2026-04-19-at-8-04-00-pm-png-19n7wU.png",
    copy: "Youth and academy essentials",
  },
  {
    key: "off-duty-fire",
    label: "Off Duty Fire",
    href: "/categories/off-duty-fire",
    image: "/assets/drive/img-8534-jpg-1cnRtK.jpg",
    copy: "Lifestyle-driven fire culture pieces",
  },
  {
    key: "gba-baseball",
    label: "GBA Baseball",
    href: "/categories/gba-baseball",
    image: "/assets/drive/screenshot-2026-04-12-at-7-07-00-pm-png-1Eu-GO.png",
    copy: "Athletic cuts for game day",
  },
  {
    key: "flow-iv",
    label: "Flow IV",
    href: "/categories/flow-iv",
    image: "/assets/drive/img-6937-heic-13Mxtb.jpg",
    copy: "EMS-inspired medic identity gear",
  },
  {
    key: "patriot-essentials",
    label: "Patriot Essentials",
    href: "/categories/patriot-essentials",
    image: "/assets/drive/vivone-foam-trucker-hat-1-1H86tE.jpg",
    copy: "Caps and staple accessories",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedCatalog(8);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
        <div className="relative min-h-[430px]">
          <Image
            src="/assets/drive/img-4826-jpg-1RyfBW.jpg"
            alt="Defend Freedom Industries hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

          <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-center p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">Defend Freedom Industries</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-tight tracking-[0.04em] text-white md:text-6xl">
              Gear Built for Those Who Serve
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-zinc-200 md:text-base">
              Mission-ready apparel for firefighters, police, EMS, and community supporters — now merchandised with a cleaner, category-first shopping flow.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "bg-orange-600 text-white hover:bg-orange-500")}>
                Shop All Products
              </Link>
              <Link
                href="/categories/hfd-duty"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-zinc-200 bg-white/10 text-white hover:bg-white/20")}
              >
                Explore HFD Duty
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {TRUST_POINTS.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-100"
                >
                  <item.icon className="size-4 text-orange-300" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-[0.1em] text-zinc-900 md:text-2xl">Shop by Category</h2>
          <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-orange-600 hover:text-orange-500 md:text-sm">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORY_SPOTLIGHTS.map((category) => (
            <Link key={category.key} href={category.href} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={category.image} alt={category.label} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-white">{category.label}</p>
                  <p className="mt-1 text-xs text-zinc-200">{category.copy}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-zinc-900">Featured Products</h2>
            <p className="mt-1 text-sm text-zinc-600">Best-performing pieces from the current DFI assortment.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.08em] text-orange-600 hover:text-orange-500">
            View full catalog <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
