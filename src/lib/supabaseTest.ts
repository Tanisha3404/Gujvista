import { supabase } from './supabaseClient'

// TEMPORARY. Delete this file and its import in main.tsx after checking.
supabase
  .from('categories')
  .select('*')
  .limit(1)
  .then(({ data, error }) => console.log('Supabase connection test:', { data, error }))