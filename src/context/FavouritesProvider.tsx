import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { addFavourite, getMyFavouriteIds, removeFavourite } from '../services/favouriteService'
import { FavouritesContext, type FavouritesContextValue } from './FavouritesContext'

interface FavouritesState {
  userId: string
  ids: string[]
}

const NO_FAVOURITES: string[] = []

export default function FavouritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [state, setState] = useState<FavouritesState | null>(null)

  // Load this user's saved places whenever someone signs in
  useEffect(() => {
    if (!userId) return
    let ignore = false

    getMyFavouriteIds()
      .then((ids) => {
        if (!ignore) setState({ userId, ids })
      })
      .catch((error) => {
        console.error(error)
        if (!ignore) setState({ userId, ids: [] })
      })

    return () => {
      ignore = true
    }
  }, [userId])

  const favouriteIds = userId && state?.userId === userId ? state.ids : NO_FAVOURITES
  const loading = Boolean(userId) && state?.userId !== userId

  const isFavourite = useCallback(
    (destinationId: string) => favouriteIds.includes(destinationId),
    [favouriteIds],
  )

  const toggleFavourite = useCallback(
    async (destinationId: string) => {
      if (!userId) throw new Error('Not signed in')

      const wasSaved = favouriteIds.includes(destinationId)
      const apply = (ids: string[]) => setState({ userId, ids })

      // Update the screen immediately, then save
      apply(
        wasSaved
          ? favouriteIds.filter((id) => id !== destinationId)
          : [destinationId, ...favouriteIds],
      )
      try {
        if (wasSaved) await removeFavourite(userId, destinationId)
        else await addFavourite(userId, destinationId)
      } catch (error) {
        apply(favouriteIds)
        throw error
      }
    },
    [userId, favouriteIds],
  )

  const value = useMemo<FavouritesContextValue>(
    () => ({ favouriteIds, loading, isFavourite, toggleFavourite }),
    [favouriteIds, loading, isFavourite, toggleFavourite],
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}