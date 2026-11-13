import type { Category } from '../types/category'

// `image` is a key for src/assets/images (resolved by the service).
export const categorySeed: Category[] = [
  {
    id: 'cat-1',
    slug: 'historical-heritage',
    name: 'Historical & Heritage',
    description: "Stepwells, palaces and monuments that tell Gujarat's story.",
    image: 'destinations/rani-ki-vav.jpg',
  },
  {
    id: 'cat-2',
    slug: 'religious',
    name: 'Religious Destinations',
    description: 'Temples and sacred sites across the state.',
    image: 'destinations/somnath-temple.jpg',
  },
  {
    id: 'cat-3',
    slug: 'beaches',
    name: 'Beaches',
    description: 'Sandy shores along the Arabian Sea coast.',
    image: 'hero/hero-beach.jpg',
  },
  {
    id: 'cat-4',
    slug: 'wildlife',
    name: 'Wildlife',
    description: 'National parks and sanctuaries with remarkable animals.',
    image: 'destinations/gir-national-park.jpg',
  },
  {
    id: 'cat-5',
    slug: 'nature-hill-stations',
    name: 'Nature & Hill Stations',
    description: 'Hills, forests, waterfalls and wide open landscapes.',
    image: 'destinations/saputara.jpg',
  },
  {
    id: 'cat-6',
    slug: 'cultural-experiences',
    name: 'Cultural Experiences',
    description: 'Festivals, crafts, food and living traditions.',
    image: 'destinations/rann-of-kutch.jpg',
  },
]