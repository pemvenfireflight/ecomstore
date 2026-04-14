"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SalesItem = {
  id: string;
  city: string;
  region: string;
  productName: string;
};

export function SalesPop() {
  const [items, setItems] = useState<SalesItem[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/sales-pop", { cache: "no-store" });
        const body = (await response.json()) as { success: boolean; items?: SalesItem[] };
        if (!cancelled && response.ok && body.success) {
          setItems(body.items ?? []);
        }
      } catch {
        // swallow: sales pop is non-critical UI
      }
    }

    void load();
    const refreshTimer = window.setInterval(load, 120000);

    return () => {
      cancelled = true;
      window.clearInterval(refreshTimer);
    };
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const cycleTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 20000);
    return () => window.clearInterval(cycleTimer);
  }, [items]);

  const current = useMemo(() => {
    if (!items.length) return null;
    return items[index % items.length];
  }, [index, items]);

  if (!current) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 hidden sm:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: -24, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -24, y: 12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-auto max-w-xs rounded-xl border border-zinc-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Recent Purchase</p>
          <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
            Someone in {current.city}, {current.region} just bought a {current.productName}!
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
