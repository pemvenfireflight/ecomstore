import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/demo-catalog";
import type { CatalogCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryPills({ active = "all" }: { active?: CatalogCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={cn(
          "rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm",
          active === "all"
            ? "border-red-400/70 bg-red-500/20 text-red-100"
            : "border-white/15 bg-white/5 text-neutral-300 hover:bg-white/10",
        )}
      >
        All
      </Link>
      {CATEGORY_INFO.map((category) => (
        <Link
          key={category.key}
          href={`/categories/${category.key}`}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm",
            active === category.key
              ? "border-red-400/70 bg-red-500/20 text-red-100"
              : "border-white/15 bg-white/5 text-neutral-300 hover:bg-white/10",
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
