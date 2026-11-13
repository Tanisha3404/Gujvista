import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Skeleton from '../components/feedback/Skeleton'
import ErrorState from '../components/feedback/ErrorState'
import DestinationCardSkeleton from '../components/destinations/DestinationCardSkeleton'
import DestinationsExplorer from '../components/destinations/DestinationsExplorer'
import { useAsync } from '../hooks/useAsync'
import { getAllDestinations } from '../services/destinationService'
import { getAllCategories } from '../services/categoryService'

export default function DestinationsPage() {
  const destinations = useAsync(getAllDestinations)
  const categories = useAsync(getAllCategories)

  const hasError = destinations.state.status === 'error' || categories.state.status === 'error'
  const isLoading =
    !hasError && (destinations.state.status === 'loading' || categories.state.status === 'loading')

  function retryAll() {
    destinations.retry()
    categories.retry()
  }

  return (
    <>
      <section className="bg-stars border-b border-white/10 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Explore Gujarat"
            title="Destinations"
            description="Search and filter places across Gujarat, from famous landmarks to lesser-known corners."
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        {hasError && <ErrorState onRetry={retryAll} />}

        {isLoading && (
          <div aria-busy="true">
            <p role="status" className="sr-only">
              Loading destinations
            </p>
            <Skeleton className="h-24" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <DestinationCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {destinations.state.status === 'success' && categories.state.status === 'success' && (
          <DestinationsExplorer
            destinations={destinations.state.data}
            categories={categories.state.data}
          />
        )}
      </Container>
    </>
  )
}