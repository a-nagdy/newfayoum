import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionValue } from "@/lib/auth/session";

export async function isAuthenticatedRequest(
  request: NextRequest,
): Promise<boolean> {
  return verifySessionValue(request.cookies.get(SESSION_COOKIE)?.value);
}
