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
            className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-soft text-xs font-semibold text-primary transition-transform duration-200 ease-out first:ml-0 hover:z-10 hover:-translate-y-px hover:scale-105"
          >
            {name.slice(0, 1).toUpperCase()}
          </div>
        );
      })}
      {remaining > 0 ? (
        <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary text-xs font-semibold text-white transition-transform duration-200 ease-out hover:z-10 hover:-translate-y-px hover:scale-105">
          +{remaining}
        </div>
      ) : null}
    </div>
  );
}
