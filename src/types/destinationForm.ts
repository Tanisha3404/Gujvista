import type { AdminDestination, DestinationInput } from '../types/adminDestination'

// What the form holds. Everything is text, because that is what inputs give us.
export interface DestinationFormValues {
  name: string
  slug: string
  district: string
  categoryId: string
  shortDescription: string
  fullDescription: string
  bestTimeToVisit: string
  latitude: string
  longitude: string
  travelTips: string
  historicalSignificance: string
  majorAttractions: string // one item per line
  thingsToDo: string // one item per line
  isFeatured: boolean
  isHiddenGem: boolean
  sortOrder: string
}

export type DestinationFormErrors = Partial<Record<keyof DestinationFormValues | 'image', string>>

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

// "Rani ki Vav!" becomes "rani-ki-vav".
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const splitLines = (text: string): string[] =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export function emptyFormValues(): DestinationFormValues {
  return {
    name: '',
    slug: '',
    district: '',
    categoryId: '',
    shortDescription: '',
    fullDescription: '',
    bestTimeToVisit: '',
    latitude: '',
    longitude: '',
    travelTips: '',
    historicalSignificance: '',
    majorAttractions: '',
    thingsToDo: '',
    isFeatured: false,
    isHiddenGem: false,
    sortOrder: '100',
  }
}

export function valuesFromDestination(destination: AdminDestination): DestinationFormValues {
  return {
    name: destination.name,
    slug: destination.slug,
    district: destination.district,
    categoryId: destination.categoryId,
    shortDescription: destination.shortDescription,
    fullDescription: destination.fullDescription,
    bestTimeToVisit: destination.bestTimeToVisit,
    latitude: String(destination.latitude),
    longitude: String(destination.longitude),
    travelTips: destination.travelTips,
    historicalSignificance: destination.historicalSignificance,
    majorAttractions: destination.majorAttractions.join('\n'),
    thingsToDo: destination.thingsToDo.join('\n'),
    isFeatured: destination.isFeatured,
    isHiddenGem: destination.isHiddenGem,
    sortOrder: String(destination.sortOrder),
  }
}

function numberInRange(text: string, min: number, max: number): boolean {
  if (text.trim() === '') return false
  const value = Number(text)
  return Number.isFinite(value) && value >= min && value <= max
}

export function validateDestinationForm(
  values: DestinationFormValues,
  options: { requireImage: boolean; hasImage: boolean },
): DestinationFormErrors {
  const errors: DestinationFormErrors = {}
  const name = values.name.trim()
  const slug = values.slug.trim()
  const district = values.district.trim()

  if (!name) errors.name = 'Enter a name.'
  else if (name.length > 150) errors.name = 'Use 150 characters or fewer.'

  if (!slug) errors.slug = 'Enter a web address name.'
  else if (!SLUG_PATTERN.test(slug)) {
    errors.slug = 'Use lowercase letters, numbers and single hyphens only.'
  }

  if (!district) errors.district = 'Enter a district.'
  else if (district.length > 100) errors.district = 'Use 100 characters or fewer.'

  if (!values.categoryId) errors.categoryId = 'Choose a category.'

  const shortDescription = values.shortDescription.trim()
  if (!shortDescription) errors.shortDescription = 'Enter a short description.'
  else if (shortDescription.length > 300) errors.shortDescription = 'Use 300 characters or fewer.'

  if (!values.fullDescription.trim()) errors.fullDescription = 'Enter a full description.'
  if (!values.bestTimeToVisit.trim()) errors.bestTimeToVisit = 'Enter the best time to visit.'

  if (!numberInRange(values.latitude, -90, 90)) errors.latitude = 'Enter a latitude between -90 and 90.'
  if (!numberInRange(values.longitude, -180, 180)) {
    errors.longitude = 'Enter a longitude between -180 and 180.'
  }

  const sortOrder = values.sortOrder.trim()
  if (sortOrder === '' || !Number.isInteger(Number(sortOrder)) || Number(sortOrder) < 0) {
    errors.sortOrder = 'Enter a whole number, 0 or more.'
  }

  if (options.requireImage && !options.hasImage) errors.image = 'Choose a main photo.'

  return errors
}

export function toDestinationInput(
  values: DestinationFormValues,
  mainImagePath: string | null,
): DestinationInput {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    district: values.district.trim(),
    categoryId: values.categoryId,
    shortDescription: values.shortDescription.trim(),
    fullDescription: values.fullDescription.trim(),
    mainImagePath,
    bestTimeToVisit: values.bestTimeToVisit.trim(),
    latitude: Number(values.latitude),
    longitude: Number(values.longitude),
    travelTips: values.travelTips.trim(),
    historicalSignificance: values.historicalSignificance.trim(),
    majorAttractions: splitLines(values.majorAttractions),
    thingsToDo: splitLines(values.thingsToDo),
    isFeatured: values.isFeatured,
    isHiddenGem: values.isHiddenGem,
    sortOrder: Number(values.sortOrder),
  }
}