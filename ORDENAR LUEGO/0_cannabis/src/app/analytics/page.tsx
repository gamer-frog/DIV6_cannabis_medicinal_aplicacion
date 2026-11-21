import { BarChart3, TrendingUp, DollarSign, Activity } from "lucide-react";

const analyticsCards = [
  { label: "Market Size", value: "—", icon: DollarSign },
  { label: "Growth Rate", value: "—", icon: TrendingUp },
  { label: "Active Markets", value: "0", icon: Activity },
  { label: "Data Points", value: "0", icon: BarChart3 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        </div>
        <p className="text-muted-foreground">
          Market trends, pricing data, and industry performance insights.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {analyticsCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          );
        })}
      </section>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold text-muted-foreground">No analytics data yet</h2>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Connect Supabase to start visualizing market data.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>0_cannabis v0.1.0 &middot; Botardo OS &middot; DIV6</span>
      </footer>
    </div>
  );
}
