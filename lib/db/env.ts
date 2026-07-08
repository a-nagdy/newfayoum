/** Strip accidental quotes/spaces from env vars set in Hostinger hPanel. */
export function normalizeDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return;

  const cleaned = raw.trim().replace(/^["']+|["']+$/g, "");
  if (cleaned !== raw) {
    process.env.DATABASE_URL = cleaned;
  }
}
