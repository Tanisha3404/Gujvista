import { supabase } from '../lib/supabaseClient'
import { throwIfError } from './mappers'


export async function getMyFavouriteIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from('favourites')
    .select('destination_id')
    .order('created_at', { ascending: false })
  throwIfError(error)
  return ((data ?? []) as { destination_id: string }[]).map((row) => row.destination_id)
}

export async function addFavourite(userId: string, destinationId: string): Promise<void> {
  const { error } = await supabase
    .from('favourites')
    .insert({ user_id: userId, destination_id: destinationId })
  // 23505 means "already saved"
  if (error && error.code !== '23505') throw new Error(error.message)
}

export async function removeFavourite(userId: string, destinationId: string): Promise<void> {
  const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('user_id', userId)
    .eq('destination_id', destinationId)
  throwIfError(error)
}