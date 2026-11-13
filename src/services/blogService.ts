import { blogPostSeed } from '../data/blogPosts'
import { getImage } from '../lib/images'
import type { BlogPost } from '../types/blogPost'
import { simulateNetwork } from './simulateNetwork'

function resolveImages(post: BlogPost): BlogPost {
  return { ...post, coverImage: getImage(post.coverImage) }
}

// Only published posts are public. In Phase 3, Row Level Security
// enforces the same rule inside the database.
function isPublished(post: BlogPost): boolean {
  return post.status === 'published'
}

// Newest first.
export async function getPublishedPosts(): Promise<BlogPost[]> {
  await simulateNetwork()
  return blogPostSeed
    .filter(isPublished)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(resolveImages)
}

// Returns null when there is no published post with that slug.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await simulateNetwork()
  const found = blogPostSeed.find((post) => post.slug === slug && isPublished(post))
  return found ? resolveImages(found) : null
}