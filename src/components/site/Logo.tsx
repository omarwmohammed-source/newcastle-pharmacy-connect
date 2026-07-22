import { Plus } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"
      >
        <Plus className="h-6 w-6 text-accent" strokeWidth={3} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold text-primary sm:text-lg">
          {"\n"}
        </span>
        {!compact && (
          <span className="text-xs text-muted-foreground">
            Your community pharmacy clinic
          </span>
        )}
      </span>
    </div>
  );
}
