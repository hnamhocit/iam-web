-- =========================================================
-- BẢNG APPS - Ứng dụng OAuth/SSO (Refactored từ oauth_clients)
-- =========================================================

-- Tạo bảng apps (chính thức thay thế oauth_clients cho OAuth/SSO)
create table if not exists public.apps (
  id text primary key, -- ví dụ: 'vntez', 'solotype', etc.
  app_secret text, -- Client secret (NULL nếu là public client)
  name text not null,
  redirect_uris text[] not null,
  logo_url text,
  description text,
  status text default 'active' check (status in ('active', 'inactive')), -- active/inactive
  is_internal boolean default false, -- bypass consent screen nếu true
  roles jsonb default '[]'::jsonb, -- Mảng roles của ứng dụng này
  permissions jsonb default '{}'::jsonb, -- Permissions map {role: [perms]}
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index cho tối ưu hiệu năng
create index if not exists idx_apps_status on public.apps (status);
create index if not exists idx_apps_is_internal on public.apps (is_internal);

-- Row Level Security (RLS)
alter table public.apps enable row level security;

-- Policy: Tất cả người dùng có thể đọc apps đang active
drop policy if exists "Allow public read active apps" on public.apps;
create policy "Allow public read active apps"
  on public.apps
  for select
  using (status = 'active');

-- Policy: Admin có thể quản lý toàn bộ apps (tùy bộ quản trị)
drop policy if exists "Allow admin manage apps" on public.apps;
create policy "Allow admin manage apps"
  on public.apps
  for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
    )
  );

-- =========================================================
-- MIGRATE DỮ LIỆU TỪ oauth_clients SANG apps (nếu oauth_clients tồn tại)
-- =========================================================
do $$
begin
  -- Kiểm tra xem bảng oauth_clients có tồn tại không
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'oauth_clients'
  ) then
    -- Insert dữ liệu từ oauth_clients sang apps (nếu apps chưa có dữ liệu)
    insert into public.apps (
      id, name, redirect_uris, logo_url, description, is_internal, created_at
    )
    select
      client_id, name, redirect_uris, logo_url, description, is_internal, created_at
    from public.oauth_clients
    where not exists (
      select 1 from public.apps a where a.id = public.oauth_clients.client_id
    )
    on conflict (id) do nothing;
  end if;
end $$;

-- =========================================================
-- INSERT NHỮNG APPS MẶC ĐỊNH CHO HỆ SINH THÁI VNTEZ
-- =========================================================
insert into public.apps (
  id, name, redirect_uris, is_internal, status, roles, permissions
)
values
  (
    'vntez',
    'VNTEZ Identity & Access Management',
    array[
      'http://localhost:3000/auth/callback',
      'https://vntez-id.vercel.app/auth/callback'
    ],
    true,
    'active',
    '["user", "admin"]'::jsonb,
    '{"user": ["read:profile", "read:email"], "admin": ["read:profile", "read:email", "write:apps"]}'::jsonb
  ),
  (
    'solotype',
    'SoloType Application',
    array[
      'http://localhost:3000/oauth/tester/callback',
      'https://vntez-id.vercel.app/oauth/tester/callback'
    ],
    true,
    'active',
    '["user"]'::jsonb,
    '{"user": ["read:profile", "read:email"]}'::jsonb
  ),
  (
    'pomoduo',
    'Pomoduo - Pomodoro Timer',
    array[
      'https://pomoduo.povixa.cloud/auth/callback',
      'http://localhost:5173/auth/callback'
    ],
    false,
    'active',
    '["user", "premium"]'::jsonb,
    '{"user": ["read:profile", "read:email"], "premium": ["read:profile", "read:email", "read:premium_features"]}'::jsonb
  )
on conflict (id) do update set
  name = excluded.name,
  redirect_uris = excluded.redirect_uris,
  roles = excluded.roles,
  permissions = excluded.permissions
where apps.status = 'active';

-- Làm mới PostgREST schema cache
notify pgrst, 'reload schema';
