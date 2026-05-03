import { HiExclamationTriangle } from "react-icons/hi2";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

export function QueryError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <Card className="mx-auto max-w-lg overflow-hidden" role="alert">
      <div className="border-b border-border bg-danger-muted/40 px-6 py-4 dark:bg-danger-muted/15">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-danger-muted text-danger dark:bg-danger-muted/30 dark:text-danger">
            <HiExclamationTriangle className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-fg">Something went wrong</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{message}</p>
          </div>
        </div>
      </div>
      {onRetry ? (
        <div className="flex justify-end gap-2 bg-surface-muted/50 px-6 py-4 dark:bg-surface-muted/30">
          <Button type="button" variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
