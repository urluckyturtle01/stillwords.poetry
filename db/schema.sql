-- ─────────────────────────────────────────────────────────────
-- stillwords.poetry — initial schema
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'edition_status') then
    create type edition_status as enum ('upcoming', 'live');
  end if;
end$$;

-- ── poets (global, reusable across editions) ─────────────────
create table if not exists poets (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  instagram_handle text unique,
  bio              text,
  location         text,
  avatar_url       text,
  website_url      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── editions (one row per monthly issue) ─────────────────────
create table if not exists editions (
  id           uuid primary key default gen_random_uuid(),
  number       int  not null unique,
  slug         text not null unique,
  label        text not null,
  subtitle     text not null,
  release_date date not null,
  status       edition_status not null default 'upcoming',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── poems (belong to a poet, optionally to an edition) ───────
create table if not exists poems (
  id          uuid primary key default gen_random_uuid(),
  edition_id  uuid     references editions(id) on delete set null,
  poet_id     uuid not null references poets(id) on delete restrict,
  slug        text not null,
  title       text not null,
  lines       text[] not null,
  preview     text[] not null,
  note        text,
  position    int,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint poems_position_paired check (
    (edition_id is null and position is null) or
    (edition_id is not null and position between 1 and 99)
  ),
  unique (edition_id, slug),
  unique (edition_id, position),
  unique (edition_id, poet_id)
);

create unique index if not exists poems_orphan_slug_idx
  on poems (slug) where edition_id is null;

-- ── per-poet slug uniqueness ──────────────────────────────────
-- guarantees /poets/[slug]/[poem] is always unambiguous, no
-- matter whether the poem is in an edition or orphan.
create unique index if not exists poems_poet_slug_uniq
  on poems (poet_id, slug);

create index if not exists poems_edition_position_idx on poems (edition_id, position);
create index if not exists poems_poet_idx              on poems (poet_id);
create index if not exists editions_release_idx        on editions (release_date desc);
