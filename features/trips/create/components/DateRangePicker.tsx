"use client";

import { addDays, format, startOfToday } from "date-fns";
import { DateRangeIllustration } from "./illustrations";
import { cn } from "@/lib/utils";

function toInputDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function buildCalendarDays() {
  const today = startOfToday();
  return Array.from({ length: 21 }, (_, index) => addDays(today, index));
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}) {
  const days = buildCalendarDays();

  return (
    <div className="grid items-center gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
      <DateRangeIllustration size="md" />
      <div className="space-y-2.5">
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day) => {
            const value = toInputDate(day);
            const active = value === startDate || value === endDate;
            const inRange = startDate && endDate && value > startDate && value < endDate;
            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  if (!startDate || (startDate && endDate)) {
                    onStartChange(value);
                    onEndChange("");
                    return;
                  }
                  if (value < startDate) {
                    onEndChange(startDate);
                    onStartChange(value);
                    return;
                  }
                  onEndChange(value);
                }}
                className={cn(
                  "min-h-9 rounded-lg text-sm transition-all hover:bg-soft",
                  inRange && "bg-soft/70",
                  active && "bg-primary text-white hover:bg-primary",
                )}
              >
                <span className="block text-[10px] uppercase opacity-70">{format(day, "EEE")}</span>
                <span className="font-semibold">{format(day, "d")}</span>
              </button>
            );
          })}
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Start date
            <input
              type="date"
              value={startDate}
              onChange={(event) => onStartChange(event.target.value)}
              className="min-h-9 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            End date
            <input
              type="date"
              value={endDate}
              onChange={(event) => onEndChange(event.target.value)}
              className="min-h-9 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
