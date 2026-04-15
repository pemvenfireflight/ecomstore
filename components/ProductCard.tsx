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
      <Card className="group overflow-hidden rounded-none border-zinc-200 bg-transparent shadow-none transition-all dark:border-zinc-800">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(155deg,#f4f4f5,#d4d4d8)] text-zinc-700 dark:bg-[linear-gradient(155deg,#18181b,#27272a)] dark:text-zinc-300">
              <span className="text-[10px] tracking-[0.22em] uppercase">Firehouse Apparel</span>
              <span className="mt-2 text-xs tracking-[0.16em] uppercase">Coming Soon</span>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-zinc-900 uppercase">
            New
          </span>
        </div>

        <CardHeader className="space-y-2 px-0 pt-4">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-2 text-sm font-medium tracking-[0.03em] text-zinc-900 dark:text-zinc-100">
              {title}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0 rounded-full px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
              ${price.toFixed(2)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
            {description?.trim() || "Premium product from your synced Printify catalog."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0" />

        <CardFooter className="border-t border-zinc-200 px-0 pt-3 text-[11px] tracking-[0.1em] text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
          {variantCount} variant{variantCount === 1 ? "" : "s"}
        </CardFooter>
      </Card>
    </Link>
  );
}
