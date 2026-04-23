"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Review = {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewsProps = {
  productId: string;
};

export function Reviews({ productId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      const body = (await response.json()) as { success: boolean; reviews?: Review[]; message?: string };
      if (!response.ok || !body.success) {
        throw new Error(body.message || "Could not load reviews.");
      }
      setReviews(body.reviews ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load reviews.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadReviews();
  }, [loadReviews]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          reviewerName: name,
          rating,
          comment,
        }),
      });
      const body = (await response.json()) as { success: boolean; message?: string };
      if (!response.ok || !body.success) {
        throw new Error(body.message || "Could not submit review.");
      }
      setName("");
      setRating(5);
      setComment("");
      await loadReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>

      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Leave a Review</p>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-700 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <select
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-700 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value === 1 ? "" : "s"}
            </option>
          ))}
        </select>
        <textarea
          required
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your feedback"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-700 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Submit Review"}
        </Button>
      </form>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-zinc-500">Loading reviews...</p>
      ) : !reviews.length ? (
        <p className="text-sm text-zinc-500">No reviews yet. Be the first to review this product.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">{review.reviewer_name}</p>
                <p className="text-sm text-zinc-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{review.comment}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
