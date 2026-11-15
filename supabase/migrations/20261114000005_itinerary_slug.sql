-- A readable, unique key for each itinerary (used in URLs and by the seed script).
alter table public.itineraries
  add column slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');