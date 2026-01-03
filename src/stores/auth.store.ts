import { create } from "zustand";
import type { TAuthUser, TAuthSession } from "@/types/features/auth";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  clearAuthCookies,
} from "@/lib/auth/cookies";

const STORAGE_KEY = "lingo_auth";

type PersistedAuth = {
  user: TAuthUser;
  session: TAuthSession;
};

const loadPersistedAuth = (): PersistedAuth | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedAuth;
    if (parsed?.user && parsed?.session?.accessToken) {
      return parsed;
    }
  } catch {}
  return null;
};

const persistAuth = (value: PersistedAuth | null) => {
  if (typeof window === "undefined") return;
  if (!value) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

interface AuthState {
  signupEmail: string | null;
  setSignupEmail: (email: string | null) => void;
  clearSignupEmail: () => void;

  user: TAuthUser | null;
  session: TAuthSession | null;
  isAuthenticated: boolean;

  setAuth: (user: TAuthUser, session: TAuthSession) => void;
  clearAuth: () => void;
  updateSession: (session: TAuthSession) => void;
  updateAccessToken: (accessToken: string, expiresAt: string) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const persisted = loadPersistedAuth();

  return {
    signupEmail: null,
    setSignupEmail: (email) => set({ signupEmail: email }),
    clearSignupEmail: () => set({ signupEmail: null }),

    user: persisted?.user ?? null,
    session: persisted?.session ?? null,
    isAuthenticated: Boolean(persisted?.session?.accessToken),

    setAuth: (user, session) => {
      const expiresAtMs = new Date(session.expiresAt).getTime();

      setAccessTokenCookie(session.accessToken, expiresAtMs);
      setRefreshTokenCookie(session.refreshToken);

      persistAuth({ user, session });

      set({
        user,
        session,
        isAuthenticated: true,
      });
    },

    clearAuth: () => {
      clearAuthCookies();
      persistAuth(null);

      set({
        user: null,
        session: null,
        isAuthenticated: false,
      });
    },

    updateSession: (session) => {
      const expiresAtMs = new Date(session.expiresAt).getTime();

      setAccessTokenCookie(session.accessToken, expiresAtMs);
      setRefreshTokenCookie(session.refreshToken);

      set((state) => {
        if (state.user) {
          persistAuth({ user: state.user, session });
        }
        return { session };
      });
    },

    updateAccessToken: (accessToken, expiresAt) => {
      set((state) => {
        if (!state.session) return state;

        const expiresAtMs = new Date(expiresAt).getTime();
        setAccessTokenCookie(accessToken, expiresAtMs);

        const updatedSession = {
          ...state.session,
          accessToken,
          expiresAt,
        };
        if (state.user) {
          persistAuth({ user: state.user, session: updatedSession });
        }

        return { session: updatedSession };
      });
    },
  };
});
