import { Params } from "@/types/api";
import {
  TUpdateUserResponse,
  TUserByIdResponse,
  TUserPayload,
  TUsersResponse,
} from "@/types/features/user";

import { axiosClient, USER_ENDPOINTS } from "../config";

export async function getUser(params?: Params): Promise<TUsersResponse> {
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
    const res = await axiosClient.get<TUsersResponse>(
      `${USER_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string): Promise<TUserByIdResponse> {
  try {
    const res = await axiosClient.get<TUserByIdResponse>(
      `${USER_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  id: string,
  payload: TUserPayload,
): Promise<TUpdateUserResponse> {
  try {
    const res = await axiosClient.put<TUpdateUserResponse>(
      `${USER_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}


