import { supabase } from './supabaseClient'

// Load all images from the assets/design folder and its subfolders
const modules = import.meta.glob<string>('../assets/design/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const imageUrls: Record<string, string> = {}
for (const [path, url] of Object.entries(modules)) {
  imageUrls[path.replace('../assets/design/', '')] = url
}

// a plain dark rectangle shown when an image is missing
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1067'%3E%3Crect width='100%25' height='100%25' fill='%2314151C'/%3E%3C/svg%3E"

export function getImage(key: string): string {
  return imageUrls[key] ?? FALLBACK_IMAGE
}

// returns a public URL for an image stored in Supabase storage or a fallback image if the path is null or undefined
export function getStorageImageUrl(path: string | null | undefined): string {
  if (!path) return FALLBACK_IMAGE
  return supabase.storage.from('images').getPublicUrl(path).data.publicUrl
}