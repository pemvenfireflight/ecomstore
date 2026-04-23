import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

type CheckoutItem = {
  title: string;
  quantity: number;
  priceCents: number;
  image?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { items?: CheckoutItem[] } | null;
  const items = body?.items ?? [];

  if (items.length === 0) {
    return NextResponse.json({ message: "Cart is empty." }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_APP_URL) {
    return NextResponse.json({
      message:
        "Checkout not configured yet. Add STRIPE_SECRET_KEY + NEXT_PUBLIC_APP_URL to enable secure card checkout.",
    });
  }

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?checkout=cancelled`,
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.max(100, item.priceCents),
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : undefined,
          },
        },
      })),
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
