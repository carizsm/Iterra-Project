export function MetricPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-full border border-border bg-surface/80 px-4 py-2 shadow-[0_8px_20px_rgba(49,88,70,0.045)]">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <span className="ml-2 text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}
