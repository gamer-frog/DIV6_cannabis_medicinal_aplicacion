import { Settings, Database, Globe, Key } from "lucide-react";

const settingsSections = [
  {
    title: "Supabase Connection",
    description: "Configure your Supabase project URL and anon key.",
    icon: Database,
    fields: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
  },
  {
    title: "Jurisdictions",
    description: "Manage which regulatory jurisdictions to track.",
    icon: Globe,
    fields: ["Active regions"],
  },
  {
    title: "API Keys",
    description: "Manage third-party API keys for market data.",
    icon: Key,
    fields: ["API endpoints"],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Configure connections, jurisdictions, and preferences.
        </p>
      </header>

      {/* Settings Sections */}
      <section className="space-y-6 max-w-2xl">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {section.fields.map((field) => (
                  <div key={field} className="flex items-center gap-3">
                    <label className="text-sm font-medium text-muted-foreground w-64">
                      {field}
                    </label>
                    <input
                      type="text"
                      placeholder="Not configured"
                      disabled
                      className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
        <Settings className="h-3.5 w-3.5" />
        <span>0_cannabis v0.1.0 &middot; Botardo OS &middot; DIV6</span>
      </footer>
    </div>
  );
}
