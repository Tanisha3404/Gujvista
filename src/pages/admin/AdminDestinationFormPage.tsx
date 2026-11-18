import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { ButtonLink } from '../../components/ui/Button'
import DestinationForm from '../../components/admin/DestinationForm'
import { useAsync } from '../../hooks/useAsync'
import { getAdminDestination } from '../../services/adminDestinationService'
import { getAllCategories } from '../../services/categoryService'

function FormLoader({ id }: { id?: string }) {
  const categories = useAsync(getAllCategories)
  const fetchDestination = useCallback(
    () => (id ? getAdminDestination(id) : Promise.resolve(null)),
    [id],
  )
  const destination = useAsync(fetchDestination)

  const backLink = (
    <Link
      to="/admin/destinations"
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      All destinations
    </Link>
  )

  if (categories.state.status === 'error' || destination.state.status === 'error') {
    return (
      <div>
        {backLink}
        <ErrorState
          onRetry={() => {
            categories.retry()
            destination.retry()
          }}
        />
      </div>
    )
  }

  if (categories.state.status === 'loading' || destination.state.status === 'loading') {
    return (
      <div aria-busy="true">
        <p role="status" className="sr-only">
          Loading the form
        </p>
        <Skeleton className="h-96 max-w-3xl" />
      </div>
    )
  }

  // if id is present but the destination was not found, show an empty state
  if (id && destination.state.data === null) {
    return (
      <div>
        {backLink}
        <EmptyState
          title="Destination not found"
          description="It may have been deleted."
          action={<ButtonLink to="/admin/destinations">Back to destinations</ButtonLink>}
        />
      </div>
    )
  }

  return (
    <div>
      {backLink}
      <h2 className="mb-8 text-2xl font-bold">
        {destination.state.data ? `Edit ${destination.state.data.name}` : 'Add destination'}
      </h2>
      <DestinationForm
        categories={categories.state.data}
        destination={destination.state.data ?? undefined}
      />
    </div>
  )
}

export default function AdminDestinationFormPage() {
  const { id } = useParams()

  // if id is present, we are editing an existing destination; if not, we are creating a new one
  return <FormLoader key={id ?? 'new'} id={id} />
}