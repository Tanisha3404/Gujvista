import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useFavourites } from '../../hooks/useFavourites'
import { cn } from '../../lib/utils'

interface FavouriteButtonProps {
  destinationId: string
  destinationName: string
  // "overlay" is a round icon on a card photo. "inline" is a labelled button.
  variant?: 'overlay' | 'inline'
}

export default function FavouriteButton({
  destinationId,
  destinationName,
  variant = 'overlay',
}: FavouriteButtonProps) {
  const { user } = useAuth()
  const { isFavourite, toggleFavourite } = useFavourites()
  const navigate = useNavigate()
  const location = useLocation()
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  const saved = isFavourite(destinationId)
  const label = saved
    ? `Remove ${destinationName} from saved places`
    : `Save ${destinationName} to saved places`

  async function handleClick() {
    // Logged-out visitors go to Login and come back to this page afterwards.
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }

    setBusy(true)
    setFailed(false)
    try {
      await toggleFavourite(destinationId)
    } catch (error) {
      console.error(error)
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  const heart = (
    <Heart
      size={variant === 'overlay' ? 20 : 18}
      aria-hidden="true"
      className={cn('transition-colors', saved ? 'fill-accent text-accent' : 'text-white')}
    />
  )

  if (variant === 'inline') {
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={handleClick}
          disabled={busy}
          aria-pressed={saved}
          aria-label={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink/60 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-accent disabled:opacity-60"
        >
          {heart}
          {saved ? 'Saved' : 'Save'}
        </button>
        {failed && (
          <p role="alert" className="rounded-md bg-ink/80 px-2 py-1 text-xs text-red-300">
            Could not update. Try again.
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      {/* z-10 keeps it above the card's full-card link */}
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        aria-pressed={saved}
        aria-label={label}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 backdrop-blur transition-colors hover:bg-ink disabled:opacity-60"
      >
        {heart}
      </button>
      {failed && (
        <span role="alert" className="sr-only">
          Could not update your saved places. Please try again.
        </span>
      )}
    </>
  )
}