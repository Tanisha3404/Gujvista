import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import ErrorState from '../components/feedback/ErrorState'
import EmptyState from '../components/feedback/EmptyState'
import GuideCard from '../components/guides/GuideCard'
import GuideCardSkeleton from '../components/guides/GuideCardSkeleton'
import { useAsync } from '../hooks/useAsync'
import { getPublishedPosts } from '../services/blogService'

const gridClass = 'grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'

export default function GuidesPage() {
  const { state, retry } = useAsync(getPublishedPosts)

  return (
    <>
      <section className="bg-stars border-b border-white/10 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Travel Guides"
            title="Guides for exploring Gujarat"
            description="Practical guides on where to go, when to travel, and what to look for along the way."
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        {state.status === 'loading' && (
          <div className={gridClass} aria-busy="true">
            <p role="status" className="sr-only">
              Loading guides
            </p>
            {Array.from({ length: 3 }, (_, index) => (
              <GuideCardSkeleton key={index} />
            ))}
          </div>
        )}

        {state.status === 'error' && <ErrorState onRetry={retry} />}

        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState
            title="No guides yet"
            description="We are writing them. Please check back soon."
          />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className={gridClass}>
            {state.data.map((post) => (
              <GuideCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}