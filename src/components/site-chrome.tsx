import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageEnter } from "@/components/motion";

const NAV = [
  { href: "#live", label: "System" },
  { href: "#technology", label: "Technology" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#enforcement", label: "Enforcement" },
  { href: "#performance", label: "Performance" },
  { href: "#deployment", label: "Deployment" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 rule-bottom bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-mono-tight text-sm text-hivis">◤ AXLE</span>
          <span className="font-mono-tight text-sm text-foreground/70">//WIM</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-none px-3 py-2 font-mono-tight text-xs uppercase tracking-widest text-foreground/70 transition-[color,transform] duration-200 motion-safe:hover:-translate-y-px hover:text-hivis"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group hidden items-center gap-2 border border-hivis px-4 py-2 font-mono-tight text-xs uppercase tracking-widest text-hivis transition-[background-color,color,transform] duration-200 motion-safe:hover:-translate-y-px hover:bg-hivis hover:text-hivis-foreground md:inline-flex"
        >
          Request Deployment Brief
          <span aria-hidden className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
      <div className="diag-stripes h-1 w-full opacity-80" />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="rule-top mt-24 bg-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="label-eyebrow">Axle // WIM Systems</p>
          <p className="font-display mt-3 text-3xl leading-tight text-foreground">
            Weighing freight at <span className="hivis-underline">highway speed</span>,
            without stopping traffic.
          </p>
        </div>
        <FooterCol
          title="Product"
          items={[
            ["#technology", "Sensor Stack"],
            ["#performance", "Accuracy Classes"],
            ["#enforcement", "Overweight Enforcement"],
            ["#deployment", "Site Requirements"],
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            ["#contact", "Contact"],
            ["#capabilities", "Capabilities"],
            ["#live", "Live System"],
          ]}
        />
      </div>
      <div className="rule-top">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5 font-mono-tight text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} Axle Instrumentation Ltd.</span>
          <span>COST-323 · OIML R134 · ISO/IEC 17025 aware</span>
          <span>Rev. 2026.07</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <p className="label-eyebrow">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map(([href, label]) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-foreground/80 transition hover:text-hivis"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageEnter routeKey={pathname}>{children}</PageEnter>
      </main>
      <SiteFooter />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="label-eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-4 text-4xl leading-[1.05] text-foreground md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function DataRow({
  k,
  v,
}: {
  k: string;
  v: ReactNode;
}) {
  return (
    <div className="group flex items-baseline justify-between gap-4 rule-bottom py-3">
      <span className="font-mono-tight text-[11px] uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className="font-mono-tight text-sm text-foreground transition-colors duration-200 group-hover:text-hivis">
        {v}
      </span>
    </div>
  );
}