import { AppShell } from "@/components/layout/app-shell";
import { TripWorkspaceNav } from "@/components/layout/trip-workspace-nav";
import { PageHeader } from "@/components/common/page-header";
import { DateRangeDisplay } from "@/components/common/date-range-display";
import { Badge } from "@/components/ui/badge";
import type { Trip } from "@/types/trip";

export function WorkspaceShell({
  trip,
  active,
  children,
}: {
  trip: Trip;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title={trip.name}
          description={trip.destination}
          actions={<Badge variant="secondary">{trip.trip_type.replace("_", " ")}</Badge>}
        />
        <DateRangeDisplay startDate={trip.start_date} endDate={trip.end_date} />
        <TripWorkspaceNav tripId={trip.id} active={active} />
        {children}
      </div>
    </AppShell>
  );
}
