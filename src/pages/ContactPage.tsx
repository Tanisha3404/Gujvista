import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Skeleton from '../components/feedback/Skeleton'
import ContactForm from '../components/contact/ContactForm'
import { useAuth } from '../hooks/useAuth'

const reasons = [
  'Questions about a destination or a travel guide',
  'Corrections: if something looks wrong, tell us the page and what to fix',
  'Suggestions for places or topics you would like to see',
]

export default function ContactPage() {
  const { user, profile, loading } = useAuth()

  return (
    <>
      <section className="bg-stars border-b border-white/10 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Contact and feedback"
            description="We would like to hear from you, whether it is a question, a correction or an idea."
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold">What to write to us about</h2>
            <ul className="mt-5 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 leading-relaxed text-white/80">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Your name, email and message are stored securely and can only be read by site
              administrators.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
            {loading ? (
              <div aria-busy="true">
                <p role="status" className="sr-only">
                  Loading the form
                </p>
                <Skeleton className="h-96" />
              </div>
            ) : (
              <ContactForm
                key={user?.id ?? 'guest'}
                initialName={profile?.full_name ?? ''}
                initialEmail={user?.email ?? ''}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  )
}