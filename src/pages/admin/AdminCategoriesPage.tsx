import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { Button, ButtonLink } from '../../components/ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { getStorageImageUrl } from '../../lib/images'
import { deleteCategory, getAdminCategories } from '../../services/adminCategoryService'

export default function AdminCategoriesPage() {
  const { state, retry } = useAsync(getAdminCategories)
  const location = useLocation()
  const message = (location.state as { message?: string } | null)?.message

  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    setDeleteError(null)
    try {
      await deleteCategory(id)
      setConfirmingId(null)
      retry() // reload the list
    } catch (error) {
      console.error(error)
      setDeleteError(
        error instanceof Error ? error.message : 'We could not delete that category. Please try again.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <ButtonLink to="/admin/categories/new">
          <Plus size={18} aria-hidden="true" />
          Add category
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
              Loading categories
            </p>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-16" />
            ))}
          </div>
        )}

        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState
            title="No categories yet"
            description="Add one to start grouping destinations."
            action={<ButtonLink to="/admin/categories/new">Add category</ButtonLink>}
          />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">All categories</caption>
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Category</th>
                  <th scope="col" className="px-4 py-3 font-medium">Description</th>
                  <th scope="col" className="px-4 py-3 font-medium">Destinations</th>
                  <th scope="col" className="px-4 py-3 font-medium">Order</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {state.data.map((category) => (
                  <tr key={category.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getStorageImageUrl(category.imagePath)}
                          alt=""
                          loading="lazy"
                          className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-xs text-muted">{category.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-muted">
                      <span className="line-clamp-2">{category.description || '-'}</span>
                    </td>
                    <td className="px-4 py-3">{category.destinationCount}</td>
                    <td className="px-4 py-3">{category.sortOrder}</td>
                    <td className="px-4 py-3">
                      {confirmingId === category.id ? (
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <span className="text-xs text-red-200">Delete this category?</span>
                          <Button
                            size="md"
                            onClick={() => handleDelete(category.id)}
                            disabled={deletingId === category.id}
                          >
                            {deletingId === category.id ? 'Deleting...' : 'Yes, delete'}
                          </Button>
                          <Button variant="outline" size="md" onClick={() => setConfirmingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/categories/${category.id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                          >
                            <Pencil size={14} aria-hidden="true" />
                            Edit
                            <span className="sr-only"> {category.name}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmingId(category.id)}
                            disabled={category.destinationCount > 0}
                            title={
                              category.destinationCount > 0
                                ? 'Move or delete its destinations first'
                                : undefined
                            }
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                            <span className="sr-only"> {category.name}</span>
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