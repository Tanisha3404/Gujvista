export type PostStatus = 'draft' | 'published'

export interface AdminPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImagePath: string | null // e.g. "guides/best-places-1731600000000.jpg"
  status: PostStatus
  publishedAt: string // 'YYYY-MM-DD', or '' when there is no date yet
}

export type PostInput = Omit<AdminPost, 'id'>