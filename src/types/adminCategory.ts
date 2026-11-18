export interface AdminCategory {
  id: string
  name: string
  slug: string
  description: string
  imagePath: string | null 
  sortOrder: number
  destinationCount: number 
}

export type CategoryInput = Omit<AdminCategory, 'id' | 'destinationCount'>