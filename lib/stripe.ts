import Stripe from "stripe";

const stripeClient = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
      appInfo: {
        name: "Defend Freedom Industries Storefront",
      },
    })
  : null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return stripeClient;
}
