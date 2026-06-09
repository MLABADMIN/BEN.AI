"use client";

import { MessageCircleIcon, ShieldCheckIcon } from "lucide-react";

export function MyLifeOSPreview() {
  return (
    <section className="relative z-1 mx-auto w-full max-w-5xl px-3 pt-4 md:px-6">
      <div className="overflow-hidden rounded-[28px] border border-yellow-500/20 bg-black/72 shadow-[0_18px_80px_rgba(0,0,0,0.45),0_0_70px_rgba(234,179,8,0.09)] backdrop-blur">
        <div className="border-yellow-500/10 border-b bg-[radial-gradient(circle_at_10%_10%,rgba(234,179,8,0.18),transparent_28%),linear-gradient(135deg,rgba(15,15,15,0.98),rgba(0,0,0,0.94))] px-4 py-5 md:px-5">
          <p className="font-medium text-[10px] text-yellow-300/85 uppercase tracking-[0.28em]">
            BEN.AI workspace
          </p>
          <h2 className="mt-2 font-semibold text-2xl text-yellow-50 tracking-tight md:text-3xl">
            Chat-first test area
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-yellow-100/60 md:text-base">
            Only the parts that are ready to test are shown here. Notes,
            calendar, gift cards, rewards and other My Life OS modules are hidden
            until they are connected to saved data and can actually do the job.
          </p>
        </div>

        <div className="grid gap-3 p-3 md:grid-cols-2 md:p-4">
          <article className="rounded-2xl border border-yellow-500/20 bg-[#070707] p-4 text-yellow-50">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
                <MessageCircleIcon className="size-5 text-yellow-300" />
              </span>
              <div>
                <p className="font-semibold text-sm">Use BEN.AI chat</p>
                <p className="mt-2 text-sm leading-6 text-yellow-100/62">
                  Ask questions and test the assistant. Feedback should happen in
                  the chat for now, not through extra outside links.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-yellow-500/20 bg-[#070707] p-4 text-yellow-50">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
                <ShieldCheckIcon className="size-5 text-yellow-300" />
              </span>
              <div>
                <p className="font-semibold text-sm">Working features only</p>
                <p className="mt-2 text-sm leading-6 text-yellow-100/62">
                  If a tool is not live, connected and useful, it stays off the
                  screen. The next visible My Life OS cards should be real
                  features backed by stored data.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
