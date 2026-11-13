// Finds every image in src/assets/images at build time.
// Keys look like "destinations/rani-ki-vav.jpg".
const modules = import.meta.glob<string>('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const imageUrls: Record<string, string> = {}
for (const [path, url] of Object.entries(modules)) {
  imageUrls[path.replace('../assets/images/', '')] = url
}

// A plain dark rectangle shown when a file is missing or misnamed.
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1067'%3E%3Crect width='100%25' height='100%25' fill='%2314151C'/%3E%3C/svg%3E"

export function getImage(key: string): string {
  return imageUrls[key] ?? FALLBACK_IMAGE
}

export function getGalleryImages(slug: string): string[] {
  const pattern = new RegExp(`^destinations/${slug}-\\d+\\.(jpg|jpeg|png|webp)$`)
  return Object.keys(imageUrls)
    .filter((key) => pattern.test(key))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => imageUrls[key])
}