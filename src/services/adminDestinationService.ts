import { resizeImageToJpeg } from '../lib/imageResize'
import { supabase } from '../lib/supabaseClient'
import type { AdminDestination, DestinationInput } from '../types/adminDestination'
import { DESTINATION_COLUMNS, throwIfError, type DestinationRow } from './mappers'

const ADMIN_COLUMNS = `${DESTINATION_COLUMNS}, is_featured, is_hidden_gem, sort_order`

interface AdminDestinationRow extends DestinationRow {
  is_featured: boolean
  is_hidden_gem: boolean
  sort_order: number
}

function mapAdminDestination(row: AdminDestinationRow): AdminDestination {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    district: row.district,
    categoryId: row.category_id,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    mainImagePath: row.main_image,
    bestTimeToVisit: row.best_time_to_visit,
    latitude: row.latitude,
    longitude: row.longitude,
    travelTips: row.travel_tips,
    historicalSignificance: row.historical_significance,
    majorAttractions: row.major_attractions,
    thingsToDo: row.things_to_do,
    isFeatured: row.is_featured,
    isHiddenGem: row.is_hidden_gem,
    sortOrder: row.sort_order,
  }
}

export async function getAdminDestinations(): Promise<AdminDestination[]> {
  const { data, error } = await supabase.from('destinations').select(ADMIN_COLUMNS).order('name')
  throwIfError(error)
  return ((data ?? []) as AdminDestinationRow[]).map(mapAdminDestination)
}

// returns null when there is no destination with that id
export async function getAdminDestination(id: string): Promise<AdminDestination | null> {
  const { data, error } = await supabase
    .from('destinations')
    .select(ADMIN_COLUMNS)
    .eq('id', id)
    .maybeSingle()
  throwIfError(error)
  return data ? mapAdminDestination(data as AdminDestinationRow) : null
}

export class DuplicateSlugError extends Error {
  constructor() {
    super('That web address name is already used by another destination.')
    this.name = 'DuplicateSlugError'
  }
}

// creates a destination or updates it when an id is given
export async function saveDestination(input: DestinationInput, id?: string): Promise<void> {
  const row = {
    name: input.name,
    slug: input.slug,
    district: input.district,
    category_id: input.categoryId,
    short_description: input.shortDescription,
    full_description: input.fullDescription,
    main_image: input.mainImagePath,
    best_time_to_visit: input.bestTimeToVisit,
    latitude: input.latitude,
    longitude: input.longitude,
    travel_tips: input.travelTips,
    historical_significance: input.historicalSignificance,
    major_attractions: input.majorAttractions,
    things_to_do: input.thingsToDo,
    is_featured: input.isFeatured,
    is_hidden_gem: input.isHiddenGem,
    sort_order: input.sortOrder,
  }

  const { error } = id
    ? await supabase.from('destinations').update(row).eq('id', id)
    : await supabase.from('destinations').insert(row)

  // 23505 = unique violation 
  if (error?.code === '23505') throw new DuplicateSlugError()
  throwIfError(error)
}

// deletes a destination; row level security makes the database refuse this for anyone who is not an admin
export async function deleteDestination(id: string): Promise<void> {
  const { error } = await supabase.from('destinations').delete().eq('id', id)
  throwIfError(error)
}

// resizes the photo in the browser, uploads it under a unique name
export async function uploadDestinationImage(file: File, slug: string): Promise<string> {
  const blob = await resizeImageToJpeg(file)
  const path = `destinations/${slug}-${Date.now()}.jpg`
  const { error } = await supabase.storage
    .from('images')
    .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
  if (error) throw new Error(error.message)
  return path
} 