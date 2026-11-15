import { MapPin } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { formatDuration } from '../../lib/itinerary'
import type { ItinerarySummary } from '../../types/itinerary'

export default function ItineraryCard({ itinerary }: { itinerary: ItinerarySummary }) {
  const placeCount = itinerary.destinationIds.length

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper text-ink transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={itinerary.coverImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
          {formatDuration(itinerary.durationDays)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold leading-snug">{itinerary.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin size={14} aria-hidden="true" />
          {placeCount} {placeCount === 1 ? 'place' : 'places'}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
          {itinerary.description}
        </p>

        <div className="mt-auto pt-5">
          {/* The stretched link makes the whole card clickable. */}
          <ButtonLink
            to={`/planner/${itinerary.slug}`}
            variant="outlineDark"
            className="after:absolute after:inset-0"
          >
            View itinerary
            <span className="sr-only">: {itinerary.title}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}