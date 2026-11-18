import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Container from '../ui/Container'
import Skeleton from '../feedback/Skeleton'
import { formatPageTitle } from '../../hooks/usePageTitle'

const STATIC_TITLES: Record<string, string> = {
  '/': 'Discover the Beauty of Gujarat',
  '/about': 'About',
  '/destinations': 'Destinations',
  '/guides': 'Travel Guides',
  '/planner': 'Travel Planner',
  '/contact': 'Contact and Feedback',
  '/login': 'Log in',
  '/signup': 'Sign up',
  '/profile': 'Your profile',
  '/favourites': 'Saved places',
}

// Returns null for pages that set their own title 
function staticTitle(rawPathname: string): string | null {
  const pathname = rawPathname.replace(/\/+$/, '') || '/'
  if (pathname.startsWith('/admin')) return 'Admin'
  if (/^\/(destinations|guides|planner)\/.+/.test(pathname)) return null
  return STATIC_TITLES[pathname] ?? 'Page not found'
}

function PageFallback() {
  return (
    <Container className="py-24">
      <p role="status" className="sr-only">
        Loading page
      </p>
      <Skeleton className="mx-auto h-64 max-w-3xl" />
    </Container>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const title = staticTitle(pathname)
    if (title) document.title = formatPageTitle(title)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}