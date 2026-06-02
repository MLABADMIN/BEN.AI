"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const responseModes = [
  {
    id: "calm",
    title: "Calm mode",
    description: "Short answer first, then one next step. Best for overwhelm.",
  },
  {
    id: "balanced",
    title: "Balanced mode",
    description: "Helpful detail with headings, but no wall of text.",
  },
  {
    id: "deep",
    title: "Deep-dive mode",
    description: "More context, examples and reasoning when the user asks for it.",
  },
];

const questionModes = [
  {
    id: "one",
    title: "One question at a time",
    description: "BEN.AI asks the next most useful question only.",
  },
  {
    id: "two",
    title: "Two max",
    description: "A little faster, but still controlled and easy to answer.",
  },
  {
    id: "form",
    title: "Picker / form",
    description: "Use tables, checklists or buttons when several choices are needed.",
  },
];

const layoutOptions = [
  "Show quick summary first",
  "Use tables for choices",
  "Break instructions into steps",
  "Offer examples before asking",
  "Add a pause/check-in when the answer is long",
];

export function CommunicationSettingsPreview() {
  const [responseMode, setResponseMode] = useState("calm");
  const [questionMode, setQuestionMode] = useState("one");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(layoutOptions.map((option) => [option, true]))
  );

  return (
    <section className="rounded-3xl border border-yellow-500/20 bg-black p-5 shadow-[0_0_60px_rgba(234,179,8,0.08)]">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] text-yellow-300/80 uppercase tracking-[0.28em]">
            Accessibility + ADHD support
          </p>
          <h2 className="mt-1 font-semibold text-xl">BEN.AI communication style</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-yellow-100/58">
            Let users choose how BEN.AI gives information: calmer, chunked,
            visual, and less question-heavy. These controls are a live settings
            preview and should become saved preferences in the member version.
          </p>
        </div>
        <span className="rounded-full border border-yellow-500/25 px-3 py-1 text-[10px] text-yellow-200 uppercase tracking-[0.2em]">
          Early access
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-yellow-500/15 bg-[#070707] p-4">
          <h3 className="font-semibold text-yellow-50">Response amount</h3>
          <p className="mt-1 text-xs leading-5 text-yellow-100/50">
            Controls how much BEN.AI says before asking for more.
          </p>
          <div className="mt-3 space-y-2">
            {responseModes.map((mode) => (
              <button
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition",
                  responseMode === mode.id
                    ? "border-yellow-400/55 bg-yellow-500/12"
                    : "border-yellow-500/12 bg-black/40 hover:border-yellow-500/35 hover:bg-yellow-500/8"
                )}
                key={mode.id}
                onClick={() => setResponseMode(mode.id)}
                type="button"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 items-center justify-center rounded-full border",
                    responseMode === mode.id
                      ? "border-yellow-300 bg-yellow-400 text-black"
                      : "border-yellow-500/25 text-transparent"
                  )}
                >
                  <CheckIcon className="size-3" />
                </span>
                <span>
                  <span className="block font-medium text-sm text-yellow-50">
                    {mode.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-yellow-100/52">
                    {mode.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-500/15 bg-[#070707] p-4">
          <h3 className="font-semibold text-yellow-50">Question flow</h3>
          <p className="mt-1 text-xs leading-5 text-yellow-100/50">
            Prevents the big paragraph of questions that feels like homework.
          </p>
          <div className="mt-3 space-y-2">
            {questionModes.map((mode) => (
              <button
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition",
                  questionMode === mode.id
                    ? "border-yellow-400/55 bg-yellow-500/12"
                    : "border-yellow-500/12 bg-black/40 hover:border-yellow-500/35 hover:bg-yellow-500/8"
                )}
                key={mode.id}
                onClick={() => setQuestionMode(mode.id)}
                type="button"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 items-center justify-center rounded-full border",
                    questionMode === mode.id
                      ? "border-yellow-300 bg-yellow-400 text-black"
                      : "border-yellow-500/25 text-transparent"
                  )}
                >
                  <CheckIcon className="size-3" />
                </span>
                <span>
                  <span className="block font-medium text-sm text-yellow-50">
                    {mode.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-yellow-100/52">
                    {mode.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-yellow-500/15 bg-[#070707] p-4">
        <h3 className="font-semibold text-yellow-50">Layout helpers</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {layoutOptions.map((option) => (
            <button
              className={cn(
                "flex items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm transition",
                enabled[option]
                  ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-50"
                  : "border-yellow-500/10 bg-black/40 text-yellow-100/45"
              )}
              key={option}
              onClick={() =>
                setEnabled((current) => ({ ...current, [option]: !current[option] }))
              }
              type="button"
            >
              <span>{option}</span>
              <span className="rounded-full border border-yellow-500/20 px-2 py-1 text-[10px] text-yellow-200/75 uppercase tracking-[0.16em]">
                {enabled[option] ? "On" : "Off"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-yellow-500/15 bg-gradient-to-br from-yellow-500/12 to-black p-4">
        <h3 className="font-semibold text-yellow-50">Example behaviour</h3>
        <div className="mt-3 rounded-2xl border border-yellow-500/10 bg-black/45 p-3 text-sm leading-6 text-yellow-100/70">
          <p className="font-medium text-yellow-50">User asks: Where should I go for good weather?</p>
          <p className="mt-2">
            BEN.AI should answer with a starter suggestion, then ask one simple
            choice such as: beach, city break, nature, or cheapest sunny option.
            If more details are needed, use a small picker table instead of a
            paragraph full of questions.
          </p>
        </div>
      </div>
    </section>
  );
}
