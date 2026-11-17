import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { Button, ButtonLink } from '../../components/ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { getStorageImageUrl } from '../../lib/images'
import { deleteDestination, getAdminDestinations } from '../../services/adminDestinationService'
import { getAllCategories } from '../../services/categoryService'

export default function AdminDestinationsPage() {
  const destinations = useAsync(getAdminDestinations)
  const categories = useAsync(getAllCategories)
  const location = useLocation()
  const message = (location.state as { message?: string } | null)?.message

  const [query, setQuery] = useState('')
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const hasError = destinations.state.status === 'error' || categories.state.status === 'error'
  const isLoading =
    !hasError && (destinations.state.status === 'loading' || categories.state.status === 'loading')

  async function handleDelete(id: string) {
    setDeletingId(id)
    setDeleteError(null)
    try {
      await deleteDestination(id)
      setConfirmingId(null)
      destinations.retry() // reload the list
    } catch (error) {
      console.error(error)
      setDeleteError('We could not delete that destination. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Destinations</h2>
        <ButtonLink to="/admin/destinations/new">
          <Plus size={18} aria-hidden="true" />
          Add destination
        </ButtonLink>
      </div>

      {message && (
        <p role="status" className="mt-6 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          {message}
        </p>
      )}
      {deleteError && (
        <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {deleteError}
        </p>
      )}

      <div className="mt-6">
        {hasError && (
          <ErrorState
            onRetry={() => {
              destinations.retry()
              categories.retry()
            }}
          />
        )}

        {isLoading && (
          <div aria-busy="true" className="space-y-3">
            <p role="status" className="sr-only">
              Loading destinations
            </p>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-16" />
            ))}
          </div>
        )}

        {destinations.state.status === 'success' && categories.state.status === 'success' && (() => {
          const categoryNames = new Map(categories.state.data.map((category) => [category.id, category.name]))
          const search = query.trim().toLowerCase()
          const rows = destinations.state.data.filter(
            (destination) =>
              !search ||
              destination.name.toLowerCase().includes(search) ||
              destination.district.toLowerCase().includes(search),
          )

          return (
            <>
              <div className="mb-4">
                <label htmlFor="admin-destination-search" className="sr-only">
                  Search destinations
                </label>
                <input
                  id="admin-destination-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name or district"
                  className="h-11 w-full max-w-sm rounded-xl border border-white/10 bg-surface px-4 text-sm text-white placeholder:text-muted hover:border-white/25 focus:border-accent [color-scheme:dark]"
                />
                <p aria-live="polite" className="mt-2 text-sm text-muted">
                  {rows.length} of {destinations.state.data.length} destinations
                </p>
              </div>

              {rows.length === 0 ? (
                <EmptyState title="No destinations found" description="Try a different search." />
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <caption className="sr-only">All destinations</caption>
                    <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Destination</th>
                        <th scope="col" className="px-4 py-3 font-medium">District</th>
                        <th scope="col" className="px-4 py-3 font-medium">Category</th>
                        <th scope="col" className="px-4 py-3 font-medium">Shown in</th>
                        <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {rows.map((destination) => (
                        <tr key={destination.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={getStorageImageUrl(destination.mainImagePath)}
                                alt=""
                                loading="lazy"
                                className="h-12 w-16 shrink-0 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium">{destination.name}</p>
                                <p className="text-xs text-muted">{destination.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{destination.district}</td>
                          <td className="px-4 py-3">{categoryNames.get(destination.categoryId) ?? '-'}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1.5">
                              {destination.isFeatured && (
                                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent">
                                  Featured
                                </span>
                              )}
                              {destination.isHiddenGem && (
                                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">
                                  Hidden gem
                                </span>
                              )}
                              {!destination.isFeatured && !destination.isHiddenGem && (
                                <span className="text-muted">-</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {confirmingId === destination.id ? (
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                <span className="text-xs text-red-200">
                                  Delete? It also leaves saved places and itineraries.
                                </span>
                                <Button
                                  size="md"
                                  onClick={() => handleDelete(destination.id)}
                                  disabled={deletingId === destination.id}
                                >
                                  {deletingId === destination.id ? 'Deleting...' : 'Yes, delete'}
                                </Button>
                                <Button variant="outline" size="md" onClick={() => setConfirmingId(null)}>
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  to={`/admin/destinations/${destination.id}/edit`}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                                >
                                  <Pencil size={14} aria-hidden="true" />
                                  Edit
                                  <span className="sr-only"> {destination.name}</span>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setConfirmingId(destination.id)}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-400 hover:text-red-300"
                                >
                                  <Trash2 size={14} aria-hidden="true" />
                                  Delete
                                  <span className="sr-only"> {destination.name}</span>
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
            </>
          )
        })()}
      </div>
    </div>
  )
}