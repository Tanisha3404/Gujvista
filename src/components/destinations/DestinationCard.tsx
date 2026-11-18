import { MapPin } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import FavouriteButton from './FavouriteButton'
import type { Destination } from '../../types/destination'

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { id, name, slug, district, shortDescription, mainImage } = destination

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper text-ink transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <FavouriteButton destinationId={id} destinationName={name} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-snug">{name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin size={14} aria-hidden="true" />
          {district}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">{shortDescription}</p>

        {/* mt-auto pins the button to the bottom so every card lines up */}
        <div className="mt-auto pt-4">
          {/* "after:absolute after:inset-0" stretches this link over the whole card */}
          <ButtonLink
            to={`/destinations/${slug}`}
            variant="outlineDark"
            className="after:absolute after:inset-0"
          >
            Explore More
            <span className="sr-only"> about {name}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}