import { createClient } from "@supabase/supabase-js";

const sanitize = (value?: string) =>
  value?.trim().replace(/;$/, "") ?? "";

const supabaseUrl = sanitize(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = sanitize(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
