export default function PatwaTesterPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-2 text-sm font-medium text-muted-foreground">BEN.AI language testing</p>
        <h1 className="text-3xl font-semibold tracking-tight">Patwa tester</h1>
        <p className="mt-4 text-muted-foreground leading-7">
          Help BEN.AI understand Jamaican Patwa and Jamaican Creole with more care. Share a short original phrase, explain what it means, and tell us whether BEN.AI sounded natural.
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">What to test</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Meaning",
            "Translation",
            "Natural reply",
            "Tone",
            "Better wording",
            "Context",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-background p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Tester rules</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Use short original examples or your own wording.</li>
          <li>Do not paste songs, long transcripts, private messages, or anything you do not have permission to share.</li>
          <li>Focus on meaning, naturalness, tone, and respectful use.</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Manual test questions</h2>
        <div className="mt-4 space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">1.</strong> What short phrase or prompt should BEN.AI understand?</p>
          <p><strong className="text-foreground">2.</strong> What do you think it means in English?</p>
          <p><strong className="text-foreground">3.</strong> What should BEN.AI do with it: understand, translate, reply, or explain tone?</p>
          <p><strong className="text-foreground">4.</strong> Did BEN.AI understand correctly?</p>
          <p><strong className="text-foreground">5.</strong> Did BEN.AI sound natural, stiff, too literal, exaggerated, or wrong in tone?</p>
          <p><strong className="text-foreground">6.</strong> How would you say it better?</p>
          <p><strong className="text-foreground">7.</strong> What context matters: region, generation, Jamaica/diaspora, formal/casual, slang, or code-switching?</p>
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-border bg-muted/40 p-6">
        <h2 className="text-xl font-semibold">Status</h2>
        <p className="mt-3 text-muted-foreground leading-7">
          This is the first public-safe tester page. The next build step is a connected feedback form that saves responses for BEN.AI review.
        </p>
      </section>
    </main>
  );
}
