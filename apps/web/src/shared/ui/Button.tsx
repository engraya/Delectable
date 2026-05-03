import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 disabled:pointer-events-none",
  secondary:
    "bg-surface-elevated text-fg border border-border shadow-sm hover:bg-surface-muted active:bg-surface-muted/80 disabled:opacity-50",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-surface-muted active:bg-surface-muted/80 disabled:opacity-50",
  danger:
    "bg-danger text-white shadow-sm hover:bg-danger-hover active:opacity-90 disabled:opacity-50",
};

const sizes = {
  sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-11 px-5 text-sm rounded-lg gap-2",
} as const;

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
