import { formatDateRange } from "@/lib/formatters";

export function DateRangeDisplay({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  return (
    <span className="text-sm text-muted">{formatDateRange(startDate, endDate)}</span>
  );
}
