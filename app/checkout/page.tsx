import { EmbeddedCheckoutClient } from "@/components/EmbeddedCheckoutClient";

export default function CheckoutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 md:px-10">
      <header className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Secure Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight">Complete your payment</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Payments are processed securely by Stripe Embedded Checkout.
        </p>
      </header>

      <EmbeddedCheckoutClient />
    </main>
  );
}
