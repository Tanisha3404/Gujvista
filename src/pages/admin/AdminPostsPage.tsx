import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { Button, ButtonLink } from '../../components/ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { getStorageImageUrl } from '../../lib/images'
import { formatPublishedDate } from '../../lib/articleContent'
import { cn } from '../../lib/utils'
import { deletePost, getAdminPosts } from '../../services/adminPostService'

export default function AdminPostsPage() {
  const { state, retry } = useAsync(getAdminPosts)
  const location = useLocation()
  const message = (location.state as { message?: string } | null)?.message

  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    setDeleteError(null)
    try {
      await deletePost(id)
      setConfirmingId(null)
      retry() // reload the list
    } catch (error) {
      console.error(error)
      setDeleteError('We could not delete that guide. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Travel guides</h2>
        <ButtonLink to="/admin/guides/new">
          <Plus size={18} aria-hidden="true" />
          Add guide
        </ButtonLink>
      </div>

      {message && (
        <p
          role="status"
          className="mt-6 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {message}
        </p>
      )}
      {deleteError && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {deleteError}
        </p>
      )}

      <div className="mt-6">
        {state.status === 'loading' && (
          <div aria-busy="true" className="space-y-3">
            <p role="status" className="sr-only">
              Loading guides
            </p>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-16" />
            ))}
          </div>
        )}

        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState
            title="No guides yet"
            description="Write your first travel guide."
            action={<ButtonLink to="/admin/guides/new">Add guide</ButtonLink>}
          />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">All travel guides</caption>
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Guide</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium">Publish date</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {state.data.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getStorageImageUrl(post.coverImagePath)}
                          alt=""
                          loading="lazy"
                          className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-xs text-muted">{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-medium',
                          post.status === 'published'
                            ? 'bg-accent/15 text-accent'
                            : 'bg-white/10 text-white/80',
                        )}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {post.publishedAt ? formatPublishedDate(post.publishedAt) : '-'}
                    </td>
                    <td className="px-4 py-3">
                      {confirmingId === post.id ? (
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <span className="text-xs text-red-200">Delete this guide?</span>
                          <Button
                            size="md"
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                          >
                            {deletingId === post.id ? 'Deleting...' : 'Yes, delete'}
                          </Button>
                          <Button variant="outline" size="md" onClick={() => setConfirmingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          {post.status === 'published' && (
                            <Link
                              to={`/guides/${post.slug}`}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                            >
                              <ExternalLink size={14} aria-hidden="true" />
                              View
                              <span className="sr-only"> {post.title}</span>
                            </Link>
                          )}
                          <Link
                            to={`/admin/guides/${post.id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                          >
                            <Pencil size={14} aria-hidden="true" />
                            Edit
                            <span className="sr-only"> {post.title}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmingId(post.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                            <span className="sr-only"> {post.title}</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}