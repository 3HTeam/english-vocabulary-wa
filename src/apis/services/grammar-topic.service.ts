import { axiosClient, GRAMMAR_TOPIC_ENDPOINTS } from "@/apis/config";
import { Params } from "@/types/api";
import {
  TCreateGrammarTopicResponse,
  TDeleteGrammarTopicResponse,
  TForceDeleteGrammarTopicResponse,
  TGrammarTopicByIdResponse,
  TGrammarTopicPayload,
  TGrammarTopicsResponse,
  TRestoreGrammarTopicResponse,
  TUpdateGrammarTopicResponse,
} from "@/types/features";

export async function getGrammarTopics(
  params?: Params,
): Promise<TGrammarTopicsResponse> {
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
    const res = await axiosClient.get<TGrammarTopicsResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getGrammarTopicById(
  id: string,
): Promise<TGrammarTopicByIdResponse> {
  try {
    const res = await axiosClient.get<TGrammarTopicByIdResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createGrammarTopic(
  payload: TGrammarTopicPayload,
): Promise<TCreateGrammarTopicResponse> {
  try {
    const res = await axiosClient.post<TCreateGrammarTopicResponse>(
      GRAMMAR_TOPIC_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateGrammarTopic(
  id: string,
  payload: TGrammarTopicPayload,
): Promise<TUpdateGrammarTopicResponse> {
  try {
    const res = await axiosClient.put<TUpdateGrammarTopicResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGrammarTopic(
  id: string,
): Promise<TDeleteGrammarTopicResponse> {
  try {
    const res = await axiosClient.delete<TDeleteGrammarTopicResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreGrammarTopic(
  id: string,
): Promise<TRestoreGrammarTopicResponse> {
  try {
    const res = await axiosClient.patch<TRestoreGrammarTopicResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteGrammarTopic(
  id: string,
): Promise<TForceDeleteGrammarTopicResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteGrammarTopicResponse>(
      `${GRAMMAR_TOPIC_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
