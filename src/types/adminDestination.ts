// A destination as the admin screens see it
export interface AdminDestination {
  id: string
  name: string
  slug: string
  district: string
  categoryId: string
  shortDescription: string
  fullDescription: string
  mainImagePath: string | null 
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