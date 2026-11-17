import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { ButtonLink } from '../../components/ui/Button'
import CategoryForm from '../../components/admin/CategoryForm'
import { useAsync } from '../../hooks/useAsync'
import { getAdminCategory } from '../../services/adminCategoryService'

function FormLoader({ id }: { id?: string }) {
  const fetchCategory = useCallback(
    () => (id ? getAdminCategory(id) : Promise.resolve(null)),
    [id],
  )
  const { state, retry } = useAsync(fetchCategory)

  const backLink = (
    <Link
      to="/admin/categories"
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      All categories
    </Link>
  )

  if (state.status === 'loading') {
    return (
      <div aria-busy="true">
        <p role="status" className="sr-only">
          Loading the form
        </p>
        <Skeleton className="h-96 max-w-2xl" />
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div>
        {backLink}
        <ErrorState onRetry={retry} />
      </div>
    )
  }

  // Editing an id that does not exist
  if (id && state.data === null) {
    return (
      <div>
        {backLink}
        <EmptyState
          title="Category not found"
          description="It may have been deleted."
          action={<ButtonLink to="/admin/categories">Back to categories</ButtonLink>}
        />
      </div>
    )
  }

  return (
    <div>
      {backLink}
      <h2 className="mb-8 text-2xl font-bold">
        {state.data ? `Edit ${state.data.name}` : 'Add category'}
      </h2>
      <CategoryForm category={state.data ?? undefined} />
    </div>
  )
}

export default function AdminCategoryFormPage() {
  const { id } = useParams()

  // key remounts the loader when you move between "new" and an existing id.
  return <FormLoader key={id ?? 'new'} id={id} />
}