import type { AdminCategory, CategoryInput } from '../types/adminCategory'

export interface CategoryFormValues {
  name: string
  slug: string
  description: string
  sortOrder: string
}

export type CategoryFormErrors = Partial<Record<keyof CategoryFormValues | 'image', string>>

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function emptyCategoryValues(): CategoryFormValues {
  return { name: '', slug: '', description: '', sortOrder: '100' }
}

export function valuesFromCategory(category: AdminCategory): CategoryFormValues {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description,
    sortOrder: String(category.sortOrder),
  }
}

// These limits match the CHECK constraints on the "categories" table.
export function validateCategoryForm(
  values: CategoryFormValues,
  options: { requireImage: boolean; hasImage: boolean },
): CategoryFormErrors {
  const errors: CategoryFormErrors = {}
  const name = values.name.trim()
  const slug = values.slug.trim()
  const sortOrder = values.sortOrder.trim()

  if (!name) errors.name = 'Enter a name.'
  else if (name.length > 100) errors.name = 'Use 100 characters or fewer.'

  if (!slug) errors.slug = 'Enter a web address name.'
  else if (!SLUG_PATTERN.test(slug)) {
    errors.slug = 'Use lowercase letters, numbers and single hyphens only.'
  }

  if (values.description.trim().length > 200) {
    errors.description = 'Use 200 characters or fewer.'
  }

  if (sortOrder === '' || !Number.isInteger(Number(sortOrder)) || Number(sortOrder) < 0) {
    errors.sortOrder = 'Enter a whole number, 0 or more.'
  }

  if (options.requireImage && !options.hasImage) errors.image = 'Choose a photo.'

  return errors
}

export function toCategoryInput(
  values: CategoryFormValues,
  imagePath: string | null,
): CategoryInput {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    description: values.description.trim(),
    imagePath,
    sortOrder: Number(values.sortOrder),
  }
}