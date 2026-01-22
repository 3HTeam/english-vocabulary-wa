import { axiosClient, VOCABULARY_ENDPOINTS } from "@/apis/config";
import {
  TVocabularyResponse,
  TVocabularyPayload,
  TVocabularyByIdResponse,
  TCreateVocabularyResponse,
  TUpdateVocabularyResponse,
  TDeleteVocabularyResponse,
  TRestoreVocabularyResponse,
  TForceDeleteVocabularyResponse,
} from "@/types/features";
import { VocabularyParams } from "@/types/api";

export async function getVocabulary(
  params?: VocabularyParams,
): Promise<TVocabularyResponse> {
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
    if (params?.topicId) {
      queryParams.append("topicId", params.topicId);
    }
    const res = await axiosClient.get<TVocabularyResponse>(
      `${VOCABULARY_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getVocabularyById(
  id: string,
): Promise<TVocabularyByIdResponse> {
  try {
    const res = await axiosClient.get<TVocabularyByIdResponse>(
      `${VOCABULARY_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createVocabulary(
  payload: TVocabularyPayload,
): Promise<TCreateVocabularyResponse> {
  try {
    const res = await axiosClient.post<TCreateVocabularyResponse>(
      VOCABULARY_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateVocabulary(
  id: string,
  payload: TVocabularyPayload,
): Promise<TUpdateVocabularyResponse> {
  try {
    const res = await axiosClient.put<TUpdateVocabularyResponse>(
      `${VOCABULARY_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteVocabulary(
  id: string,
): Promise<TDeleteVocabularyResponse> {
  try {
    const res = await axiosClient.delete<TDeleteVocabularyResponse>(
      `${VOCABULARY_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreVocabulary(
  id: string,
): Promise<TRestoreVocabularyResponse> {
  try {
    const res = await axiosClient.patch<TRestoreVocabularyResponse>(
      `${VOCABULARY_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteVocabulary(
  id: string,
): Promise<TForceDeleteVocabularyResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteVocabularyResponse>(
      `${VOCABULARY_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
