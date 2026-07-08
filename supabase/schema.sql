-- Run this in Supabase → SQL Editor (project: newfayoum)

create table if not exists categories (
  id text primary key,
  slug text unique not null,
  name_ar text not null,
  name_en text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  slug text unique not null,
  title_ar text not null,
  title_en text not null,
  location_ar text not null,
  location_en text not null,
  price integer not null,
  currency text not null default 'EGP',
  image text not null,
  bedrooms integer,
  bathrooms integer,
  area integer,
  posted_at date not null,
  badges jsonb,
  featured boolean not null default false,
  is_new boolean not null default false,
  is_shared boolean not null default false,
  expected_return integer,
  monthly_installment integer,
  category_id text not null references categories(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);

create table if not exists content_sections (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
