import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Skeleton from '../components/feedback/Skeleton'
import ErrorState from '../components/feedback/ErrorState'
import GuideCardSkeleton from '../components/guides/GuideCardSkeleton'
import PlannerExplorer from '../components/planner/PlannerExplorer'
import { useAsync } from '../hooks/useAsync'
import { getAllDestinations } from '../services/destinationService'
import { getItineraries } from '../services/plannerService'

export default function PlannerPage() {
  const itineraries = useAsync(getItineraries)
  const destinations = useAsync(getAllDestinations)

  const hasError = itineraries.state.status === 'error' || destinations.state.status === 'error'
  const isLoading =
    !hasError && (itineraries.state.status === 'loading' || destinations.state.status === 'loading')

  function retryAll() {
    itineraries.retry()
    destinations.retry()
  }

  return (
    <>
      <section className="bg-stars border-b border-white/10 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Travel Planner"
            title="Ready-made itineraries"
            description="Pick a trip length or a destination and follow a suggested route, day by day."
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        {hasError && <ErrorState onRetry={retryAll} />}

        {isLoading && (
          <div aria-busy="true">
            <p role="status" className="sr-only">
              Loading itineraries
            </p>
            <Skeleton className="h-20" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <GuideCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {itineraries.state.status === 'success' && destinations.state.status === 'success' && (
          <PlannerExplorer
            itineraries={itineraries.state.data}
            destinations={destinations.state.data}
          />
        )}
      </Container>
    </>
  )
}