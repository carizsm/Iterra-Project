import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-[0_10px_24px_rgba(49,88,70,0.14)] hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_14px_30px_rgba(49,88,70,0.18)]",
        outline: "border border-border bg-surface text-foreground shadow-[0_6px_18px_rgba(49,88,70,0.04)] hover:-translate-y-0.5 hover:border-primary/35 hover:bg-soft/70",
        ghost: "text-foreground hover:bg-soft/80",
        accent: "bg-accent text-white shadow-[0_10px_24px_rgba(200,107,74,0.15)] hover:-translate-y-0.5 hover:bg-[#b95d40]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
