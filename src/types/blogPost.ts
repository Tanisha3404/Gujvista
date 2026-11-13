// Matches the blog_posts table in the brief.
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // simple text format: see src/lib/articleContent.ts
  coverImage: string
  publishedAt: string // 'YYYY-MM-DD'
  status: 'draft' | 'published'
}