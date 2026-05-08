import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/features/trips/data";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Profile / Settings" description="Pengaturan dasar akun dan workspace." />
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted">Email</p>
            <p className="font-medium">{user.email ?? "demo@iterra.local"}</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
