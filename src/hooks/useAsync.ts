import { useCallback, useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

// IMPORTANT: `fetcher` must be a stable function, such as a service function
// passed directly: useAsync(getTopDestinations).
// Do NOT write useAsync(() => getTopDestinations(3)) inline. That creates a new
// function on every render and causes an endless reload loop.
// When a value is needed, wrap it in useCallback (we will do this for slugs in Phase 2).
export function useAsync<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false // stops a late response from updating an unmounted component

    fetcher().then(
      (data) => {
        if (!ignore) setState({ status: 'success', data })
      },
      (err: unknown) => {
        console.error(err)
        if (!ignore) {
          setState({
            status: 'error',
            error: err instanceof Error ? err : new Error('Something went wrong'),
          })
        }
      },
    )

    return () => {
      ignore = true
    }
  }, [fetcher, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((count) => count + 1)
  }, [])

  return { state, retry }
}