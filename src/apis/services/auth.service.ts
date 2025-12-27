import axiosClient from "@/apis/config/axios-client";
import { AUTH_ENDPOINTS } from "@/apis/config/end-point";
import type {
  TSignInPayload,
  TSignInResponse,
  TRefreshTokenPayload,
  TRefreshTokenResponse,
  TSignOutResponse,
  TSignUpPayload,
  ISignUpResponse,
  TVerifyEmailPayload,
  TVerifyEmailResponse,
} from "@/types/auth.type";
import { IProfileResponse } from "@/types/profile.type";

export async function signUpServices(
  payload: TSignUpPayload
): Promise<ISignUpResponse> {
  try {
    const res = await axiosClient.post<ISignUpResponse>(
      AUTH_ENDPOINTS.register,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signInServices(
  payload: TSignInPayload
): Promise<TSignInResponse> {
  try {
    const res = await axiosClient.post<TSignInResponse>(
      AUTH_ENDPOINTS.login,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmailServices(
  payload: TVerifyEmailPayload
): Promise<TVerifyEmailResponse> {
  try {
    const res = await axiosClient.post<TVerifyEmailResponse>(
      AUTH_ENDPOINTS.verifyEmail,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshTokenServices(
  payload?: TRefreshTokenPayload
): Promise<TRefreshTokenResponse> {
  try {
    const res = await axiosClient.post<TRefreshTokenResponse>(
      AUTH_ENDPOINTS.refresh,
      payload || {}
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signOutServices(): Promise<TSignOutResponse> {
  try {
    const res = await axiosClient.post<TSignOutResponse>(AUTH_ENDPOINTS.logout);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function profileServices(): Promise<IProfileResponse> {
  try {
    const res = await axiosClient.get<IProfileResponse>(AUTH_ENDPOINTS.profile);
    return res.data;
  } catch (error) {
    throw error;
  }
}
