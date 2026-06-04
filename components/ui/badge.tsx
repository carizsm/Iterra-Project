import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white",
        secondary: "border-border bg-soft text-foreground",
        accent: "border-transparent bg-[#f7e2d8] text-[#8a3f28]",
        success: "border-transparent bg-[#dfece3] text-primary",
        warning: "border-transparent bg-[#fff1cf] text-[#765414]",
        danger: "border-transparent bg-[#fde2df] text-[#8a2920]",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
