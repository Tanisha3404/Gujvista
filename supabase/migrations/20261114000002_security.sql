create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

revoke all on table
  public.categories, public.destinations, public.destination_images,
  public.profiles, public.favourites, public.itineraries,
  public.itinerary_items, public.blog_posts, public.feedback
from anon, authenticated;

-- Public content: anyone can read
grant select on table
  public.categories, public.destinations, public.destination_images,
  public.itineraries, public.itinerary_items, public.blog_posts
to anon, authenticated;

grant insert, update, delete on table
  public.categories, public.destinations, public.destination_images,
  public.itineraries, public.itinerary_items, public.blog_posts
to authenticated;

-- Profiles
grant select on table public.profiles to authenticated;
grant update (full_name, avatar_url) on table public.profiles to authenticated;

-- Favourites: signed-in users manage their own
grant select, insert, delete on table public.favourites to authenticated;

-- Feedback: anyone can submit; only admins can read or delete.
grant insert on table public.feedback to anon, authenticated;
grant select, delete on table public.feedback to authenticated;

alter table public.categories enable row level security;
alter table public.destinations enable row level security;
alter table public.destination_images enable row level security;
alter table public.profiles enable row level security;
alter table public.favourites enable row level security;
alter table public.itineraries enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.blog_posts enable row level security;
alter table public.feedback enable row level security;

-- Public content
create policy "Anyone can read categories" on public.categories
  for select to anon, authenticated using (true);
create policy "Admins manage categories" on public.categories
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read destinations" on public.destinations
  for select to anon, authenticated using (true);
create policy "Admins manage destinations" on public.destinations
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read destination images" on public.destination_images
  for select to anon, authenticated using (true);
create policy "Admins manage destination images" on public.destination_images
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read itineraries" on public.itineraries
  for select to anon, authenticated using (true);
create policy "Admins manage itineraries" on public.itineraries
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read itinerary items" on public.itinerary_items
  for select to anon, authenticated using (true);
create policy "Admins manage itinerary items" on public.itinerary_items
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Blog posts: public sees published only; admins see and manage everything
create policy "Anyone can read published posts" on public.blog_posts
  for select to anon, authenticated
  using (status = 'published' or (select public.is_admin()));
create policy "Admins manage posts" on public.blog_posts
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Profiles
create policy "Users read own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);
create policy "Admins read all profiles" on public.profiles
  for select to authenticated
  using ((select public.is_admin()));
create policy "Users update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Favourites
create policy "Users read own favourites" on public.favourites
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users add own favourites" on public.favourites
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users remove own favourites" on public.favourites
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Feedback: anyone may submit, only admins may read or delete
create policy "Anyone can submit feedback" on public.feedback
  for insert to anon, authenticated
  with check (true);
create policy "Admins read feedback" on public.feedback
  for select to authenticated
  using ((select public.is_admin()));
create policy "Admins delete feedback" on public.feedback
  for delete to authenticated
  using ((select public.is_admin()));