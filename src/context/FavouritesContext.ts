import { createContext } from 'react'

export interface FavouritesContextValue {
  favouriteIds: string[] // destination ids, newest first
  loading: boolean
  isFavourite: (destinationId: string) => boolean
  toggleFavourite: (destinationId: string) => Promise<void>
}

export const FavouritesContext = createContext<FavouritesContextValue | null>(null)