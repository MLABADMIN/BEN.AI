# MLAB / BEN.AI Unified Platform Runbook

This runbook keeps the build moving as one platform instead of scattered pages, widgets, and experiments.

## Goal

Build one unified MLAB platform where the public site, BEN.AI, user profiles, rewards, dashboard, and rentable assistant versions live together.

## Current foundation

The BEN.AI repository now contains:

- Existing chat app foundation
- Existing user/chat/message/document tables
- Direct OpenAI route with setup-mode fallback
- BEN.AI widget with stable URL and blank-preview fallback
- MLAB platform blueprint
- MLAB database migration
- Drizzle schema for the new MLAB platform tables

## Backend target

Preferred backend: Supabase Postgres.

Reason:

- Postgres database
- Auth support if/when needed
- Storage for profile photos, assistant avatars, documents, and knowledge-base files
- Realtime support for future active assistant status
- Edge functions for backend logic if needed
- Good fit for a future multi-tenant assistant product

## Supabase setup required

A Supabase project must be created or connected before the live backend can be applied.

Current known state: no Supabase projects are connected in this workspace.

Required steps once Supabase is ready:

1. Create/connect a Supabase project for MLAB.
2. Copy the Supabase project URL.
3. Copy the publishable key.
4. Add the database connection string to deployment environment variables.
5. Run/apply `lib/db/migrations/0005_mlab_platform_layer.sql`.
6. Run Supabase security/performance advisors.
7. Configure storage buckets for:
   - profile-avatars
   - assistant-avatars
   - tenant-assets
   - knowledge-base-files
8. Confirm row-level security policies before real customer data is stored.

## Environment variables to track

The platform should eventually have:

```env
DATABASE_URL=
POSTGRES_URL=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=
KIMI_API_KEY=
KIMI_MODEL=
MLAB_PRIMARY_DOMAIN=askmlab.com
BEN_AI_WIDGET_URL=https://ben-ai-beta.vercel.app/ben-ai-widget.js
```

Do not commit real secrets to GitHub.

## App direction

The app should evolve toward this route structure:

- `/` public MLAB landing/home
- `/chat` BEN.AI chat interface
- `/os` My Life OS dashboard
- `/profile` user profile and avatar
- `/rewards` rewards wallet
- `/assistants` assistant marketplace/templates
- `/admin` MLAB admin/control centre
- `/guide` future guide/course: how to build your own AI operating system

## BEN.AI experience direction

BEN.AI should not behave like a basic button.

Target behaviour:

1. BEN.AI appears on the page automatically.
2. BEN.AI enters/walks into the page as a premium assistant.
3. BEN.AI settles into the compass/radar circle when idle.
4. The compass circle opens the chat/control panel.
5. The panel shows BEN.AI like a concierge/video-call-style assistant.
6. The user profile image appears inside the experience.
7. The interface asks one question at a time.
8. The interface supports cards, checklists, guided choices, and plain explanations.

## Rentable assistant product direction

MLAB should be able to sell/rent a standard BEN.AI-style assistant.

Possible editions:

- Standard personal assistant
- Travel concierge assistant
- Business support assistant
- Coach/course assistant
- Community assistant
- White-label business assistant

Each assistant instance should store:

- Tenant/workspace owner
- Assistant template
- Assistant name
- Avatar/profile image
- Brand colours
- Welcome message
- Allowed tools
- AI provider settings
- Knowledge base links/files
- Pricing plan
- Visibility and access rules

## Hosting direction

Current deployed hosting remains Vercel while the project is being stabilised.

Long-term hosting options:

1. Keep Vercel if usage/costs are acceptable.
2. Move app frontend/API to Cloudflare Pages/Workers if cheaper hosting becomes a priority.
3. Keep database in Supabase either way.

Do not split the main product into a separate simple Squarespace marketing site unless it is only temporary.

## Domain direction

The final goal is:

```text
askmlab.com -> unified MLAB app
```

Current v0 launch page can be retired or redirected once the unified app is ready.

## Build notes / future guide

Keep documenting this build because it will become a product/guide.

Guide topics:

- How to choose a platform
- What hosting does
- What databases do
- What APIs do
- Why widgets can fail in previews
- How to design an AI assistant personality
- How to build a branded assistant experience
- How to create a multi-tenant assistant product
- How to keep a founder vision from becoming scattered

## Immediate next checklist

- Confirm/create Supabase project.
- Apply platform migration.
- Add storage buckets.
- Add environment variables.
- Build first public MLAB home route inside the app.
- Build BEN.AI compass resting-state component.
- Build user profile/avatar panel.
- Build assistant template listing.
- Build rewards placeholder.
- Build admin setup checklist.
