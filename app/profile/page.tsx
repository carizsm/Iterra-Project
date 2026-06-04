import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { requireUser } from "@/features/trips/data";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Profile" description="Basic account and workspace settings." />
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted">Email</p>
            <p className="font-medium">{user.email ?? "demo@iterra.local"}</p>
            <form action={logoutAction} className="mt-5 lg:hidden">
              <Button type="submit" variant="outline">
                Log Out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
