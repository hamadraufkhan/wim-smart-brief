import { useEffect, useState, type CSSProperties } from "react";
import {
  Activity,
  Camera,
  Cpu,
  Database,
  Gauge,
  ScanLine,
  Scale,
  ShieldAlert,
  SatelliteDish,
  Truck as TruckIcon,
} from "lucide-react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/* ---------------- Vehicle SVG ---------------- */

function Vehicle({ variant }: { variant: "artic" | "rigid" }) {
  const bodyLen = variant === "artic" ? 118 : 88;
  const cabX = bodyLen + 6;
  return (
    <svg
      viewBox="0 0 210 90"
      className="h-14 w-auto md:h-16"
      role="img"
      aria-label={variant === "artic" ? "Articulated truck" : "Rigid truck"}
    >
      {/* trailer / box body */}
      <rect x="2" y="14" width={bodyLen} height="44" rx="3" fill="#c9ccd2" />
      <rect x="2" y="50" width={bodyLen} height="8" fill="var(--color-hivis)" opacity="0.85" />
      <rect x="6" y="18" width={bodyLen - 8} height="28" fill="#b3b7bf" opacity="0.5" />

      {/* cab */}
      <rect x={cabX} y="24" width="34" height="34" rx="3" fill="#9aa0a9" />
      <path d={`M ${cabX + 34} 30 L ${cabX + 52} 40 L ${cabX + 52} 58 L ${cabX + 34} 58 Z`} fill="#9aa0a9" />
      {/* windscreen */}
      <path d={`M ${cabX + 34} 31 L ${cabX + 49} 40 L ${cabX + 34} 40 Z`} fill="#1c2330" />
      <rect x={cabX + 4} y="28" width="10" height="12" rx="1" fill="#1c2330" />
      {/* headlight */}
      <rect x={cabX + 50} y="52" width="3" height="5" fill="var(--color-hivis)" />

      {/* wheels */}
      {(variant === "artic"
        ? [28, 50, cabX + 16, cabX + 44]
        : [30, cabX + 16, cabX + 40]
      ).map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="66" r="10" fill="#0f1115" />
          <circle cx={cx} cy="66" r="4" fill="#3a3f4a" />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- Live readout data ---------------- */

type PassRecord = {
  lane: string;
  cls: string;
  axles: number;
  speed: number;
  gvw: string;
  status: "PASS" | "CHECK" | "OVER";
};

const RECORDS: PassRecord[] = [
  { lane: "02", cls: "5-axle artic", axles: 5, speed: 88, gvw: "38.2 t", status: "PASS" },
  { lane: "02", cls: "6-axle artic", axles: 6, speed: 79, gvw: "44.1 t", status: "CHECK" },
  { lane: "01", cls: "2-axle rigid", axles: 2, speed: 102, gvw: "7.4 t", status: "PASS" },
  { lane: "02", cls: "5-axle artic", axles: 5, speed: 71, gvw: "41.9 t", status: "OVER" },
  { lane: "01", cls: "3-axle rigid", axles: 3, speed: 84, gvw: "18.6 t", status: "PASS" },
  { lane: "02", cls: "7-axle artic", axles: 7, speed: 68, gvw: "52.3 t", status: "CHECK" },
];

/* ---------------- Live scene ---------------- */

export function WimLiveScene() {
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
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % RECORDS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const rec = RECORDS[idx];

  return (
    <div className="wim-anim relative min-h-[380px] overflow-hidden rounded-none border border-rule bg-asphalt">
      <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />

      {/* Control room console */}
      <div className="absolute left-1/2 top-5 z-20 w-[min(92%,440px)] -translate-x-1/2">
        <div className="border border-rule bg-card/95 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-widest text-hivis">
              <SatelliteDish className="size-3.5" /> Control room · live
            </span>
            <span className="flex items-center gap-1.5 font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              RX
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono-tight text-[11px]">
            <Field k="Lane" v={rec.lane} />
            <Field k="Class" v={rec.cls} />
            <Field k="Speed" v={`${rec.speed} km/h`} />
            <Field k="Axles" v={String(rec.axles)} />
            <Field k="GVW" v={rec.gvw} />
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-muted-foreground">Status</span>
              <span
                className={`border px-1.5 py-0.5 text-[10px] uppercase tracking-widest ${statusClass(rec.status)}`}
              >
                {rec.status}
              </span>
            </div>
          </div>

          {/* signal bars */}
          <div className="mt-3 flex h-6 items-end gap-1">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="w-full origin-bottom bg-hivis/70"
                style={
                  reduced
                    ? { height: "60%" }
                    : {
                        height: "100%",
                        animation: `wim-blip ${900 + (i % 5) * 160}ms ease-in-out ${i * 60}ms infinite`,
                      }
                }
              />
            ))}
          </div>
        </div>
      </div>

      {reduced ? (
        <img
          src={asset("images/wim-truck-pass.png")}
          alt="A truck crossing a high-speed Weigh-In-Motion sensor array"
          className="absolute inset-x-0 bottom-0 h-[190px] w-full object-cover opacity-90"
        />
      ) : (
        <>
          {/* Uplink from sensor to console */}
          <div
            className="absolute bottom-[108px] left-1/2 z-10 h-[128px] w-[2px] -translate-x-1/2"
            style={{ ["--wim-uplink" as string]: "128px" } as CSSProperties}
          >
            <div
              className="wim-flow absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to top, var(--color-hivis) 0 5px, transparent 5px 14px)",
                backgroundSize: "2px 14px",
                opacity: 0.55,
                animation: "wim-flow 700ms linear infinite",
              }}
            />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute bottom-0 left-1/2 size-2 rounded-full bg-hivis"
                style={{
                  boxShadow: "0 0 8px 2px var(--color-hivis)",
                  animation: `wim-packet-up 1600ms linear ${i * 533}ms infinite`,
                }}
              />
            ))}
          </div>

          {/* Road */}
          <div className="absolute inset-x-0 bottom-0 h-[108px] bg-concrete/50">
            <div className="absolute inset-x-0 top-0 h-px bg-rule" />
            {/* lane dashes */}
            <div
              className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--color-paper) 0 26px, transparent 26px 52px)",
              }}
            />

            {/* Sensor strip + node */}
            <div className="absolute left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2 bg-hivis/60" />
            <div
              className="absolute left-1/2 top-2 size-3 -translate-x-1/2 rounded-full bg-hivis"
              style={{ animation: "wim-sensor-pulse 4s ease-in-out infinite" }}
            />
            {/* expanding rings at the sensor contact point */}
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 top-2 size-6 rounded-full border border-hivis"
                style={{ animation: `wim-ring 2s ease-out ${i * 1000}ms infinite` }}
              />
            ))}

            {/* Vehicles */}
            <div
              className="absolute bottom-[14px] left-0 w-full"
              style={{ animation: "wim-drive 9s linear infinite" }}
            >
              <Vehicle variant="artic" />
            </div>
            <div
              className="absolute bottom-[14px] left-0 w-full"
              style={{ animation: "wim-drive 11s linear -4s infinite" }}
            >
              <Vehicle variant="rigid" />
            </div>
            <div
              className="absolute bottom-[14px] left-0 w-full"
              style={{ animation: "wim-drive 9s linear -6.5s infinite" }}
            >
              <Vehicle variant="artic" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function statusClass(status: PassRecord["status"]) {
  if (status === "PASS") return "border-emerald-400/60 text-emerald-300";
  if (status === "OVER") return "border-red-400/70 text-red-300";
  return "border-hivis/70 text-hivis";
}

