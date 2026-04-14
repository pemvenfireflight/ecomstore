"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";

type Variant = {
  id: number;
  title: string;
  price: number;
  is_enabled?: boolean;
};

type ProductDetailClientProps = {
  productId: string;
  title: string;
  description: string | null;
  fallbackPrice: number;
  imageUrls: string[];
  variants: Variant[];
};

function splitVariantTitle(title: string) {
  const [color, size] = title.split("/").map((part) => part.trim());
  return {
    color: color || "Default",
    size: size || "One Size",
  };
}

export function ProductDetailClient({
  productId,
  title,
  description,
  fallbackPrice,
  imageUrls,
  variants,
}: ProductDetailClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);

  const enabledVariants = useMemo(
    () => variants.filter((variant) => variant.is_enabled !== false),
    [variants],
  );

  const colorOptions = useMemo(() => {
    return Array.from(new Set(enabledVariants.map((variant) => splitVariantTitle(variant.title).color)));
  }, [enabledVariants]);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0] ?? "Default");

  const sizeOptions = useMemo(() => {
    return enabledVariants
      .filter((variant) => splitVariantTitle(variant.title).color === selectedColor)
      .map((variant) => splitVariantTitle(variant.title).size);
  }, [enabledVariants, selectedColor]);

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] ?? "One Size");

  const currentVariant = useMemo(() => {
    return (
      enabledVariants.find((variant) => {
        const parsed = splitVariantTitle(variant.title);
        return parsed.color === selectedColor && parsed.size === selectedSize;
      }) ?? enabledVariants[0]
    );
  }, [enabledVariants, selectedColor, selectedSize]);

  const price = currentVariant ? currentVariant.price / 100 : fallbackPrice;

  const images = imageUrls;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section className="space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          {images.length ? (
            <Image
              src={images[selectedImage]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">No image available</div>
          )}
        </div>

        {images.length ? (
          <div className="grid grid-cols-5 gap-2">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square overflow-hidden rounded-lg border ${
                  selectedImage === idx ? "border-zinc-900 dark:border-zinc-100" : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                <Image src={src} alt={`${title} thumbnail ${idx + 1}`} fill className="object-cover" sizes="20vw" />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Product Detail</p>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description || "Premium firefighter-themed tee."}</p>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
          <div className="space-y-2">
            <p className="text-sm font-medium">Color</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color);
                    const nextSize =
                      enabledVariants
                        .map((variant) => splitVariantTitle(variant.title))
                        .find((parsed) => parsed.color === color)?.size ?? "One Size";
                    setSelectedSize(nextSize);
                  }}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    selectedColor === color
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {color.replace(/^Solid\s+/i, "")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border px-3 py-1 text-sm ${
                    selectedSize === size
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={() => {
              if (!currentVariant) return;
              addItem({
                id: `${productId}:${currentVariant.id}`,
                name: `${title} (${selectedColor.replace(/^Solid\s+/i, "")}, ${selectedSize})`,
                unitPrice: price,
                quantity: 1,
                imageUrl: images[0] ?? null,
                printifyProductId: productId,
                printifyVariantId: currentVariant.id,
              });
            }}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </section>
    </div>
  );
}
