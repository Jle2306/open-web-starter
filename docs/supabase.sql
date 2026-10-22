-- Example only: run once in a new disposable Supabase project.
-- Pending requests, NOT atomic reservations. Use synthetic data.
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service_id text not null check (service_id in ('consultation', 'session', 'extended')),
  booking_date date not null,
  booking_time time not null,
  customer_name text not null check (char_length(trim(customer_name)) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  note text not null default '' check (char_length(note) <= 1000),
  status text not null default 'pending' check (status = 'pending')
);
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;
grant insert (service_id, booking_date, booking_time, customer_name, email, note, status)
  on public.bookings to anon;
create policy "anon may submit pending example requests"
  on public.bookings for insert to anon
  with check (
    status = 'pending'
    and booking_date between current_date and current_date + 90
    and booking_time in ('09:00'::time, '10:30'::time, '13:30'::time, '16:30'::time)
  );
-- No anonymous SELECT/UPDATE/DELETE grants or policies.
-- Use dashboard access to inspect rows; never a service-role browser key.
-- Production needs rate limits, tenant/staff authorization, business timezone
-- checks and atomic availability. Keep config IDs/slots in sync with this example.
