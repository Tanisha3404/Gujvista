import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { ButtonLink } from '../components/ui/Button'
import Skeleton from '../components/feedback/Skeleton'
import ErrorState from '../components/feedback/ErrorState'
import EmptyState from '../components/feedback/EmptyState'
import DestinationDetailsView from '../components/destinations/DestinationDetailsView'
import { useAsync } from '../hooks/useAsync'
import { getDestinationDetails } from '../services/destinationService'

function DetailsSkeleton() {
  return (
    <Container className="py-10">
      <div aria-busy="true">
        <p role="status" className="sr-only">
          Loading destination
        </p>
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="mt-6 aspect-[4/3] w-full rounded-3xl sm:aspect-[16/8]" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            <Skeleton className="h-7 w-40 rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
          </div>
          <Skeleton className="h-48" />
        </div>
      </div>
    </Container>
  )
}

function DestinationDetailsLoader({ slug }: { slug: string }) {
  // useCallback keeps the same function between renders (see the note in useAsync).
  const fetcher = useCallback(() => getDestinationDetails(slug), [slug])
  const { state, retry } = useAsync(fetcher)

  if (state.status === 'loading') return <DetailsSkeleton />

  if (state.status === 'error') {
    return (
      <Container className="py-16">
        <ErrorState onRetry={retry} />
      </Container>
    )
  }

  if (state.data === null) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Destination not found"
          description="We couldn't find that place. It may have moved, or the link may be wrong."
          action={<ButtonLink to="/destinations">Browse all destinations</ButtonLink>}
        />
      </Container>
    )
  }

  return <DestinationDetailsView details={state.data} />
}

export default function DestinationDetailsPage() {
  const { slug = '' } = useParams()

  // key={slug} remounts the loader when you move between destinations
  // (for example from a "nearby" card), so the loading state shows again.
  return <DestinationDetailsLoader key={slug} slug={slug} />
}