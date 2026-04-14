import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  printifyId: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  variantCount: number;
};

export function ProductCard({ printifyId, title, description, price, imageUrl, variantCount }: ProductCardProps) {
  return (
    <Link href={`/products/${printifyId}`} className="block">
      <Card className="group overflow-hidden border-zinc-200/70 bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">No image</div>
          )}
        </div>

        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="line-clamp-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0 rounded-full px-3">
              ${price.toFixed(2)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-zinc-600 dark:text-zinc-400">
            {description?.trim() || "Premium product from your synced Printify catalog."}
          </CardDescription>
        </CardHeader>

        <CardContent />

        <CardFooter className="border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          {variantCount} variant{variantCount === 1 ? "" : "s"}
        </CardFooter>
      </Card>
    </Link>
  );
}
