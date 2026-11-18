import type { AdminPost, PostInput, PostStatus } from '../types/adminPost'

export interface PostFormValues {
  title: string
  slug: string
  excerpt: string
  content: string
  status: PostStatus
  publishedAt: string // 'YYYY-MM-DD' or ''
}

export type PostFormErrors = Partial<Record<keyof PostFormValues | 'image', string>>

export const EXCERPT_MAX_LENGTH = 300
export const CONTENT_MAX_LENGTH = 20000

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export function emptyPostValues(): PostFormValues {
  return { title: '', slug: '', excerpt: '', content: '', status: 'draft', publishedAt: '' }
}

export function valuesFromPost(post: AdminPost): PostFormValues {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    status: post.status,
    publishedAt: post.publishedAt,
  }
}

// returns true if the text is a valid date in YYYY-MM-DD format and represents a real date
function isRealDate(text: string): boolean {
  if (!DATE_PATTERN.test(text)) return false
  const date = new Date(`${text}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === text
}

// validates the form values and returns an object with error messages for any invalid fields
export function validatePostForm(
  values: PostFormValues,
  options: { requireImage: boolean; hasImage: boolean },
): PostFormErrors {
  const errors: PostFormErrors = {}
  const title = values.title.trim()
  const slug = values.slug.trim()
  const excerpt = values.excerpt.trim()
  const content = values.content.trim()

  if (!title) errors.title = 'Enter a title.'
  else if (title.length > 200) errors.title = 'Use 200 characters or fewer.'

  if (!slug) errors.slug = 'Enter a web address name.'
  else if (!SLUG_PATTERN.test(slug)) {
    errors.slug = 'Use lowercase letters, numbers and single hyphens only.'
  }

  if (!excerpt) errors.excerpt = 'Enter a short summary.'
  else if (excerpt.length > EXCERPT_MAX_LENGTH) {
    errors.excerpt = `Use ${EXCERPT_MAX_LENGTH} characters or fewer.`
  }

  if (!content) errors.content = 'Write the article text.'
  else if (content.length > CONTENT_MAX_LENGTH) {
    errors.content = `Use ${CONTENT_MAX_LENGTH} characters or fewer.`
  }

  if (values.publishedAt && !isRealDate(values.publishedAt)) {
    errors.publishedAt = 'Enter a real date.'
  }

  if (options.requireImage && !options.hasImage) errors.image = 'Choose a cover photo.'

  return errors
}

export function toPostInput(values: PostFormValues, coverImagePath: string | null): PostInput {
  const today = new Date().toISOString().slice(0, 10)
  const publishedAt =
    values.status === 'published' && !values.publishedAt ? today : values.publishedAt

  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    excerpt: values.excerpt.trim(),
    content: values.content.trim(),
    coverImagePath,
    status: values.status,
    publishedAt,
  }
}