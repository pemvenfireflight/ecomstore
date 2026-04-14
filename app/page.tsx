import { ProductGrid } from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 md:px-10">
        <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Field-Tested Apparel</p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Built for first responders. Designed for everyday wear.
          </h1>
          <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
            Explore tactical-inspired, station-pride styles across fire, rescue, law enforcement, and
            healthcare themes. Premium print quality, trusted fulfillment, and straightforward checkout.
          </p>
        </header>

        <ProductGrid />
      </main>
    </div>
  );
}
