import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="Coming soon"
        title={title}
        description="This page will be built in a later step."
      />
    </Container>
  )
}