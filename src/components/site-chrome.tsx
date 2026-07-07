import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageEnter } from "@/components/motion";

const NAV = [
  { href: "#live", label: "System" },
  { href: "#technology", label: "Technology" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#enforcement", label: "Enforcement" },
  { href: "#performance", label: "Performance" },
  { href: "#impact", label: "Impact" },
  { href: "#deployment", label: "Deployment" },
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
          href="#deployment"
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

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageEnter routeKey={pathname}>{children}</PageEnter>
      </main>
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