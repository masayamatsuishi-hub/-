-- FuuSpo: アスリート向けAI栄養管理アプリ 初期スキーマ

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  sex text not null check (sex in ('male', 'female')),
  age int not null check (age > 0 and age < 120),
  height_cm numeric not null check (height_cm > 0),
  weight_kg numeric not null check (weight_kg > 0),
  sport text not null default '',
  activity_level text not null check (activity_level in ('low', 'moderate', 'high', 'very_high')),
  protein_target_g_per_kg numeric not null default 1.6,
  is_pro boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create table if not exists public.meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name text not null,
  grams numeric not null check (grams > 0),
  calories numeric not null default 0,
  protein numeric not null default 0,
  fat numeric not null default 0,
  carbs numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists meal_logs_user_date_idx on public.meal_logs (user_id, date);

alter table public.meal_logs enable row level security;

create policy "meal_logs_select_own" on public.meal_logs
  for select using (auth.uid() = user_id);
create policy "meal_logs_insert_own" on public.meal_logs
  for insert with check (auth.uid() = user_id);
create policy "meal_logs_update_own" on public.meal_logs
  for update using (auth.uid() = user_id);
create policy "meal_logs_delete_own" on public.meal_logs
  for delete using (auth.uid() = user_id);
