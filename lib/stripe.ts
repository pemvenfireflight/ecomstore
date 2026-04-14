import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === "production") {
  console.warn("[stripe] STRIPE_SECRET_KEY is missing during build/runtime initialization.");
}

const stripeClient = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-03-25.dahlia",
      appInfo: {
        name: "CCS E-commerce",
        version: "0.1.0",
      },
      typescript: true,
    })
  : null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    throw new Error("STRIPE_SECRET_KEY is missing.");
  }

  return stripeClient;
}
