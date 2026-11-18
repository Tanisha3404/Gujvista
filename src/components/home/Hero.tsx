import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import { ButtonLink } from '../ui/Button'
import HeroCollage from './HeroCollage'
import { getImage } from '../../lib/images'
import { cn } from '../../lib/utils'

// hero section of the home page, with a heading, subheading and a collage of images
const heroImages = {
  door: getImage('hero/hero-door.jpg'),
  stepwell: getImage('hero/hero-stepwell.jpg'),
  beach: getImage('hero/hero-beach.jpg'),
  pillOne: getImage('destinations/Suvali-Beach-banner.jpg'),
  pillTwo: getImage('destinations/Glade-One-Golf-Club.jpg'),
}

interface InlinePhotoProps {
  src: string
  side: 'left' | 'right' // which side of the word the pill sits on
  position?: string // which part of the photo stays visible, e.g. 'center 20%'
}

/* A pill-shaped photo that sits inside the heading text
   Sizes use "em", so the pill scales with the heading font size */
function InlinePhoto({ src, side, position = 'center' }: InlinePhotoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block h-[0.72em] w-[2.6em] overflow-hidden rounded-full align-middle sm:w-[3.4em]',
        side === 'right' ? 'ml-3' : 'mr-3',
      )}
    >
      <img
        src={src}
        alt=""
        style={{ objectPosition: position }}
        className="h-full w-full object-cover"
      />
    </span>
  )
}

export default function Hero() {
  return (
    <section className="bg-stars overflow-hidden border-b border-white/10">
      <Container className="grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-surface px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/80">
            Explore Gujarat
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl xl:text-7xl">
            <span className="block">Discover the</span>
            <span className="block">
              Beauty
              <InlinePhoto src={heroImages.pillOne} side="right" position="center 85%" />
            </span>
            <span className="block">
              <InlinePhoto src={heroImages.pillTwo} side="left" position="center 20%" />
              of
            </span>
            <span className="block">Gujarat</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            From ancient stepwells and sacred temples to white deserts and wild forests, find your
            next journey across Gujarat.
          </p>

          <div className="mt-8">
            <ButtonLink to="/destinations" variant="outline" size="lg" className="bg-surface">
              Explore Destinations
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <HeroCollage
          door={heroImages.door}
          stepwell={heroImages.stepwell}
          beach={heroImages.beach}
        />
      </Container>
    </section>
  )
}