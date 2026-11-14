import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/Button'
import ErrorState from '../components/feedback/ErrorState'
import EmptyState from '../components/feedback/EmptyState'
import DestinationCard from '../components/destinations/DestinationCard'
import DestinationCardSkeleton from '../components/destinations/DestinationCardSkeleton'
import { useAsync } from '../hooks/useAsync'
import { useFavourites } from '../hooks/useFavourites'
import { getAllDestinations } from '../services/destinationService'
import type { Destination } from '../types/destination'

const gridClass = 'grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'

export default function FavouritesPage() {
  const { favouriteIds, loading: favouritesLoading } = useFavourites()
  const { state, retry } = useAsync(getAllDestinations)

  // Newest saved first. The list reacts instantly when you un-save a card.
  let saved: Destination[] = []
  if (state.status === 'success') {
    saved = favouriteIds
      .map((id) => state.data.find((destination) => destination.id === id))
      .filter((destination): destination is Destination => Boolean(destination))
  }

  const isLoading = state.status === 'loading' || favouritesLoading

  return (
    <>
      <section className="bg-stars border-b border-white/10 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Your list"
            title="Saved places"
            description="The destinations you have saved. They stay here whenever you log in."
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status !== 'error' && isLoading && (
          <div className={gridClass} aria-busy="true">
            <p role="status" className="sr-only">
              Loading your saved places
            </p>
            {Array.from({ length: 3 }, (_, index) => (
              <DestinationCardSkeleton key={index} />
            ))}
          </div>
        )}

        {state.status === 'success' && !favouritesLoading && saved.length === 0 && (
          <EmptyState
            title="No saved places yet"
            description="Tap the heart on any destination to save it here."
            action={<ButtonLink to="/destinations">Browse destinations</ButtonLink>}
          />
        )}

        {state.status === 'success' && !favouritesLoading && saved.length > 0 && (
          <>
            <p aria-live="polite" className="mb-6 text-sm text-muted">
              {saved.length} saved {saved.length === 1 ? 'place' : 'places'}
            </p>
            <div className={gridClass}>
              {saved.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  )
}