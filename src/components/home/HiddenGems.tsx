import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImageTile from '../ui/ImageTile'
import Skeleton from '../feedback/Skeleton'
import ErrorState from '../feedback/ErrorState'
import EmptyState from '../feedback/EmptyState'
import { useAsync } from '../../hooks/useAsync'
import { getHiddenGems } from '../../services/destinationService'

const gridClass = 'grid gap-5 sm:grid-cols-2 sm:gap-6'

export default function HiddenGems() {
  const { state, retry } = useAsync(getHiddenGems)

  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Hidden Gems"
          title="Beyond the well-known"
          description="Lesser-known places across Gujarat that reward the curious traveller."
        />

        <div className="mt-10">
          {state.status === 'loading' && (
            <div className={gridClass} aria-busy="true">
              <p role="status" className="sr-only">
                Loading hidden gems
              </p>
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="aspect-[16/10] bg-white/10" />
              ))}
            </div>
          )}

          {state.status === 'error' && <ErrorState onRetry={retry} />}

          {state.status === 'success' && state.data.length === 0 && (
            <EmptyState title="No hidden gems yet" description="We are still discovering them." />
          )}

          {state.status === 'success' && state.data.length > 0 && (
            <div className={gridClass}>
              {state.data.map((destination) => (
                <ImageTile
                  key={destination.id}
                  to={`/destinations/${destination.slug}`}
                  image={destination.mainImage}
                  title={destination.name}
                  subtitle={destination.district}
                  className="aspect-[16/10]"
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}