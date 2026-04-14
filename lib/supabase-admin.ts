import { createClient } from "@supabase/supabase-js";

export type ProductRow = {
  printify_id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  image_urls?: string[] | null;
  variants: unknown;
  created_at?: string;
};

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is missing.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY (or fallback Supabase key) is missing.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
