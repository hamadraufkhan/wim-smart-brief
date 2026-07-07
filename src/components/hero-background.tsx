import { useEffect, useState } from "react";

/** Ghost truck silhouette for hero backdrop */
function GhostTruck({ artic }: { artic?: boolean }) {
  const bodyLen = artic ? 100 : 72;
  const cabX = bodyLen + 5;
  return (
    <svg viewBox="0 0 180 70" className="h-10 w-auto opacity-30 md:h-12" aria-hidden>
      <rect x="2" y="12" width={bodyLen} height="36" rx="2" fill="currentColor" className="text-paper/25" />
      <rect x="2" y="44" width={bodyLen} height="5" fill="var(--color-hivis)" opacity="0.5" />
      <rect x={cabX} y="20" width="28" height="28" rx="2" fill="currentColor" className="text-paper/20" />
      <path
        d={`M ${cabX + 28} 24 L ${cabX + 42} 32 L ${cabX + 42} 48 L ${cabX + 28} 48 Z`}
        fill="currentColor"
        className="text-paper/20"
      />
      {(artic ? [22, 42, cabX + 12, cabX + 34] : [24, cabX + 12, cabX + 32]).map((cx) => (
        <circle key={cx} cx={cx} cy="54" r="7" fill="var(--color-asphalt)" stroke="currentColor" strokeWidth="1" className="text-paper/15" />
      ))}
    </svg>
  );
}

/** Scrolling axle-force waveform strip */
function WaveformStrip() {
  const peaks = [12, 28, 45, 38, 52, 30, 48, 22, 40, 35, 50, 25, 42, 18, 38, 44, 32, 48, 28, 40];
  const w = peaks.length * 24;
  const path = peaks
    .map((h, i) => {
      const x = i * 24 + 12;
      const y = 50 - h;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="absolute inset-x-0 top-[38%] h-16 overflow-hidden opacity-25">
      <div
        className="flex w-[200%]"
        style={{ animation: "hero-wave-drift 28s linear infinite" }}
      >
        {[0, 1].map((n) => (
          <svg key={n} viewBox={`0 0 ${w} 60`} className="h-full shrink-0" preserveAspectRatio="none" style={{ width: w }}>
            <path d={path} fill="none" stroke="var(--color-hivis)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <path d={`${path} L ${w} 60 L 0 60 Z`} fill="var(--color-hivis)" opacity="0.06" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function HeroBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="hero-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* readability vignettes */}
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,var(--color-background)_0%,color-mix(in_oklab,var(--color-background)_55%,transparent)_28%,color-mix(in_oklab,var(--color-background)_25%,transparent)_55%,color-mix(in_oklab,var(--color-background)_80%,transparent)_100%)]" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_right,var(--color-background)_0%,transparent_42%,transparent_72%,color-mix(in_oklab,var(--color-background)_65%,transparent)_100%)]" />

      {!reduced && (
        <div className="absolute inset-0 z-[1]">
          <WaveformStrip />

          {/* WIM sensor node — centre-right */}
          <div className="absolute left-[58%] top-[52%] -translate-x-1/2">
            <div className="h-24 w-px bg-hivis/40" />
            <div
              className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-hivis/70"
              style={{ animation: "wim-sensor-pulse 4s ease-in-out infinite" }}
            />
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 top-0 size-8 rounded-full border border-hivis/50"
                style={{ animation: `wim-ring 3s ease-out ${i * 1500}ms infinite` }}
              />
            ))}

            {/* data packets rising toward control room */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 top-0 size-1.5 rounded-full bg-hivis/80"
                style={{
                  boxShadow: "0 0 6px 1px var(--color-hivis)",
                  animation: `hero-packet-rise 3.5s ease-in-out ${i * 1.1}s infinite`,
                }}
              />
            ))}
          </div>

          {/* uplink dashed line */}
          <div
            className="absolute left-[58%] top-[20%] h-[32%] w-px -translate-x-1/2 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to top, var(--color-hivis) 0 4px, transparent 4px 10px)",
              backgroundSize: "1px 10px",
              animation: "wim-flow 800ms linear infinite",
            }}
          />

          {/* road strip */}
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-concrete/20">
            <div className="absolute inset-x-0 top-0 h-px bg-hivis/20" />
            <div
              className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-y-1/2 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--color-paper) 0 20px, transparent 20px 40px)",
              }}
            />
            {/* sensor strip across road */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-hivis/50" />

            {/* trucks */}
            <div
              className="absolute bottom-[18%] left-0 w-full text-foreground"
              style={{ animation: "hero-drive-slow 16s linear infinite" }}
            >
              <GhostTruck artic />
            </div>
            <div
              className="absolute bottom-[18%] left-0 w-full text-foreground"
              style={{ animation: "hero-drive-slow 20s linear -7s infinite" }}
            >
              <GhostTruck />
            </div>
            <div
              className="absolute bottom-[18%] left-0 w-full text-foreground"
              style={{ animation: "hero-drive-slow 16s linear -12s infinite" }}
            >
              <GhostTruck artic />
            </div>
          </div>

          {/* floating readout chips */}
          <div
            className="absolute right-[8%] top-[22%] hidden border border-hivis/30 bg-background/40 px-2 py-1 font-mono-tight text-[9px] uppercase tracking-widest text-hivis/70 backdrop-blur-sm md:block"
            style={{ animation: "wim-blip 2.4s ease-in-out infinite" }}
          >
            GVW 38.2 t · PASS
          </div>
          <div
            className="absolute right-[14%] top-[30%] hidden border border-hivis/20 bg-background/30 px-2 py-1 font-mono-tight text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm md:block"
            style={{ animation: "wim-blip 2.8s ease-in-out 0.6s infinite" }}
          >
            Lane 02 · 88 km/h
          </div>
        </div>
      )}

      {/* static fallback for reduced motion */}
      {reduced && (
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-concrete/15">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hivis/30" />
        </div>
      )}
    </div>
  );
}
