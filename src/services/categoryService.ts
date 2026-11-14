import { supabase } from '../lib/supabaseClient'
import type { Category } from '../types/category'
import { CATEGORY_COLUMNS, mapCategory, throwIfError, type CategoryRow } from './mappers'

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_COLUMNS)
    .order('sort_order')
  throwIfError(error)
  return ((data ?? []) as CategoryRow[]).map(mapCategory)
}