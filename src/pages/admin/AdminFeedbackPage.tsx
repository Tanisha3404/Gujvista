import { useState } from 'react'
import { Mail, Trash2 } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import EmptyState from '../../components/feedback/EmptyState'
import { Button } from '../../components/ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { deleteFeedbackMessage, getFeedbackMessages } from '../../services/adminFeedbackService'

function formatSent(isoDate: string): string {
  return new Date(isoDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function AdminFeedbackPage() {
  const { state, retry } = useAsync(getFeedbackMessages)

  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    setDeleteError(null)
    try {
      await deleteFeedbackMessage(id)
      setConfirmingId(null)
      retry() // reload the list
    } catch (error) {
      console.error(error)
      setDeleteError('We could not delete that message. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Feedback</h2>
      <p className="mt-2 text-sm text-muted">
        Messages sent through the contact form. Only administrators can see them.
      </p>

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
              Loading messages
            </p>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-20" />
            ))}
          </div>
        )}

        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState
            title="No messages yet"
            description="When visitors use the contact form, their messages will appear here."
          />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <>
            <p aria-live="polite" className="mb-4 text-sm text-muted">
              {state.data.length} {state.data.length === 1 ? 'message' : 'messages'}
            </p>
            <ul className="space-y-3">
              {state.data.map((item) => (
                <li key={item.id}>
                  <details className="rounded-2xl border border-white/10 bg-surface">
                    <summary className="flex cursor-pointer list-none flex-wrap items-start justify-between gap-2 rounded-2xl p-5 [&::-webkit-details-marker]:hidden">
                      <div className="min-w-0">
                        <p className="font-semibold">{item.subject}</p>
                        <p className="mt-1 break-words text-sm text-muted">
                          {item.name} &middot; {item.email}
                        </p>
                      </div>
                      <time dateTime={item.createdAt} className="text-xs text-muted">
                        {formatSent(item.createdAt)}
                      </time>
                    </summary>

                    <div className="border-t border-white/10 p-5">
                      {/* React shows this as plain text, so nothing inside it can run. */}
                      <p className="whitespace-pre-wrap break-words leading-relaxed text-white/85">
                        {item.message}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {confirmingId === item.id ? (
                          <>
                            <span className="text-sm text-red-200">Delete this message?</span>
                            <Button
                              size="md"
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                            >
                              {deletingId === item.id ? 'Deleting...' : 'Yes, delete'}
                            </Button>
                            <Button
                              variant="outline"
                              size="md"
                              onClick={() => setConfirmingId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            {/* The address is URL-encoded so it cannot add extra recipients. */}
                            <a
                              href={`mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                            >
                              <Mail size={16} aria-hidden="true" />
                              Reply by email
                            </a>
                            <button
                              type="button"
                              onClick={() => setConfirmingId(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:border-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}