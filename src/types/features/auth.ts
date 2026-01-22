import { type ApiResponse } from "@/types/api";

export type TAuthUser = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
  role: "admin" | "user";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type TAuthData = {
  user: TAuthUser;
  session: TAuthSession;
};

export type TSignInPayload = {
  email: string;
  password: string;
};

export type TSignInResponse = ApiResponse<TAuthData>;

export type TSignUpPayload = {
  email: string;
  password: string;
  fullName: string;
};

export type ISignUpResponse = ApiResponse<TAuthData>;

export type TRefreshTokenPayload = {
  refreshToken?: string;
};

export type TRefreshTokenData = {
  session: TAuthSession;
};

export type TRefreshTokenResponse = ApiResponse<TRefreshTokenData>;

export type TVerifyEmailPayload = {
  email: string;
  otp: string;
};

export type TVerifyEmailResponse = ApiResponse<TAuthData>;

export type TSignOutResponse = ApiResponse<void>;
