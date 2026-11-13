import { useId, type ReactNode } from 'react'
import Container from '../ui/Container'
import { cn } from '../../lib/utils'

export interface FeatureImage {
  src: string
  alt: string
}

interface AboutFeatureProps {
  eyebrow: string
  title: string
  images: FeatureImage[] // one image, or two shown side by side
  reverse?: boolean // put the photos on the left on desktop
  children: ReactNode
}

export default function AboutFeature({
  eyebrow,
  title,
  images,
  reverse = false,
  children,
}: AboutFeatureProps) {
  const headingId = useId()
  const isPair = images.length > 1

  return (
    <section aria-labelledby={headingId} className="border-t border-white/10 py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn(reverse && 'lg:order-last')}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h2 id={headingId} className="text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-white/75">{children}</div>
        </div>

        <div className={cn('grid gap-4', isPair && 'grid-cols-2')}>
          {images.map((image, index) => (
            <img
              key={image.alt}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={cn(
                'w-full rounded-3xl object-cover',
                isPair ? 'aspect-[3/4]' : 'aspect-[4/3]',
                isPair && index === 1 && 'mt-8',
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}