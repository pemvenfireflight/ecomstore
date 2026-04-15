import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { SyncButton } from "@/components/SyncButton";

const stylePills = ["Utility Tees", "Oversized Fits", "Station Basics", "Graphic Drops", "Layering Pieces"];

const promoTiles = [
  {
    title: "Fresh Graphics",
    subtitle: "Weekly capsule drops inspired by real station life.",
    tone: "from-rose-500/10 to-fuchsia-500/10 border-rose-300/70 dark:border-rose-900/70",
  },
  {
    title: "Uniform Off-Duty",
    subtitle: "Relaxed essentials for downtime, travel, and training days.",
    tone: "from-cyan-500/10 to-sky-500/10 border-cyan-300/70 dark:border-cyan-900/70",
  },
  {
    title: "Built to Repeat",
    subtitle: "Everyday staples designed for heavy rotation and clean fits.",
    tone: "from-amber-500/15 to-orange-500/10 border-amber-300/70 dark:border-amber-900/70",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfb_0%,#ffffff_35%,#fff8f1_100%)] text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-4 py-8 md:gap-16 md:px-8 md:py-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-between rounded-3xl border border-orange-200/80 bg-[linear-gradient(160deg,#fff8f1,#fff,#fff3e8)] p-8 md:p-12 dark:border-zinc-800 dark:bg-zinc-950/60">
            <div className="space-y-5">
              <p className="text-[11px] font-medium tracking-[0.22em] text-orange-700 uppercase dark:text-orange-300">Spring 2026 Collection</p>
              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Built for duty.
                <br /> Styled for every day.
              </h1>
              <p className="max-w-lg text-sm text-zinc-600 md:text-base dark:text-zinc-300">
                A clean, urban-inspired lineup of responder-driven apparel. Minimal palettes, bold graphics,
                and premium blanks that move from shift to street.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#shop"
                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-white uppercase transition hover:from-orange-600 hover:to-rose-600 dark:from-orange-400 dark:to-rose-400 dark:text-zinc-900 dark:hover:from-orange-300 dark:hover:to-rose-300"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/checkout"
                className="rounded-full border border-orange-300 bg-white/70 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-orange-700 uppercase transition hover:bg-orange-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                View Cart
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-300/70 bg-[radial-gradient(circle_at_20%_20%,#ffe6f0,transparent_42%),radial-gradient(circle_at_80%_10%,#fff3c4,transparent_34%),linear-gradient(135deg,#7c3aed,#ec4899_55%,#f97316)] p-8 text-white md:p-10 dark:border-zinc-700">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[11px] tracking-[0.22em] uppercase text-zinc-300">Editor Picks</p>
                <h2 className="max-w-md text-3xl font-medium leading-tight md:text-4xl">
                  Utility-driven silhouettes. City-ready comfort.
                </h2>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[11px] tracking-[0.12em] uppercase md:grid-cols-3">
                {stylePills.map((pill) => (
                  <span key={pill} className="rounded-full border border-white/45 bg-black/15 px-3 py-2 text-center backdrop-blur-sm">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {promoTiles.map((tile) => (
            <article
              key={tile.title}
              className={`space-y-2 rounded-2xl border bg-gradient-to-br ${tile.tone} p-6`}
            >
              <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">{tile.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{tile.subtitle}</p>
            </article>
          ))}
        </section>

        <section id="shop" className="space-y-6">
          <div className="flex flex-col gap-4 border-b border-orange-200/80 pb-4 md:flex-row md:items-end md:justify-between dark:border-zinc-800">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] text-rose-600 uppercase dark:text-rose-300">Shop</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">New In This Week</h2>
              <p className="mt-1 text-xs tracking-[0.16em] text-zinc-500 uppercase">Curated for everyday wear</p>
            </div>
            <SyncButton />
          </div>

          <ProductGrid />
        </section>
      </main>
    </div>
  );
}
