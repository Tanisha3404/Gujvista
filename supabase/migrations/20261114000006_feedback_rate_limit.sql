-- Rate limiting for feedback submissions
create index feedback_created_idx on public.feedback (created_at desc);
create index feedback_email_created_idx on public.feedback (lower(email), created_at desc);

create or replace function public.enforce_feedback_limits()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- At most 3 messages per email address per hour
  if (
    select count(*) from public.feedback
    where lower(email) = lower(new.email)
      and created_at > now() - interval '1 hour'
  ) >= 3 then
    raise exception 'Too many messages. Please try again later.';
  end if;

  -- At most 30 messages per hour in total
  if (
    select count(*) from public.feedback
    where created_at > now() - interval '1 hour'
  ) >= 30 then
    raise exception 'Too many messages. Please try again later.';
  end if;

  return new;
end;
$$;

create trigger feedback_enforce_limits
  before insert on public.feedback
  for each row execute function public.enforce_feedback_limits();