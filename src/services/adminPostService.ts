import { supabase } from '../lib/supabaseClient'
import type { AdminPost, PostInput, PostStatus } from '../types/adminPost'
import { throwIfError } from './mappers'

const COLUMNS = 'id, title, slug, excerpt, content, cover_image, published_at, status'

interface AdminPostRow {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  published_at: string | null
  status: PostStatus
}

function mapAdminPost(row: AdminPostRow): AdminPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImagePath: row.cover_image,
    status: row.status,
    publishedAt: row.published_at ? row.published_at.slice(0, 10) : '', // "YYYY-MM-DD"
  }
}

// admins see drafts too 
export async function getAdminPosts(): Promise<AdminPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(COLUMNS)
    .order('updated_at', { ascending: false })
  throwIfError(error)
  return ((data ?? []) as AdminPostRow[]).map(mapAdminPost)
}

// returns null when there is no post with that id
export async function getAdminPost(id: string): Promise<AdminPost | null> {
  const { data, error } = await supabase.from('blog_posts').select(COLUMNS).eq('id', id).maybeSingle()
  throwIfError(error)
  return data ? mapAdminPost(data as AdminPostRow) : null
}

export class DuplicatePostSlugError extends Error {
  constructor() {
    super('That web address name is already used by another guide.')
    this.name = 'DuplicatePostSlugError'
  }
}

// creates a guide or updates it when an id is given
export async function savePost(input: PostInput, id?: string): Promise<void> {
  const row = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    cover_image: input.coverImagePath,
    status: input.status,
    published_at: input.publishedAt ? `${input.publishedAt}T00:00:00Z` : null,
  }

  const { error } = id
    ? await supabase.from('blog_posts').update(row).eq('id', id)
    : await supabase.from('blog_posts').insert(row)

  // 23505 = unique violation
  if (error?.code === '23505') throw new DuplicatePostSlugError()
  throwIfError(error)
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  throwIfError(error)
}