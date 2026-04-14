create table if not exists public.orders (
  id uuid primary key,
  stripe_session_id text unique,
  customer_email text,
  status text not null default 'Pending',
  currency text not null default 'usd',
  amount_total numeric(10,2),
  cart_items jsonb not null default '[]'::jsonb,
  shipping_address jsonb,
  printify_order_id text,
  fulfillment_attempts integer not null default 0,
  fulfillment_error text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
