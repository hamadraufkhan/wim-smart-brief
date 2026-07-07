import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/motion";
import { WimLiveScene, SystemGallery, FeatureGrid } from "@/components/wim-scene";
import { EnforcementSection } from "@/components/enforcement";
import {
  TechnologySection,
  PerformanceSection,
  DeploymentSection,
  ContactSection,
} from "@/components/deck-sections";
import { PageShell, SectionHeader, DataRow } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <TickerBar />
      <Principles />
      <LiveSystem />
      <TechnologySection />
      <Pipeline />
      <Features />
      <Enforcement />
      <PerformanceSection />
      <Applications />
      <DeploymentSection />
      <ContactSection />
    </PageShell>
  );
}

function Hero() {
  return (
    <section id="top" className="deck-anchor relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="scanlines absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-8">
          <p className="label-eyebrow motion-fade-up motion-stagger-1">
            Bulletin · Vol. 12 / Highway Instrumentation
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[0.98] tracking-tight text-foreground motion-fade-up motion-stagger-2 md:text-[7rem]">
            Weighing <span className="italic hivis-underline">every axle</span>
            <br />
            at 120 km/h.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground motion-fade-up motion-stagger-3 md:text-xl">
            High-Speed Weigh-In-Motion systems infer static axle load from a
            millisecond of dynamic force. We build the sensors, the signal
            chain, and the calibration discipline that turn that inference
            into legally defensible data.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 motion-fade-up motion-stagger-4">
            <a
              href="#enforcement"
              className="group inline-flex items-center gap-2 bg-hivis px-6 py-3 font-mono-tight text-xs uppercase tracking-widest text-hivis-foreground transition-[transform,filter] duration-200 motion-safe:hover:brightness-110 motion-safe:active:scale-[0.98]"
            >
              See enforcement in action{" "}
              <span
                aria-hidden
                className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#technology"
              className="group inline-flex items-center gap-2 border border-rule px-6 py-3 font-mono-tight text-xs uppercase tracking-widest text-foreground transition-[color,border-color,transform] duration-200 motion-safe:hover:-translate-y-px hover:border-hivis hover:text-hivis"
            >
              Inspect the sensor stack
            </a>
          </div>
        </div>
        <FadeIn className="md:col-span-4" delay={200}>
          <div className="border border-rule bg-card p-6">
            <p className="label-eyebrow">Live spec sheet</p>
            <p className="font-display mt-2 text-2xl text-foreground">
              System 04 · Quartz-piezo, 4-lane
            </p>
            <div className="mt-6">
              <DataRow k="Speed range" v="15 – 130 km/h" />
              <DataRow k="Accuracy (GVW)" v="±7% · Class B+" />
              <DataRow k="Sensors / lane" v="4 × QP-Strip" />
              <DataRow k="Sampling" v="10 kHz / ch" />
              <DataRow k="Uptime (365d)" v="99.4%" />
              <DataRow k="Auto-cal window" v="24h rolling" />
            </div>
            <div className="diag-stripes mt-6 h-2 w-full opacity-80" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TickerBar() {
  const items = [
    "4th-power law · one 40t truck ≈ 10,000 cars of pavement damage",
    "COST-323 accuracy classes A(5) → D+(20)",
    "OIML R134 · automatic road-vehicle weighing",
    "Bridge-WIM · use the structure as the scale",
    "Pre-selection hit rate: 15% → 78% at static scales",
  ];
  return (
    <div className="rule-top rule-bottom overflow-hidden bg-concrete/60">
      <div className="flex gap-12 whitespace-nowrap px-6 py-3 font-mono-tight text-[11px] uppercase tracking-widest text-foreground/70 motion-safe:animate-[scroll_45s_linear_infinite] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:whitespace-normal">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-hivis">◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LiveSystem() {
  return (
    <section id="live" className="deck-anchor mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeader
        eyebrow="§ Live · Sense → transmit"
        title={
          <>
            Every truck that passes <em className="italic hivis-underline">writes a record</em>.
          </>
        }
        intro="Vehicles cross the in-road sensors at highway speed; each axle-pass is measured, reconstructed into a weight, and streamed to the control room in real time."
      />
      <div className="mt-12">
        <WimLiveScene />
      </div>
      <SystemGallery />
    </section>
  );
}

function Features() {
  return (
    <section id="capabilities" className="deck-anchor rule-top rule-bottom bg-concrete/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ Capabilities"
          title={
            <>
              From basic counting to <em className="italic hivis-underline">enforcement-grade</em> analytics.
            </>
          }
          intro="One instrument stack, scaled across three capability tiers — deploy what the corridor needs today and switch on the rest later."
        />
        <FeatureGrid />
      </div>
    </section>
  );
}

function Enforcement() {
  return (
    <section id="enforcement" className="deck-anchor mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeader
        eyebrow="§ Enforcement · Overweight → e-ticket"
        title={
          <>
            An overweight axle becomes a <em className="italic hivis-underline">signed ticket</em> before the truck clears the bridge.
          </>
        }
        intro="When measured load exceeds the permitted limit, the system captures the plate, builds an evidence package, auto-generates an e-ticket, and dispatches it to the owner and enforcement — end to end, in under a second."
      />
      <EnforcementSection />
    </section>
  );
}

function Principles() {
  const cards = [
    {
      n: "01",
      title: "Dynamic force, static answer",
      body: "Every wheel-pass is a millisecond of force applied to a sensor embedded in the pavement. The system reconstructs the equivalent static axle load from that transient — accounting for suspension bounce, tire imprint and speed.",
    },
    {
      n: "02",
      title: "Fusion beats any single sensor",
      body: "Two or more staggered weight sensors, inductive loops for speed and class, and axle detectors are fused per vehicle. Redundancy cancels oscillation noise; loops constrain the geometry the estimator needs.",
    },
    {
      n: "03",
      title: "Calibration is a process, not an event",
      body: "Initial calibration with pre-weighed trucks gets you to spec. Continuous auto-calibration on steering-axle populations keeps you there between service visits. Everything is versioned and traceable.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeader
        eyebrow="§ 01 — Principles"
        title={
          <>
            Three ideas do <em className="italic hivis-underline">most of the work</em>.
          </>
        }
        intro="Everything else — enclosures, backhaul, dashboards — is downstream of these."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <FadeIn key={c.n} delay={i * 80}>
            <article className="group relative flex h-full flex-col border border-rule bg-card p-8 transition-[border-color] duration-200 hover:border-hivis">
              <span className="font-mono-tight text-xs text-hivis">{c.n}</span>
              <h3 className="font-display mt-6 text-3xl leading-tight text-foreground">
                {c.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <div className="mt-8 h-px w-12 bg-hivis transition-[width] duration-300 motion-safe:group-hover:w-24" />
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  const stages = [
    ["Sensing", "Pavement-embedded piezo / bending-plate / load-cell array"],
    ["Conditioning", "Charge amplification, temperature comp., 10 kHz ADC"],
    ["Detection", "Per-axle peak extraction, outlier rejection"],
    ["Classification", "Axle count & spacing, EU R1 / FHWA vehicle class"],
    ["Estimation", "GVW & per-axle load, corrected for speed & pavement"],
    ["Reporting", "Signed records, APIs, ANPR match, enforcement queue"],
  ];
  return (
    <section className="rule-top rule-bottom bg-concrete/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ 02 — Data pipeline"
          title={
            <>
              From a wheel pass to a <em className="italic hivis-underline">signed record</em> in 400 ms.
            </>
          }
          intro="Six stages, each with its own QA. Every record is traceable end-to-end."
        />
        <ol className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-6">
          {stages.map(([name, desc], i) => (
            <li
              key={name}
              className="relative flex flex-col justify-between bg-background p-6 md:min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tight text-xs text-hivis">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                  Stage
                </span>
              </div>
              <div>
                <p className="font-display text-2xl text-foreground">{name}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Applications() {
  const items = [
    {
      tag: "Enforcement",
      title: "Pre-selection of overweight vehicles",
      body: "Screen the mainline flow, flag likely offenders to a downstream static scale. Static-scale hit rates rise from ~15% to 60–80%.",
    },
    {
      tag: "Asset mgmt.",
      title: "Load spectra for pavement & bridges",
      body: "Ground-truth axle-load distributions feed pavement remaining-life models and bridge rating updates.",
    },
    {
      tag: "Analytics",
      title: "Corridor freight intelligence",
      body: "Origin-destination freight profiles, modal-shift evidence, real-time congestion attribution by vehicle class.",
    },
    {
      tag: "Bridge-WIM",
      title: "The bridge is the scale",
      body: "Instrument the structure instead of the pavement — non-intrusive to traffic and fast to deploy on legacy assets.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeader
        eyebrow="§ 03 — Applications"
        title={
          <>
            One instrument, <em className="italic">four operating modes</em>.
          </>
        }
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <article
            key={it.title}
            className="flex flex-col justify-between border border-rule bg-card p-8 md:min-h-[260px]"
          >
            <div className="flex items-center justify-between">
              <span className="border border-hivis px-2 py-1 font-mono-tight text-[10px] uppercase tracking-widest text-hivis">
                {it.tag}
              </span>
              <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                use case
              </span>
            </div>
            <div className="mt-8">
              <h3 className="font-display text-3xl leading-tight text-foreground">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {it.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

