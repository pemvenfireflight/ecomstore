import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing.");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-03-25.dahlia",
  appInfo: {
    name: "CCS E-commerce",
    version: "0.1.0",
  },
  typescript: true,
});
