import { NextResponse } from "next/server";
import { isMailConfigured, sendContactEmail } from "@/lib/mail/hostinger";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!isMailConfigured()) {
    return NextResponse.json(
      { error: "Email is not configured on the server yet." },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Failed to send message";
    console.error("[contact]", messageText);
    return NextResponse.json({ error: messageText }, { status: 502 });
  }
}
