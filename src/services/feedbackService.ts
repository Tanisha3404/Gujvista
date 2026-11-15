import { supabase } from '../lib/supabaseClient'

export interface FeedbackInput {
  name: string
  email: string
  subject: string
  message: string
}

// Visitors may insert but not read, so this deliberately does NOT ask for the
// saved row back (no .select()). That is also why it works for anonymous users.
export async function submitFeedback(input: FeedbackInput): Promise<void> {
  const { error } = await supabase.from('feedback').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  })
  if (error) throw new Error(error.message)
}