import { NextResponse } from "next/server";
import { fetchPrintifyCatalog } from "@/lib/catalog";

export async function GET() {
  const products = await fetchPrintifyCatalog();

  if (products.length === 0) {
    return NextResponse.json({
      success: false,
      synced: 0,
      message:
        "No live Printify products found from environment credentials. Storefront remains in curated demo mode until PRINTIFY_API_KEY and PRINTIFY_SHOP_ID are configured.",
    });
  }

  return NextResponse.json({
    success: true,
    synced: products.length,
    message: "Live Printify catalog is available.",
  });
}
