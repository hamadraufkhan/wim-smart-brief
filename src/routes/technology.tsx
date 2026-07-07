import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader, DataRow } from "@/components/site-chrome";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Axle//WIM" },
      {
        name: "description",
        content:
          "Sensor stack, signal chain, and system architecture behind high-speed Weigh-In-Motion: quartz-piezo, bending plate, load cell, fiber-optic.",
      },
      { property: "og:title", content: "Technology — Axle//WIM" },
      {
        property: "og:description",
        content:
          "How high-speed Weigh-In-Motion actually works: sensors, fusion, edge processing, calibration.",
      },
    ],
  }),
  component: TechnologyPage,
});

const SENSORS = [
  {
    code: "QP",
    name: "Quartz piezoelectric",
    class: "B+ (±7%)",
    life: "10+ yr",
    cost: "$$$",
    body: "Thin strip embedded in a slot cut into the wearing course. Charge output linear over a wide temperature range. Dominant choice for new HS-WIM installs.",
  },
  {
    code: "BP",
    name: "Bending plate",
    class: "B (±10%)",
    life: "7–10 yr",
    cost: "$$",
    body: "Steel plate with strain gauges, mounted in a shallow frame flush with pavement. Robust, well understood, common across North American installations.",
  },
  {
    code: "LC",
    name: "Load cell",
    class: "B+ / A (±5–7%)",
    life: "15+ yr",
    cost: "$$$$",
    body: "Hydraulic or strain-gauge cells beneath a rigid frame. Highest accuracy class, largest civil footprint. Reserved for enforcement-grade low-speed WIM.",
  },
  {
    code: "FO",
    name: "Fiber-optic / MEMS",
    class: "B (emerging)",
    life: "15+ yr",
    cost: "$$$",
    body: "Immune to EMI, no active roadside electronics in the sensor. Emerging class — attractive for tunnels, long linear arrays, and bridge instrumentation.",
  },
];

function TechnologyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-20">
        <p className="label-eyebrow">§ Chapter 02</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] text-foreground md:text-8xl">
          The sensor is <em className="italic hivis-underline">a hypothesis</em>.
          <br />
          The system is the proof.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          A wheel pass takes 3–8 milliseconds. In that window we sample, fuse,
          classify, and estimate — then hand the result to a signed pipeline.
        </p>
      </section>

      <section className="rule-top rule-bottom bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeader
            eyebrow="§ Sensor stack"
            title={<>Four families. <em className="italic">One decision.</em></>}
            intro="Choice is driven by required accuracy class, pavement condition, expected axle count per year, and lifecycle budget — not by sensor fashion."
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2">
            {SENSORS.map((s) => (
              <article key={s.code} className="bg-background p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tight text-xs text-hivis">
                    SENSOR · {s.code}
                  </span>
                  <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                    Cost {s.cost}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-3xl text-foreground">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <div className="mt-6">
                  <DataRow k="Accuracy" v={s.class} />
                  <DataRow k="Service life" v={s.life} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ Signal chain"
          title={<>From <em className="italic hivis-underline">picocoulombs</em> to a signed weight record.</>}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="border border-rule bg-card p-8">
            <p className="label-eyebrow">Edge (roadside cabinet)</p>
            <ul className="mt-6 space-y-4 text-sm text-foreground/85">
              {[
                "Charge amplifier per channel; temperature compensation on-die",
                "10 kHz ADC, hardware-timed to loop crossings",
                "Per-axle peak detection and outlier rejection",
                "Vehicle classification (EU R1 · FHWA · custom)",
                "First-pass GVW estimator, watermarked & buffered",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-hivis" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-rule bg-card p-8">
            <p className="label-eyebrow">Central platform</p>
            <ul className="mt-6 space-y-4 text-sm text-foreground/85">
              {[
                "Rolling auto-calibration against steering-axle populations",
                "Statistical QC — drift, seasonal & pavement-modulus effects",
                "ANPR fusion, vehicle-registry lookup, chain-of-evidence log",
                "Operator dashboards, alerting, enforcement queue export",
                "Open APIs: per-vehicle records, aggregates, load spectra",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-hivis" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}