import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
  name: text("name"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  isAnonymous: boolean("isAnonymous").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable("Message_v2", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

export const vote = pgTable(
  "Vote_v2",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
  })
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "code", "image", "sheet"] })
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.createdAt] }),
  })
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  "Suggestion",
  {
    id: uuid("id").notNull().defaultRandom(),
    documentId: uuid("documentId").notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  })
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const stream = pgTable(
  "Stream",
  {
    id: uuid("id").notNull().defaultRandom(),
    chatId: uuid("chatId").notNull(),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [chat.id],
    }),
  })
);

export type Stream = InferSelectModel<typeof stream>;

export const tenant = pgTable("Tenant", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 96 }).notNull().unique(),
  kind: varchar("kind", { length: 32 }).notNull().default("mlab"),
  brand: json("brand").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Tenant = InferSelectModel<typeof tenant>;

export const tenantMembership = pgTable(
  "TenantMembership",
  {
    tenantId: uuid("tenantId")
      .notNull()
      .references(() => tenant.id),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
    role: varchar("role", { length: 32 }).notNull().default("member"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tenantId, table.userId] }),
  })
);

export type TenantMembership = InferSelectModel<typeof tenantMembership>;

export const userProfile = pgTable("UserProfile", {
  userId: uuid("userId")
    .primaryKey()
    .notNull()
    .references(() => user.id),
  displayName: text("displayName"),
  avatarUrl: text("avatarUrl"),
  bio: text("bio"),
  timezone: text("timezone"),
  communicationStyle: varchar("communicationStyle", { length: 32 })
    .notNull()
    .default("balanced"),
  questionMode: varchar("questionMode", { length: 32 })
    .notNull()
    .default("one-at-a-time"),
  layoutPreference: varchar("layoutPreference", { length: 32 })
    .notNull()
    .default("summary-first"),
  profile: json("profile").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type UserProfile = InferSelectModel<typeof userProfile>;

export const assistantTemplate = pgTable("AssistantTemplate", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  tenantId: uuid("tenantId").references(() => tenant.id),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 96 }).notNull().unique(),
  description: text("description"),
  category: varchar("category", { length: 48 })
    .notNull()
    .default("personal-assistant"),
  defaultConfig: json("defaultConfig").notNull().default({}),
  isPublic: boolean("isPublic").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type AssistantTemplate = InferSelectModel<typeof assistantTemplate>;

export const assistantInstance = pgTable(
  "AssistantInstance",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    tenantId: uuid("tenantId")
      .notNull()
      .references(() => tenant.id),
    templateId: uuid("templateId").references(() => assistantTemplate.id),
    ownerUserId: uuid("ownerUserId").references(() => user.id),
    name: text("name").notNull(),
    slug: varchar("slug", { length: 96 }).notNull(),
    avatarUrl: text("avatarUrl"),
    brand: json("brand").notNull().default({}),
    config: json("config").notNull().default({}),
    status: varchar("status", { length: 32 }).notNull().default("draft"),
    pricingPlan: varchar("pricingPlan", { length: 48 })
      .notNull()
      .default("internal"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    tenantSlug: unique().on(table.tenantId, table.slug),
  })
);

export type AssistantInstance = InferSelectModel<typeof assistantInstance>;

export const assistantState = pgTable(
  "AssistantState",
  {
    assistantId: uuid("assistantId")
      .notNull()
      .references(() => assistantInstance.id),
    userId: uuid("userId").references(() => user.id),
    state: varchar("state", { length: 48 })
      .notNull()
      .default("compass-resting"),
    panelOpen: boolean("panelOpen").notNull().default(false),
    lastSeenAt: timestamp("lastSeenAt"),
    metadata: json("metadata").notNull().default({}),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.assistantId, table.userId] }),
  })
);

export type AssistantState = InferSelectModel<typeof assistantState>;

export const widgetPreference = pgTable(
  "WidgetPreference",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("userId").references(() => user.id),
    tenantId: uuid("tenantId").references(() => tenant.id),
    widgetKey: varchar("widgetKey", { length: 96 }).notNull(),
    isVisible: boolean("isVisible").notNull().default(true),
    isMinimized: boolean("isMinimized").notNull().default(false),
    position: json("position").notNull().default({}),
    settings: json("settings").notNull().default({}),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userTenantWidget: unique().on(table.userId, table.tenantId, table.widgetKey),
  })
);

export type WidgetPreference = InferSelectModel<typeof widgetPreference>;

export const rewardsAccount = pgTable(
  "RewardsAccount",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    tenantId: uuid("tenantId")
      .notNull()
      .references(() => tenant.id),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
    pointsBalance: integer("pointsBalance").notNull().default(0),
    creditBalance: integer("creditBalance").notNull().default(0),
    currency: varchar("currency", { length: 8 }).notNull().default("GBP"),
    tier: varchar("tier", { length: 32 }).notNull().default("early-access"),
    metadata: json("metadata").notNull().default({}),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    tenantUser: unique().on(table.tenantId, table.userId),
  })
);

export type RewardsAccount = InferSelectModel<typeof rewardsAccount>;

export const rewardsLedger = pgTable("RewardsLedger", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  accountId: uuid("accountId")
    .notNull()
    .references(() => rewardsAccount.id),
  kind: varchar("kind", { length: 48 }).notNull(),
  pointsDelta: integer("pointsDelta").notNull().default(0),
  creditDelta: integer("creditDelta").notNull().default(0),
  description: text("description"),
  metadata: json("metadata").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type RewardsLedger = InferSelectModel<typeof rewardsLedger>;

export const offer = pgTable("Offer", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  tenantId: uuid("tenantId").references(() => tenant.id),
  title: text("title").notNull(),
  description: text("description"),
  category: varchar("category", { length: 48 }).notNull().default("perk"),
  source: varchar("source", { length: 48 }).notNull().default("mlab"),
  url: text("url"),
  startsAt: timestamp("startsAt"),
  endsAt: timestamp("endsAt"),
  isActive: boolean("isActive").notNull().default(true),
  metadata: json("metadata").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Offer = InferSelectModel<typeof offer>;

export const giftCard = pgTable("GiftCard", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  tenantId: uuid("tenantId").references(() => tenant.id),
  title: text("title").notNull(),
  description: text("description"),
  provider: text("provider"),
  valueLabel: text("valueLabel"),
  redemptionUrl: text("redemptionUrl"),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  metadata: json("metadata").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type GiftCard = InferSelectModel<typeof giftCard>;

export const buildNote = pgTable("BuildNote", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  tenantId: uuid("tenantId").references(() => tenant.id),
  title: text("title").notNull(),
  note: text("note").notNull(),
  category: varchar("category", { length: 64 }).notNull().default("build-guide"),
  source: varchar("source", { length: 64 }).notNull().default("founder-session"),
  metadata: json("metadata").notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type BuildNote = InferSelectModel<typeof buildNote>;
