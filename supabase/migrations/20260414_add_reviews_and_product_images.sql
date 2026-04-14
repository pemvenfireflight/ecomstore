alter table public.products
  add column if not exists image_urls jsonb not null default '[]'::jsonb;

create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  product_id text not null,
  reviewer_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_product_id_created_at_idx
  on public.reviews (product_id, created_at desc);
