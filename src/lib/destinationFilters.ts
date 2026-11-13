import type { Destination } from '../types/destination'

export type SortOption = 'name-asc' | 'name-desc'

export interface DestinationFilterValues {
  query: string
  categoryId: string // '' means "all"
  district: string // '' means "all"
  sort: SortOption
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name (A to Z)' },
  { value: 'name-desc', label: 'Name (Z to A)' },
]

// Guards against a hand-edited URL like ?sort=banana.
export function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value)
}

export function filterAndSortDestinations(
  destinations: Destination[],
  filters: DestinationFilterValues,
): Destination[] {
  const query = filters.query.trim().toLowerCase()

  // filter() returns a new array, so sorting it below does not touch the original.
  const results = destinations.filter(
    (destination) =>
      (!query || destination.name.toLowerCase().includes(query)) &&
      (!filters.categoryId || destination.categoryId === filters.categoryId) &&
      (!filters.district || destination.district === filters.district),
  )

  results.sort((a, b) => a.name.localeCompare(b.name))
  if (filters.sort === 'name-desc') results.reverse()
  return results
}

// Unique district names, alphabetical.
export function getDistricts(destinations: Destination[]): string[] {
  return [...new Set(destinations.map((destination) => destination.district))].sort((a, b) =>
    a.localeCompare(b),
  )
}