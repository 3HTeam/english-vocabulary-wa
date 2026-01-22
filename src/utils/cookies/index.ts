/**
 * Utility functions for managing authentication cookies
 */

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

/**
 * Set access token in cookie
 */
export function setAccessTokenCookie(token: string, expiresAt: number) {
  if (typeof document === "undefined") return;

  // Calculate max age in seconds (expiresAt is in milliseconds)
  const maxAge = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure=${
    window.location.protocol === "https:"
  }`;
}

/**
 * Set refresh token in cookie
 */
export function setRefreshTokenCookie(token: string) {
  if (typeof document === "undefined") return;

  // Refresh token typically lasts 7 days
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

  document.cookie = `${REFRESH_TOKEN_COOKIE}=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure=${
    window.location.protocol === "https:"
  }`;
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies() {
  if (typeof document === "undefined") return;

  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${REFRESH_TOKEN_COOKIE}=; path=/; max-age=0`;
}

/**
 * Get access token from cookie (client-side only)
 */
export function getAccessTokenCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === ACCESS_TOKEN_COOKIE) {
      return value || null;
    }
  }
  return null;
}

/**
 * Cookie name constants for server-side access
 */
export const COOKIE_NAMES = {
  ACCESS_TOKEN: ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN: REFRESH_TOKEN_COOKIE,
} as const;
