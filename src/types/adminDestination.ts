// A destination as the admin screens see it: the raw image path (not a URL),
// plus the flags that control where it appears on the site.
export interface AdminDestination {
  id: string
  name: string
  slug: string
  district: string
  categoryId: string
  shortDescription: string
  fullDescription: string
  mainImagePath: string | null // e.g. "destinations/rani-ki-vav.jpg"
  bestTimeToVisit: string
  latitude: number
  longitude: number
  travelTips: string
  historicalSignificance: string
  majorAttractions: string[]
  thingsToDo: string[]
  isFeatured: boolean
  isHiddenGem: boolean
  sortOrder: number
}

export type DestinationInput = Omit<AdminDestination, 'id'>