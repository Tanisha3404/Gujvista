import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Container from '../ui/Container'
import Skeleton from '../feedback/Skeleton'
import { useAuth } from '../../hooks/useAuth'

// a wrapper for routes that require the user to be logged in. If the user is not logged in, they will be redirected to the login page
export default function RequireAuth() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <Container className="py-24">
        <p role="status" className="sr-only">
          Checking your session
        </p>
        <Skeleton className="mx-auto h-64 max-w-md" />
      </Container>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  return <Outlet />
}