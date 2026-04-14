create table if not exists public.products (
  id bigint generated always as identity primary key,
  printify_id text not null unique,
  title text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  variants jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists products_created_at_idx on public.products (created_at desc);
