import axiosClient from "../config/axios-client";
import {
  TTopicPayload,
  TCreateTopicResponse,
  TTopicByIdResponse,
  TTopicResponse,
  TUpdateTopicResponse,
  TDeleteTopicResponse,
} from "@/types/topic.type";
import { TOPIC_ENDPOINTS } from "../config/end-point";
import { Params } from "@/types/params";

export async function getTopicServices(
  params?: Params
): Promise<TTopicResponse> {
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
      `${TOPIC_ENDPOINTS.base}?${queryParams.toString()}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicByIdServices(
  id: string
): Promise<TTopicByIdResponse> {
  try {
    const res = await axiosClient.get<TTopicByIdResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createTopicServices(
  payload: TTopicPayload
): Promise<TCreateTopicResponse> {
  try {
    const res = await axiosClient.post<TCreateTopicResponse>(
      TOPIC_ENDPOINTS.base,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTopicServices(
  id: string,
  payload: TTopicPayload
): Promise<TUpdateTopicResponse> {
  try {
    const res = await axiosClient.patch<TUpdateTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTopicServices(
  id: string
): Promise<TDeleteTopicResponse> {
  try {
    const res = await axiosClient.delete<TDeleteTopicResponse>(
      `${TOPIC_ENDPOINTS.base}/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
