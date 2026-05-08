create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  destination text not null,
  trip_type text not null,
  start_date date not null,
  end_date date not null,
  target_budget numeric not null default 0,
  currency text not null default 'IDR',
  description text,
  invite_code text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_members (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),
  unique(trip_id, user_id)
);

create table if not exists public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  title text not null,
  item_date date not null,
  start_time time,
  end_time time,
  location text,
  estimated_cost numeric not null default 0,
  notes text,
  status text not null default 'planned' check (status in ('planned', 'done', 'skipped')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  name text not null,
  category text not null,
  estimated_amount numeric not null default 0,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  name text not null,
  category text not null,
  amount numeric not null,
  paid_by uuid not null references public.profiles(id),
  expense_date date not null,
  notes text,
  split_method text not null default 'equal' check (split_method in ('equal', 'custom')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expense_splits (
  id uuid primary key default gen_random_uuid(),
  expense_id uuid not null references public.expenses(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  share_amount numeric not null default 0,
  is_settled boolean not null default false
);

create table if not exists public.trip_reviews (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int check (rating between 1 and 10),
  worth_it boolean,
  best_moment text,
  biggest_challenge text,
  tips text,
  private_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(trip_id, user_id)
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trips_touch_updated_at on public.trips;
create trigger trips_touch_updated_at before update on public.trips
for each row execute function public.touch_updated_at();

drop trigger if exists itinerary_touch_updated_at on public.itinerary_items;
create trigger itinerary_touch_updated_at before update on public.itinerary_items
for each row execute function public.touch_updated_at();

drop trigger if exists budget_touch_updated_at on public.budget_items;
create trigger budget_touch_updated_at before update on public.budget_items
for each row execute function public.touch_updated_at();

drop trigger if exists expenses_touch_updated_at on public.expenses;
create trigger expenses_touch_updated_at before update on public.expenses
for each row execute function public.touch_updated_at();

drop trigger if exists reviews_touch_updated_at on public.trip_reviews;
create trigger reviews_touch_updated_at before update on public.trip_reviews
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.trip_members enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.budget_items enable row level security;
alter table public.expenses enable row level security;
alter table public.expense_splits enable row level security;
alter table public.trip_reviews enable row level security;

create or replace function public.is_trip_member(target_trip_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.trip_members
    where trip_members.trip_id = target_trip_id
      and trip_members.user_id = auth.uid()
  );
$$;

create or replace function public.is_trip_owner(target_trip_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.trips
    where trips.id = target_trip_id
      and trips.owner_id = auth.uid()
  );
$$;

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self" on public.profiles
for select using (id = auth.uid());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
for insert with check (id = auth.uid());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "trips_member_select" on public.trips;
create policy "trips_member_select" on public.trips
for select using (public.is_trip_member(id));

drop policy if exists "trips_owner_insert" on public.trips;
create policy "trips_owner_insert" on public.trips
for insert with check (owner_id = auth.uid());

drop policy if exists "trips_owner_update" on public.trips;
create policy "trips_owner_update" on public.trips
for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());

drop policy if exists "members_member_select" on public.trip_members;
create policy "members_member_select" on public.trip_members
for select using (public.is_trip_member(trip_id));

drop policy if exists "members_join_insert" on public.trip_members;
create policy "members_join_insert" on public.trip_members
for insert with check (user_id = auth.uid());

drop policy if exists "members_owner_delete" on public.trip_members;
create policy "members_owner_delete" on public.trip_members
for delete using (public.is_trip_owner(trip_id));

drop policy if exists "itinerary_member_select" on public.itinerary_items;
create policy "itinerary_member_select" on public.itinerary_items
for select using (public.is_trip_member(trip_id));

drop policy if exists "itinerary_member_insert" on public.itinerary_items;
create policy "itinerary_member_insert" on public.itinerary_items
for insert with check (public.is_trip_member(trip_id) and created_by = auth.uid());

drop policy if exists "itinerary_creator_or_owner_update" on public.itinerary_items;
create policy "itinerary_creator_or_owner_update" on public.itinerary_items
for update using (created_by = auth.uid() or public.is_trip_owner(trip_id));

drop policy if exists "budget_member_select" on public.budget_items;
create policy "budget_member_select" on public.budget_items
for select using (public.is_trip_member(trip_id));

drop policy if exists "budget_member_insert" on public.budget_items;
create policy "budget_member_insert" on public.budget_items
for insert with check (public.is_trip_member(trip_id) and created_by = auth.uid());

drop policy if exists "budget_creator_or_owner_update" on public.budget_items;
create policy "budget_creator_or_owner_update" on public.budget_items
for update using (created_by = auth.uid() or public.is_trip_owner(trip_id));

drop policy if exists "expenses_member_select" on public.expenses;
create policy "expenses_member_select" on public.expenses
for select using (public.is_trip_member(trip_id));

drop policy if exists "expenses_member_insert" on public.expenses;
create policy "expenses_member_insert" on public.expenses
for insert with check (public.is_trip_member(trip_id) and created_by = auth.uid());

drop policy if exists "expenses_creator_or_owner_update" on public.expenses;
create policy "expenses_creator_or_owner_update" on public.expenses
for update using (created_by = auth.uid() or public.is_trip_owner(trip_id));

drop policy if exists "splits_member_select" on public.expense_splits;
create policy "splits_member_select" on public.expense_splits
for select using (
  exists (
    select 1 from public.expenses
    where expenses.id = expense_splits.expense_id
      and public.is_trip_member(expenses.trip_id)
  )
);

drop policy if exists "reviews_member_select" on public.trip_reviews;
create policy "reviews_member_select" on public.trip_reviews
for select using (public.is_trip_member(trip_id));

drop policy if exists "reviews_self_upsert" on public.trip_reviews;
create policy "reviews_self_upsert" on public.trip_reviews
for insert with check (public.is_trip_member(trip_id) and user_id = auth.uid());

drop policy if exists "reviews_self_update" on public.trip_reviews;
create policy "reviews_self_update" on public.trip_reviews
for update using (user_id = auth.uid()) with check (user_id = auth.uid());
