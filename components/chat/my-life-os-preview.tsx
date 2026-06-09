"use client";

import {
  CalendarDaysIcon,
  EyeIcon,
  GiftIcon,
  MinusIcon,
  NotebookPenIcon,
  RotateCcwIcon,
  SparklesIcon,
  TicketPercentIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type WidgetState = "open" | "minimised" | "hidden";

type PreviewWidget = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  metric: string;
  footer: string;
  icon: typeof NotebookPenIcon;
};

const feedbackFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdhOmURIFLTcZZEgVFc24MB2DsQr6yC0ZM8wBS0PHHajKq6UQ/viewform";

const widgets: PreviewWidget[] = [
  {
    id: "notes",
    title: "Notes",
    eyebrow: "Park the thought",
    description:
      "Capture open loops, packing ideas and life-admin reminders without leaving BEN.AI.",
    metric: "3 pinned",
    footer: "Demo: minimise this card or hide it from the workspace.",
    icon: NotebookPenIcon,
  },
  {
    id: "calendar",
    title: "Calendar",
    eyebrow: "Dates that matter",
    description:
      "Preview birthdays, visa dates, trips and renewal reminders in one calm strip.",
    metric: "Next: Friday",
    footer: "Future: connect calendar sync and reminder timing in settings.",
    icon: CalendarDaysIcon,
  },
  {
    id: "gift-cards",
    title: "Gift cards",
    eyebrow: "Vouchers + treats",
    description:
      "Keep gift cards, voucher links and special-date ideas where they can actually be used.",
    metric: "2 saved",
    footer: "Designed for birthdays, travel treats and member perks.",
    icon: GiftIcon,
  },
  {
    id: "rewards",
    title: "Rewards wallet",
    eyebrow: "Coupon-book mode",
    description:
      "Points, credits, affiliate offers, referrals, membership perks, course rewards and discounts.",
    metric: "£24 demo value",
    footer: "Users can show, hide or restore rewards from settings.",
    icon: TicketPercentIcon,
  },
];

const secondaryLanes = ["Travel", "Learning", "Business", "Wealth", "Community"];

