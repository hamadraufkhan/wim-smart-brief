import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Axle//WIM" },
      {
        name: "description",
        content:
          "Request a site survey, deployment brief, or partnership discussion with Axle//WIM.",
      },
      { property: "og:title", content: "Contact — Axle//WIM" },
      {
        property: "og:description",
        content: "Talk to our field engineering team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-20">
        <p className="label-eyebrow">§ Chapter 05</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] text-foreground md:text-8xl">
          Tell us about the <em className="italic hivis-underline">corridor</em>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Route, average daily heavy-vehicle count, current enforcement setup,
          and what you want to know. We'll come back with a 10-day plan.
        </p>
      </section>

      <section className="rule-top bg-concrete/40">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label-eyebrow">Field engineering</p>
            <p className="font-display mt-4 text-3xl text-foreground">
              field@axle-wim.example
            </p>
            <p className="mt-8 label-eyebrow">Procurement</p>
            <p className="font-display mt-4 text-3xl text-foreground">
              tenders@axle-wim.example
            </p>
            <p className="mt-12 label-eyebrow">Regions</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              <li>◤ EU — Rotterdam engineering HQ</li>
              <li>◤ UK & IE — Manchester field ops</li>
              <li>◤ MENA — Dubai partner network</li>
            </ul>
          </div>

          <form className="md:col-span-7" onSubmit={handleSubmit}>
            <div className="border border-rule bg-background p-8">
              {sent ? (
                <div className="motion-fade-up py-16 text-center">
                  <p className="label-eyebrow">Received</p>
                  <p className="font-display mt-4 text-4xl text-foreground">
                    Thank you. <span className="hivis-underline">We'll reply within 2 working days.</span>
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Name" name="name" />
                    <Field label="Organisation" name="org" />
                    <Field label="Email" name="email" type="email" />
                    <Field label="Country / region" name="region" />
                  </div>
                  <div className="mt-6">
                    <label className="label-eyebrow block">
                      Corridor / project brief
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="mt-2 w-full border border-rule bg-background px-4 py-3 font-mono-tight text-sm text-foreground placeholder:text-muted-foreground focus:border-hivis focus:outline-none"
                      placeholder="e.g. 4-lane motorway, ~14,000 HGV/day, need pre-selection into an existing static scale…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-8 inline-flex items-center gap-2 bg-hivis px-6 py-3 font-mono-tight text-xs uppercase tracking-widest text-hivis-foreground transition-[transform,filter,opacity] duration-200 motion-safe:hover:brightness-110 motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        Sending
                        <span className="motion-safe:animate-pulse" aria-hidden>
                          …
                        </span>
                      </>
                    ) : (
                      <>
                        Send brief <span aria-hidden>→</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="label-eyebrow block" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border border-rule bg-background px-4 py-3 font-mono-tight text-sm text-foreground focus:border-hivis focus:outline-none"
      />
    </div>
  );
}