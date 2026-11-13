import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase settings. Copy .env.example to .env.local, fill in both values, then restart the dev server.',
  )
}

// Only the publishable key belongs in the browser. It is safe there because
// Row Level Security (not the key) decides what each visitor can read or change.
export const supabase = createClient(supabaseUrl, supabaseKey)