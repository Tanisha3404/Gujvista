import { categorySeed } from '../data/categories'
import { destinationSeed } from '../data/destinations'
import { distanceKm } from '../lib/geo'
import { getGalleryImages, getImage } from '../lib/images'
import type { Category } from '../types/category'
import type { Destination } from '../types/destination'
import { simulateNetwork } from './simulateNetwork'

const NEARBY_COUNT = 3

// Seed rows store an image key. Turn it into a real URL.
// In Phase 3 the Supabase version returns Storage URLs instead,
// and nothing outside this file notices.
function resolveImages(destination: Destination): Destination {
  return { ...destination, mainImage: getImage(destination.mainImage) }
}

export async function getAllDestinations(): Promise<Destination[]> {
  await simulateNetwork()
  return destinationSeed.map(resolveImages)
}

// "Top" = the first N for now. A real "featured" flag can come with the database.
export async function getTopDestinations(limit = 6): Promise<Destination[]> {
  await simulateNetwork()
  return destinationSeed.slice(0, limit).map(resolveImages)
}

// Local stand-in for a database flag. In Phase 3 this becomes a column or tag.
const HIDDEN_GEM_SLUGS = [
  'polo-forest',
  'zarwani-waterfall',
  'dholavira',
  'velavadar-blackbuck-national-park',
]

export async function getHiddenGems(): Promise<Destination[]> {
  await simulateNetwork()
  return destinationSeed
    .filter((destination) => HIDDEN_GEM_SLUGS.includes(destination.slug))
    .map(resolveImages)
}

export interface DestinationDetails {
  destination: Destination
  category: Category | null
  nearby: Destination[]
  gallery: string[] // extra photo URLs (may be empty)
}

// Returns null when no destination has that slug (the page shows "not found").
export async function getDestinationDetails(slug: string): Promise<DestinationDetails | null> {
  await simulateNetwork()

  const found = destinationSeed.find((destination) => destination.slug === slug)
  if (!found) return null

  const category = categorySeed.find((item) => item.id === found.categoryId) ?? null

  // Nearest others by straight-line distance. Only as accurate as the
  // coordinates in the data, so verify those.
  const nearby = destinationSeed
    .filter((destination) => destination.id !== found.id)
    .map((destination) => ({ destination, distance: distanceKm(found, destination) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, NEARBY_COUNT)
    .map((item) => resolveImages(item.destination))

  return {
    destination: resolveImages(found),
    category: category ? { ...category, image: getImage(category.image) } : null,
    nearby,
    gallery: getGalleryImages(slug),
  }
}