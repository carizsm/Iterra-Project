import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  className,
  href = "/dashboard",
}: {
  compact?: boolean;
  className?: string;
  href?: string;
}) {
  const mark = (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(49,88,70,0.18)]">
      <svg viewBox="0 0 36 36" className="h-8 w-8" aria-hidden="true">
        <path
          d="M9 22.5c4.4-9.2 12.5-9.2 18-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
        <circle cx="9" cy="22.5" r="2" fill="#F8F3EA" />
        <circle cx="27" cy="13.5" r="2.4" fill="#C86B4A" />
      </svg>
    </div>
  );

  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      {mark}
      {!compact ? (
        <div className="leading-tight">
          <p className="font-semibold text-foreground">Iterra</p>
          <p className="text-xs text-muted">Travel workspace</p>
        </div>
      ) : null}
    </Link>
  );
}
