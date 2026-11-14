import { distanceKm } from '../lib/geo'
import { getStorageImageUrl } from '../lib/images'
import { supabase } from '../lib/supabaseClient'
import type { Category } from '../types/category'
import type { Destination } from '../types/destination'
import {
  CATEGORY_COLUMNS,
  DESTINATION_COLUMNS,
  mapCategory,
  mapDestination,
  throwIfError,
  type CategoryRow,
  type DestinationRow,
} from './mappers'

const NEARBY_COUNT = 3

export async function getAllDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select(DESTINATION_COLUMNS)
    .order('sort_order')
    .order('name')
  throwIfError(error)
  return ((data ?? []) as DestinationRow[]).map(mapDestination)
}

// The homepage's "Top Destinations": featured places, in display order.
export async function getTopDestinations(limit = 6): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select(DESTINATION_COLUMNS)
    .eq('is_featured', true)
    .order('sort_order')
    .limit(limit)
  throwIfError(error)
  return ((data ?? []) as DestinationRow[]).map(mapDestination)
}

export async function getHiddenGems(): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select(DESTINATION_COLUMNS)
    .eq('is_hidden_gem', true)
    .order('sort_order')
  throwIfError(error)
  return ((data ?? []) as DestinationRow[]).map(mapDestination)
}

export interface DestinationDetails {
  destination: Destination
  category: Category | null
  nearby: Destination[]
  gallery: string[] // extra photo URLs (may be empty)
}

// Returns null when no destination has that slug (the page shows "not found").
export async function getDestinationDetails(slug: string): Promise<DestinationDetails | null> {
  const { data: row, error } = await supabase
    .from('destinations')
    .select(DESTINATION_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()
  throwIfError(error)
  if (!row) return null

  const found = mapDestination(row as DestinationRow)

  // The three follow-up queries run at the same time.
  const [categoryResult, othersResult, galleryResult] = await Promise.all([
    supabase.from('categories').select(CATEGORY_COLUMNS).eq('id', found.categoryId).maybeSingle(),
    supabase.from('destinations').select(DESTINATION_COLUMNS).neq('id', found.id),
    supabase
      .from('destination_images')
      .select('image_url')
      .eq('destination_id', found.id)
      .order('sort_order'),
  ])
  throwIfError(categoryResult.error)
  throwIfError(othersResult.error)
  throwIfError(galleryResult.error)

  // Nearest others by straight-line distance, worked out in the browser.
  // Fine for ~20 places. Only as accurate as the coordinates in the data.
  const nearby = ((othersResult.data ?? []) as DestinationRow[])
    .map(mapDestination)
    .map((destination) => ({ destination, distance: distanceKm(found, destination) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, NEARBY_COUNT)
    .map((item) => item.destination)

  return {
    destination: found,
    category: categoryResult.data ? mapCategory(categoryResult.data as CategoryRow) : null,
    nearby,
    gallery: ((galleryResult.data ?? []) as { image_url: string }[]).map((image) =>
      getStorageImageUrl(image.image_url),
    ),
  }
}