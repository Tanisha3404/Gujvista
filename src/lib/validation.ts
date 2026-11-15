const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export const PASSWORD_MIN_LENGTH = 8
export const NAME_MAX_LENGTH = 100
export const EMAIL_MAX_LENGTH = 254
export const SUBJECT_MAX_LENGTH = 150
export const MESSAGE_MIN_LENGTH = 10
export const MESSAGE_MAX_LENGTH = 2000

// These limits must match the CHECK constraints on the "feedback" table.
// Each function returns an error message, or null when the value is fine.

export function validateEmail(value: string): string | null {
  const email = value.trim()
  if (!email) return 'Enter your email address.'
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return 'Enter a valid email address.'
  }
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
  if (name.length > NAME_MAX_LENGTH) return `Use ${NAME_MAX_LENGTH} characters or fewer.`
  return null
}

export function validateSubject(value: string): string | null {
  const subject = value.trim()
  if (!subject) return 'Enter a subject.'
  if (subject.length > SUBJECT_MAX_LENGTH) return `Use ${SUBJECT_MAX_LENGTH} characters or fewer.`
  return null
}

export function validateMessage(value: string): string | null {
  const message = value.trim()
  if (!message) return 'Enter your message.'
  if (message.length < MESSAGE_MIN_LENGTH) return `Write at least ${MESSAGE_MIN_LENGTH} characters.`
  if (message.length > MESSAGE_MAX_LENGTH) return `Use ${MESSAGE_MAX_LENGTH} characters or fewer.`
  return null
}