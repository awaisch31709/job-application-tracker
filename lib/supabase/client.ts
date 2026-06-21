import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL_ERROR =
  "NEXT_PUBLIC_SUPABASE_URL must be only the base Supabase project URL, like https://PROJECT_REF.supabase.co";

function validateSupabaseUrl(value: string) {
  if (
    value.includes("NEXT_PUBLIC_SUPABASE_URL=") ||
    !value.startsWith("https://") ||
    !value.endsWith(".supabase.co")
  ) {
    throw new Error(SUPABASE_URL_ERROR);
  }

  const url = new URL(value);

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(SUPABASE_URL_ERROR);
  }
}

function getSupabaseBrowserEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  validateSupabaseUrl(supabaseUrl);

  if (!supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable.",
    );
  }

  return { supabaseUrl, supabasePublishableKey };
}

export function createBrowserSupabaseClient(): SupabaseClient {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseBrowserEnv();

  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
