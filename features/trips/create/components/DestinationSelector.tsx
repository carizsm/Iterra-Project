"use client";

import type { DestinationType } from "../types";
import { cn } from "@/lib/utils";

const destinationOptions: { value: DestinationType; label: string }[] = [
  { value: "mountain", label: "Mountain" },
  { value: "beach", label: "Beach" },
  { value: "city", label: "City" },
  { value: "countryside", label: "Countryside" },
  { value: "international", label: "International" },
  { value: "custom", label: "Custom" },
];

export function DestinationSelector({
  value,
  onChange,
}: {
  value: DestinationType;
  onChange: (value: DestinationType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {destinationOptions.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-10 rounded-full border border-border bg-surface px-3 text-center text-sm font-medium text-muted transition-all duration-200 hover:-translate-y-px hover:border-primary/40 hover:bg-soft hover:text-primary",
              active && "border-primary bg-primary text-white shadow-[0_10px_24px_rgba(49,88,70,0.14)] hover:bg-primary hover:text-white",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
