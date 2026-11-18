import type { ItineraryStop } from '../types/itinerary'

export function formatDuration(days: number): string {
  return days === 1 ? '1 day' : `${days} days`
}

// groups stops by day, with days and stops in order
export function groupStopsByDay(stops: ItineraryStop[]): { day: number; stops: ItineraryStop[] }[] {
  const days = new Map<number, ItineraryStop[]>()
  for (const stop of stops) {
    const list = days.get(stop.day) ?? []
    list.push(stop)
    days.set(stop.day, list)
  }
  return [...days.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([day, list]) => ({ day, stops: [...list].sort((a, b) => a.sequence - b.sequence) }))
}