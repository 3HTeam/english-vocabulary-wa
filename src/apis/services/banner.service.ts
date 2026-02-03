import { TParams } from "@/types/api";
import {
  TBannerByIdResponse,
  TBannerPayload,
  TBannersResponse,
  TCreateBannerResponse,
  TDeleteBannerResponse,
  TForceDeleteBannerResponse,
  TRestoreBannerResponse,
  TUpdateBannerResponse,
} from "@/types/features/banner";

import { axiosClient, BANNER_ENDPOINTS } from "../config";

export async function getBanner(params: TParams): Promise<TBannersResponse> {
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
    const res = await axiosClient.get<TBannersResponse>(
      `${BANNER_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getBannerById(id: string): Promise<TBannerByIdResponse> {
  try {
    const res = await axiosClient.get<TBannerByIdResponse>(
      `${BANNER_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createBanner(
  payload: TBannerPayload,
): Promise<TCreateBannerResponse> {
  try {
    const res = await axiosClient.post<TCreateBannerResponse>(
      BANNER_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateBanner(
  id: string,
  payload: TBannerPayload,
): Promise<TUpdateBannerResponse> {
  try {
    const res = await axiosClient.put<TUpdateBannerResponse>(
      `${BANNER_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBanner(id: string): Promise<TDeleteBannerResponse> {
  try {
    const res = await axiosClient.delete<TDeleteBannerResponse>(
      `${BANNER_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreBanner(
  id: string,
): Promise<TRestoreBannerResponse> {
  try {
    const res = await axiosClient.patch<TRestoreBannerResponse>(
      `${BANNER_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteBanner(
  id: string,
): Promise<TForceDeleteBannerResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteBannerResponse>(
      `${BANNER_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
