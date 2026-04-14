import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type ReviewRow = {
  id: number;
  product_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ success: false, message: "productId is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id,product_id,reviewer_name,rating,comment,created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, reviews: (data ?? []) as ReviewRow[] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load reviews.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      reviewerName?: string;
      rating?: number;
      comment?: string;
    };

    if (!body.productId || !body.reviewerName || !body.comment || !body.rating) {
      return NextResponse.json({ success: false, message: "Missing required review fields." }, { status: 400 });
    }

    const rating = Number(body.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("reviews").insert({
      product_id: body.productId,
      reviewer_name: body.reviewerName.trim(),
      rating,
      comment: body.comment.trim(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save review.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
