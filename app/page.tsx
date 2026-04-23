import Link from "next/link";
import { ArrowRight, Flame, Shield, Shirt } from "lucide-react";
import { CategoryPills } from "@/components/category-pills";
import { ProductGrid } from "@/components/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedCatalog } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  {
    title: "Built for Service",
    description: "Durable, mission-inspired apparel designed for firefighters, EMS, and military families.",
    icon: Shield,
  },
  {
    title: "Shift to Street",
    description: "Uniform-adjacent comfort that works on duty, off duty, and everywhere in between.",
    icon: Shirt,
  },
  {
    title: "Pride in Every Stitch",
    description: "From station houses to ballfields, every drop honors commitment and courage.",
    icon: Flame,
  },
];

export default async function HomePage() {
  const featured = await getFeaturedCatalog(6);

  return (
    <div className="space-y-14">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-900/50 via-neutral-950 to-amber-900/30 p-8 md:p-12">
        <div className="max-w-3xl space-y-5">
          <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-400/20 px-3 py-1 text-xs font-semibold tracking-wide text-amber-100">
            Gear Up. Stand Proud. Defend Freedom.
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Premium apparel built for those who serve and protect.
          </h1>
          <p className="text-base text-neutral-200 md:text-lg">
            Defend Freedom Industries designs bold apparel for firefighters, police, EMS, and military communities. Functional. Durable. Worn with pride.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "bg-red-600 text-white hover:bg-red-500")}>Shop Collection</Link>
            <Link href="/categories/hfd-duty" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white/20 bg-white/5 text-white hover:bg-white/10")}>
              Explore HFD Duty
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {VALUE_PROPS.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5">
            <item.icon className="size-5 text-red-300" />
            <h2 className="mt-3 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-neutral-400">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Drops</h2>
            <p className="mt-1 text-sm text-neutral-400">Fresh picks from top-performing responder collections.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-medium text-amber-300 hover:text-amber-200">
            View all products <ArrowRight className="size-4" />
          </Link>
        </div>
        <CategoryPills />
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
