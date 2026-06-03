-- MLAB / BEN.AI platform layer
-- Adds multi-tenant assistant, profile, rewards, widget, and guide-note tables.
-- Designed to sit on top of the existing User, Chat, Message_v2, Document, and Stream tables.

create table if not exists "Tenant" (
  "id" uuid primary key default gen_random_uuid(),
  "name" text not null,
  "slug" varchar(96) not null unique,
  "kind" varchar(32) not null default 'mlab',
  "brand" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

create table if not exists "TenantMembership" (
  "tenantId" uuid not null references "Tenant"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete cascade,
  "role" varchar(32) not null default 'member',
  "createdAt" timestamp not null default now(),
  primary key ("tenantId", "userId")
);

create table if not exists "UserProfile" (
  "userId" uuid primary key references "User"("id") on delete cascade,
  "displayName" text,
  "avatarUrl" text,
  "bio" text,
  "timezone" text,
  "communicationStyle" varchar(32) not null default 'balanced',
  "questionMode" varchar(32) not null default 'one-at-a-time',
  "layoutPreference" varchar(32) not null default 'summary-first',
  "profile" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

create table if not exists "AssistantTemplate" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid references "Tenant"("id") on delete set null,
  "name" text not null,
  "slug" varchar(96) not null unique,
  "description" text,
  "category" varchar(48) not null default 'personal-assistant',
  "defaultConfig" jsonb not null default '{}'::jsonb,
  "isPublic" boolean not null default false,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

create table if not exists "AssistantInstance" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid not null references "Tenant"("id") on delete cascade,
  "templateId" uuid references "AssistantTemplate"("id") on delete set null,
  "ownerUserId" uuid references "User"("id") on delete set null,
  "name" text not null,
  "slug" varchar(96) not null,
  "avatarUrl" text,
  "brand" jsonb not null default '{}'::jsonb,
  "config" jsonb not null default '{}'::jsonb,
  "status" varchar(32) not null default 'draft',
  "pricingPlan" varchar(48) not null default 'internal',
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now(),
  unique ("tenantId", "slug")
);

create table if not exists "AssistantState" (
  "assistantId" uuid not null references "AssistantInstance"("id") on delete cascade,
  "userId" uuid references "User"("id") on delete cascade,
  "state" varchar(48) not null default 'compass-resting',
  "panelOpen" boolean not null default false,
  "lastSeenAt" timestamp,
  "metadata" jsonb not null default '{}'::jsonb,
  "updatedAt" timestamp not null default now(),
  primary key ("assistantId", "userId")
);

create table if not exists "WidgetPreference" (
  "id" uuid primary key default gen_random_uuid(),
  "userId" uuid references "User"("id") on delete cascade,
  "tenantId" uuid references "Tenant"("id") on delete cascade,
  "widgetKey" varchar(96) not null,
  "isVisible" boolean not null default true,
  "isMinimized" boolean not null default false,
  "position" jsonb not null default '{}'::jsonb,
  "settings" jsonb not null default '{}'::jsonb,
  "updatedAt" timestamp not null default now(),
  unique ("userId", "tenantId", "widgetKey")
);

create table if not exists "RewardsAccount" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid not null references "Tenant"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete cascade,
  "pointsBalance" integer not null default 0,
  "creditBalance" integer not null default 0,
  "currency" varchar(8) not null default 'GBP',
  "tier" varchar(32) not null default 'early-access',
  "metadata" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now(),
  unique ("tenantId", "userId")
);

create table if not exists "RewardsLedger" (
  "id" uuid primary key default gen_random_uuid(),
  "accountId" uuid not null references "RewardsAccount"("id") on delete cascade,
  "kind" varchar(48) not null,
  "pointsDelta" integer not null default 0,
  "creditDelta" integer not null default 0,
  "description" text,
  "metadata" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now()
);

create table if not exists "Offer" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid references "Tenant"("id") on delete cascade,
  "title" text not null,
  "description" text,
  "category" varchar(48) not null default 'perk',
  "source" varchar(48) not null default 'mlab',
  "url" text,
  "startsAt" timestamp,
  "endsAt" timestamp,
  "isActive" boolean not null default true,
  "metadata" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

create table if not exists "GiftCard" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid references "Tenant"("id") on delete cascade,
  "title" text not null,
  "description" text,
  "provider" text,
  "valueLabel" text,
  "redemptionUrl" text,
  "status" varchar(32) not null default 'draft',
  "metadata" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

create table if not exists "BuildNote" (
  "id" uuid primary key default gen_random_uuid(),
  "tenantId" uuid references "Tenant"("id") on delete set null,
  "title" text not null,
  "note" text not null,
  "category" varchar(64) not null default 'build-guide',
  "source" varchar(64) not null default 'founder-session',
  "metadata" jsonb not null default '{}'::jsonb,
  "createdAt" timestamp not null default now()
);

insert into "Tenant" ("name", "slug", "kind", "brand")
values (
  'MLAB',
  'mlab',
  'mlab',
  '{"primary":"black","accent":"gold","tagline":"The Adventure Starts Here"}'::jsonb
)
on conflict ("slug") do nothing;

insert into "AssistantTemplate" ("name", "slug", "description", "category", "defaultConfig", "isPublic")
values (
  'BEN.AI Standard Personal Assistant',
  'ben-ai-standard-personal-assistant',
  'A rentable standard version of BEN.AI for personal support, planning, admin, travel, learning, business, wealth, and community guidance.',
  'personal-assistant',
  '{"style":"calm-premium","questionMode":"one-at-a-time","restingState":"compass-circle","lanes":["Travel","Learning","Business","Wealth","Community"]}'::jsonb,
  true
)
on conflict ("slug") do nothing;
