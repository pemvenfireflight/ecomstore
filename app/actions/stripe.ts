"use server";

import crypto from "node:crypto";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import type { CartItem } from "@/stores/cart";

export type CreateEmbeddedCheckoutInput = {
  items: CartItem[];
  customerEmail?: string;
};

function toStripeLineItem(item: CartItem) {
  return {
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.unitPrice * 100),
      product_data: {
        name: item.name,
        images: item.imageUrl ? [item.imageUrl] : undefined,
        metadata: {
          printify_product_id: item.printifyProductId ?? "",
          printify_variant_id: item.printifyVariantId ? String(item.printifyVariantId) : "",
          cart_item_id: item.id,
        },
      },
    },
  };
}

export async function createEmbeddedCheckoutSession(input: CreateEmbeddedCheckoutInput) {
  if (!input.items?.length) {
    throw new Error("Cart is empty.");
  }

  const invalid = input.items.find((item) => item.quantity <= 0 || item.unitPrice < 0);
  if (invalid) {
    throw new Error(`Invalid cart item: ${invalid.id}`);
  }

  const orderId = crypto.randomUUID();
  const amountTotal = input.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const supabase = getSupabaseAdminClient();
  const { error: orderError } = await supabase.from("orders").upsert(
    {
      id: orderId,
      status: "Pending",
      cart_items: input.items,
      amount_total: Number(amountTotal.toFixed(2)),
      currency: "usd",
      customer_email: input.customerEmail ?? null,
    },
    { onConflict: "id" },
  );

  if (orderError) {
    throw new Error(`Could not persist order draft: ${orderError.message}`);
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: `${appUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    line_items: input.items.map(toStripeLineItem),
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    billing_address_collection: "required",
    metadata: {
      order_id: orderId,
    },
  });

  if (!session.client_secret) {
    throw new Error("Stripe session did not return a client secret.");
  }

  const { error: linkError } = await supabase
    .from("orders")
    .update({ stripe_session_id: session.id })
    .eq("id", orderId);

  if (linkError) {
    throw new Error(`Could not link Stripe session to order: ${linkError.message}`);
  }

  return { clientSecret: session.client_secret, sessionId: session.id, orderId };
}
