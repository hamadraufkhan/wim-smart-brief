import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AlertTriangle,
  Camera,
  FileText,
  Radio,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";

/* ---------------- Count-up (animates on scroll into view) ---------------- */

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------------- Stat band ---------------- */

const STATS = [
  { label: "Overweight flags · today", to: 1284, decimals: 0 },
  { label: "E-challans issued · MTD", to: 8432, decimals: 0 },
  { label: "Fine recovery rate", to: 78.4, decimals: 1, suffix: "%" },
  { label: "Detect → challan", to: 812, decimals: 0, suffix: " ms" },
];

export function StatBand() {
  return (
    <div className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-background p-6">
          <p className="font-display text-4xl text-foreground md:text-5xl">
            <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
          </p>
          <p className="mt-2 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Violation data ---------------- */

type Violation = {
  id: string;
  plate: string;
  lane: string;
  cls: string;
  gvw: number;
  limit: number;
  speed: number;
  fine: string;
  location: string;
  time: string;
  axles: number[];
};

const AXLE_LIMIT = 10; // tonnes per-axle reference line

const VIOLATIONS: Violation[] = [
  { id: "WIM-2026-004821", plate: "LES 4471", lane: "02", cls: "5-axle artic", gvw: 44.1, limit: 40.0, speed: 79, fine: "$1,420", location: "M-2 · KM 142", time: "14:02:11", axles: [7.1, 11.8, 11.6, 6.9, 6.7] },
  { id: "WIM-2026-004822", plate: "HGV 2290", lane: "02", cls: "6-axle artic", gvw: 52.3, limit: 44.0, speed: 68, fine: "$2,050", location: "M-2 · KM 142", time: "14:03:47", axles: [7.4, 12.1, 11.9, 7.0, 7.0, 6.9] },
  { id: "WIM-2026-004823", plate: "TRK 8830", lane: "01", cls: "3-axle rigid", gvw: 29.4, limit: 26.0, speed: 84, fine: "$980", location: "M-2 · KM 141", time: "14:05:02", axles: [7.9, 11.2, 10.3] },
  { id: "WIM-2026-004824", plate: "FRT 1567", lane: "02", cls: "5-axle artic", gvw: 41.9, limit: 40.0, speed: 71, fine: "$640", location: "M-2 · KM 142", time: "14:06:33", axles: [6.8, 10.9, 10.6, 6.9, 6.7] },
  { id: "WIM-2026-004825", plate: "CAR 0092", lane: "01", cls: "7-axle artic", gvw: 58.7, limit: 50.0, speed: 66, fine: "$2,480", location: "M-2 · KM 141", time: "14:08:14", axles: [7.5, 12.3, 12.0, 7.1, 7.0, 6.9, 5.9] },
];

const overPct = (v: Violation) => ((v.gvw - v.limit) / v.limit) * 100;

/* ---------------- Enforcement section ---------------- */

export function EnforcementSection() {
  const [reduced, setReduced] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % VIOLATIONS.length), 3800);
    return () => window.clearInterval(id);
  }, [reduced]);

  const v = VIOLATIONS[idx];
  const feed = Array.from({ length: VIOLATIONS.length }, (_, i) => VIOLATIONS[(idx - i + VIOLATIONS.length) % VIOLATIONS.length]);

  return (
    <div className="enf-anim">
      <div className="mt-12">
        <StatBand />
      </div>

      <Pipeline reduced={reduced} />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <AxleProfile v={v} />
        <ChallanTicket v={v} />
      </div>

      <LogStream feed={feed} currentId={v.id} />
    </div>
  );
}

/* ---------------- Pipeline strip ---------------- */

const STEPS = [
  { icon: Scale, label: "Detect", sub: "WIM · overweight" },
  { icon: Camera, label: "Capture", sub: "ANPR · plate" },
  { icon: ShieldCheck, label: "Verify", sub: "Registry match" },
  { icon: FileText, label: "Challan", sub: "Auto-generate" },
  { icon: Send, label: "Dispatch", sub: "Owner + LEA" },
];

