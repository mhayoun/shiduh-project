import { createClient } from '@supabase/supabase-js'

// Ces infos se trouvent dans Supabase -> Settings -> API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
// Should show your URL, not undefined