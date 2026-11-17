import { supabase } from '../lib/supabaseClient'
import type { AdminCategory, CategoryInput } from '../types/adminCategory'
import { throwIfError } from './mappers'

// "destinations(count)" asks the database how many destinations use each category.
const SELECT = 'id, name, slug, description, image, sort_order, destinations(count)'

interface AdminCategoryRow {
  id: string
  name: string
  slug: string
  description: string
  image: string | null
  sort_order: number
  destinations?: { count: number }[]
}

function mapAdminCategory(row: AdminCategoryRow): AdminCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    imagePath: row.image,
    sortOrder: row.sort_order,
    destinationCount: row.destinations?.[0]?.count ?? 0,
  }
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const { data, error } = await supabase
    .from('categories')
    .select(SELECT)
    .order('sort_order')
    .order('name')
  throwIfError(error)
  return ((data ?? []) as unknown as AdminCategoryRow[]).map(mapAdminCategory)
}

// Returns null when there is no category with that id.
export async function getAdminCategory(id: string): Promise<AdminCategory | null> {
  const { data, error } = await supabase.from('categories').select(SELECT).eq('id', id).maybeSingle()
  throwIfError(error)
  return data ? mapAdminCategory(data as unknown as AdminCategoryRow) : null
}

export class DuplicateCategoryError extends Error {
  constructor() {
    super('A category with that name or web address already exists.')
    this.name = 'DuplicateCategoryError'
  }
}

export class CategoryInUseError extends Error {
  constructor() {
    super('This category still has destinations. Move or delete them first.')
    this.name = 'CategoryInUseError'
  }
}

// Creates a category, or updates it when an id is given.
export async function saveCategory(input: CategoryInput, id?: string): Promise<void> {
  const row = {
    name: input.name,
    slug: input.slug,
    description: input.description,
    image: input.imagePath,
    sort_order: input.sortOrder,
  }

  const { error } = id
    ? await supabase.from('categories').update(row).eq('id', id)
    : await supabase.from('categories').insert(row)

  // 23505 = unique violation (the name or slug is already taken).
  if (error?.code === '23505') throw new DuplicateCategoryError()
  throwIfError(error)
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  // 23503 = foreign key violation (destinations still use this category).
  if (error?.code === '23503') throw new CategoryInUseError()
  throwIfError(error)
}