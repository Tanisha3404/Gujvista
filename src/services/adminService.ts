import { supabase } from '../lib/supabaseClient'
import { throwIfError } from './mappers'

export interface AdminCounts {
  destinations: number
  categories: number
  posts: number
  drafts: number
  feedback: number
}

// Counts rows without downloading them. For "feedback" this only works for
// admins, because Row Level Security hides it from everyone else.
async function countRows(table: string, status?: string): Promise<number> {
  let query = supabase.from(table).select('*', { count: 'exact', head: true })
  if (status) query = query.eq('status', status)
  const { count, error } = await query
  throwIfError(error)
  return count ?? 0
}

export async function getAdminCounts(): Promise<AdminCounts> {
  const [destinations, categories, posts, drafts, feedback] = await Promise.all([
    countRows('destinations'),
    countRows('categories'),
    countRows('blog_posts'),
    countRows('blog_posts', 'draft'),
    countRows('feedback'),
  ])
  return { destinations, categories, posts, drafts, feedback }
}