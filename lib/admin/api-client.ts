export async function putApi<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => null)) as {
    error?: string;
  } | T | null;

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data && data.error
        ? data.error
        : "Save failed";
    throw new Error(message);
  }

  return data as T;
}
