import Link from "next/link";
import { CompassAssistantPreview } from "@/components/mlab/compass-assistant-preview";
import {
  ASSISTANT_MODES,
  ASSISTANT_PRODUCT_TIERS,
  BEN_AI_PERSONA,
  MLAB_LANES,
} from "@/lib/mlab/platform-config";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.08),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 font-semibold text-[11px] text-yellow-100 uppercase tracking-[0.28em]">
              MLAB / BEN.AI Platform
            </div>
            <h1 className="mt-8 max-w-4xl text-balance font-semibold text-4xl tracking-tight md:text-6xl">
              One platform for travel, life admin, learning, business, wealth, and community.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base text-white/64 leading-7 md:text-lg">
              BEN.AI is being built as the living MLAB concierge: a premium assistant that enters the page, rests in the compass circle, and opens into a control panel when people need support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-yellow-300 px-5 py-3 font-bold text-black text-sm shadow-[0_0_40px_rgba(234,179,8,0.22)]"
                href="/chat"
              >
                Open BEN.AI
              </Link>
              <Link
                className="rounded-full border border-yellow-500/30 px-5 py-3 font-bold text-sm text-yellow-100"
                href="/settings"
              >
                Platform settings
              </Link>
            </div>
          </div>

          <CompassAssistantPreview />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-5 md:px-10">
        {MLAB_LANES.map((lane) => (
          <div
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
            key={lane.id}
          >
            <p className="font-semibold text-yellow-100">{lane.label}</p>
            <p className="mt-3 text-sm text-white/58 leading-6">{lane.description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-2 md:px-10">
        <div className="rounded-[2rem] border border-yellow-500/20 bg-black/45 p-7">
          <p className="font-semibold text-sm text-yellow-100 uppercase tracking-[0.24em]">
            Locked core personality
          </p>
          <h2 className="mt-4 font-semibold text-2xl">BEN.AI stays BEN.AI.</h2>
          <p className="mt-4 text-sm text-white/60 leading-7">
            {BEN_AI_PERSONA.personalityLock}
          </p>
          <div className="mt-6 grid gap-3">
            {ASSISTANT_MODES.map((mode) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" key={mode.id}>
                <p className="font-semibold text-white">{mode.label}</p>
                <p className="mt-2 text-sm text-white/56 leading-6">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-yellow-500/20 bg-black/45 p-7">
          <p className="font-semibold text-sm text-yellow-100 uppercase tracking-[0.24em]">
            Rentable assistant product
          </p>
          <h2 className="mt-4 font-semibold text-2xl">Built to sell, rent, and embed.</h2>
          <p className="mt-4 text-sm text-white/60 leading-7">
            Customers can add their brand, knowledge, site information, and mode emphasis on top while MLAB keeps the core system protected.
          </p>
          <div className="mt-6 grid gap-3">
            {ASSISTANT_PRODUCT_TIERS.map((tier) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" key={tier.id}>
                <p className="font-semibold text-white">{tier.name}</p>
                <p className="mt-2 text-sm text-white/56 leading-6">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
