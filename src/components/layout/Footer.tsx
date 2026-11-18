import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import Container from '../ui/Container'

const usefulLinks = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Travel Guides', to: '/guides' },
  { label: 'About', to: '/about' },
  { label: 'Contact & Feedback', to: '/contact' },
  { label: 'Travel Planner', to: '/planner' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-logo text-3xl font-bold">
            Guj<span className="text-accent">Vista</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            GujVista helps travellers discover the famous landmarks and hidden gems of Gujarat.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
            Useful Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {usefulLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" aria-hidden="true" />
              Gujarat, India
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-accent" aria-hidden="true" />
                Send us a message
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} GujVista. All rights reserved.
      </div>
    </footer>
  )
}