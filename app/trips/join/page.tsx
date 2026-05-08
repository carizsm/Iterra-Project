import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinTripForm } from "@/features/trips/join-trip-form";
import { requireUser } from "@/features/trips/data";

export default async function JoinTripPage() {
  await requireUser();
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Gabung Trip" description="Masukkan kode undangan dari owner trip." />
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Kode Undangan</CardTitle>
          </CardHeader>
          <CardContent>
            <JoinTripForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
