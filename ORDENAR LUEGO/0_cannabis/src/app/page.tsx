import Link from "next/link";
import { Leaf, ShieldCheck, BarChart3, Cannabis, TrendingUp } from "lucide-react";

const modules = [
  {
    title: "Strains",
    description: "Browse, search, and catalog cannabis strains with detailed profiles and effects.",
    icon: Leaf,
    href: "/strains",
    gradient: "from-green-600 to-emerald-600",
    stats: "0 strains",
  },
  {
    title: "Compliance",
    description: "Track regulatory requirements, licenses, and compliance status across jurisdictions.",
    icon: ShieldCheck,
    href: "/compliance",
    gradient: "from-teal-600 to-green-600",
    stats: "0 pending",
  },
  {
    title: "Analytics",
    description: "Market trends, pricing data, and industry performance insights.",
    icon: BarChart3,
    href: "/analytics",
    gradient: "from-emerald-600 to-lime-600",
    stats: "0 reports",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Cannabis className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            0<span className="text-primary">_</span>cannabis
          </h1>
        </div>
        <p className="text-muted-foreground">
          Cannabis industry analytics &amp; compliance &mdash; DIV6 Botardo OS
        </p>
      </header>

      {/* Module Cards */}
      <section aria-label="Modules" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${mod.gradient}`}
              />

              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-lg bg-gradient-to-br ${mod.gradient} p-2.5`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">{mod.stats}</span>
              </div>

              <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                {mod.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mod.description}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Quick Stats */}
      <section aria-label="Quick stats" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Strains Cataloged", value: "0" },
          { label: "Compliance Checks", value: "0" },
          { label: "Markets Tracked", value: "0" },
          { label: "Reports Generated", value: "0" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>0_cannabis v0.1.0 &middot; Botardo OS &middot; DIV6</span>
      </footer>
    </div>
  );
}
