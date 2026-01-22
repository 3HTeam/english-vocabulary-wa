import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/shadcn";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        error: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
        success:
          "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
        warning:
          "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20",
        info: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/20",
        blue: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20",
        emerald:
          "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20",
        purple:
          "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20",
        pink: "text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-900/20",
        cyan: "text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/20",
        indigo:
          "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20",
        amber:
          "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20",
        rose: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20",
        teal: "text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-teal-900/20",
        slate:
          "text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-900/20",
        lime: "text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-900/20",
        fuchsia:
          "text-fuchsia-600 bg-fuchsia-50 dark:text-fuchsia-400 dark:bg-fuchsia-900/20",
        violet:
          "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/20",
        yellow:
          "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
