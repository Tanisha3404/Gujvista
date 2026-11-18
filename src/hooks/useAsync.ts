import { useCallback, useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

// a custom React hook that manages the state of an asynchronous operation
export function useAsync<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false 

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