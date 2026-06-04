import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border border-border bg-surface px-4 py-3.5", className)}>
      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
        <p className="text-lg font-semibold leading-tight sm:text-xl">{value}</p>
        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
    </div>
  );
}
