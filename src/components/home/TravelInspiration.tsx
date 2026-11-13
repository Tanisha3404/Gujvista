import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Route, Sun } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const items = [
  {
    icon: <Route size={26} aria-hidden="true" />,
    title: 'Suggested Itineraries',
    text: 'Ready-made trips for one to five days, planned by destination and duration.',
    to: '/planner',
    cta: 'Plan a trip',
  },
  {
    icon: <BookOpen size={26} aria-hidden="true" />,
    title: 'Travel Guides',
    text: 'Articles on the best places to visit, weekend getaways, festivals, food and local experiences.',
    to: '/guides',
    cta: 'Read the guides',
  },
    {
    icon: <Sun size={26} aria-hidden="true" />,
    title: 'Seasonal Travel',
    text: 'Find out what Gujarat offers in winter, summer and the monsoon.',
    to: '/guides/when-to-visit-gujarat',
    cta: 'Travel by season',
  },
]

export default function TravelInspiration() {
  return (
    <section className="bg-stars py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Travel Inspiration"
          title="Plan your next journey"
          description="Itineraries, guides and seasonal tips to help you decide where to go and when."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="text-accent">{item.icon}</span>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                {item.cta}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}