import { useContext } from 'react'
import { FavouritesContext } from '../context/FavouritesContext'

export function useFavourites() {
  const value = useContext(FavouritesContext)
  if (!value) throw new Error('useFavourites must be used inside <FavouritesProvider>')
  return value
}