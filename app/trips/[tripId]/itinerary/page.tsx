import { CalendarDays } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ItineraryForm } from "@/features/itinerary/itinerary-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import { groupItineraryByDate } from "@/lib/calculations/grouping";
import { formatCurrency, formatDate, formatShortTime } from "@/lib/formatters";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function ItineraryPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const grouped = groupItineraryByDate(data.itinerary);

  return (
    <WorkspaceShell trip={data.trip} active="itinerary">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([date, items]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle>{formatDate(date)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border-l-2 border-primary pl-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted">
                            {formatShortTime(item.start_time)} {item.end_time ? `- ${formatShortTime(item.end_time)}` : ""} · {item.location}
                          </p>
                        </div>
                        <Badge>{item.status}</Badge>
                      </div>
                      {item.notes ? <p className="mt-2 text-sm text-muted">{item.notes}</p> : null}
                      {Number(item.estimated_cost) > 0 ? (
                        <p className="mt-2 text-sm font-medium">{formatCurrency(item.estimated_cost, data.trip.currency)}</p>
                      ) : null}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="Belum ada itinerary"
              description="Mulai susun rencana perjalananmu per tanggal dan lokasi."
            />
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <ItineraryForm tripId={tripId} />
          </CardContent>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
