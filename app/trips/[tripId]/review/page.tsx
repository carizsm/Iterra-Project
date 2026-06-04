import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ReviewForm } from "@/features/reviews/review-form";
import { Badge } from "@/components/ui/badge";
import { ActionDialog } from "@/components/common/action-dialog";
import { SectionPanel } from "@/components/common/section-panel";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function ReviewPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const review = data.review;

  return (
    <WorkspaceShell trip={data.trip} active="review" workspace={data}>
      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionPanel
          title="Reflection"
          description="Capture the trip while the details are still fresh."
          action={
            <ActionDialog
              title={review ? "Edit Review" : "Add Review"}
              description="Keep the reflection concise and useful for the next journey."
              triggerLabel={review ? "Edit Review" : "Add Review"}
            >
              <ReviewForm tripId={tripId} review={review} />
            </ActionDialog>
          }
        >
          <p className="text-sm text-muted">
            Use this space after the trip to record what worked, what changed, and what to remember next time.
          </p>
        </SectionPanel>
        <SectionPanel title="Trip Recap">
          {review ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">Rating {review.rating}/10</Badge>
                <Badge variant={review.worth_it ? "success" : "warning"}>
                  {review.worth_it ? "Worth it" : "Needs another look"}
                </Badge>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Best moment:</span> {review.best_moment || "-"}
                </p>
                <p>
                  <span className="font-medium">Challenge:</span>{" "}
                  {review.biggest_challenge || "-"}
                </p>
                <p>
                  <span className="font-medium">Tips:</span> {review.tips || "-"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">
              No review yet. Add one after the journey to keep a clean post-trip reflection.
            </p>
          )}
        </SectionPanel>
      </section>
    </WorkspaceShell>
  );
}
