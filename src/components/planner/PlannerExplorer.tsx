import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import ItineraryCard from './ItineraryCard'
import EmptyState from '../feedback/EmptyState'
import { Button } from '../ui/Button'
import { formatDuration } from '../../lib/itinerary'
import { cn } from '../../lib/utils'
import type { Destination } from '../../types/destination'
import type { ItinerarySummary } from '../../types/itinerary'

interface PlannerExplorerProps {
  itineraries: ItinerarySummary[]
  destinations: Destination[]
}

const selectClass =
  'h-11 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-white transition-colors hover:border-white/25 focus:border-accent [color-scheme:dark] sm:w-72'

export default function PlannerExplorer({ itineraries, destinations }: PlannerExplorerProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const durations = useMemo(
    () => [...new Set(itineraries.map((item) => item.durationDays))].sort((a, b) => a - b),
    [itineraries],
  )
  const durationParam = Number(searchParams.get('duration'))
  const duration = durations.includes(durationParam) ? durationParam : 0 // 0 means "all"

  // only destinations that appear in at least one itinerary
  const destinationOptions = useMemo(() => {
    const used = new Set(itineraries.flatMap((item) => item.destinationIds))
    return destinations
      .filter((destination) => used.has(destination.id))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [itineraries, destinations])
  const activeDestination = destinationOptions.find(
    (destination) => destination.slug === searchParams.get('destination'),
  )

  const results = itineraries.filter(
    (item) =>
      (!duration || item.durationDays === duration) &&
      (!activeDestination || item.destinationIds.includes(activeDestination.id)),
  )

  const hasActiveFilters = Boolean(duration || activeDestination)

  // update the URL search params without reloading the page
  function updateParams(changes: Record<string, string>) {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => updateParams({ duration: '', destination: '' })

  const chipClass = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
      active
        ? 'border-accent bg-accent text-ink'
        : 'border-white/20 text-white/80 hover:border-accent hover:text-white',
    )

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
            Trip length
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={duration === 0}
              className={chipClass(duration === 0)}
              onClick={() => updateParams({ duration: '' })}
            >
              All
            </button>
            {durations.map((days) => (
              <button
                key={days}
                type="button"
                aria-pressed={duration === days}
                className={chipClass(duration === days)}
                onClick={() => updateParams({ duration: String(days) })}
              >
                {formatDuration(days)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="planner-destination"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
          >
            Includes destination
          </label>
          <select
            id="planner-destination"
            value={activeDestination?.slug ?? ''}
            onChange={(event) => updateParams({ destination: event.target.value })}
            className={selectClass}
          >
            <option value="">All destinations</option>
            {destinationOptions.map((destination) => (
              <option key={destination.id} value={destination.slug}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-5">
          <Button variant="outline" onClick={clearFilters}>
            <X size={16} aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      )}

      <p aria-live="polite" className="mb-6 mt-8 text-sm text-muted">
        Showing {results.length} of {itineraries.length} itineraries
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No itineraries match your filters"
          description="Try another trip length or destination, or remove the filters."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {results.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      )}
    </div>
  )
}