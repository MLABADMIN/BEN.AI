# MLAB / BEN.AI Unified Platform Blueprint

## Direction

MLAB should not be split across disconnected tools. The long-term target is one unified app where the public website, BEN.AI, user accounts, profiles, rewards, dashboards, and rentable AI assistants live together.

## Core stack

- Frontend/app: custom web app in this repository
- Backend database: Supabase Postgres, or a compatible Postgres provider while Supabase is being provisioned
- Auth: existing app auth first; Supabase Auth can be adopted later if/when we migrate auth fully
- File storage: Supabase Storage for profile pictures, assistant avatars, documents, and future knowledge-base uploads
- AI providers: OpenAI first, Kimi/Moonshot as optional secondary provider
- Domain: askmlab.com should point to the unified MLAB app once ready

## Why not a separate Squarespace site

Squarespace may be useful for a simple marketing page, but the MLAB/BEN.AI product needs more than a brochure site.

The platform needs:

- BEN.AI animated assistant behaviour
- Compass/radar resting state
- User accounts and profile photos
- BEN.AI profile/avatar display
- Chat/control panel experience
- Dashboard widgets
- Rewards wallet
- Gift cards and affiliate perks
- Assistant templates that can be rented or sold
- Per-customer assistant settings
- Knowledge base and documents
- Admin controls
- Future guide/course: how to build your own AI operating system

## Product architecture

### 1. Public MLAB layer

The public page explains MLAB and lets BEN.AI appear automatically. BEN.AI should not be a plain button. The intended behaviour is:

1. BEN.AI appears on the page.
2. BEN.AI feels like he walks onto or enters the experience.
3. BEN.AI settles into the compass/radar circle when idle.
4. The user clicks the compass circle to open the chat/control panel.
5. The panel shows BEN.AI like a concierge/video-call-style assistant.
6. The user profile/avatar is also visible in the interface.

### 2. MLAB OS layer

The user dashboard should eventually contain:

- Travel
- Learning
- Business
- Wealth
- Community
- Notes
- Calendar
- Rewards wallet
- Gift cards
- Saved plans
- Early access/member status
- Communication settings

### 3. Rentable assistant layer

BEN.AI should become a product that can be standardised and rented/sold.

Possible editions:

- Standard personal assistant
- Business concierge assistant
- Travel assistant
- Coach/course assistant
- Community assistant
- White-label assistant

Each assistant instance needs:

- Owner account
- Tenant/workspace
- Assistant name
- Avatar
- Brand colours
- Welcome message
- Allowed tools
- Model/provider settings
- Knowledge base
- Pricing plan
- Visibility settings
- Chat history
- User access rules

## Backend objects to add

The existing app already has users, chats, messages, documents, votes, suggestions, and streams. The MLAB platform layer should add:

- Tenants/workspaces
- Memberships
- User profiles
- Assistant templates
- Assistant instances
- Assistant events/states
- Rewards accounts
- Rewards ledger
- Offers/perks
- Gift cards
- User widget preferences
- Guide/build notes

## Build notes for future guide

This build process should become content for a future guide/course.

Working titles:

- How to Build Your Own AI Operating System
- How to Create Your Own AI Assistant
- How to Build a Chatbot That Feels Like a Brand Concierge
- Building MLAB OS: From Beautiful Chaos to Structured Action

Document lessons:

- What domains, hosting, widgets, APIs, and databases actually do
- Why no-code pages can become limiting
- How to choose between simple website builders and custom apps
- How to design an assistant personality
- How to make an assistant feel alive instead of like a button
- How to avoid overwhelming users
- How to plan multi-tenant AI products
- How to turn a messy founder vision into a structured product
