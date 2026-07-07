import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/deployment")({
  head: () => ({
    meta: [
      { title: "Deployment & Site Requirements — Axle//WIM" },
      {
        name: "description",
        content:
          "Pavement, geometry, environment, maintenance, privacy and TCO considerations for HS-WIM sites.",
      },
      { property: "og:title", content: "Deployment & Site Requirements — Axle//WIM" },
      {
        property: "og:description",
        content:
          "Site selection is 70% of the outcome. Here is what a good HS-WIM site looks like.",
      },
    ],
  }),
  component: DeploymentPage,
});

function DeploymentPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-20">
        <p className="label-eyebrow">§ Chapter 04</p>
        <h1 className="font-display mt-4 max-w-5xl text-5xl leading-[1.02] text-foreground md:text-8xl">
          A cheap sensor on <em className="italic hivis-underline">bad pavement</em>
          <br />
          is the most expensive option.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Site selection accounts for roughly 70% of long-run system performance.
          Before we choose a sensor, we characterize the road.
        </p>
      </section>

      <section className="rule-top rule-bottom bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeader
            eyebrow="§ Site requirements"
            title="What a good HS-WIM site looks like."
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
            {[
              {
                t: "Pavement",
                d: "Rigid or high-modulus asphalt in sound condition. No rutting > 4 mm. Smooth 30 m approach and 15 m departure.",
              },
              {
                t: "Geometry",
                d: "Straight, level lane. Longitudinal grade < 1%, cross-slope < 2%. No braking or acceleration zone within 200 m.",
              },
              {
                t: "Environment",
                d: "Temperature-compensated. Freeze-thaw resistant sealing. Drainage away from sensor slot. Salt-tolerant hardware.",
              },
              {
                t: "Power & backhaul",
                d: "Redundant supply with UPS. 4G/5G primary, fiber where available. Time-sync to GNSS or PTP for evidence chain.",
              },
              {
                t: "Maintenance",
                d: "Annual manual calibration. Sensor life 5–15 yr depending on class. Enclosure servicing on 6-month cadence.",
              },
              {
                t: "Privacy",
                d: "ANPR retention windows configurable. Purpose limitation and pseudonymization by default. GDPR-aware pipeline.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-background p-8">
                <p className="label-eyebrow">{c.t}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="§ Total cost of ownership"
              title={<>Budget the <em className="italic hivis-underline">decade</em>, not the capex.</>}
              intro="Sensors are ~30–40% of TCO. Pavement rehabilitation, calibration campaigns, and data operations dominate the rest."
            />
          </div>
          <div className="md:col-span-7">
            <div className="border border-rule bg-card p-8">
              {[
                ["Sensor hardware & install", 34],
                ["Civil works & pavement", 22],
                ["Roadside cabinet & comms", 12],
                ["Calibration & QA (10 yr)", 14],
                ["Data platform & operations", 12],
                ["Contingency", 6],
              ].map(([label, pct]) => (
                <div key={label as string} className="mb-5">
                  <div className="flex items-baseline justify-between font-mono-tight text-xs">
                    <span className="uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-foreground">{pct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-concrete">
                    <div
                      className="h-full bg-hivis"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="mt-6 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                Indicative 10-year TCO for a 4-lane enforcement-pre-selection site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rule-top bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <SectionHeader
            eyebrow="§ Risk register"
            title={<>What we <em className="italic">watch</em>.</>}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              ["Pavement rutting & bounce", "Highest single-source error contributor. Mitigated by site selection + resurfacing schedule."],
              ["Sensor drift & temperature", "Managed by continuous auto-calibration and thermal compensation."],
              ["Legal admissibility", "Varies by jurisdiction. We ship signed records + metrology traceability documentation."],
              ["Cyber & data governance", "Hardened cabinets, mTLS backhaul, role-based access, retention policies."],
            ].map(([t, d]) => (
              <div key={t} className="border border-rule bg-card p-8">
                <p className="font-display text-2xl text-foreground">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}