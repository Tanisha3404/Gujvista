import { getStorageImageUrl } from '../lib/images'
import { supabase } from '../lib/supabaseClient'
import type {
  Itinerary,
  ItineraryDetails,
  ItineraryStop,
  ItinerarySummary,
} from '../types/itinerary'
import { DESTINATION_COLUMNS, mapDestination, throwIfError, type DestinationRow } from './mappers'

const ITINERARY_COLUMNS = 'id, slug, title, description, duration_days, cover_image'

interface ItineraryRow {
  id: string
  slug: string
  title: string
  description: string
  duration_days: number
  cover_image: string | null
}

interface ItineraryStopRow {
  id: string
  day_number: number
  sequence_number: number
  description: string
  destinations: DestinationRow | null
}

function mapItinerary(row: ItineraryRow): Itinerary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    durationDays: row.duration_days,
    coverImage: getStorageImageUrl(row.cover_image),
  }
}

// Shortest trips first, then alphabetical.
export async function getItineraries(): Promise<ItinerarySummary[]> {
  const { data, error } = await supabase
    .from('itineraries')
    .select(`${ITINERARY_COLUMNS}, itinerary_items(destination_id)`)
    .order('duration_days')
    .order('title')
  throwIfError(error)

  const rows = (data ?? []) as unknown as (ItineraryRow & {
    itinerary_items: { destination_id: string }[]
  })[]

  return rows.map((row) => ({
    ...mapItinerary(row),
    destinationIds: [...new Set(row.itinerary_items.map((item) => item.destination_id))],
  }))
}

// Returns null when no itinerary has that slug (the page shows "not found").
export async function getItineraryDetails(slug: string): Promise<ItineraryDetails | null> {
  const { data: row, error } = await supabase
    .from('itineraries')
    .select(ITINERARY_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()
  throwIfError(error)
  if (!row) return null

  const itinerary = mapItinerary(row as ItineraryRow)

  const { data: items, error: itemsError } = await supabase
    .from('itinerary_items')
    .select(`id, day_number, sequence_number, description, destinations(${DESTINATION_COLUMNS})`)
    .eq('itinerary_id', itinerary.id)
    .order('day_number')
    .order('sequence_number')
  throwIfError(itemsError)

  const stops: ItineraryStop[] = ((items ?? []) as unknown as ItineraryStopRow[])
    .filter((item) => item.destinations !== null)
    .map((item) => ({
      id: item.id,
      day: item.day_number,
      sequence: item.sequence_number,
      description: item.description,
      destination: mapDestination(item.destinations as DestinationRow),
    }))

  return { itinerary, stops }
}