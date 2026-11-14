const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export const PASSWORD_MIN_LENGTH = 8

// Each function returns an error message, or null when the value is fine.
export function validateEmail(value: string): string | null {
  const email = value.trim()
  if (!email) return 'Enter your email address.'
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return 'Enter a valid email address.'
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Enter a password.'
  if (value.length < PASSWORD_MIN_LENGTH) return `Use at least ${PASSWORD_MIN_LENGTH} characters.`
  if (value.length > 72) return 'Use 72 characters or fewer.'
  return null
}

export function validateFullName(value: string): string | null {
  const name = value.trim()
  if (!name) return 'Enter your name.'
  if (name.length > 100) return 'Use 100 characters or fewer.'
  return null
}