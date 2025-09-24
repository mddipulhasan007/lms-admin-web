import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/config";

export default async function middleware(request: NextRequest) {
  // ---- i18n setup ----
  const defaultLocale = request.headers.get("dashcode-locale") || "en";
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });

  let response = handleI18nRouting(request);

  // ---- Auth check ----
  const token = request.cookies.get("access_token")?.value || null;
  const { pathname } = request.nextUrl;

  // If no token → block user + dashboard routes → redirect to /en
  if (!token && (pathname.startsWith("/en/users") || pathname.startsWith("/en/dashboard"))) {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // If logged in → stop accessing login page → redirect to dashboard
  if (token && pathname === "/en") {
    return NextResponse.redirect(new URL("/en/dashboard/dash-ecom", request.url));
  }

  // Add custom headers (optional)
  response.headers.set("dashcode-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"], // keep intl matcher
};
