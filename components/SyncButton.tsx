"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type SyncResponse = {
  success: boolean;
  synced?: number;
  message: string;
};

export function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function onSync() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/sync", { method: "POST" });
      const data = (await response.json()) as SyncResponse;

      if (!response.ok || !data.success) {
        setMessage(data.message || "Sync failed.");
        return;
      }

      setMessage(data.message);
      window.location.reload();
    } catch {
      setMessage("Sync failed due to a network or server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button onClick={onSync} disabled={loading} className="rounded-full px-6">
        {loading ? "Syncing..." : "Sync"}
      </Button>
      {message ? <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p> : null}
    </div>
  );
}