function Pipeline({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
      {/* sweeping signal along the strip */}
      {!reduced ? (
        <span
          className="pointer-events-none absolute top-0 z-10 hidden h-0.5 w-16 -translate-x-1/2 bg-hivis lg:block"
          style={{ animation: "enf-sweep 5s linear infinite", boxShadow: "0 0 12px 2px var(--color-hivis)" }}
        />
      ) : null}
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="relative bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center border border-rule text-hivis">
                <Icon className="size-4" />
              </span>
              <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="font-display mt-4 text-xl text-foreground">{s.label}</p>
            <p className="mt-1 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Axle-load profile ---------------- */

function AxleProfile({ v }: { v: Violation }) {
  const maxScale = 14;
  const pct = overPct(v);
  return (
    <div className="border border-rule bg-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-widest text-hivis">
          <Radio className="size-3.5" /> Axle-load profile · Lane {v.lane}
        </span>
        <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
          {v.cls}
        </span>
      </div>

      <div key={v.id} className="relative mt-8 flex h-40 items-end gap-3">
        {/* limit line */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10 border-t border-dashed border-red-400/70"
          style={{ bottom: `${(AXLE_LIMIT / maxScale) * 100}%` }}
        >
          <span className="absolute -top-4 right-0 font-mono-tight text-[9px] uppercase tracking-widest text-red-300">
            Limit {AXLE_LIMIT}t
          </span>
        </div>

        {v.axles.map((load, i) => {
          const over = load > AXLE_LIMIT;
          return (
            <div key={i} className="flex h-full flex-1 flex-col justify-end">
              <span
                className={`origin-bottom ${over ? "bg-red-500" : "bg-hivis/80"}`}
                style={{
                  height: `${(load / maxScale) * 100}%`,
                  animation: `enf-bar-grow 650ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both${over ? ", enf-over-pulse 1.4s ease-in-out 700ms infinite" : ""}`,
                }}
              />
              <span className="mt-2 text-center font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
                A{i + 1}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-rule pt-5">
        <Metric k="GVW" v={`${v.gvw.toFixed(1)} t`} />
        <Metric k="Limit" v={`${v.limit.toFixed(1)} t`} />
        <Metric k="Excess" v={`+${pct.toFixed(1)}%`} danger />
      </div>
    </div>
  );
}

function Metric({ k, v, danger }: { k: string; v: string; danger?: boolean }) {
  return (
    <div>
      <p className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
      <p className={`font-display mt-1 text-2xl ${danger ? "text-red-400" : "text-foreground"}`}>{v}</p>
    </div>
  );
}

/* ---------------- E-challan ticket ---------------- */

function ChallanTicket({ v }: { v: Violation }) {
  return (
    <div className="lg:col-span-3">
      <div key={v.id} className="motion-fade-up relative overflow-hidden border border-hivis bg-background">
        <div className="diag-stripes h-2 w-full opacity-80" />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                Electronic Challan · Auto-generated
              </p>
              <p className="font-display mt-1 text-2xl text-foreground">{v.id}</p>
            </div>
            <span className="flex items-center gap-1.5 border border-hivis px-2 py-1 font-mono-tight text-[10px] uppercase tracking-widest text-hivis">
              <span className="size-1.5 rounded-full bg-hivis motion-safe:animate-pulse" />
              Live
            </span>
          </div>

          {/* rubber stamp */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 select-none border-4 border-red-500/80 px-3 py-1.5 md:block"
            style={{ animation: "stamp-in 600ms cubic-bezier(0.16,1,0.3,1) 250ms both" }}
          >
            <span className="font-display text-2xl uppercase tracking-tight text-red-500/90">
              Overweight
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 font-mono-tight text-xs">
            <TicketRow k="Plate" v={v.plate} />
            <TicketRow k="Lane" v={v.lane} />
            <TicketRow k="Location" v={v.location} />
            <TicketRow k="Timestamp" v={v.time} />
            <TicketRow k="Vehicle class" v={v.cls} />
            <TicketRow k="Speed" v={`${v.speed} km/h`} />
            <TicketRow k="Measured GVW" v={`${v.gvw.toFixed(1)} t`} />
            <TicketRow k="Permitted GVW" v={`${v.limit.toFixed(1)} t`} />
            <TicketRow k="Offence" v={`Overweight +${overPct(v).toFixed(1)}%`} danger />
            <TicketRow k="Fine" v={v.fine} danger />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
            <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
              Evidence: ANPR still · WIM waveform · signed hash
            </span>
            <span className="flex items-center gap-2 border border-hivis bg-hivis px-3 py-1.5 font-mono-tight text-[10px] uppercase tracking-widest text-hivis-foreground">
              <ShieldCheck className="size-3.5" /> Issued → Dispatched
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketRow({ k, v, danger }: { k: string; v: string; danger?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-rule/60 pb-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className={danger ? "text-red-400" : "text-foreground"}>{v}</span>
    </div>
  );
}

/* ---------------- Live violation logstream ---------------- */

function statusFor(v: Violation): { label: string; cls: string } {
  const p = overPct(v);
  if (p >= 15) return { label: "CHALLAN", cls: "border-red-400/70 text-red-300" };
  if (p >= 5) return { label: "CHALLAN", cls: "border-hivis/70 text-hivis" };
  return { label: "WARN", cls: "border-foreground/40 text-foreground/70" };
}

function LogStream({ feed, currentId }: { feed: Violation[]; currentId: string }) {
  return (
    <div className="mt-6 border border-rule bg-card">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3">
        <span className="flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-widest text-hivis">
          <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          Live violation logstream · stream://enforcement
        </span>
        <span className="hidden font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
          Auto-refresh
        </span>
      </div>

      <div className="grid grid-cols-12 gap-3 border-b border-rule px-5 py-2 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground">
        <span className="col-span-2">Time</span>
        <span className="col-span-2">Plate</span>
        <span className="col-span-3">Class</span>
        <span className="col-span-2">GVW</span>
        <span className="col-span-2">Excess</span>
        <span className="col-span-1 text-right">Status</span>
      </div>

      {feed.map((row, i) => {
        const st = statusFor(row);
        const isNew = i === 0;
        return (
          <div
            key={`${currentId}-${row.id}`}
            className="grid grid-cols-12 items-center gap-3 border-b border-rule/50 px-5 py-3 font-mono-tight text-[11px]"
            style={isNew ? ({ animation: "enf-row-in 900ms ease-out both" } as CSSProperties) : undefined}
          >
            <span className="col-span-2 text-muted-foreground">{row.time}</span>
            <span className="col-span-2 text-foreground">{row.plate}</span>
            <span className="col-span-3 text-foreground/80">{row.cls}</span>
            <span className="col-span-2 text-foreground">{row.gvw.toFixed(1)} t</span>
            <span className="col-span-2 text-red-400">+{overPct(row).toFixed(1)}%</span>
            <span className="col-span-1 flex justify-end">
              <span className={`border px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${st.cls}`}>
                {st.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Optional decorative export */
export function EnforcementBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-red-400/70 px-2 py-1 font-mono-tight text-[10px] uppercase tracking-widest text-red-300">
      <AlertTriangle className="size-3" />
      {children}
    </span>
  );
}
