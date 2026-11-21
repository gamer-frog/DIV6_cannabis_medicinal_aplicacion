import { Leaf, Search, Filter } from "lucide-react";

export default function StrainsPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Strains</h1>
        </div>
        <p className="text-muted-foreground">
          Browse, search, and catalog cannabis strains with detailed profiles.
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search strains by name, type, or effect..."
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <Leaf className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold text-muted-foreground">No strains yet</h2>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Connect Supabase to start cataloging strains.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
        <Leaf className="h-3.5 w-3.5" />
        <span>0_cannabis v0.1.0 &middot; Botardo OS &middot; DIV6</span>
      </footer>
    </div>
  );
}
