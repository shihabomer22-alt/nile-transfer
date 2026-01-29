-- Create table
create table if not exists public.exchange_rates (
  id uuid primary key default gen_random_uuid(),
  pair text not null,
  rate numeric not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on public.exchange_rates;
create trigger trg_set_updated_at
before update on public.exchange_rates
for each row execute procedure public.set_updated_at();

-- Enable RLS
alter table public.exchange_rates enable row level security;

-- Public can read only active rates
drop policy if exists "public read active rates" on public.exchange_rates;
create policy "public read active rates"
on public.exchange_rates
for select
to anon
using (active = true);

-- Authenticated (admin) can read/write all
drop policy if exists "admin full access" on public.exchange_rates;
create policy "admin full access"
on public.exchange_rates
for all
to authenticated
using (true)
with check (true);

-- Seed sample rows
insert into public.exchange_rates (pair, rate, active)
values
  ('USD->EGP', 0, true),
  ('USD->SDG', 0, true),
  ('USD->SAR', 0, true)
on conflict do nothing;
