export const MLAB_LANES = [
  {
    id: "travel",
    label: "Travel",
    description: "Trips, relocation, guides, concierge planning, and destination support.",
  },
  {
    id: "learning",
    label: "Learning",
    description: "Courses, guides, skills, confidence, and step-by-step growth.",
  },
  {
    id: "business",
    label: "Business",
    description: "Ideas, plans, launches, admin, systems, and practical execution.",
  },
  {
    id: "wealth",
    label: "Wealth",
    description: "Money, rewards, offers, community wealth, and opportunity planning.",
  },
  {
    id: "community",
    label: "Community",
    description: "Belonging, citizenship, support, culture, stories, and connection.",
  },
] as const;

export const BEN_AI_PERSONA = {
  name: "BEN.AI",
  tagline: "The Adventure Starts Here",
  role: "MLAB personal concierge and operating-system guide",
  tone: "calm, warm, premium, practical, one-step-at-a-time",
  restingState: "compass-circle",
  activeState: "concierge-control-panel",
  visualBehaviour: [
    "appears on the page automatically",
    "enters like a premium assistant rather than a basic button",
    "settles into the compass/radar circle when idle",
    "opens into a chat/control panel when selected",
    "shows BEN.AI avatar and user profile presence",
  ],
} as const;

export const ASSISTANT_PRODUCT_TIERS = [
  {
    id: "standard-personal-assistant",
    name: "Standard Personal Assistant",
    audience: "individuals",
    description:
      "A rentable BEN.AI-style personal assistant for life admin, planning, travel, learning, business, wealth, and community support.",
    status: "planned",
  },
  {
    id: "travel-concierge",
    name: "Travel Concierge Assistant",
    audience: "travellers and relocation clients",
    description:
      "A destination-aware assistant for trips, relocation, hotels, itineraries, and practical travel support.",
    status: "planned",
  },
  {
    id: "business-concierge",
    name: "Business Concierge Assistant",
    audience: "small businesses and creators",
    description:
      "A branded assistant for business planning, customer guidance, admin, workflows, and service explanation.",
    status: "planned",
  },
  {
    id: "coach-course-assistant",
    name: "Coach/Course Assistant",
    audience: "coaches, educators, and course creators",
    description:
      "An assistant for guided learning, course navigation, accountability, and simple explanations.",
    status: "planned",
  },
  {
    id: "white-label-assistant",
    name: "White-label Assistant",
    audience: "partner brands",
    description:
      "A configurable version of the assistant that can adopt a tenant's name, avatar, tone, knowledge base, and brand colours.",
    status: "planned",
  },
] as const;

export const MLAB_PLATFORM_PHASES = [
  {
    id: "foundation",
    label: "Foundation",
    items: [
      "single app direction",
      "database schema",
      "assistant setup-mode fallback",
      "platform runbook",
    ],
  },
  {
    id: "public-experience",
    label: "Public Experience",
    items: [
      "MLAB home route",
      "BEN.AI compass resting state",
      "premium assistant entry behaviour",
      "public explanation of MLAB lanes",
    ],
  },
  {
    id: "member-os",
    label: "Member OS",
    items: [
      "user profile",
      "avatar",
      "My Life OS dashboard",
      "rewards wallet",
      "saved plans",
    ],
  },
  {
    id: "assistant-marketplace",
    label: "Assistant Marketplace",
    items: [
      "assistant templates",
      "tenant assistant instances",
      "pricing plans",
      "knowledge bases",
      "white-label configuration",
    ],
  },
] as const;
