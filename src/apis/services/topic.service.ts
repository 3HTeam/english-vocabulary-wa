import { axiosClient, TOPIC_ENDPOINTS } from "@/apis/config";
import { Params } from "@/types/api";
import {
  TCreateTopicResponse,
  TDeleteTopicResponse,
  TForceDeleteTopicResponse,
  TRestoreTopicResponse,
  TTopicByIdResponse,
  TTopicPayload,
  TTopicResponse,
  TUpdateTopicResponse,
} from "@/types/features";

export async function getTopic(params?: Params): Promise<TTopicResponse> {
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
    const res = await axiosClient.get<TTopicResponse>(
      `${TOPIC_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicById(id: string): Promise<TTopicByIdResponse> {
  try {
    const res = await axiosClient.get<TTopicByIdResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createTopic(
  payload: TTopicPayload,
): Promise<TCreateTopicResponse> {
  try {
    const res = await axiosClient.post<TCreateTopicResponse>(
      TOPIC_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTopic(
  id: string,
  payload: TTopicPayload,
): Promise<TUpdateTopicResponse> {
  try {
    const res = await axiosClient.put<TUpdateTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTopic(id: string): Promise<TDeleteTopicResponse> {
  try {
    const res = await axiosClient.delete<TDeleteTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreTopic(id: string): Promise<TRestoreTopicResponse> {
  try {
    const res = await axiosClient.patch<TRestoreTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteTopic(
  id: string,
): Promise<TForceDeleteTopicResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
