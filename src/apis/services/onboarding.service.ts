import { TParams } from "@/types/api";
import {
  TCreateOnboardingResponse,
  TDeleteOnboardingResponse,
  TForceDeleteOnboardingResponse,
  TOnboardingByIdResponse,
  TOnboardingPayload,
  TOnboardingsResponse,
  TRestoreOnboardingResponse,
  TUpdateOnboardingResponse,
} from "@/types/features/onboarding";

import { axiosClient, ONBOARDING_ENDPOINTS } from "../config";

export async function getOnboarding(
  params: TParams,
): Promise<TOnboardingsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.search) {
      queryParams.append("search", params.search);
    }
    if (params?.status !== undefined) {
      queryParams.append("status", params.status);
    }
    if (params?.isDeleted !== undefined) {
      queryParams.append("isDeleted", params.isDeleted.toString());
    }
    const res = await axiosClient.get<TOnboardingsResponse>(
      `${ONBOARDING_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getOnboardingById(
  id: string,
): Promise<TOnboardingByIdResponse> {
  try {
    const res = await axiosClient.get<TOnboardingByIdResponse>(
      `${ONBOARDING_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createOnboarding(
  payload: TOnboardingPayload,
): Promise<TCreateOnboardingResponse> {
  try {
    const res = await axiosClient.post<TCreateOnboardingResponse>(
      ONBOARDING_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateOnboarding(
  id: string,
  payload: TOnboardingPayload,
): Promise<TUpdateOnboardingResponse> {
  try {
    const res = await axiosClient.put<TUpdateOnboardingResponse>(
      `${ONBOARDING_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOnboarding(
  id: string,
): Promise<TDeleteOnboardingResponse> {
  try {
    const res = await axiosClient.delete<TDeleteOnboardingResponse>(
      `${ONBOARDING_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreOnboarding(
  id: string,
): Promise<TRestoreOnboardingResponse> {
  try {
    const res = await axiosClient.patch<TRestoreOnboardingResponse>(
      `${ONBOARDING_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteOnboarding(
  id: string,
): Promise<TForceDeleteOnboardingResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteOnboardingResponse>(
      `${ONBOARDING_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