export function MyLifeOSPreview() {
  const [states, setStates] = useState<Record<string, WidgetState>>(
    Object.fromEntries(widgets.map((widget) => [widget.id, "open"]))
  );

  const visibleWidgets = useMemo(
    () => widgets.filter((widget) => states[widget.id] !== "hidden"),
    [states]
  );

  const hiddenWidgets = useMemo(
    () => widgets.filter((widget) => states[widget.id] === "hidden"),
    [states]
  );

  const setWidgetState = (id: string, nextState: WidgetState) => {
    setStates((current) => ({ ...current, [id]: nextState }));
  };

  const restoreAll = () => {
    setStates(Object.fromEntries(widgets.map((widget) => [widget.id, "open"])));
  };

  return (
    <section className="relative z-1 mx-auto w-full max-w-5xl px-3 pt-4 md:px-6">
      <div className="overflow-hidden rounded-[28px] border border-yellow-500/20 bg-black/72 shadow-[0_18px_80px_rgba(0,0,0,0.45),0_0_70px_rgba(234,179,8,0.09)] backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-yellow-500/10 border-b bg-[radial-gradient(circle_at_10%_10%,rgba(234,179,8,0.18),transparent_28%),linear-gradient(135deg,rgba(15,15,15,0.98),rgba(0,0,0,0.94))] px-4 py-4 md:px-5">
          <div>
            <p className="font-medium text-[10px] text-yellow-300/85 uppercase tracking-[0.28em]">
              Early access preview
            </p>
            <h2 className="mt-1 font-semibold text-xl text-yellow-50 tracking-tight md:text-2xl">
              My Life OS demo widgets
            </h2>
            <p className="mt-1 max-w-2xl text-[12px] leading-5 text-yellow-100/58 md:text-sm">
              A clickable preview layer inside BEN.AI: minimise cards, hide them,
              then restore them from the hidden tray.
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-2 font-medium text-[11px] text-yellow-50 transition hover:border-yellow-400/60 hover:bg-yellow-500/20"
            onClick={restoreAll}
            type="button"
          >
            <RotateCcwIcon className="size-3.5" />
            Restore workspace
          </button>
        </div>

        <div className="border-yellow-500/10 border-b px-3 py-3 md:px-4">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-50">
            <p className="font-semibold text-sm">Help shape what BEN.AI becomes</p>
            <p className="mt-1 max-w-2xl text-[12px] leading-5 text-yellow-100/62 md:text-sm">
              Test the chat, play with the My Life OS preview, then tell us what
              would genuinely make life easier. No corporate survey waffle.
            </p>
            <Link
              className="mt-3 inline-flex rounded-full bg-yellow-300 px-4 py-2 font-bold text-black text-xs transition hover:bg-yellow-200"
              href={feedbackFormUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Share feedback
            </Link>
          </div>
        </div>

        <div className="grid gap-3 p-3 md:grid-cols-2 md:p-4 xl:grid-cols-4">
          {visibleWidgets.map((widget) => {
            const Icon = widget.icon;
            const state = states[widget.id];
            const isMinimised = state === "minimised";

            return (
              <article
                className={cn(
                  "group rounded-2xl border border-yellow-500/16 bg-[#070707] p-3 text-yellow-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-400/45 hover:shadow-[0_0_35px_rgba(234,179,8,0.1)]",
                  isMinimised && "bg-black/70"
                )}
                key={widget.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
                      <Icon className="size-4 text-yellow-300" />
                    </span>
                    <div>
                      <p className="text-[10px] text-yellow-300/65 uppercase tracking-[0.18em]">
                        {widget.eyebrow}
                      </p>
                      <h3 className="font-semibold text-sm">{widget.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 transition group-hover:opacity-100">
                    <button
                      aria-label={`Minimise ${widget.title}`}
                      className="rounded-full border border-yellow-500/15 p-1 text-yellow-100/65 hover:bg-yellow-500/10 hover:text-yellow-50"
                      onClick={() =>
                        setWidgetState(widget.id, isMinimised ? "open" : "minimised")
                      }
                      type="button"
                    >
                      {isMinimised ? (
                        <EyeIcon className="size-3.5" />
                      ) : (
                        <MinusIcon className="size-3.5" />
                      )}
                    </button>
                    <button
                      aria-label={`Hide ${widget.title}`}
                      className="rounded-full border border-yellow-500/15 p-1 text-yellow-100/65 hover:bg-yellow-500/10 hover:text-yellow-50"
                      onClick={() => setWidgetState(widget.id, "hidden")}
                      type="button"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </div>
                </div>

                {!isMinimised && (
                  <div className="mt-4">
                    <div className="rounded-2xl border border-yellow-500/10 bg-black/55 p-3">
                      <p className="text-[13px] leading-5 text-yellow-100/68">
                        {widget.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 font-medium text-[10px] text-yellow-100">
                          {widget.metric}
                        </span>
                        <SparklesIcon className="size-4 text-yellow-300/70" />
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-4 text-yellow-100/45">
                      {widget.footer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-yellow-500/10 border-t px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {secondaryLanes.map((lane) => (
              <span
                className="rounded-full border border-yellow-500/15 bg-yellow-500/5 px-3 py-1 text-[10px] text-yellow-100/65 uppercase tracking-[0.16em]"
                key={lane}
              >
                {lane}
              </span>
            ))}
          </div>

          {hiddenWidgets.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-yellow-100/55">
              <span>Hidden:</span>
              {hiddenWidgets.map((widget) => (
                <button
                  className="rounded-full border border-yellow-500/20 px-2 py-1 text-yellow-100/75 hover:bg-yellow-500/10"
                  key={widget.id}
                  onClick={() => setWidgetState(widget.id, "open")}
                  type="button"
                >
                  Restore {widget.title}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-yellow-100/45">
              Settings will control widgets, page mode, rewards, early access and hidden items.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
