import { supabase } from '../lib/supabaseClient'

export interface FeedbackInput {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitFeedback(input: FeedbackInput): Promise<void> {
  const { error } = await supabase.from('feedback').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  })
  if (error) throw new Error(error.message)
}