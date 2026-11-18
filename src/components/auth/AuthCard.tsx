import type { ReactNode } from 'react'
import Container from '../ui/Container'

interface AuthCardProps {
  title: string
  description?: string
  footer?: ReactNode
  children: ReactNode
}

// a centred card used by the Login, Sign Up and Profile pages
export default function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <section className="bg-stars py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <p className="mt-6 text-center text-sm text-muted">{footer}</p>}
      </Container>
    </section>
  )
}