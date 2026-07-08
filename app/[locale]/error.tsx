"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-2xl font-bold text-primary">Something went wrong</h1>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">
        {error.message || "The page failed to load. This is often a database connection issue on first deploy."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
