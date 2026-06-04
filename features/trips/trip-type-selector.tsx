"use client";

import { Building2, Globe2, Map, Mountain, User, Users } from "lucide-react";
import { tripTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons = {
  solo: User,
  group: Users,
  hiking: Mountain,
  open_trip: Map,
  city_trip: Building2,
  international: Globe2,
} as const;

export function TripTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {tripTypes.map((type) => {
        const Icon = icons[type.value as keyof typeof icons] ?? Map;
        const active = value === type.value;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={cn(
              "group flex min-h-12 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-left text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-soft/60 hover:shadow-[0_12px_28px_rgba(49,88,70,0.08)]",
              active && "border-primary bg-primary text-white shadow-[0_14px_32px_rgba(49,88,70,0.16)]",
            )}
          >
            <Icon className={cn("h-4 w-4 text-primary", active && "text-white")} />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
