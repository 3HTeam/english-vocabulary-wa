import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { LOCALES } from "@/constants/i18n";
import { ROUTE_PATH } from "@/constants/routes";
import { COOKIE_NAMES } from "@/utils/cookies";

const protectedRoutes = Object.values(ROUTE_PATH.admin);

const authRoutes = Object.values(ROUTE_PATH.auth);

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname or use default
  const localeRegex = new RegExp(`^\\/(${LOCALES.join("|")})`);
  const localeMatch = pathname.match(localeRegex);
  const locale = localeMatch?.[1] || routing.defaultLocale;

  // Normalize pathname for route checking (remove locale prefix)
  const pathnameWithoutLocale = pathname.replace(localeRegex, "") || "/";
  const normalizedPathname =
    pathnameWithoutLocale === "" ? "/" : pathnameWithoutLocale;

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const hasValidToken = accessToken || refreshToken;

  // Check if route is protected (without locale prefix)
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      normalizedPathname === route ||
      normalizedPathname.startsWith(`${route}/`),
  );

  // Check if route is auth route (without locale prefix)
  const isAuthRoute = authRoutes.some(
    (route) =>
      normalizedPathname === route ||
      normalizedPathname.startsWith(`${route}/`),
  );

  // Handle authentication redirects before locale routing
  if (isProtectedRoute && !hasValidToken) {
    const signInUrl = new URL(
      `/${locale}${ROUTE_PATH.auth.signIn}`,
      request.url,
    );
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(
      new URL(`/${locale}${ROUTE_PATH.admin.topics}`, request.url),
    );
  }

  if (normalizedPathname === ROUTE_PATH.public.home) {
    if (hasValidToken) {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTE_PATH.admin.topics}`, request.url),
      );
    } else {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTE_PATH.auth.signIn}`, request.url),
      );
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
