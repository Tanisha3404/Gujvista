-- create a bucket for storing images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- admin policies for image management
create policy "Admins upload images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'images' and (select public.is_admin()));

create policy "Admins update images" on storage.objects
  for update to authenticated
  using (bucket_id = 'images' and (select public.is_admin()))
  with check (bucket_id = 'images' and (select public.is_admin()));

create policy "Admins delete images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'images' and (select public.is_admin()));