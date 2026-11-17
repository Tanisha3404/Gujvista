import { supabase } from '../lib/supabaseClient'
import { throwIfError } from './mappers'

export interface FeedbackMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string // ISO timestamp
}

interface FeedbackRow {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

// Only administrators can read this table (Row Level Security).
// Newest first. Capped at 200 so the page stays quick if the inbox grows.
export async function getFeedbackMessages(): Promise<FeedbackMessage[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('id, name, email, subject, message, created_at')
    .order('created_at', { ascending: false })
    .limit(200)
  throwIfError(error)

  return ((data ?? []) as FeedbackRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
  }))
}

export async function deleteFeedbackMessage(id: string): Promise<void> {
  const { error } = await supabase.from('feedback').delete().eq('id', id)
  throwIfError(error)
}