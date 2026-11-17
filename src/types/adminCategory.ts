export interface AdminCategory {
  id: string
  name: string
  slug: string
  description: string
  imagePath: string | null // e.g. "categories/beaches-1731600000000.jpg"
  sortOrder: number
  destinationCount: number // how many destinations use this category
}

export type CategoryInput = Omit<AdminCategory, 'id' | 'destinationCount'>