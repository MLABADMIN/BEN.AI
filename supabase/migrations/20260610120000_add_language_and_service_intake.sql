-- Add language feedback and intake tables for MLAB Platform.
-- Review-only migration file. Do not apply to production until checked.

create table if not exists public.mlab_language_feedback (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  source text not null default 'patwa_tester',
  short_phrase text not null,
  tester_meaning text,
  requested_action text,
  understood_correctly text,
  sounded_natural text,
  better_wording text,
  context_notes jsonb not null default '{}'::jsonb,
  authenticity_flags text[] not null default '{}'::text[],
  reviewer_status text not null default 'new' check (reviewer_status in ('new', 'reviewed', 'accepted', 'rejected', 'needs_follow_up')),
  review_labels text[] not null default '{}'::text[],
  reviewer_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mlab_language_feedback_workspace_id_idx
  on public.mlab_language_feedback(workspace_id);

create index if not exists mlab_language_feedback_source_idx
  on public.mlab_language_feedback(source);

create index if not exists mlab_language_feedback_reviewer_status_idx
  on public.mlab_language_feedback(reviewer_status);

alter table public.mlab_language_feedback enable row level security;

create table if not exists public.mlab_service_intake (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  lead_id uuid references public.ben_ai_leads(id) on delete set null,
  session_id uuid references public.ben_ai_sessions(id) on delete set null,
  request_route text not null check (request_route in ('business', 'travel', 'admin', 'ai_setup', 'learning', 'writing', 'community', 'other')),
  request_title text,
  request_summary text not null,
  urgency text not null default 'medium' check (urgency in ('urgent', 'high', 'medium', 'low')),
  desired_outcome text,
  known_deadline text,
  customer_context jsonb not null default '{}'::jsonb,
  recommended_next_step text,
  handoff_needed boolean not null default false,
  status text not null default 'new' check (status in ('new', 'triaged', 'waiting_on_customer', 'ready_for_handoff', 'in_progress', 'complete', 'closed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mlab_service_intake_workspace_id_idx
  on public.mlab_service_intake(workspace_id);

create index if not exists mlab_service_intake_request_route_idx
  on public.mlab_service_intake(request_route);

create index if not exists mlab_service_intake_status_idx
  on public.mlab_service_intake(status);

alter table public.mlab_service_intake enable row level security;

create table if not exists public.mlab_travel_intake (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  service_intake_id uuid references public.mlab_service_intake(id) on delete set null,
  trip_type text not null default 'general' check (trip_type in ('general', 'holiday', 'relocation', 'retreat_interest', 'transfer', 'excursion', 'itinerary', 'weather_timing')),
  destination text,
  departure_area text,
  rough_dates text,
  traveller_count text,
  needs_transfers boolean not null default false,
  needs_excursions boolean not null default false,
  needs_accommodation boolean not null default false,
  needs_weather_timing boolean not null default false,
  notes text,
  provider_status text not null default 'not_checked' check (provider_status in ('not_checked', 'mlab_service_only', 'provider_needed', 'provider_confirmed', 'not_available')),
  status text not null default 'new' check (status in ('new', 'triaged', 'waiting_on_customer', 'ready_for_handoff', 'in_progress', 'complete', 'closed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mlab_travel_intake_workspace_id_idx
  on public.mlab_travel_intake(workspace_id);

create index if not exists mlab_travel_intake_trip_type_idx
  on public.mlab_travel_intake(trip_type);

create index if not exists mlab_travel_intake_status_idx
  on public.mlab_travel_intake(status);

alter table public.mlab_travel_intake enable row level security;
