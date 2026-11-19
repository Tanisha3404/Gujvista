import { supabase } from '../lib/supabaseClient'

export interface FeedbackInput {
  name: string
  email: string
  subject: string
  message: string
}

export class FeedbackRateLimitError extends Error {
  constructor() {
    super('You have sent several messages recently. Please wait a while before sending another.')
    this.name = 'FeedbackRateLimitError'
  }
}

// Submit feedback to the Supabase database
export async function submitFeedback(input: FeedbackInput): Promise<void> {
  const { error } = await supabase.from('feedback').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  })

  if (error) {
    // If the error message contains "Too many messages", throw a FeedbackRateLimitError
    if (error.message.includes('Too many messages')) throw new FeedbackRateLimitError()
    throw new Error(error.message)
  }
}