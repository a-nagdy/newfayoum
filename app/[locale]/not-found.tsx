import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-24 text-center">
      <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-6 text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
      >
        Go Home
      </Link>
    </div>
  );
}
