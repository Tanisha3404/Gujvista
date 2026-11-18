import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import Container from '../components/ui/Container'
import { ButtonLink } from '../components/ui/Button'
import Skeleton from '../components/feedback/Skeleton'
import ErrorState from '../components/feedback/ErrorState'
import EmptyState from '../components/feedback/EmptyState'
import { useAsync } from '../hooks/useAsync'
import { getItineraryDetails } from '../services/plannerService'
import { formatDuration, groupStopsByDay } from '../lib/itinerary'
import PageTitle from '../components/layout/PageTitle'

function ItinerarySkeleton() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl" aria-busy="true">
        <p role="status" className="sr-only">
          Loading itinerary
        </p>
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="mt-6 h-12 w-4/5 rounded-md" />
        <Skeleton className="mt-6 h-5 w-full rounded-md" />
        <div className="mt-10 space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    </Container>
  )
}

function ItineraryLoader({ slug }: { slug: string }) {
  const fetcher = useCallback(() => getItineraryDetails(slug), [slug])
  const { state, retry } = useAsync(fetcher)

  if (state.status === 'loading') return <ItinerarySkeleton />

  if (state.status === 'error') {
    return (
      <Container className="py-16">
        <ErrorState onRetry={retry} />
      </Container>
    )
  }

  const details = state.data

  if (details === null) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Itinerary not found"
          description="We couldn't find that itinerary. It may have moved, or the link may be wrong."
          action={<ButtonLink to="/planner">Browse all itineraries</ButtonLink>}
        />
      </Container>
    )
  }

  const { itinerary, stops } = details
  const days = groupStopsByDay(stops)
  const placeCount = new Set(stops.map((stop) => stop.destination.id)).size

  return (
    <article>
      <PageTitle title={itinerary.title} />
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All itineraries
          </Link>

          <p className="mt-6 flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} aria-hidden="true" />
              {formatDuration(itinerary.durationDays)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" />
              {placeCount} {placeCount === 1 ? 'place' : 'places'}
            </span>
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            {itinerary.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{itinerary.description}</p>

          <div className="mt-12 space-y-12">
            {days.map(({ day, stops: dayStops }) => (
              <section key={day} aria-labelledby={`day-${day}`}>
                <h2 id={`day-${day}`} className="text-2xl font-bold">
                  Day {day}
                </h2>
                <ol className="mt-5 space-y-4">
                  {dayStops.map((stop) => (
                    <li
                      key={stop.id}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-surface p-4 sm:p-5"
                    >
                      <Link
                        to={`/destinations/${stop.destination.slug}`}
                        className="shrink-0"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <img
                          src={stop.destination.mainImage}
                          alt=""
                          loading="lazy"
                          className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-40"
                        />
                      </Link>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                          Stop {stop.sequence}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold leading-snug">
                          <Link
                            to={`/destinations/${stop.destination.slug}`}
                            className="transition-colors hover:text-accent"
                          >
                            {stop.destination.name}
                          </Link>
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                          <MapPin size={14} aria-hidden="true" />
                          {stop.destination.district}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                          {stop.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-2xl border border-white/10 bg-surface p-5 text-sm leading-relaxed text-muted">
            Travel times, opening hours, permits and seasonal closures change. Check them before you
            travel, and allow extra time for road journeys.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/planner" variant="outline">
              More itineraries
            </ButtonLink>
            <ButtonLink to="/destinations">Browse destinations</ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function ItineraryDetailsPage() {
  const { slug = '' } = useParams()
  return <ItineraryLoader key={slug} slug={slug} />
}