import { AUTH_ENDPOINTS, axiosClient } from "@/apis/config";
import {
  IProfileResponse,
  type ISignUpResponse,
  type TRefreshTokenPayload,
  type TRefreshTokenResponse,
  type TSignInPayload,
  type TSignInResponse,
  type TSignOutResponse,
  type TSignUpPayload,
  type TVerifyEmailPayload,
  type TVerifyEmailResponse,
} from "@/types/features";

export async function signUp(
  payload: TSignUpPayload,
): Promise<ISignUpResponse> {
  try {
    const res = await axiosClient.post<ISignUpResponse>(
      AUTH_ENDPOINTS.register,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(
  payload: TSignInPayload,
): Promise<TSignInResponse> {
  try {
    const res = await axiosClient.post<TSignInResponse>(
      AUTH_ENDPOINTS.login,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmail(
  payload: TVerifyEmailPayload,
): Promise<TVerifyEmailResponse> {
  try {
    const res = await axiosClient.post<TVerifyEmailResponse>(
      AUTH_ENDPOINTS.verifyEmail,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(
  payload?: TRefreshTokenPayload,
): Promise<TRefreshTokenResponse> {
  try {
    const res = await axiosClient.post<TRefreshTokenResponse>(
      AUTH_ENDPOINTS.refresh,
      payload || {},
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signOut(): Promise<TSignOutResponse> {
  try {
    const res = await axiosClient.post<TSignOutResponse>(AUTH_ENDPOINTS.logout);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function profile(): Promise<IProfileResponse> {
  try {
    const res = await axiosClient.get<IProfileResponse>(AUTH_ENDPOINTS.profile);
    return res.data;
  } catch (error) {
    throw error;
  }
}
