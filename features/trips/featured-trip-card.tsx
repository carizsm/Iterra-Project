import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BudgetProgress } from "@/components/common/budget-progress";
import { formatCurrency, formatDateRange } from "@/lib/formatters";
import type { DashboardTrip } from "@/features/trips/data";

export function FeaturedTripCard({ item }: { item?: DashboardTrip }) {
  if (!item) {
    return (
      <div className="rounded-[1.25rem] bg-surface/80 p-5 shadow-[0_20px_55px_rgba(49,88,70,0.08)]">
        <p className="text-sm font-medium text-muted">Upcoming Trip</p>
        <p className="mt-3 text-lg font-semibold">No upcoming trip yet</p>
        <p className="mt-1 text-sm text-muted">Create a new workspace to start planning.</p>
        <Button asChild className="mt-5" size="sm">
          <Link href="/trips/new">Create New Trip</Link>
        </Button>
      </div>
    );
  }

  const progress = item.plannedBudget
    ? Math.min(100, (item.actualExpenses / item.plannedBudget) * 100)
    : 0;

  return (
    <div className="group rounded-[1.25rem] bg-surface/90 p-5 shadow-[0_20px_55px_rgba(49,88,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(49,88,70,0.13)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Upcoming Trip</p>
          <h2 className="mt-2 text-xl font-semibold">{item.trip.name}</h2>
        </div>
        <span className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-primary">
          {item.trip.trip_type.replace("_", " ")}
        </span>
      </div>
      <div className="mt-5 space-y-3 text-sm text-muted">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" /> {item.trip.destination}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          {formatDateRange(item.trip.start_date, item.trip.end_date)}
        </p>
        <p className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" /> {item.memberCount} member
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Actual Budget</span>
          <span className="font-medium text-foreground">
            {formatCurrency(item.actualExpenses, item.trip.currency)}
          </span>
        </div>
        <BudgetProgress value={progress} tone={progress > 85 ? "accent" : "primary"} />
      </div>
      <Button asChild variant="outline" className="mt-5 w-full">
        <Link href={`/trips/${item.trip.id}/overview`}>Open Workspace</Link>
      </Button>
    </div>
  );
}
