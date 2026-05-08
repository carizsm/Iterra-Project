import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DateRangeDisplay } from "@/components/common/date-range-display";
import { formatCurrency } from "@/lib/formatters";
import type { Trip } from "@/types/trip";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/trips/${trip.id}/overview`} className="block">
      <Card className="p-5 transition-colors hover:border-primary">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold">{trip.name}</h2>
              <p className="text-sm text-muted">{trip.destination}</p>
            </div>
            <DateRangeDisplay startDate={trip.start_date} endDate={trip.end_date} />
            <p className="text-sm font-medium">
              Target {formatCurrency(trip.target_budget, trip.currency)}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
        </div>
      </Card>
    </Link>
  );
}
