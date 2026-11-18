alter table public.itineraries
  add column slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');