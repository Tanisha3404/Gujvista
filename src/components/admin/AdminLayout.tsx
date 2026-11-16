import { NavLink, Outlet } from 'react-router-dom'
import Container from '../ui/Container'
import { cn } from '../../lib/utils'

const adminLinks = [
  { label: 'Dashboard', to: '/admin', end: true },
  { label: 'Destinations', to: '/admin/destinations', end: false },
  { label: 'Categories', to: '/admin/categories', end: false },
  { label: 'Guides', to: '/admin/guides', end: false },
  { label: 'Feedback', to: '/admin/feedback', end: false },
]

// Shared frame for every admin page: a title, a row of tabs, then the page.
export default function AdminLayout() {
  return (
    <>
      <section className="border-b border-white/10 bg-surface">
        <Container className="py-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Admin</p>
          <h1 className="mt-1 text-3xl font-bold">Manage GujVista</h1>

          <nav aria-label="Admin" className="-mx-1 mt-6 flex gap-1 overflow-x-auto pb-1">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="py-10">
        <Outlet />
      </Container>
    </>
  )
}