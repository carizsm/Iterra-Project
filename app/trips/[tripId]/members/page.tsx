import { Copy, Users } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function MembersPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);

  return (
    <WorkspaceShell trip={data.trip} active="members">
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Kode Undangan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border border-dashed border-primary bg-soft p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Kode</p>
              <p className="mt-1 text-2xl font-semibold tracking-wide">{data.trip.invite_code}</p>
            </div>
            <Button variant="outline" className="w-full" type="button">
              <Copy className="h-4 w-4" /> Salin kode
            </Button>
            <p className="text-sm text-muted">Bagikan kode ini agar member bisa bergabung dari halaman Gabung Trip.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Member Trip</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-md border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft font-semibold text-primary">
                    {(member.profiles?.full_name ?? "M").slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{member.profiles?.full_name ?? "Member"}</p>
                    <p className="text-sm text-muted">{member.user_id}</p>
                  </div>
                </div>
                <Badge variant={member.role === "owner" ? "success" : "secondary"}>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <Card>
        <CardContent className="flex items-center gap-3 pt-5 text-sm text-muted">
          <Users className="h-4 w-4 text-primary" />
          Owner dapat mengelola member melalui policy Supabase. UI manajemen lanjutan bisa ditambahkan setelah MVP.
        </CardContent>
      </Card>
    </WorkspaceShell>
  );
}
