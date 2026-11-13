import { supabase } from './supabaseClient'

// TEMPORARY check, run as an anonymous visitor.
// Delete this file and its import in main.tsx after step 3.3.
async function run() {
  const categories = await supabase.from('categories').select('slug')
  console.log('categories (expect 6):', categories.data?.length, categories.error?.message)

  const destinations = await supabase
    .from('destinations')
    .select('slug, is_featured, is_hidden_gem')
  console.log('destinations (expect 20):', destinations.data?.length, destinations.error?.message)
  console.log('featured (expect 6):', destinations.data?.filter((d) => d.is_featured).length)
  console.log('hidden gems (expect 4):', destinations.data?.filter((d) => d.is_hidden_gem).length)

  const posts = await supabase.from('blog_posts').select('slug, status')
  console.log('posts visible (expect 6):', posts.data?.length, posts.error?.message)
}

void run()