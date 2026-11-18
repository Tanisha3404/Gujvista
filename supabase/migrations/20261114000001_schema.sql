create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  image text, 
  created_at timestamptz not null default now()
);

-- destinations
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 150),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  district text not null check (char_length(district) between 1 and 100),
  category_id uuid not null references public.categories (id) on delete restrict,
  short_description text not null,
  full_description text not null,
  main_image text, 
  best_time_to_visit text not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  travel_tips text not null default '',
  historical_significance text not null default '',
  major_attractions text[] not null default '{}',
  things_to_do text[] not null default '{}',
  is_featured boolean not null default false,
  is_hidden_gem boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index destinations_category_id_idx on public.destinations (category_id);
create index destinations_district_idx on public.destinations (district);

create trigger destinations_set_updated_at
  before update on public.destinations
  for each row execute function public.set_updated_at();

-- destination_images
create table public.destination_images (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references public.destinations (id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index destination_images_destination_id_idx on public.destination_images (destination_id);

-- profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (char_length(full_name) <= 100),
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(left(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), 100), '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- favourites
create table public.favourites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  destination_id uuid not null references public.destinations (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, destination_id)
);

create index favourites_destination_id_idx on public.favourites (destination_id);

-- itineraries and their stops
create table public.itineraries (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 150),
  description text not null default '',
  duration_days integer not null check (duration_days between 1 and 14),
  cover_image text,
  created_at timestamptz not null default now()
);

create table public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries (id) on delete cascade,
  destination_id uuid not null references public.destinations (id) on delete cascade,
  day_number integer not null check (day_number >= 1),
  sequence_number integer not null check (sequence_number >= 1),
  description text not null default '',
  unique (itinerary_id, day_number, sequence_number)
);

create index itinerary_items_destination_id_idx on public.itinerary_items (destination_id);

-- blog_posts (travel guides)
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- a published post must have a publish date
  check (status <> 'published' or published_at is not null)
);

create index blog_posts_status_published_at_idx on public.blog_posts (status, published_at desc);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- feedback (contact form submissions)
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (
    char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  subject text not null check (char_length(subject) between 1 and 150),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);