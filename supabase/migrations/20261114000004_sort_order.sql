-- Display order for categories and destinations (set by the seed script).
alter table public.categories add column sort_order integer not null default 0;
alter table public.destinations add column sort_order integer not null default 0;