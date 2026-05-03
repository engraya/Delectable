export function QueryError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="mx-auto max-w-lg rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-center"
      role="alert"
    >
      <p className="text-red-800 dark:text-red-200">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
