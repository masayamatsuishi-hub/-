-- FuuSpo: 練習記録(METsベースの消費カロリー)テーブル

create table if not exists public.training_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  menu_name text not null,
  mets numeric not null check (mets > 0),
  duration_minutes numeric not null check (duration_minutes > 0),
  calories_burned numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists training_logs_user_date_idx on public.training_logs (user_id, date);

alter table public.training_logs enable row level security;

create policy "training_logs_select_own" on public.training_logs
  for select using (auth.uid() = user_id);
create policy "training_logs_insert_own" on public.training_logs
  for insert with check (auth.uid() = user_id);
create policy "training_logs_update_own" on public.training_logs
  for update using (auth.uid() = user_id);
create policy "training_logs_delete_own" on public.training_logs
  for delete using (auth.uid() = user_id);
