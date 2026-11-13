import { useId, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { SORT_OPTIONS, type SortOption } from '../../lib/destinationFilters'
import { Button } from '../ui/Button'

export interface FilterOption {
  value: string
  label: string
}

interface DestinationFiltersProps {
  query: string
  category: string
  district: string
  sort: SortOption
  categoryOptions: FilterOption[]
  districtOptions: FilterOption[]
  hasActiveFilters: boolean
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onDistrictChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onClear: () => void
}

const controlClass =
  'h-11 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-white placeholder:text-muted transition-colors hover:border-white/25 focus:border-accent [color-scheme:dark]'

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default function DestinationFilters({
  query,
  category,
  district,
  sort,
  categoryOptions,
  districtOptions,
  hasActiveFilters,
  onQueryChange,
  onCategoryChange,
  onDistrictChange,
  onSortChange,
  onClear,
}: DestinationFiltersProps) {
  const id = useId()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <Field label="Search" htmlFor={`${id}-search`}>
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name"
            autoComplete="off"
            className={`${controlClass} pl-10 pr-10 [&::-webkit-search-cancel-button]:hidden`}
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition-colors hover:text-white"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </Field>

      <Field label="Category" htmlFor={`${id}-category`}>
        <select
          id={`${id}-category`}
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={controlClass}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="District" htmlFor={`${id}-district`}>
        <select
          id={`${id}-district`}
          value={district}
          onChange={(event) => onDistrictChange(event.target.value)}
          className={controlClass}
        >
          {districtOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Sort by" htmlFor={`${id}-sort`}>
        <select
          id={`${id}-sort`}
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className={controlClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      {hasActiveFilters && (
        <div className="sm:col-span-2 lg:col-span-4">
          <Button variant="outline" size="md" onClick={onClear}>
            <X size={16} aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}