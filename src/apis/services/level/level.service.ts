import { axiosClient, LEVEL_ENDPOINTS } from "@/apis/config";
import { TParams } from "@/types/api";
import {
  TCreateLevelResponse,
  TDeleteLevelResponse,
  TForceDeleteLevelResponse,
  TLevelByIdResponse,
  TLevelPayload,
  TLevelsResponse,
  TRestoreLevelResponse,
  TUpdateLevelResponse,
} from "@/types/features/level";

export async function getLevel(params?: TParams): Promise<TLevelsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.search) {
      queryParams.append("search", params.search);
    }
    if (params?.status) {
      queryParams.append("status", params.status);
    }
    if (params?.isDeleted !== undefined) {
      queryParams.append("isDeleted", params.isDeleted.toString());
    }
    const res = await axiosClient.get<TLevelsResponse>(
      `${LEVEL_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getLevelById(id: string): Promise<TLevelByIdResponse> {
  try {
    const res = await axiosClient.get<TLevelByIdResponse>(
      `${LEVEL_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createLevel(
  payload: TLevelPayload,
): Promise<TCreateLevelResponse> {
  try {
    const res = await axiosClient.post<TCreateLevelResponse>(
      LEVEL_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateLevel(
  id: string,
  payload: TLevelPayload,
): Promise<TUpdateLevelResponse> {
  try {
    const res = await axiosClient.put(`${LEVEL_ENDPOINTS.base}/${id}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLevel(id: string): Promise<TDeleteLevelResponse> {
  try {
    const res = await axiosClient.delete(`${LEVEL_ENDPOINTS.base}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreLevel(id: string): Promise<TRestoreLevelResponse> {
  try {
    const res = await axiosClient.patch(
      `${LEVEL_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteLevel(
  id: string,
): Promise<TForceDeleteLevelResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteLevelResponse>(
      `${LEVEL_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
