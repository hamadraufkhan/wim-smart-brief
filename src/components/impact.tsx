import { useEffect, useRef, useState, Fragment } from "react";
import { Clock, Leaf, Route, TrendingDown, Wrench, Zap } from "lucide-react";
import { CountUp } from "@/components/enforcement";
import { SectionHeader } from "@/components/site-chrome";

/* ---------------- Reveal-on-scroll hook ---------------- */

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/* ---------------- Impact stat band ---------------- */

const IMPACT_STATS = [
  { icon: Leaf, label: "CO₂ avoided · per corridor / yr", to: 11.2, decimals: 1, suffix: " kt" },
  { icon: Route, label: "Pavement life extension", to: 5.4, decimals: 1, suffix: " yr" },
  { icon: Wrench, label: "Maintenance spend reduced", to: 38, decimals: 0, suffix: "%" },
  { icon: TrendingDown, label: "Overloaded HGVs · after 12 mo", to: 4.1, decimals: 1, suffix: "%" },
];

function ImpactStats() {
  return (
    <div className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {IMPACT_STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="bg-background p-6">
            <span className="flex size-9 items-center justify-center border border-rule text-hivis">
              <Icon className="size-4" />
            </span>
            <p className="font-display mt-5 text-4xl text-foreground md:text-5xl">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Overload-rate trend (area + line) ---------------- */

const TREND = [
  { m: "M1", v: 18.4 },
  { m: "M2", v: 17.0 },
  { m: "M3", v: 15.6 },
  { m: "M4", v: 13.8 },
  { m: "M5", v: 12.1 },
  { m: "M6", v: 10.2 },
  { m: "M7", v: 8.9 },
  { m: "M8", v: 7.6 },
  { m: "M9", v: 6.4 },
  { m: "M10", v: 5.5 },
  { m: "M11", v: 4.7 },
  { m: "M12", v: 4.1 },
];

function OverloadTrend() {
  const { ref, shown } = useInView<HTMLDivElement>();
  const w = 100;
  const h = 60;
  const max = 20;
  const pts = TREND.map((d, i) => {
    const x = (i / (TREND.length - 1)) * w;
    const y = h - (d.v / max) * h;
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <div className="border border-rule bg-card p-6 lg:p-8">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="label-eyebrow">Overloaded HGVs on corridor</p>
          <p className="font-display mt-2 text-2xl text-foreground">
            18.4% → <span className="text-hivis">4.1%</span> in 12 months
          </p>
        </div>
        <span className="hidden font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
          Post-WIM enforcement
        </span>
      </div>

      <div ref={ref} className="relative mt-8">
        {/* y ticks */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[20, 10, 0].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-right font-mono-tight text-[9px] text-muted-foreground">
                {t}%
              </span>
              <span className="h-px flex-1 bg-rule/60" />
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="ml-10 h-48 w-[calc(100%-2.5rem)]"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-hivis)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-hivis)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={area}
            fill="url(#trendFill)"
            style={{ opacity: shown ? 1 : 0, transition: "opacity 1.1s ease 0.4s" }}
          />
          <polyline
            points={line}
            fill="none"
            stroke="var(--color-hivis)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={100}
            strokeDasharray={100}
            style={{
              strokeDashoffset: shown ? 0 : 100,
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </svg>
      </div>

      <div className="ml-10 mt-3 flex justify-between font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        <span>Month 1</span>
        <span>Month 6</span>
        <span>Month 12</span>
      </div>
    </div>
  );
}

/* ---------------- Pavement damage (4th-power law) ---------------- */

const AXLE_LOADS = [6, 8, 10, 12, 14];
const damageFor = (t: number) => Math.pow(t / 10, 4);

function PavementDamage() {
  const { ref, shown } = useInView<HTMLDivElement>();
  const max = damageFor(AXLE_LOADS[AXLE_LOADS.length - 1]);

  return (
    <div className="border border-rule bg-card p-6 lg:p-8">
      <p className="label-eyebrow">Relative pavement damage per axle</p>
      <p className="font-display mt-2 text-2xl text-foreground">
        The <span className="hivis-underline">4th-power law</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Damage rises with the 4th power of axle load — a 14 t axle wears the road
        roughly 30× as fast as a 6 t axle. Catching the heavy tail is where road life is won.
      </p>

      <div ref={ref} className="mt-8">
        <div className="flex h-44 items-end gap-3">
          {AXLE_LOADS.map((t, i) => {
            const dmg = damageFor(t);
            const over = t > 10;
            return (
              <div key={t} className="flex h-full flex-1 items-end">
                <div
                  className={`w-full ${over ? "bg-red-500" : "bg-hivis/80"}`}
                  style={{
                    height: `${(dmg / max) * 100}%`,
                    transformOrigin: "bottom",
                    transform: shown ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex gap-3">
          {AXLE_LOADS.map((t) => (
            <div key={t} className="flex-1 text-center">
              <p className={`font-mono-tight text-xs ${t > 10 ? "text-red-400" : "text-foreground"}`}>
                ×{damageFor(t).toFixed(2)}
              </p>
              <p className="font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
                {t} t
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Before / after comparison ---------------- */

type CompareMetric = {
  label: string;
  unit: string;
  before: number;
  after: number;
  note: string;
  betterIsLower: boolean;
};

const COMPARE: CompareMetric[] = [
  { label: "Resurfacing interval", unit: "yr", before: 8, after: 13, note: "+5 yr", betterIsLower: false },
  { label: "Annual maintenance cost", unit: "index", before: 100, after: 62, note: "−38%", betterIsLower: true },
  { label: "Corridor CO₂ footprint", unit: "kt / yr", before: 42, after: 30.8, note: "−11.2 kt", betterIsLower: true },
  { label: "Heavy-axle road wear", unit: "index", before: 100, after: 47, note: "−53%", betterIsLower: true },
];

function CompareBar({
  tag,
  value,
  unit,
  pct,
  shown,
  delay,
  hivis,
}: {
  tag: string;
  value: number;
  unit: string;
  pct: number;
  shown: boolean;
  delay: number;
  hivis?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        {tag}
      </span>
      <div className="h-3 flex-1 bg-concrete/50">
        <div
          className={hivis ? "h-full bg-hivis" : "h-full bg-foreground/35"}
          style={{
            width: shown ? `${pct}%` : "0%",
            transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
      </div>
      <span className="w-20 shrink-0 text-right font-mono-tight text-xs text-foreground">
        {value % 1 === 0 ? value : value.toFixed(1)}
        <span className="text-muted-foreground"> {unit}</span>
      </span>
    </div>
  );
}

function BeforeAfter() {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="border border-rule bg-card p-6 lg:p-8">
      <div className="flex items-baseline justify-between">
        <p className="label-eyebrow">Before vs after WIM enforcement</p>
        <div className="flex items-center gap-4 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 bg-foreground/35" /> Before
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 bg-hivis" /> After
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-7">
        {COMPARE.map((m, i) => {
          const scale = Math.max(m.before, m.after);
          return (
            <div key={m.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-foreground">{m.label}</span>
                <span className="border border-hivis px-2 py-0.5 font-mono-tight text-[10px] uppercase tracking-widest text-hivis">
                  {m.note}
                </span>
              </div>
              <div className="mt-3 grid gap-2">
                <CompareBar
                  tag="Before"
                  value={m.before}
                  unit={m.unit}
                  pct={(m.before / scale) * 100}
                  shown={shown}
                  delay={i * 120}
                />
                <CompareBar
                  tag="After"
                  value={m.after}
                  unit={m.unit}
                  pct={(m.after / scale) * 100}
                  shown={shown}
                  delay={i * 120 + 120}
                  hivis
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Traffic flow (dual-line throughput) ---------------- */

const FLOW_HOURS = [6, 8, 10, 12, 14, 16, 18, 20];
const FLOW_BEFORE = [1420, 1680, 1520, 1380, 1450, 1720, 1890, 1640];
const FLOW_AFTER = [1580, 1820, 1710, 1620, 1680, 1890, 2010, 1780];

function linePath(values: number[], w: number, h: number, max: number) {
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - (v / max) * h;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function TrafficFlow() {
  const { ref, shown } = useInView<HTMLDivElement>();
  const w = 100;
  const h = 60;
  const max = 2200;
  const beforeLine = linePath(FLOW_BEFORE, w, h, max);
  const afterLine = linePath(FLOW_AFTER, w, h, max);

  return (
    <div className="border border-rule bg-card p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-eyebrow">Corridor throughput · vehicles / hr / lane</p>
          <p className="font-display mt-2 text-2xl text-foreground">
            +<span className="text-hivis">12%</span> peak-hour flow
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center border border-rule text-hivis">
          <Zap className="size-4" />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 bg-foreground/35" /> Static-scale stops
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 bg-hivis" /> WIM pre-selection
        </span>
      </div>

      <div ref={ref} className="relative mt-6">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[2000, 1500, 1000].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-right font-mono-tight text-[9px] text-muted-foreground">
                {t}
              </span>
              <span className="h-px flex-1 bg-rule/60" />
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="ml-12 h-44 w-[calc(100%-3rem)]"
        >
          <polyline
            points={beforeLine}
            fill="none"
            stroke="var(--color-foreground)"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={100}
            strokeDasharray={100}
            style={{
              strokeDashoffset: shown ? 0 : 100,
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          <polyline
            points={afterLine}
            fill="none"
            stroke="var(--color-hivis)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={100}
            strokeDasharray={100}
            style={{
              strokeDashoffset: shown ? 0 : 100,
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          />
        </svg>
      </div>

      <div className="ml-12 mt-3 flex justify-between font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        {FLOW_HOURS.map((h) => (
          <span key={h}>{h}:00</span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-rule bg-rule">
        {[
          { k: "Peak flow", v: "2,010", u: "veh/hr" },
          { k: "Avg speed", v: "+8", u: "km/h" },
          { k: "Lane stops", v: "−94", u: "%" },
        ].map((m) => (
          <div key={m.k} className="bg-background px-4 py-3 text-center">
            <p className="font-display text-xl text-foreground">
              {m.v}
              <span className="text-sm text-muted-foreground"> {m.u}</span>
            </p>
            <p className="mt-1 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
              {m.k}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Congestion management (heatmap + metrics) ---------------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PEAK_HOURS = [7, 9, 11, 13, 15, 17, 19, 21];

/** Congestion index 0–1: before WIM (higher = worse) */
const HEAT_BEFORE: number[][] = [
  [0.72, 0.88, 0.65, 0.58, 0.62, 0.78, 0.91, 0.74],
  [0.68, 0.85, 0.61, 0.55, 0.59, 0.74, 0.88, 0.70],
  [0.70, 0.86, 0.63, 0.56, 0.60, 0.76, 0.90, 0.72],
  [0.69, 0.84, 0.62, 0.57, 0.61, 0.75, 0.89, 0.71],
  [0.74, 0.92, 0.68, 0.60, 0.64, 0.82, 0.95, 0.78],
  [0.45, 0.52, 0.48, 0.42, 0.44, 0.50, 0.55, 0.46],
  [0.38, 0.44, 0.40, 0.36, 0.38, 0.42, 0.48, 0.39],
];

/** After WIM pre-selection */
const HEAT_AFTER: number[][] = HEAT_BEFORE.map((row) =>
  row.map((v) => Math.max(0.08, v * 0.42)),
);

function heatColor(v: number, after: boolean) {
  if (after) {
    if (v < 0.25) return "bg-emerald-500/70";
    if (v < 0.45) return "bg-hivis/50";
    return "bg-hivis/80";
  }
  if (v < 0.5) return "bg-foreground/20";
  if (v < 0.75) return "bg-hivis/40";
  return "bg-red-500/70";
}

function CongestionHeatmap({
  data,
  label,
  after,
  shown,
  delay,
}: {
  data: number[][];
  label: string;
  after?: boolean;
  shown: boolean;
  delay: number;
}) {
  return (
    <div>
      <p className="mb-3 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="grid grid-cols-[2rem_repeat(8,1fr)] gap-1">
        <div />
        {PEAK_HOURS.map((h) => (
          <span
            key={h}
            className="text-center font-mono-tight text-[8px] uppercase tracking-widest text-muted-foreground"
          >
            {h}
          </span>
        ))}
        {data.map((row, di) => (
          <Fragment key={`${label}-row-${di}`}>
            <span className="flex items-center font-mono-tight text-[8px] uppercase tracking-widest text-muted-foreground">
              {DAYS[di]}
            </span>
            {row.map((v, hi) => (
              <div
                key={`${label}-${di}-${hi}`}
                className={`aspect-square ${heatColor(v, !!after)}`}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "scale(1)" : "scale(0.6)",
                  transition: `opacity 0.4s ease ${delay + (di * 8 + hi) * 18}ms, transform 0.4s ease ${delay + (di * 8 + hi) * 18}ms`,
                }}
                title={`${DAYS[di]} ${PEAK_HOURS[hi]}:00 — congestion ${(v * 100).toFixed(0)}%`}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function CongestionManagement() {
  const { ref, shown } = useInView<HTMLDivElement>();

  return (
    <div className="border border-rule bg-card p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-eyebrow">Congestion hours · peak corridor</p>
          <p className="font-display mt-2 text-2xl text-foreground">
            4.2 → <span className="text-hivis">1.6</span> hrs / day
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center border border-rule text-hivis">
          <Clock className="size-4" />
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Targeted pre-selection diverts only likely offenders — the mainline stays free-flow while queue spillback at static scales disappears.
      </p>

      <div ref={ref} className="mt-6 grid gap-6 md:grid-cols-2">
        <CongestionHeatmap data={HEAT_BEFORE} label="Before · static stops" shown={shown} delay={0} />
        <CongestionHeatmap data={HEAT_AFTER} label="After · WIM pre-selection" after shown={shown} delay={200} />
      </div>

      <div className="mt-4 flex items-center justify-between font-mono-tight text-[8px] uppercase tracking-widest text-muted-foreground">
        <span>Low density</span>
        <div className="flex gap-1">
          <span className="size-3 bg-foreground/20" />
          <span className="size-3 bg-hivis/50" />
          <span className="size-3 bg-red-500/70" />
        </div>
        <span>High congestion</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-4">
        {[
          { k: "Queue length", v: "280→45", u: "m" },
          { k: "Avg delay", v: "−18", u: "min" },
          { k: "Spillback events", v: "−72", u: "%" },
          { k: "Diversion rate", v: "12", u: "%" },
        ].map((m) => (
          <div key={m.k} className="bg-background px-3 py-3 text-center">
            <p className="font-display text-lg text-foreground">
              {m.v}
              <span className="text-xs text-muted-foreground"> {m.u}</span>
            </p>
            <p className="mt-1 font-mono-tight text-[8px] uppercase tracking-widest text-muted-foreground">
              {m.k}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Impact section ---------------- */

export function ImpactSection() {
  return (
    <section id="impact" className="deck-anchor rule-top rule-bottom bg-concrete/40">
      <div className="impact-anim mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeader
          eyebrow="§ Impact · Roads & environment"
          title={
            <>
              Lighter roads, <em className="italic hivis-underline">longer life</em>, lower emissions.
            </>
          }
          intro="Enforcing axle limits does more than issue tickets — it protects the pavement, stretches maintenance budgets, cuts emissions from premature road works, and keeps traffic moving with fewer stops, shorter queues, and smoother corridor flow."
        />

        <div className="mt-12">
          <ImpactStats />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <OverloadTrend />
          <PavementDamage />
        </div>

        <div className="mt-6">
          <BeforeAfter />
        </div>

        <div className="mt-16">
          <p className="label-eyebrow">§ Traffic flow & congestion management</p>
          <p className="font-display mt-3 max-w-3xl text-2xl leading-tight text-foreground md:text-3xl">
            Free-flow weighing removes <em className="italic hivis-underline">bottlenecks</em> — traffic keeps moving while overloads are caught in the background.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Pre-selection replaces random static-scale stops with targeted diversion. Lane throughput rises, queue lengths fall, and peak-hour congestion hours shrink across the corridor.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <TrafficFlow />
          <CongestionManagement />
        </div>
      </div>
    </section>
  );
}
