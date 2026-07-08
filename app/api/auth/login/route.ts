import { NextResponse } from "next/server";
import {
  createSessionValue,
  getSessionCookieOptions,
  SESSION_COOKIE,
  validateCredentials,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      SESSION_COOKIE,
      await createSessionValue(),
      getSessionCookieOptions(),
    );
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create session";
    console.error("[auth/login]", message);
    return NextResponse.json(
      {
        error:
          message.includes("AUTH_SECRET")
            ? "Server misconfigured: AUTH_SECRET is missing"
            : "Login failed on server",
      },
      { status: 500 },
    );
  }
}
