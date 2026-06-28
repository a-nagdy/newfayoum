import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isAuthenticatedRequest } from "@/lib/auth/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_API_PATHS = ["/api/auth/login"];

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isPublicAdminPath(pathname: string) {
  return PUBLIC_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isPublicApiPath(pathname: string) {
  return PUBLIC_API_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (isPublicAdminPath(pathname)) {
      return NextResponse.next();
    }

    if (!(await isAuthenticatedRequest(request))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    if (isPublicApiPath(pathname)) {
      return NextResponse.next();
    }

    // GET (and HEAD/OPTIONS) are public — used by the website
    if (READ_METHODS.has(request.method)) {
      return NextResponse.next();
    }

    // POST / PUT / DELETE require admin session
    if (!(await isAuthenticatedRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/admin/:path*", "/api/:path*"],
};
