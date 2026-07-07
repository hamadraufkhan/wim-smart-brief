import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: "Performance & Calibration — Axle//WIM" },
      {
        name: "description",
        content:
          "COST-323 accuracy classes, calibration methodology, KPI targets and QA/QC for high-speed WIM systems.",
      },
      { property: "og:title", content: "Performance & Calibration — Axle//WIM" },
      {
        property: "og:description",
        content:
          "How we measure — and keep measuring — HS-WIM accuracy, repeatability and availability in the field.",
      },
    ],
  }),
  component: PerformancePage,
});

const CLASSES = [
  { code: "A", pct: "±5%", use: "Legal metrology / low-speed direct enforcement", w: "22%" },
  { code: "B+", pct: "±7%", use: "Enforcement pre-selection, bridge loading", w: "32%" },
  { code: "B",  pct: "±10%", use: "Statistical infrastructure / research", w: "45%" },
  { code: "C",  pct: "±15%", use: "Traffic classification, flow analytics", w: "65%" },
  { code: "D",  pct: "±25%", use: "Trend monitoring only", w: "100%" },
];

const KPIS = [
  { k: "Accuracy (2σ GVW)", v: "±7% · Class B+" },
  { k: "Repeatability", v: "σ < 2.4% on ref. truck" },
  { k: "Detection rate", v: "≥ 99.5% at 15–130 km/h" },
  { k: "Classification", v: "≥ 97% by EU R1" },
  { k: "Availability", v: "99.4% / 365 d" },
  { k: "MTBC drift", v: "> 90 days" },
];

function PerformancePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-20">
        <p className="label-eyebrow">§ Chapter 03</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] text-foreground md:text-8xl">
          Accuracy is <em className="italic hivis-underline">a maintained state</em>,
          not a spec sheet.
        </h1>
      </section>

      <section className="rule-top rule-bottom bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeader
            eyebrow="§ COST-323 accuracy classes"
            title={<>Pick the class the <em className="italic">use case</em> requires.</>}
            intro="Wider classes are cheaper and more forgiving of site conditions; tighter classes demand pavement quality, calibration discipline, and often low-speed geometry."
          />
          <div className="mt-12 border border-rule bg-background">
            <div className="grid grid-cols-12 gap-4 rule-bottom px-6 py-3 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
              <div className="col-span-2">Class</div>
              <div className="col-span-2">GVW 2σ</div>
              <div className="col-span-6">Typical use</div>
              <div className="col-span-2 text-right">Tolerance</div>
            </div>
            {CLASSES.map((c) => (
              <div
                key={c.code}
                className="grid grid-cols-12 items-center gap-4 rule-bottom px-6 py-5"
              >
                <div className="col-span-2 font-display text-3xl text-foreground">
                  {c.code}
                </div>
                <div className="col-span-2 font-mono-tight text-sm text-hivis">
                  {c.pct}
                </div>
                <div className="col-span-6 text-sm text-foreground/80">{c.use}</div>
                <div className="col-span-2">
                  <div className="ml-auto h-2 w-full max-w-[140px] bg-concrete">
                    <div className="h-full bg-hivis" style={{ width: c.w }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="§ KPIs (System 04, ref. site)"
              title={<>What a healthy <em className="italic">HS-WIM</em> looks like.</>}
              intro="Field values from a four-lane quartz-piezo installation, 24-month rolling window."
            />
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {KPIS.map((k) => (
                <div key={k.k} className="bg-background p-6">
                  <p className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k.k}
                  </p>
                  <p className="font-display mt-3 text-3xl text-foreground">{k.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rule-top bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <SectionHeader
            eyebrow="§ Calibration methodology"
            title={<>Three <em className="italic hivis-underline">loops</em> keep the system honest.</>}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "Loop A",
                t: "Initial calibration",
                d: "Pre-weighed reference trucks driven at multiple speeds and loads. Establishes the transfer function per lane, per sensor.",
              },
              {
                n: "Loop B",
                t: "Auto-calibration",
                d: "Rolling window of the most common tractor steering-axle weights. The estimator drifts back to spec continuously, without site visits.",
              },
              {
                n: "Loop C",
                t: "Blind validation",
                d: "Unannounced reference passes on a monthly cadence. Error distributions reviewed against the declared accuracy class.",
              },
            ].map((c) => (
              <div key={c.n} className="border border-rule bg-card p-8">
                <span className="font-mono-tight text-xs text-hivis">{c.n}</span>
                <h3 className="font-display mt-4 text-3xl text-foreground">
                  {c.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}