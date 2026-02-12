import { axiosClient, POPUP_ENDPOINTS } from "@/apis/config";
import { TParams } from "@/types/api";
import {
  TCreatePopupResponse,
  TDeletePopupResponse,
  TForceDeletePopupResponse,
  TPopupByIdResponse,
  TPopupPayload,
  TPopupsResponse,
  TRestorePopupResponse,
  TUpdatePopupResponse,
} from "@/types/features/popup";

export async function getPopup(params: TParams): Promise<TPopupsResponse> {
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
    const res = await axiosClient.get<TPopupsResponse>(
      `${POPUP_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getPopupById(id: string): Promise<TPopupByIdResponse> {
  try {
    const res = await axiosClient.get<TPopupByIdResponse>(
      `${POPUP_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createPopup(
  payload: TPopupPayload,
): Promise<TCreatePopupResponse> {
  try {
    const res = await axiosClient.post<TCreatePopupResponse>(
      POPUP_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePopup(
  id: string,
  payload: TPopupPayload,
): Promise<TUpdatePopupResponse> {
  try {
    const res = await axiosClient.put<TUpdatePopupResponse>(
      `${POPUP_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePopup(id: string): Promise<TDeletePopupResponse> {
  try {
    const res = await axiosClient.delete<TDeletePopupResponse>(
      `${POPUP_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restorePopup(id: string): Promise<TRestorePopupResponse> {
  try {
    const res = await axiosClient.patch<TRestorePopupResponse>(
      `${POPUP_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeletePopup(
  id: string,
): Promise<TForceDeletePopupResponse> {
  try {
    const res = await axiosClient.delete<TForceDeletePopupResponse>(
      `${POPUP_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
