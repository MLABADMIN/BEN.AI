import Link from "next/link";
import { CommunicationSettingsPreview } from "@/components/chat/communication-settings-preview";

const widgetControls = [
  {
    title: "Notes",
    status: "Preview",
    description:
      "Keep a movable place for thoughts, lists and open loops. Early access will let users pin, minimise or hide it.",
  },
  {
    title: "Calendar",
    status: "Preview",
    description:
      "Connect birthdays, travel dates and life-admin reminders. Full calendar sync comes later.",
  },
  {
    title: "Gift cards",
    status: "Planned",
    description:
      "Gift cards and vouchers connected to important dates, notes, rewards and member treats.",
  },
  {
    title: "Rewards wallet",
    status: "Planned",
    description:
      "A coupon-book style space for points, credits, affiliate offers, referrals and membership perks.",
  },
  {
    title: "Declutter nudge",
    status: "Planned",
    description:
      "Optional reminders to save, archive or clear stale open items after a sensible period. Never automatic deletion.",
  },
];

const pageControls = [
  "Light / dark page mode",
  "Show or hide preview widgets",
  "Choose where gift-card suggestions appear",
  "Turn rewards and affiliate offers on or off",
  "Set reminder timing for stale open items",
  "Save BEN.AI communication style",
];

export default function SettingsPage() {
  return (
    <main className="min-h-dvh bg-[#030303] px-4 py-8 text-yellow-50 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-yellow-300/80 uppercase tracking-[0.32em]">
              BEN.AI settings
            </p>
            <h1 className="mt-2 font-semibold text-3xl tracking-tight md:text-5xl">
              My Life OS controls
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-yellow-100/65 md:text-base">
              Early-access settings preview. This is where users will control
              widgets, page mode, rewards, affiliate perks, gift cards, calm
              reminders and BEN.AI's communication style as the full workspace
              comes online.
            </p>
          </div>
          <Link
            className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 font-medium text-sm text-yellow-50 transition-colors hover:border-yellow-400/70 hover:bg-yellow-500/20"
            href="/"
          >
            Back to BEN.AI
          </Link>
        </div>

        <div className="space-y-4">
          <CommunicationSettingsPreview />

          <section className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-yellow-500/20 bg-black p-5 shadow-[0_0_60px_rgba(234,179,8,0.08)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-xl">Widget controls</h2>
                  <p className="mt-1 text-sm text-yellow-100/55">
                    One settings home for modules users can show, hide, pin or
                    tuck away.
                  </p>
                </div>
                <span className="rounded-full border border-yellow-500/25 px-3 py-1 text-[10px] text-yellow-200 uppercase tracking-[0.2em]">
                  Early access
                </span>
              </div>

              <div className="space-y-3">
                {widgetControls.map((item) => (
                  <div
                    className="rounded-2xl border border-yellow-500/15 bg-[#070707] p-4"
                    key={item.title}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-yellow-50">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-yellow-100/58">
                          {item.description}
                        </p>
                      </div>
                      <span className="rounded-full border border-yellow-500/20 px-2 py-1 text-[10px] text-yellow-200/80 uppercase tracking-[0.16em]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-yellow-500/20 bg-black p-5">
                <h2 className="font-semibold text-xl">Page controls</h2>
                <p className="mt-1 text-sm text-yellow-100/55">
                  Keep this simple at the top level. No cluttered wall of buttons.
                </p>
                <div className="mt-4 space-y-2">
                  {pageControls.map((item) => (
                    <div
                      className="flex items-center justify-between rounded-2xl border border-yellow-500/15 bg-[#070707] px-3 py-3 text-sm text-yellow-100/75"
                      key={item}
                    >
                      <span>{item}</span>
                      <span className="rounded-full border border-yellow-500/20 px-2 py-1 text-[10px] text-yellow-200/70 uppercase tracking-[0.16em]">
                        Soon
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 to-black p-5">
                <h2 className="font-semibold text-xl">Rewards wallet idea</h2>
                <p className="mt-2 text-sm leading-6 text-yellow-100/65">
                  A future coupon-book style wallet for MLAB points, booking-style
                  credits, affiliate links, referral rewards, membership discounts,
                  course rewards and special treats. Users can hide it, bring it
                  back from settings, or keep it nearby when useful.
                </p>
                <Link
                  className="mt-4 inline-flex rounded-full border border-yellow-500/35 bg-black/50 px-4 py-2 font-medium text-sm text-yellow-50 transition-colors hover:bg-yellow-500/15"
                  href="https://www.mylifeasben.co.uk/join"
                >
                  Join early access
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
