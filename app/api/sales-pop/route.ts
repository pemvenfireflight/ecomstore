import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type SalesPopRow = {
  id: string;
  shipping_address: {
    city?: string;
    state?: string;
    country?: string;
  } | null;
  cart_items:
    | Array<{
        name?: string;
      }>
    | null;
  paid_at: string | null;
};

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("id,shipping_address,cart_items,paid_at")
      .eq("status", "Paid")
      .order("paid_at", { ascending: false })
      .limit(5);

    if (error) {
      throw new Error(error.message);
    }

    const rows = ((data ?? []) as SalesPopRow[]).map((row) => ({
      id: row.id,
      city: row.shipping_address?.city ?? "your area",
      region: row.shipping_address?.state ?? row.shipping_address?.country ?? "US",
      productName: row.cart_items?.[0]?.name ?? "Fire Engine Tee",
    }));

    return NextResponse.json({ success: true, items: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load sales pop feed.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
