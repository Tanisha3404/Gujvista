import { supabase } from './supabaseClient'

// Local images (src/assets/images). Used for design photos that ship with the app,
// such as the hero and the About page. Keys look like "hero/hero-door.jpg".
const modules = import.meta.glob<string>('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const imageUrls: Record<string, string> = {}
for (const [path, url] of Object.entries(modules)) {
  imageUrls[path.replace('../assets/images/', '')] = url
}

// A plain dark rectangle shown when an image is missing.
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1067'%3E%3Crect width='100%25' height='100%25' fill='%2314151C'/%3E%3C/svg%3E"

export function getImage(key: string): string {
  return imageUrls[key] ?? FALLBACK_IMAGE
}

// Images stored in the database (destinations, categories, guides) live in the
// public "images" bucket in Supabase Storage. The database stores the path.
export function getStorageImageUrl(path: string | null | undefined): string {
  if (!path) return FALLBACK_IMAGE
  return supabase.storage.from('images').getPublicUrl(path).data.publicUrl
}