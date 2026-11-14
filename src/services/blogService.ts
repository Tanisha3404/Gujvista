import { supabase } from '../lib/supabaseClient'
import type { BlogPost } from '../types/blogPost'
import { BLOG_POST_COLUMNS, mapBlogPost, throwIfError, type BlogPostRow } from './mappers'

// Newest first. Row Level Security already hides drafts from visitors;
// the explicit filter keeps this correct for admins too.
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  throwIfError(error)
  return ((data ?? []) as BlogPostRow[]).map(mapBlogPost)
}

// Returns null when there is no published post with that slug.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  throwIfError(error)
  return data ? mapBlogPost(data as BlogPostRow) : null
}