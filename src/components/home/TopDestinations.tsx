import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import { ButtonLink } from '../ui/Button'
import ErrorState from '../feedback/ErrorState'
import EmptyState from '../feedback/EmptyState'
import DestinationCard from '../destinations/DestinationCard'
import DestinationCardSkeleton from '../destinations/DestinationCardSkeleton'
import { useAsync } from '../../hooks/useAsync'
import { getTopDestinations } from '../../services/destinationService'

const gridClass = 'grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'

export default function TopDestinations() {
  const { state, retry } = useAsync(getTopDestinations)

  return (
    <section aria-labelledby="top-destinations-heading" className="bg-stars py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 id="top-destinations-heading" className="text-3xl font-bold sm:text-4xl">
            Top Destinations
          </h2>
          <ButtonLink to="/destinations" variant="outline" className="shrink-0 bg-surface">
            See All
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>

        {state.status === 'loading' && (
          <div className={gridClass} aria-busy="true">
            <p role="status" className="sr-only">
              Loading destinations
            </p>
            {Array.from({ length: 6 }, (_, index) => (
              <DestinationCardSkeleton key={index} />
            ))}
          </div>
        )}

        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState
            title="No destinations to show yet"
            description="Check back soon. We are adding more places across Gujarat."
          />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className={gridClass}>
            {state.data.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}