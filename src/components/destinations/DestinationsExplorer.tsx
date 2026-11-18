import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import DestinationFilters from './DestinationFilters'
import DestinationCard from './DestinationCard'
import EmptyState from '../feedback/EmptyState'
import { Button } from '../ui/Button'
import {
  filterAndSortDestinations,
  getDistricts,
  isSortOption,
  type SortOption,
} from '../../lib/destinationFilters'
import type { Category } from '../../types/category'
import type { Destination } from '../../types/destination'

interface DestinationsExplorerProps {
  destinations: Destination[]
  categories: Category[]
}

export default function DestinationsExplorer({ destinations, categories }: DestinationsExplorerProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const activeCategory = categories.find((category) => category.slug === searchParams.get('category'))
  const categoryId = activeCategory?.id ?? ''

  const districts = useMemo(() => getDistricts(destinations), [destinations])
  const districtParam = searchParams.get('district') ?? ''
  const district = districts.includes(districtParam) ? districtParam : ''

  const sortParam = searchParams.get('sort')
  const sort: SortOption = isSortOption(sortParam) ? sortParam : 'name-asc'

  const results = useMemo(
    () => filterAndSortDestinations(destinations, { query, categoryId, district, sort }),
    [destinations, query, categoryId, district, sort],
  )

  const hasActiveFilters = Boolean(query || categoryId || district)

  // update the URL search params with the given changes; if a value is empty, remove that param from the URL
  function updateParams(changes: Record<string, string>) {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => updateParams({ q: '', category: '', district: '' })

  const categoryOptions = [
    { value: '', label: 'All categories' },
    ...categories.map((category) => ({
      value: category.slug,
      label: `${category.name} (${destinations.filter((d) => d.categoryId === category.id).length})`,
    })),
  ]
  const districtOptions = [
    { value: '', label: 'All districts' },
    ...districts.map((name) => ({ value: name, label: name })),
  ]

  return (
    <div>
      <DestinationFilters
        query={query}
        category={activeCategory?.slug ?? ''}
        district={district}
        sort={sort}
        categoryOptions={categoryOptions}
        districtOptions={districtOptions}
        hasActiveFilters={hasActiveFilters}
        onQueryChange={(value) => updateParams({ q: value })}
        onCategoryChange={(value) => updateParams({ category: value })}
        onDistrictChange={(value) => updateParams({ district: value })}
        onSortChange={(value) => updateParams({ sort: value === 'name-asc' ? '' : value })}
        onClear={clearFilters}
      />

      <p aria-live="polite" className="mb-6 mt-8 text-sm text-muted">
        Showing {results.length} of {destinations.length} destinations
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No destinations match your filters"
          description="Try a different search, or remove some filters to see more places."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {results.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  )
}