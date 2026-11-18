export type PostStatus = 'draft' | 'published'

export interface AdminPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImagePath: string | null 
  status: PostStatus
  publishedAt: string // 'YYYY-MM-DD' format
}

export type PostInput = Omit<AdminPost, 'id'>