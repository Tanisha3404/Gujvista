import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import Container from '../components/ui/Container'
import { ButtonLink } from '../components/ui/Button'
import Skeleton from '../components/feedback/Skeleton'
import ErrorState from '../components/feedback/ErrorState'
import EmptyState from '../components/feedback/EmptyState'
import ArticleBody from '../components/guides/ArticleBody'
import { useAsync } from '../hooks/useAsync'
import { getPostBySlug } from '../services/blogService'
import { formatPublishedDate, readingTimeMinutes } from '../lib/articleContent'

function ArticleSkeleton() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl" aria-busy="true">
        <p role="status" className="sr-only">
          Loading guide
        </p>
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="mt-6 h-12 w-4/5 rounded-md" />
        <Skeleton className="mt-6 aspect-[16/9] w-full rounded-3xl" />
        <div className="mt-10 space-y-3">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-2/3 rounded-md" />
        </div>
      </div>
    </Container>
  )
}

function GuideLoader({ slug }: { slug: string }) {
  const fetcher = useCallback(() => getPostBySlug(slug), [slug])
  const { state, retry } = useAsync(fetcher)

  if (state.status === 'loading') return <ArticleSkeleton />

  if (state.status === 'error') {
    return (
      <Container className="py-16">
        <ErrorState onRetry={retry} />
      </Container>
    )
  }

  const post = state.data

  if (post === null) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Guide not found"
          description="We couldn't find that guide. It may have moved, or the link may be wrong."
          action={<ButtonLink to="/guides">Browse all guides</ButtonLink>}
        />
      </Container>
    )
  }

  return (
    <article>
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All guides
          </Link>

          <p className="mt-6 flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} aria-hidden="true" />
              {formatPublishedDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} aria-hidden="true" />
              {readingTimeMinutes(post.content)} min read
            </span>
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{post.excerpt}</p>

          <img
            src={post.coverImage}
            alt=""
            className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
          />

          <div className="mt-10">
            <ArticleBody content={post.content} />
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-surface p-8 text-center">
            <h2 className="text-2xl font-bold">Ready to plan your trip?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Search and filter destinations by category and district.
            </p>
            <div className="mt-6">
              <ButtonLink to="/destinations">Browse destinations</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function GuideDetailsPage() {
  const { slug = '' } = useParams()

  // key={slug} remounts the loader when the slug changes, so loading shows again.
  return <GuideLoader key={slug} slug={slug} />
}