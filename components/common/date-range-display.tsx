import { CalendarDays } from "lucide-react";
import { formatDateRange } from "@/lib/formatters";

export function DateRangeDisplay({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <CalendarDays className="h-4 w-4" aria-hidden="true" />
      {formatDateRange(startDate, endDate)}
    </span>
  );
}
