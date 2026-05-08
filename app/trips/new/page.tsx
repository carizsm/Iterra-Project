import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTripForm } from "@/features/trips/create-trip-form";
import { requireUser } from "@/features/trips/data";

export default async function NewTripPage() {
  await requireUser();
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Buat Trip Baru" description="Susun workspace untuk rencana, budget, dan patungan trip." />
        <Card>
          <CardHeader>
            <CardTitle>Detail Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateTripForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
