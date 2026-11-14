import { getStorageImageUrl } from '../lib/images'
import type { BlogPost } from '../types/blogPost'
import type { Category } from '../types/category'
import type { Destination } from '../types/destination'

// Columns to request from each table.
export const CATEGORY_COLUMNS = 'id, slug, name, description, image'
export const DESTINATION_COLUMNS =
  'id, name, slug, district, category_id, short_description, full_description, main_image, best_time_to_visit, latitude, longitude, travel_tips, historical_significance, major_attractions, things_to_do'
export const BLOG_POST_COLUMNS =
  'id, title, slug, excerpt, content, cover_image, published_at, status'

// Turns a Supabase error into a normal Error, so the page shows its error state.
export function throwIfError(error: { message: string } | null): void {
  if (error) throw new Error(error.message)
}

export interface CategoryRow {
  id: string
  slug: string
  name: string
  description: string
  image: string | null
}

export function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    image: getStorageImageUrl(row.image),
  }
}

export interface DestinationRow {
  id: string
  name: string
  slug: string
  district: string
  category_id: string
  short_description: string
  full_description: string
  main_image: string | null
  best_time_to_visit: string
  latitude: number
  longitude: number
  travel_tips: string
  historical_significance: string
  major_attractions: string[]
  things_to_do: string[]
}

export function mapDestination(row: DestinationRow): Destination {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    district: row.district,
    categoryId: row.category_id,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    mainImage: getStorageImageUrl(row.main_image),
    bestTimeToVisit: row.best_time_to_visit,
    latitude: row.latitude,
    longitude: row.longitude,
    travelTips: row.travel_tips,
    historicalSignificance: row.historical_significance,
    majorAttractions: row.major_attractions,
    thingsToDo: row.things_to_do,
  }
}

export interface BlogPostRow {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  published_at: string | null
  status: 'draft' | 'published'
}

export function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: getStorageImageUrl(row.cover_image),
    publishedAt: row.published_at ? row.published_at.slice(0, 10) : '', // "YYYY-MM-DD"
    status: row.status,
  }
}