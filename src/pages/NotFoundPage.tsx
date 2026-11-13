import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="404"
        title="Page not found"
        description="The page you are looking for doesn't exist or has moved."
      />
      <div className="mt-8">
        <ButtonLink to="/">Back to Home</ButtonLink>
      </div>
    </Container>
  )
}