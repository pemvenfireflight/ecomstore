import { NextResponse } from "next/server";
import { fetchPrintifyProducts } from "@/lib/printify";
import { getSupabaseAdminClient, type ProductRow } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const printifyProducts = await fetchPrintifyProducts();
    const supabase = getSupabaseAdminClient();

    const mappedProducts: ProductRow[] = printifyProducts.map((product) => {
      const firstEnabledVariant =
        product.variants?.find((variant) => variant.is_enabled) ?? product.variants?.[0];

      return {
        printify_id: product.id,
        title: product.title,
        description: product.description ?? null,
        price: firstEnabledVariant ? Number((firstEnabledVariant.price / 100).toFixed(2)) : 0,
        image_url: product.images?.[0]?.src ?? null,
        image_urls: (product.images ?? []).map((image) => image.src),
        variants: product.variants ?? [],
      };
    });

    const { error } = await supabase
      .from("products")
      .upsert(mappedProducts, { onConflict: "printify_id" });

    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      synced: mappedProducts.length,
      message: `Synced ${mappedProducts.length} products successfully.`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync failure.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
