import type { Destination } from './destination'

export interface Itinerary {
  id: string
  slug: string
  title: string
  description: string
  durationDays: number
  coverImage: string
}

// an itinerary as it appears in the admin screens, with the raw image path
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