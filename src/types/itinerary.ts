import type { Destination } from './destination'

export interface Itinerary {
  id: string
  slug: string
  title: string
  description: string
  durationDays: number
  coverImage: string
}

// Used on the planner list: also knows which destinations each trip includes.
export interface ItinerarySummary extends Itinerary {
  destinationIds: string[]
}

export interface ItineraryStop {
  id: string
  day: number
  sequence: number
  description: string
  destination: Destination
}

export interface ItineraryDetails {
  itinerary: Itinerary
  stops: ItineraryStop[]
}