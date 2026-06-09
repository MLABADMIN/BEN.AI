import { PatwaFeedbackForm } from "./patwa-feedback-form";

const focusAreas = [
  "Meaning",
  "Translation",
  "Natural reply",
  "Tone",
  "Better wording",
  "Context",
];

export default function PatwaTesterPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          BEN.AI language testing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Patwa feedback tester
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-7">
          Help BEN.AI handle Jamaican Patwa and Jamaican Creole with more care.
          Share a short original phrase, explain what it means, and note whether
          the response felt natural, respectful, and useful.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium"
          >
            {item}
          </div>
        ))}
      </section>

      <PatwaFeedbackForm />
    </main>
  );
}
