import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from '../ui/Container'
import { ButtonLink } from '../ui/Button'
import { cn } from '../../lib/utils'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Travel Guides', to: '/guides' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-lg px-5 py-2 text-sm font-medium transition-colors',
      isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white',
    )

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-lg px-3 py-3 text-base font-medium transition-colors',
      isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" onClick={closeMenu} className="font-logo text-3xl font-bold">
          Guj<span className="text-accent">Vista</span>
        </Link>

        {/* Desktop navigation: links grouped in one rounded container */}
        <nav
          aria-label="Main"
          className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-1 md:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 justify-self-end md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Login
          </Link>
          <ButtonLink to="/signup" variant="outline" className="bg-surface">
            Sign Up
          </ButtonLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-white/10 bg-surface md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3">
              <ButtonLink to="/login" variant="outline" className="flex-1" onClick={closeMenu}>
                Login
              </ButtonLink>
              <ButtonLink to="/signup" className="flex-1" onClick={closeMenu}>
                Sign Up
              </ButtonLink>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}