import type { TripMember } from "@/types/trip";

export function MemberAvatarGroup({ members }: { members: TripMember[] }) {
  const visible = members.slice(0, 4);
  const remaining = members.length - visible.length;
  return (
    <div className="flex items-center">
      {visible.map((member) => {
        const name = member.profiles?.full_name ?? "Member";
        return (
          <div
            key={member.id}
            title={name}
            className="-ml-2 flex h-8 w-8 first:ml-0 items-center justify-center rounded-full border-2 border-surface bg-soft text-xs font-semibold text-primary"
          >
            {name.slice(0, 1).toUpperCase()}
          </div>
        );
      })}
      {remaining > 0 ? (
        <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary text-xs font-semibold text-white">
          +{remaining}
        </div>
      ) : null}
    </div>
  );
}
