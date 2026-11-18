import { supabase } from '../lib/supabaseClient'
import type { BlogPost } from '../types/blogPost'
import { BLOG_POST_COLUMNS, mapBlogPost, throwIfError, type BlogPostRow } from './mappers'

// newest first post
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  throwIfError(error)
  return ((data ?? []) as BlogPostRow[]).map(mapBlogPost)
}

// returns null when there is no published post 
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