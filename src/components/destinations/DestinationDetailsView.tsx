import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ExternalLink, Lightbulb, MapPin } from 'lucide-react'
import Container from '../ui/Container'
import Skeleton from '../feedback/Skeleton'
import DestinationCard from './DestinationCard'
import FavouriteButton from './FavouriteButton'
import type { DestinationDetails } from '../../services/destinationService'
import PageTitle from '../layout/PageTitle'

// lazy load the map component to improve initial load performance
const DestinationMap = lazy(() => import('./DestinationMap'))

function InfoList({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-white/80">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function DestinationDetailsView({ details }: { details: DestinationDetails }) {
  const { destination, category, nearby, gallery } = details
  const {
    id,
    name,
    district,
    mainImage,
    fullDescription,
    bestTimeToVisit,
    travelTips,
    latitude,
    longitude,
    historicalSignificance,
    majorAttractions,
    thingsToDo,
  } = destination

  const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`

  return (
    <article>
      <PageTitle title={name} />
      <Container className="pt-8">
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All destinations
        </Link>
      </Container>

      {/* hero photo with the title over a dark gradient */}
      <Container className="mt-6">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={mainImage}
            alt={name}
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/8]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
          />
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
            <FavouriteButton variant="inline" destinationId={id} destinationName={name} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            {category && (
              <Link
                to={`/destinations?category=${category.slug}`}
                className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-white"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-white/80">
              <MapPin size={18} aria-hidden="true" />
              {district}, Gujarat
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
        {/* Main column. Every section below is a direct child of this div,
            so "space-y-14" puts the same gap between all of them. */}
        <div className="space-y-14">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-bold">
              Overview
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">{fullDescription}</p>
          </section>

          {historicalSignificance && (
            <section aria-labelledby="significance-heading">
              <h2 id="significance-heading" className="text-2xl font-bold">
                Historical and cultural significance
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">{historicalSignificance}</p>
            </section>
          )}

          {majorAttractions && majorAttractions.length > 0 && (
            <InfoList id="attractions-heading" title="Major attractions" items={majorAttractions} />
          )}

          {thingsToDo && thingsToDo.length > 0 && (
            <InfoList id="things-heading" title="Things to do" items={thingsToDo} />
          )}

          {gallery.length > 0 && (
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-2xl font-bold">
                Gallery
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {gallery.map((src, index) => (
                  <li key={src}>
                    <img
                      src={src}
                      alt={`${name}, photo ${index + 2}`}
                      loading="lazy"
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="map-heading">
            <h2 id="map-heading" className="text-2xl font-bold">
              Location
            </h2>
            <div role="region" aria-label={`Map showing ${name}`} className="mt-5">
              <Suspense fallback={<Skeleton className="h-80 sm:h-96" />}>
                <DestinationMap name={name} latitude={latitude} longitude={longitude} />
              </Suspense>
            </div>
            <a
              href={openStreetMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              Open in OpenStreetMap
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </section>
        </div>

        {/* Side column */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CalendarDays size={20} className="text-accent" aria-hidden="true" />
              Best time to visit
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{bestTimeToVisit}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Lightbulb size={20} className="text-accent" aria-hidden="true" />
              Travel tips
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{travelTips}</p>
          </section>
        </aside>
      </Container>

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-heading" className="mt-16 border-t border-white/10 py-16">
          <Container>
            <h2 id="nearby-heading" className="text-2xl font-bold sm:text-3xl">
              Nearby destinations
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {nearby.map((item) => (
                <DestinationCard key={item.id} destination={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  )
}