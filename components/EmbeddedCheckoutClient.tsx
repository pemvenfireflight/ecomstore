"use client";

import { useMemo, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createEmbeddedCheckoutSession } from "@/app/actions/stripe";
import { useCartStore } from "@/stores/cart";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function EmbeddedCheckoutClient() {
  const items = useCartStore((state) => state.items);
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(
    () => ({
      fetchClientSecret: async () => {
        setError(null);
        try {
          const result = await createEmbeddedCheckoutSession({ items });
          return result.clientSecret;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Could not start Stripe checkout.";
          setError(message);
          throw err;
        }
      },
    }),
    [items],
  );

  if (!publishableKey || !stripePromise) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local.
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
        Your cart is empty. Add items before checkout.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          ...options,
          onComplete: () => {
            window.location.href = "/checkout/return";
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