/* ---------------- Image gallery ---------------- */

export function SystemGallery() {
  const shots = [
    {
      src: "images/wim-sensor-strip.png",
      tag: "In-road sensing",
      caption: "Quartz-piezo strips set flush into the wearing course.",
    },
    {
      src: "images/wim-control-room.png",
      tag: "Central platform",
      caption: "Signed records land in the operator control room in real time.",
    },
  ];
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {shots.map((s) => (
        <figure key={s.src} className="group overflow-hidden border border-rule bg-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={asset(s.src)}
              alt={s.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 border border-hivis bg-background/70 px-2 py-1 font-mono-tight text-[10px] uppercase tracking-widest text-hivis backdrop-blur">
              {s.tag}
            </span>
          </div>
          <figcaption className="px-5 py-4 text-sm text-muted-foreground">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ---------------- Feature cards (basic → advanced) ---------------- */

const FEATURES = [
  {
    tier: "Basic",
    icon: TruckIcon,
    title: "Axle detection & counting",
    body: "Inductive loops and axle sensors resolve every axle and inter-axle spacing at highway speed.",
  },
  {
    tier: "Basic",
    icon: Gauge,
    title: "Speed & gap measurement",
    body: "Per-vehicle speed, headway and lane occupancy derived from timed loop crossings.",
  },
  {
    tier: "Basic",
    icon: ScanLine,
    title: "Vehicle classification",
    body: "Axle geometry maps each vehicle to EU R1, FHWA or a custom classification scheme.",
  },
  {
    tier: "Standard",
    icon: Scale,
    title: "Gross-vehicle-weight estimation",
    body: "Dynamic force is reconstructed into a static GVW and per-axle load, corrected for speed.",
  },
  {
    tier: "Standard",
    icon: ShieldAlert,
    title: "Overload pre-selection",
    body: "Likely offenders are flagged live and pushed to a downstream static scale or patrol.",
  },
  {
    tier: "Standard",
    icon: Camera,
    title: "ANPR & registry fusion",
    body: "License-plate capture is fused per vehicle and matched against the vehicle registry.",
  },
  {
    tier: "Advanced",
    icon: Cpu,
    title: "Rolling auto-calibration",
    body: "Steering-axle populations drift-correct the system continuously between service visits.",
  },
  {
    tier: "Advanced",
    icon: Activity,
    title: "Load spectra & analytics",
    body: "Axle-load distributions feed pavement remaining-life and bridge-rating models.",
  },
  {
    tier: "Advanced",
    icon: Database,
    title: "Open APIs & data export",
    body: "Per-vehicle records, aggregates and chain-of-evidence logs stream to your systems.",
  },
];

const TIER_STYLE: { [k: string]: string } = {
  Basic: "border-foreground/40 text-foreground/70",
  Standard: "border-hivis/70 text-hivis",
  Advanced: "border-emerald-400/60 text-emerald-300",
};

export function FeatureGrid() {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <article
            key={f.title}
            className="group flex h-full flex-col border border-rule bg-card p-7 transition-[border-color,transform] duration-200 hover:border-hivis motion-safe:hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center border border-rule text-hivis transition-colors duration-200 group-hover:border-hivis">
                <Icon className="size-5" />
              </span>
              <span
                className={`border px-2 py-0.5 font-mono-tight text-[10px] uppercase tracking-widest ${TIER_STYLE[f.tier]}`}
              >
                {f.tier}
              </span>
            </div>
            <h3 className="font-display mt-6 text-2xl leading-tight text-foreground">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            <div className="mt-6 h-px w-10 bg-hivis transition-[width] duration-300 motion-safe:group-hover:w-20" />
          </article>
        );
      })}
    </div>
  );
}
