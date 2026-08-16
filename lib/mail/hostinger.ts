import { getSection } from "@/lib/content/store";

const MAIL_API_BASE = "https://api.mail.hostinger.com/api/v1";

type Mailbox = {
  resourceId?: string;
  resource_id?: string;
  address?: string;
};

function getMailToken() {
  return process.env.HOSTINGER_MAIL_API_TOKEN?.trim() || null;
}

function getConfiguredMailboxId() {
  return process.env.HOSTINGER_MAIL_MAILBOX_ID?.trim() || null;
}

export function getContactInboxEmail() {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.HOSTINGER_MAIL_FROM?.trim() ||
    "info@newfayoum.com"
  );
}

async function mailFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  const token = getMailToken();
  if (!token) {
    throw new Error("HOSTINGER_MAIL_API_TOKEN is not configured");
  }

  const res = await fetch(`${MAIL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (res.status === 204) {
    return null;
  }

  const raw = await res.text();
  const body = raw
    ? (JSON.parse(raw) as { data?: T; error?: string; message?: string })
    : null;

  if (!res.ok) {
    const message =
      body?.error || body?.message || `Hostinger Mail API error (${res.status})`;
    throw new Error(message);
  }

  if (body && "data" in body) {
    return body.data as T;
  }

  return body as T | null;
}

async function resolveMailboxResourceId(preferredAddress: string) {
  const configured = getConfiguredMailboxId();
  if (configured) return configured;

  const account = await mailFetch<{ mailboxes?: Mailbox[] }>("/me");
  const mailboxes = account?.mailboxes ?? [];
  const normalized = preferredAddress.toLowerCase();

  const match =
    mailboxes.find(
      (box) => (box.address ?? "").toLowerCase() === normalized,
    ) ?? mailboxes[0];

  const id = match?.resourceId ?? match?.resource_id;
  if (!id) {
    throw new Error(
      "No Hostinger mailbox found. Set HOSTINGER_MAIL_MAILBOX_ID in env.",
    );
  }

  return id;
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const inbox = getContactInboxEmail();
  const mailboxId = await resolveMailboxResourceId(inbox);

  let to = inbox;
  try {
    const settings = await getSection("settings");
    if (settings.email?.trim()) to = settings.email.trim();
  } catch {
    // keep inbox fallback
  }

  const subject =
    input.subject?.trim() ||
    `New contact message from ${input.name.trim()}`;

  const text = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    input.phone?.trim() ? `Phone: ${input.phone.trim()}` : null,
    "",
    "Message:",
    input.message.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");

  await mailFetch(`/mailboxes/${mailboxId}/send`, {
    method: "POST",
    body: JSON.stringify({
      to: [to],
      subject,
      text,
    }),
  });
}

export function isMailConfigured() {
  return Boolean(getMailToken());
}
