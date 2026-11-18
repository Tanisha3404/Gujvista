import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface ImageTileProps {
  to: string
  image: string
  title: string
  subtitle?: string
  className?: string 
}

export default function ImageTile({ to, image, title, subtitle, className }: ImageTileProps) {
  return (
    <Link to={to} className={cn('group relative block overflow-hidden rounded-2xl', className)}>
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* dark gradient keeps the white text readable on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-1 line-clamp-2 text-sm text-white/75">{subtitle}</p>}
      </div>
    </Link>
  )
}