import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { Badge } from "@/components/ui/badge";
import { SectionPanel } from "@/components/common/section-panel";
import { ListRow } from "@/components/common/list-row";
import { CopyButton } from "@/components/common/copy-button";
import { MemberAvatarGroup } from "@/components/common/member-avatar-group";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function MembersPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);

  return (
    <WorkspaceShell trip={data.trip} active="members" workspace={data}>
      <section className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionPanel
          title="Invite Code"
          description="Share this code so members can join from the Join Trip page."
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-dashed border-primary/50 bg-soft p-4 transition-colors duration-200 ease-out hover:border-primary/70 hover:bg-[#EFE7D8]/60">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Code</p>
              <p className="mt-1 break-all text-2xl font-semibold tracking-wide">
                {data.trip.invite_code}
              </p>
            </div>
            <CopyButton value={data.trip.invite_code} label="Copy code" />
          </div>
        </SectionPanel>
        <SectionPanel title="Travel Party" description="Everyone currently connected to this trip workspace.">
          <div className="mb-4">
            <MemberAvatarGroup members={data.members} />
          </div>
          <div className="space-y-3">
            {data.members.map((member) => (
              <ListRow
                key={member.id}
                title={member.profiles?.full_name ?? "Member"}
                description={member.role === "owner" ? "Trip owner" : "Trip member"}
                aside={
                  <Badge variant={member.role === "owner" ? "success" : "secondary"}>
                    {member.role === "owner" ? "Owner" : "Member"}
                  </Badge>
                }
              />
            ))}
          </div>
        </SectionPanel>
      </section>
    </WorkspaceShell>
  );
}
