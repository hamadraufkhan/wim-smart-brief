import { useState, type FormEvent } from "react";
import { SectionHeader, DataRow } from "@/components/site-chrome";

/* ================= Technology ================= */

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

export function TechnologySection() {
  return (
    <section id="technology" className="deck-anchor rule-top rule-bottom bg-concrete/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ Technology · Sensor stack"
          title={
            <>
              Four families. <em className="italic">One decision.</em>
            </>
          }
          intro="Choice is driven by required accuracy class, pavement condition, expected axle count per year, and lifecycle budget — not by sensor fashion."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2">
          {SENSORS.map((s) => (
            <article key={s.code} className="bg-background p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono-tight text-xs text-hivis">SENSOR · {s.code}</span>
                <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                  Cost {s.cost}
                </span>
              </div>
              <h3 className="font-display mt-4 text-3xl text-foreground">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-6">
                <DataRow k="Accuracy" v={s.class} />
                <DataRow k="Service life" v={s.life} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Performance ================= */

const CLASSES = [
  { code: "A", pct: "±5%", use: "Legal metrology / low-speed direct enforcement", w: "22%" },
  { code: "B+", pct: "±7%", use: "Enforcement pre-selection, bridge loading", w: "32%" },
  { code: "B", pct: "±10%", use: "Statistical infrastructure / research", w: "45%" },
  { code: "C", pct: "±15%", use: "Traffic classification, flow analytics", w: "65%" },
  { code: "D", pct: "±25%", use: "Trend monitoring only", w: "100%" },
];

const KPIS = [
  { k: "Accuracy (2σ GVW)", v: "±7% · Class B+" },
  { k: "Repeatability", v: "σ < 2.4% on ref. truck" },
  { k: "Detection rate", v: "≥ 99.5% at 15–130 km/h" },
  { k: "Classification", v: "≥ 97% by EU R1" },
  { k: "Availability", v: "99.4% / 365 d" },
  { k: "MTBC drift", v: "> 90 days" },
];

export function PerformanceSection() {
  return (
    <section id="performance" className="deck-anchor mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeader
        eyebrow="§ Performance · COST-323 classes"
        title={
          <>
            Pick the class the <em className="italic hivis-underline">use case</em> requires.
          </>
        }
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
          <div key={c.code} className="grid grid-cols-12 items-center gap-4 rule-bottom px-6 py-5">
            <div className="col-span-2 font-display text-3xl text-foreground">{c.code}</div>
            <div className="col-span-2 font-mono-tight text-sm text-hivis">{c.pct}</div>
            <div className="col-span-6 text-sm text-foreground/80">{c.use}</div>
            <div className="col-span-2">
              <div className="ml-auto h-2 w-full max-w-[140px] bg-concrete">
                <div className="h-full bg-hivis" style={{ width: c.w }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeader
            eyebrow="§ KPIs (System 04, ref. site)"
            title={
              <>
                What a healthy <em className="italic">HS-WIM</em> looks like.
              </>
            }
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
  );
}

/* ================= Deployment ================= */

const SITE_REQS = [
  { t: "Pavement", d: "Rigid or high-modulus asphalt in sound condition. No rutting > 4 mm. Smooth 30 m approach and 15 m departure." },
  { t: "Geometry", d: "Straight, level lane. Longitudinal grade < 1%, cross-slope < 2%. No braking or acceleration zone within 200 m." },
  { t: "Environment", d: "Temperature-compensated. Freeze-thaw resistant sealing. Drainage away from sensor slot. Salt-tolerant hardware." },
  { t: "Power & backhaul", d: "Redundant supply with UPS. 4G/5G primary, fiber where available. Time-sync to GNSS or PTP for evidence chain." },
  { t: "Maintenance", d: "Annual manual calibration. Sensor life 5–15 yr depending on class. Enclosure servicing on 6-month cadence." },
  { t: "Privacy", d: "ANPR retention windows configurable. Purpose limitation and pseudonymization by default. GDPR-aware pipeline." },
];

const TCO = [
  ["Sensor hardware & install", 34],
  ["Civil works & pavement", 22],
  ["Roadside cabinet & comms", 12],
  ["Calibration & QA (10 yr)", 14],
  ["Data platform & operations", 12],
  ["Contingency", 6],
] as const;

export function DeploymentSection() {
  return (
    <section id="deployment" className="deck-anchor rule-top rule-bottom bg-concrete/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ Deployment · Site requirements"
          title={
            <>
              A cheap sensor on <em className="italic hivis-underline">bad pavement</em> is the most expensive option.
            </>
          }
          intro="Site selection accounts for roughly 70% of long-run system performance. Before we choose a sensor, we characterize the road."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
          {SITE_REQS.map((c) => (
            <div key={c.t} className="bg-background p-8">
              <p className="label-eyebrow">{c.t}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="§ Total cost of ownership"
              title={
                <>
                  Budget the <em className="italic hivis-underline">decade</em>, not the capex.
                </>
              }
              intro="Sensors are ~30–40% of TCO. Pavement rehabilitation, calibration campaigns, and data operations dominate the rest."
            />
          </div>
          <div className="md:col-span-7">
            <div className="border border-rule bg-card p-8">
              {TCO.map(([label, pct]) => (
                <div key={label} className="mb-5">
                  <div className="flex items-baseline justify-between font-mono-tight text-xs">
                    <span className="uppercase tracking-widest text-muted-foreground">{label}</span>
                    <span className="text-foreground">{pct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-concrete">
                    <div className="h-full bg-hivis" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <p className="mt-6 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                Indicative 10-year TCO for a 4-lane enforcement-pre-selection site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Contact ================= */

export function ContactSection() {
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
    <section id="contact" className="deck-anchor rule-top bg-concrete/40">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeader
            eyebrow="§ Contact"
            title={
              <>
                Tell us about the <em className="italic hivis-underline">corridor</em>.
              </>
            }
            intro="Route, average daily heavy-vehicle count, current enforcement setup, and what you want to know. We'll come back with a 10-day plan."
          />
          <p className="mt-10 label-eyebrow">Field engineering</p>
          <p className="font-display mt-2 text-2xl text-foreground">field@axle-wim.example</p>
          <p className="mt-6 label-eyebrow">Procurement</p>
          <p className="font-display mt-2 text-2xl text-foreground">tenders@axle-wim.example</p>
        </div>

        <form className="md:col-span-7" onSubmit={handleSubmit}>
          <div className="border border-rule bg-background p-8">
            {sent ? (
              <div className="motion-fade-up py-16 text-center">
                <p className="label-eyebrow">Received</p>
                <p className="font-display mt-4 text-4xl text-foreground">
                  Thank you.{" "}
                  <span className="hivis-underline">We'll reply within 2 working days.</span>
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <ContactField label="Name" name="name" />
                  <ContactField label="Organisation" name="org" />
                  <ContactField label="Email" name="email" type="email" />
                  <ContactField label="Country / region" name="region" />
                </div>
                <div className="mt-6">
                  <label className="label-eyebrow block">Corridor / project brief</label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full border border-rule bg-background px-4 py-3 font-mono-tight text-sm text-foreground placeholder:text-muted-foreground focus:border-hivis focus:outline-none"
                    placeholder="e.g. 4-lane motorway, ~14,000 HGV/day, need overweight pre-selection + e-challan into an existing back office…"
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
  );
}

function ContactField({
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
