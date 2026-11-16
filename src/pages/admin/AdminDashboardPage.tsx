import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Skeleton from '../../components/feedback/Skeleton'
import ErrorState from '../../components/feedback/ErrorState'
import { useAsync } from '../../hooks/useAsync'
import { getAdminCounts } from '../../services/adminService'

const gridClass = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4'

export default function AdminDashboardPage() {
  const { state, retry } = useAsync(getAdminCounts)

  if (state.status === 'loading') {
    return (
      <div className={gridClass} aria-busy="true">
        <p role="status" className="sr-only">
          Loading the dashboard
        </p>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-36" />
        ))}
      </div>
    )
  }

  if (state.status === 'error') return <ErrorState onRetry={retry} />

  const counts = state.data
  const cards = [
    {
      label: 'Destinations',
      value: counts.destinations,
      detail: 'Places shown on the site',
      to: '/admin/destinations',
    },
    {
      label: 'Categories',
      value: counts.categories,
      detail: 'Ways to group destinations',
      to: '/admin/categories',
    },
    {
      label: 'Guides',
      value: counts.posts,
      detail: `${counts.drafts} ${counts.drafts === 1 ? 'draft' : 'drafts'}`,
      to: '/admin/guides',
    },
    {
      label: 'Feedback',
      value: counts.feedback,
      detail: 'Messages from visitors',
      to: '/admin/feedback',
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className={`mt-6 ${gridClass}`}>
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group flex flex-col rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            <span className="text-sm font-medium text-muted">{card.label}</span>
            <span className="mt-2 text-4xl font-extrabold">{card.value}</span>
            <span className="mt-1 text-sm text-muted">{card.detail}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
              Manage
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}