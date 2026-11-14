import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Container from '../ui/Container'
import Skeleton from '../feedback/Skeleton'
import { useAuth } from '../../hooks/useAuth'

// Wrap routes that need a signed-in user. Others are sent to /login and
// returned to the page they wanted after logging in.
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