"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/catalog";
import { cartSelectors, useCartStore } from "@/stores/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const [checkoutMessage, setCheckoutMessage] = useState<string>("");

  const subtotal = useMemo(() => cartSelectors.subtotal(items), [items]);

  async function handleCheckout() {
    setCheckoutMessage("Preparing checkout...");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const payload = (await response.json()) as { checkoutUrl?: string; message?: string };

    if (payload.checkoutUrl) {
      window.location.href = payload.checkoutUrl;
      return;
    }

    setCheckoutMessage(payload.message ?? "Checkout is not configured yet.");
  }

  if (!isHydrated) {
    return <p className="text-sm text-neutral-400">Loading cart...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-8 text-center">
          <p className="text-neutral-300">Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-amber-300 hover:text-amber-200">
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.productId} className="grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-4 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="90px" />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-neutral-400">{formatPrice(item.priceCents)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(event) => setQuantity(item.productId, Number(event.target.value || 1))}
                    className="w-16 border-white/15 bg-neutral-950 text-white"
                  />
                  <Button variant="ghost" className="text-red-300 hover:text-red-200" onClick={() => removeItem(item.productId)}>
                    Remove
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-5">
            <h2 className="text-xl font-semibold text-white">Order Summary</h2>
            <div className="flex items-center justify-between text-sm text-neutral-300">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Button className="w-full bg-red-600 text-white hover:bg-red-500" onClick={handleCheckout}>
              Secure Checkout
            </Button>
            <Button variant="outline" className="w-full border-white/20 bg-white/5 text-white" onClick={clearCart}>
              Clear Cart
            </Button>
            {checkoutMessage ? <p className="text-xs text-amber-200">{checkoutMessage}</p> : null}
          </aside>
        </div>
      )}
    </div>
  );
}
