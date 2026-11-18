import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Container from '../ui/Container'
import { ButtonLink } from '../ui/Button'
import Skeleton from '../feedback/Skeleton'
import EmptyState from '../feedback/EmptyState'
import { useAuth } from '../../hooks/useAuth'

// a wrapper for admin pages that checks if the user is logged in and is an admin
export default function RequireAdmin() {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <Container className="py-24">
        <p role="status" className="sr-only">
          Checking your access
        </p>
        <Skeleton className="mx-auto h-64 max-w-3xl" />
      </Container>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  if (!isAdmin) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Administrators only"
          description="You do not have permission to view this page."
          action={<ButtonLink to="/">Back to home</ButtonLink>}
        />
      </Container>
    )
  }

  return <Outlet />
}