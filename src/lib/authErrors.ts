// Turns Supabase's technical messages into friendly ones.
export function friendlyAuthError(message: string): string {
  const text = message.toLowerCase()
  if (text.includes('invalid login credentials')) return 'Incorrect email or password.'
  if (text.includes('email not confirmed')) {
    return 'Please confirm your email first. Check your inbox for the confirmation link.'
  }
  if (text.includes('already registered') || text.includes('already been registered')) {
    return 'An account with this email already exists. Try logging in instead.'
  }
  if (text.includes('not authorized')) {
    return 'We cannot send a confirmation email to this address right now.'
  }
  if (text.includes('rate limit') || text.includes('too many')) {
    return 'Too many attempts. Please wait a few minutes and try again.'
  }
  if (text.includes('password')) return message // e.g. "Password should be at least 8 characters."
  return 'Something went wrong. Please try again.'
}