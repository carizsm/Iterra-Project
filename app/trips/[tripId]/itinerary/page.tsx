import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ItineraryForm } from "@/features/itinerary/itinerary-form";
import { ActionDialog } from "@/components/common/action-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { TimelineItem } from "@/features/itinerary/timeline-item";
import { groupItineraryByDate } from "@/lib/calculations/grouping";
import { formatDate } from "@/lib/formatters";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function ItineraryPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const grouped = groupItineraryByDate(data.itinerary);

  return (
    <WorkspaceShell trip={data.trip} active="itinerary" workspace={data}>
      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Journey Timeline</h2>
            <p className="text-sm text-muted">Plan each day as a simple route, not a spreadsheet.</p>
          </div>
          <ActionDialog
            title="Add Itinerary"
            description="Add one activity with time, place, cost, and notes."
            triggerLabel="Add Itinerary"
          >
            <ItineraryForm tripId={tripId} />
          </ActionDialog>
        </div>

        <div className="space-y-4">
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([date, items]) => (
              <section
                key={date}
                className="rounded-[1.25rem] bg-paper/70 p-5 shadow-[inset_0_0_0_1px_#E5DED3]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="font-semibold">{formatDate(date)}</h3>
                  <span className="text-sm text-muted">
                    {items.length} stop{items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="relative space-y-4 before:absolute before:bottom-2 before:left-[5px] before:top-4 before:w-px before:bg-border">
                  {items.map((item) => (
                    <TimelineItem key={item.id} item={item} currency={data.trip.currency} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <EmptyState
              title="No itinerary yet"
              description="Start shaping the journey by date, time, and location."
            />
          )}
        </div>
      </section>
    </WorkspaceShell>
  );
}
