import { axiosClient, MODULE_ENDPOINTS } from "@/apis/config";
import { TParams } from "@/types/api";
import {
  TCreateModuleResponse,
  TDeleteModuleResponse,
  TForceDeleteModuleResponse,
  TModuleByIdResponse,
  TModulePayload,
  TModulesResponse,
  TRestoreModuleResponse,
  TUpdateModuleResponse,
} from "@/types/features/module";

export async function getModule(params: TParams): Promise<TModulesResponse> {
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
    const res = await axiosClient.get<TModulesResponse>(
      `${MODULE_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getModuleById(id: string): Promise<TModuleByIdResponse> {
  try {
    const res = await axiosClient.get<TModuleByIdResponse>(
      `${MODULE_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createModule(
  payload: TModulePayload,
): Promise<TCreateModuleResponse> {
  try {
    const res = await axiosClient.post<TCreateModuleResponse>(
      MODULE_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateModule(
  id: string,
  payload: TModulePayload,
): Promise<TUpdateModuleResponse> {
  try {
    const res = await axiosClient.put<TUpdateModuleResponse>(
      `${MODULE_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteModule(id: string): Promise<TDeleteModuleResponse> {
  try {
    const res = await axiosClient.delete<TDeleteModuleResponse>(
      `${MODULE_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreModule(
  id: string,
): Promise<TRestoreModuleResponse> {
  try {
    const res = await axiosClient.patch<TRestoreModuleResponse>(
      `${MODULE_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteModule(
  id: string,
): Promise<TForceDeleteModuleResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteModuleResponse>(
      `${MODULE_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
