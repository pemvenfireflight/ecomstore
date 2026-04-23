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
          "rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition md:text-sm",
          active === "all"
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-300 bg-white text-zinc-700 hover:border-orange-500 hover:text-orange-600",
        )}
      >
        All
      </Link>
      {CATEGORY_INFO.map((category) => (
        <Link
          key={category.key}
          href={`/categories/${category.key}`}
          className={cn(
            "rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition md:text-sm",
            active === category.key
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 bg-white text-zinc-700 hover:border-orange-500 hover:text-orange-600",
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
