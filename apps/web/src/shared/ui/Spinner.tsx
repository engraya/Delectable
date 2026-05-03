import { cn } from "@/shared/lib/cn";
import { BRAND } from "@/shared/lib/brand";

export function Spinner({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[45vh] items-center justify-center px-4 py-16",
        className
      )}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="relative h-14 w-14" role="status" aria-live="polite">
          <div
            className="absolute inset-0 rounded-full border-2 border-border motion-reduce:opacity-80"
            aria-hidden
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/40 motion-reduce:animate-none"
            aria-hidden
          />
          <span className="sr-only">{label}</span>
        </div>
        <div className="space-y-1">
          <p className="font-display text-sm font-semibold tracking-tight text-fg">
            {BRAND.name}
          </p>
          <p className="text-sm text-fg-muted">{label}</p>
        </div>
        <div className="h-1 w-28 overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-2/5 animate-pulse rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
