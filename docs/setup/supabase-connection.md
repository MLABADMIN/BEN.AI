# Supabase Connection Notes

## Connected project

Project name: MLAB Platform
Project ref: uqkkigxnwnqecshvrlmd
Region: eu-west-2
Status checked by connector: ACTIVE_HEALTHY
Database host: db.uqkkigxnwnqecshvrlmd.supabase.co

## Public project URL

Supabase project URLs normally follow this pattern:

```text
https://<project-ref>.supabase.co
```

For this project:

```text
https://uqkkigxnwnqecshvrlmd.supabase.co
```

## Environment variables needed

Add these to the deployment environment when connecting the app fully:

```env
SUPABASE_URL=https://uqkkigxnwnqecshvrlmd.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://uqkkigxnwnqecshvrlmd.supabase.co
SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
POSTGRES_URL=
```

The publishable key was retrieved through the Supabase connector, but real keys and database secrets should be stored in deployment environment variables, not hard-coded in GitHub.

## Project keys

The connector returned:

- a legacy anon key
- a modern publishable key beginning with `sb_publishable_`

Use the modern publishable key for new frontend/client setup where possible.

## Database connection string

The database connection string should be copied from Supabase and added to the hosting provider as:

```env
DATABASE_URL=
POSTGRES_URL=
```

Do not commit the database password or full connection string to GitHub.

## Migration to apply

The MLAB platform schema is stored here:

```text
lib/db/migrations/0005_mlab_platform_layer.sql
```

It creates:

- Tenant
- TenantMembership
- UserProfile
- AssistantTemplate
- AssistantInstance
- AssistantState
- WidgetPreference
- RewardsAccount
- RewardsLedger
- Offer
- GiftCard
- BuildNote

## Next Supabase setup tasks

1. Add environment variables to deployment.
2. Apply the migration to the Supabase database.
3. Create storage buckets:
   - profile-avatars
   - assistant-avatars
   - tenant-assets
   - knowledge-base-files
4. Run security advisors.
5. Run performance advisors.
6. Decide whether to migrate authentication to Supabase Auth or keep the existing app auth first.
