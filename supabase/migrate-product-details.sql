-- Product detail fields (run in Supabase → SQL Editor)
-- Also ensures funded_percent exists (used by shared units).

alter table products
  add column if not exists funded_percent integer;

alter table products
  add column if not exists details jsonb default '{}'::jsonb;
