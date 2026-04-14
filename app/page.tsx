import { ProductGrid } from "@/components/ProductGrid";
import { SyncButton } from "@/components/SyncButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:px-10">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Admin</p>
            <h1 className="text-3xl font-semibold tracking-tight">Product Catalog</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sync published Printify products and render a premium storefront grid.
            </p>
          </div>
          <SyncButton />
        </header>

        <ProductGrid />
      </main>
    </div>
  );
}
