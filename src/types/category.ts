export interface Category {
  id: string
  slug: string // used in URLs and filters, e.g. /destinations?category=beaches
  name: string
  description: string
  image: string
}