import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ReviewForm } from "@/features/reviews/review-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function ReviewPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const review = data.review;

  return (
    <WorkspaceShell trip={data.trip} active="review">
      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Trip Review</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm tripId={tripId} review={review} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recap</CardTitle>
          </CardHeader>
          <CardContent>
            {review ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="success">Rating {review.rating}/10</Badge>
                  <Badge variant={review.worth_it ? "success" : "warning"}>
                    {review.worth_it ? "Worth it" : "Perlu dipikir ulang"}
                  </Badge>
                </div>
                <div className="space-y-3 text-sm">
                  <p><span className="font-medium">Momen terbaik:</span> {review.best_moment || "-"}</p>
                  <p><span className="font-medium">Tantangan:</span> {review.biggest_challenge || "-"}</p>
                  <p><span className="font-medium">Tips:</span> {review.tips || "-"}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted">Belum ada review. Isi setelah perjalanan selesai untuk membuat catatan post-trip yang rapi.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
