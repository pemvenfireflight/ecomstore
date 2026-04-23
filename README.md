# Defend Freedom Industries Storefront

Modern Next.js ecommerce storefront for Defend Freedom Industries.

## What is implemented

- Brand-forward homepage + category navigation
- Full shop catalog with search + sort
- Product detail pages
- Cart state with persistent local storage (Zustand)
- Checkout API scaffold with Stripe session support
- Live Printify catalog mode (when env vars are configured)
- Demo catalog fallback mode (works out of the box)
- `/api/catalog` and `/api/sync` operational routes

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://127.0.0.1:3000

## Environment notes

- If `PRINTIFY_API_KEY` + `PRINTIFY_SHOP_ID` are set, storefront pulls live products.
- If Printify env is missing/invalid, storefront automatically serves curated demo products.
- If Stripe env vars are missing, `/api/checkout` returns a clear setup message instead of failing hard.
