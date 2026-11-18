import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { ButtonLink } from '../../components/ui/Button'
import PostForm from '../../components/admin/PostForm'
import { useAsync } from '../../hooks/useAsync'
import { getAdminPost } from '../../services/adminPostService'

function FormLoader({ id }: { id?: string }) {
  const fetchPost = useCallback(() => (id ? getAdminPost(id) : Promise.resolve(null)), [id])
  const { state, retry } = useAsync(fetchPost)

  const backLink = (
    <Link
      to="/admin/guides"
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      All guides
    </Link>
  )

  if (state.status === 'loading') {
    return (
      <div aria-busy="true">
        <p role="status" className="sr-only">
          Loading the form
        </p>
        <Skeleton className="h-96 max-w-3xl" />
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

  // if id is present but the post was not found, show an empty state
  if (id && state.data === null) {
    return (
      <div>
        {backLink}
        <EmptyState
          title="Guide not found"
          description="It may have been deleted."
          action={<ButtonLink to="/admin/guides">Back to guides</ButtonLink>}
        />
      </div>
    )
  }

  return (
    <div>
      {backLink}
      <h2 className="mb-8 text-2xl font-bold">
        {state.data ? `Edit ${state.data.title}` : 'Add guide'}
      </h2>
      <PostForm post={state.data ?? undefined} />
    </div>
  )
}

export default function AdminPostFormPage() {
  const { id } = useParams()

  // if id is present, we are editing an existing post; if not, we are creating a new one
  return <FormLoader key={id ?? 'new'} id={id} />
}