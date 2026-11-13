import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImageTile from '../ui/ImageTile'
import Skeleton from '../feedback/Skeleton'
import ErrorState from '../feedback/ErrorState'
import EmptyState from '../feedback/EmptyState'
import { useAsync } from '../../hooks/useAsync'
import { getAllCategories } from '../../services/categoryService'

const gridClass = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

export default function ExploreCategories() {
  const { state, retry } = useAsync(getAllCategories)

  return (
    <section className="border-t border-white/10 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Explore by Category"
          title="Find the Gujarat that suits you"
          description="Heritage, faith, coast, wildlife, hills and living culture. Start with whatever interests you most."
        />

        <div className="mt-10">
          {state.status === 'loading' && (
            <div className={gridClass} aria-busy="true">
              <p role="status" className="sr-only">
                Loading categories
              </p>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="aspect-[4/3]" />
              ))}
            </div>
          )}

          {state.status === 'error' && <ErrorState onRetry={retry} />}

          {state.status === 'success' && state.data.length === 0 && (
            <EmptyState title="No categories yet" description="Check back soon." />
          )}

          {state.status === 'success' && state.data.length > 0 && (
            <div className={gridClass}>
              {state.data.map((category) => (
                <ImageTile
                  key={category.id}
                  to={`/destinations?category=${category.slug}`}
                  image={category.image}
                  title={category.name}
                  subtitle={category.description}
                  className="aspect-[4/3]"
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}