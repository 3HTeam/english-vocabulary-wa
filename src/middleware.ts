import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAMES } from "@/lib/cookies";
import { routing } from "@/lib/i18n/routing";

const protectedRoutes = [
  "/dashboard",
  "/topics",
  "/tasks",
  "/chat",
  "/users",
  "/billing",
  "/templates",
  "/settings",
  "/help-center",
];

const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Extract locale from pathname or use default
  const pathnameWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";
  const locale = pathname.match(/^\/(en|vi)/)?.[1] || routing.defaultLocale;

  
  // Normalize pathname for route checking (remove locale prefix)
  const normalizedPathname = pathnameWithoutLocale === "" ? "/" : pathnameWithoutLocale;

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const hasValidToken = accessToken || refreshToken;

  // Check if route is protected (without locale prefix)
  const isProtectedRoute = protectedRoutes.some(
    (route) => normalizedPathname === route || normalizedPathname.startsWith(`${route}/`)
  );

  // Check if route is auth route (without locale prefix)
  const isAuthRoute = authRoutes.some(
    (route) => normalizedPathname === route || normalizedPathname.startsWith(`${route}/`)
  );

  // Handle authentication redirects before locale routing
  if (isProtectedRoute && !hasValidToken) {
    const signInUrl = new URL(`/${locale}/sign-in`, request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL(`/${locale}/topics`, request.url));
  }

  if (normalizedPathname === "/") {
    if (hasValidToken) {
      return NextResponse.redirect(new URL(`/${locale}/topics`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }
  }

  // Then handle locale routing with next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
