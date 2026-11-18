import { Compass, Landmark, Search } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/Button'
import AboutFeature from '../components/about/AboutFeature'
import { getImage } from '../lib/images'

// images for the About page
const photos = {
  heritage: getImage('destinations/rani-ki-vav.jpg'),
  navratri: getImage('culture/festival-navratri-garba.jpg'),
  kite: getImage('culture/festival-kite-uttarayan.jpg'),
  thali: getImage('culture/gujarati-thali.jpg'),
  streetFood: getImage('culture/street-food-ahmedabad.jpg'),
  handicraft: getImage('culture/kutch-handicraft.jpg'),
  aboutHero: getImage('destinations/Suvali-Beach-banner.jpg'),
}

const purposes = [
  {
    icon: <Compass size={26} aria-hidden="true" />,
    title: 'Discover',
    text: 'Explore popular landmarks alongside hidden gems that rarely make the headlines.',
  },
  {
    icon: <Landmark size={26} aria-hidden="true" />,
    title: 'Understand',
    text: 'Read about the history and culture behind each place, not just where it is.',
  },
  {
    icon: <Search size={26} aria-hidden="true" />,
    title: 'Find',
    text: 'Search by name and filter by category or district to narrow down what suits you.',
  },
]

const facts = [
  { label: 'Capital', value: 'Gandhinagar' },
  { label: 'Largest city', value: 'Ahmedabad' },
  { label: 'Main language', value: 'Gujarati' },
  { label: 'Regions', value: 'Kutch, Saurashtra, North, Central and South Gujarat' },
]

export default function AboutPage() {
  return (
    <>
        <section className="bg-stars border-b border-white/10 py-14 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="About GujVista"
            description="GujVista is a tourism and destination discovery platform focused on Gujarat, India. It brings famous landmarks and lesser-known places together in one place, with clear information and photographs for each destination, so you can decide where to go and what to expect."
          />

          {/* decorative photo shown on large screens only */}
          <img
            src={photos.aboutHero}
            alt=""
            aria-hidden="true"
            className="hidden aspect-[4/2] w-full max-w-lg justify-self-end rounded-3xl object-cover lg:block"
          />
        </Container>
      </section>

      <section aria-labelledby="purpose-heading" className="py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              Our purpose
            </p>
            <h2 id="purpose-heading" className="text-3xl font-bold leading-tight sm:text-4xl">
              Why GujVista exists
            </h2>
            <p className="mt-4 text-muted">
              Gujarat has far more to offer than its best-known sights. GujVista aims to make
              discovering the state easier, more informative and more enjoyable.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {purposes.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-surface p-6">
                <span className="text-accent">{item.icon}</span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="glance-heading" className="border-t border-white/10 bg-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              Gujarat at a glance
            </p>
            <h2 id="glance-heading" className="text-3xl font-bold leading-tight sm:text-4xl">
              A state of many landscapes
            </h2>
            <p className="mt-4 text-muted">
              Gujarat is a state in western India with a long coastline on the Arabian Sea. Its
              landscapes range from the white salt desert of Kutch and the forests of Gir to the hills
              of the Dang and the busy streets of Ahmedabad.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-white/10 bg-ink p-5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <AboutFeature
        eyebrow="Heritage"
        title="A land of living heritage"
        images={[{ src: photos.heritage, alt: 'The carved stepwell of Rani ki Vav at Patan' }]}
      >
        <p>
          Gujarat&rsquo;s history is written in stone. Ancient Harappan cities such as Dholavira,
          intricately carved stepwells like Rani ki Vav, Sultanate-era monuments in Champaner and
          Ahmedabad, and temples such as Somnath and Modhera each tell a different chapter of the
          story.
        </p>
        <ButtonLink to="/destinations?category=historical-heritage" variant="outline">
          Explore heritage destinations
        </ButtonLink>
      </AboutFeature>

      <AboutFeature
        eyebrow="Festivals"
        title="Festivals that fill the streets"
        reverse
        images={[
          { src: photos.navratri, alt: 'People dancing garba during Navratri' },
          { src: photos.kite, alt: 'Kites in the sky during Uttarayan' },
        ]}
      >
        <p>
          Navratri, the nine-night festival, is celebrated across Gujarat with garba and dandiya
          raas, in which people dance in circles late into the night.
        </p>
        <p>
          In mid-January, Uttarayan fills the skies with kites, and Ahmedabad hosts an International
          Kite Festival. In winter, the Rann Utsav brings music, crafts and food to the white desert
          of Kutch.
        </p>
      </AboutFeature>

      <AboutFeature
        eyebrow="Food"
        title="Flavours of Gujarat"
        images={[
          { src: photos.thali, alt: 'A traditional Gujarati thali' },
          { src: photos.streetFood, alt: 'Street food in Ahmedabad' },
        ]}
      >
        <p>
          Gujarati cuisine is known for being largely vegetarian, with a balance of sweet, salty and
          spicy flavours. A traditional thali brings many dishes together on one plate.
        </p>
        <p>
          Street food such as dhokla, khakhra, fafda and jalebi is a favourite across the state.
        </p>
      </AboutFeature>

      <AboutFeature
        eyebrow="Crafts and traditions"
        title="Skills handed down through generations"
        reverse
        images={[{ src: photos.handicraft, alt: 'Traditional handicraft from Kutch' }]}
      >
        <p>
          Kutch is famous for its embroidery and mirror work, bandhani tie-dye is a textile tradition
          found across Gujarat, and the town of Patan is known for patola, a double-ikat silk weaving
          technique.
        </p>
        <p>Many of these crafts are still practised by skilled artisans today.</p>
      </AboutFeature>

      <section className="border-t border-white/10 bg-stars py-16 text-center sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to explore Gujarat?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Browse destinations, filter by what interests you, and find your next journey.
          </p>
          <div className="mt-8">
            <ButtonLink to="/destinations" size="lg">
              Browse destinations
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}