"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const actionOptions = [
  "Understand the meaning",
  "Translate to English",
  "Reply naturally",
  "Explain tone or context",
  "Suggest better wording",
];

const authenticityFlags = [
  "Too literal",
  "Wrong tone",
  "Sounds exaggerated",
  "Needs more context",
  "Disrespectful",
  "Good and natural",
];

type FeedbackReview = {
  phrase: string;
  meaning: string;
  requestedAction: string;
  understoodCorrectly: string;
  soundedNatural: string;
  betterWording: string;
  contextNotes: string;
  flags: string[];
  extraNotes: string;
};

export function PatwaFeedbackForm() {
  const [review, setReview] = useState<FeedbackReview | null>(null);

  const packetText = useMemo(() => {
    if (!review) {
      return "";
    }

    return [
      `Phrase or prompt: ${review.phrase}`,
      `Meaning: ${review.meaning || "Not provided"}`,
      `Requested action: ${review.requestedAction}`,
      `Understood correctly: ${review.understoodCorrectly}`,
      `Sounded natural: ${review.soundedNatural}`,
      `Better wording: ${review.betterWording || "Not provided"}`,
      `Context: ${review.contextNotes || "Not provided"}`,
      `Flags: ${review.flags.length ? review.flags.join(", ") : "None"}`,
      `Anything else: ${review.extraNotes || "Not provided"}`,
    ].join("\n");
  }, [review]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const phrase = String(formData.get("phrase") || "").trim();

    if (!phrase) {
      setReview(null);
      return;
    }

    setReview({
      phrase,
      meaning: String(formData.get("meaning") || "").trim(),
      requestedAction: String(formData.get("requestedAction") || ""),
      understoodCorrectly: String(formData.get("understoodCorrectly") || ""),
      soundedNatural: String(formData.get("soundedNatural") || ""),
      betterWording: String(formData.get("betterWording") || "").trim(),
      contextNotes: String(formData.get("contextNotes") || "").trim(),
      flags: formData.getAll("flags").map((flag) => String(flag)),
      extraNotes: String(formData.get("extraNotes") || "").trim(),
    });
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-3 border-border border-b pb-5">
        <div>
          <h2 className="text-xl font-semibold">Share a test note</h2>
          <p className="mt-2 text-muted-foreground text-sm leading-6">
            Review mode only. This form prepares feedback for BEN.AI review, but
            it does not save to Supabase yet.
          </p>
        </div>
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-muted-foreground text-sm leading-6">
          Please use short original examples or your own wording. Do not paste
          songs, long transcripts, private messages, or anything you do not have
          permission to share.
        </div>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBlock
            description="A short original phrase or prompt BEN.AI should understand."
            htmlFor="phrase"
            label="Phrase or prompt"
          >
            <Textarea
              className="min-h-24"
              id="phrase"
              maxLength={280}
              name="phrase"
              placeholder="Write one short original example."
              required
            />
          </FieldBlock>

          <FieldBlock
            description="Plain English meaning, even if it is approximate."
            htmlFor="meaning"
            label="What it means"
          >
            <Textarea
              className="min-h-24"
              id="meaning"
              maxLength={360}
              name="meaning"
              placeholder="Explain the meaning in your own words."
            />
          </FieldBlock>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <FieldBlock htmlFor="requestedAction" label="Wanted action">
            <NativeSelect id="requestedAction" name="requestedAction">
              {actionOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </FieldBlock>

          <FieldBlock htmlFor="understoodCorrectly" label="Understood correctly">
            <NativeSelect id="understoodCorrectly" name="understoodCorrectly">
              <option>Not tested yet</option>
              <option>Yes</option>
              <option>Partly</option>
              <option>No</option>
              <option>Unsure</option>
            </NativeSelect>
          </FieldBlock>

          <FieldBlock htmlFor="soundedNatural" label="Sounded natural">
            <NativeSelect id="soundedNatural" name="soundedNatural">
              <option>Not tested yet</option>
              <option>Yes</option>
              <option>Mostly</option>
              <option>No</option>
              <option>Unsure</option>
            </NativeSelect>
          </FieldBlock>
        </div>

        <FieldBlock
          description="Use this for a better wording, correction, or what BEN.AI should have said."
          htmlFor="betterWording"
          label="Better wording"
        >
          <Textarea
            id="betterWording"
            maxLength={360}
            name="betterWording"
            placeholder="Optional correction or more natural version."
          />
        </FieldBlock>

        <FieldBlock
          description="Region, generation, Jamaica or diaspora, formal or casual tone, slang, code-switching, or anything else that matters."
          htmlFor="contextNotes"
          label="Context notes"
        >
          <Textarea
            id="contextNotes"
            maxLength={500}
            name="contextNotes"
            placeholder="Add context that would help a reviewer understand the phrase."
          />
        </FieldBlock>

        <div>
          <p className="font-medium text-sm">Authenticity flags</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {authenticityFlags.map((flag) => (
              <label
                className="flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                key={flag}
              >
                <input
                  className="size-4 accent-foreground"
                  name="flags"
                  type="checkbox"
                  value={flag}
                />
                <span>{flag}</span>
              </label>
            ))}
          </div>
        </div>

        <FieldBlock htmlFor="extraNotes" label="Anything else">
          <Input
            id="extraNotes"
            maxLength={180}
            name="extraNotes"
            placeholder="Optional note for the reviewer."
          />
        </FieldBlock>

        <div className="flex flex-col gap-3 border-border border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            Next backend step: add a reviewed server action after Supabase
            insert policies and a project client pattern are confirmed.
          </p>
          <Button type="submit">Prepare review note</Button>
        </div>
      </form>

      {review ? (
        <div
          aria-live="polite"
          className="mt-6 rounded-lg border border-border bg-background p-4"
          data-testid="patwa-review-packet"
        >
          <p className="font-medium text-sm">
            Thank you for helping BEN.AI improve Jamaican Patwa / Jamaican
            Creole understanding with care.
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            This review note is ready to copy into the review process. It has
            not been saved.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm leading-6">
            {packetText}
          </pre>
        </div>
      ) : null}
    </section>
  );
}

function FieldBlock({
  children,
  description,
  htmlFor,
  label,
}: {
  children: ReactNode;
  description?: string;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {description ? (
        <p className="text-muted-foreground text-xs leading-5">{description}</p>
      ) : null}
    </div>
  );
}

function NativeSelect({
  children,
  id,
  name,
}: {
  children: ReactNode;
  id: string;
  name: string;
}) {
  return (
    <select
      className="h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      id={id}
      name={name}
    >
      {children}
    </select>
  );
}
