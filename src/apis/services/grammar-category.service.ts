import { axiosClient, GRAMMAR_CATEGORY_ENDPOINTS } from "@/apis/config";
import { TParams } from "@/types/api";
import {
  TCreateGrammarCategoryResponse,
  TDeleteGrammarCategoryResponse,
  TForceDeleteGrammarCategoryResponse,
  TGrammarCategoriesResponse,
  TGrammarCategoryByIdResponse,
  TGrammarCategoryPayload,
  TRestoreGrammarCategoryResponse,
  TUpdateGrammarCategoryResponse,
} from "@/types/features";

export async function getGrammarCategories(
  params?: TParams,
): Promise<TGrammarCategoriesResponse> {
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
    const res = await axiosClient.get<TGrammarCategoriesResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getGrammarCategoryById(
  id: string,
): Promise<TGrammarCategoryByIdResponse> {
  try {
    const res = await axiosClient.get<TGrammarCategoryByIdResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createGrammarCategory(
  payload: TGrammarCategoryPayload,
): Promise<TCreateGrammarCategoryResponse> {
  try {
    const res = await axiosClient.post<TCreateGrammarCategoryResponse>(
      GRAMMAR_CATEGORY_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateGrammarCategory(
  id: string,
  payload: TGrammarCategoryPayload,
): Promise<TUpdateGrammarCategoryResponse> {
  try {
    const res = await axiosClient.put<TUpdateGrammarCategoryResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGrammarCategory(
  id: string,
): Promise<TDeleteGrammarCategoryResponse> {
  try {
    const res = await axiosClient.delete<TDeleteGrammarCategoryResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreGrammarCategory(
  id: string,
): Promise<TRestoreGrammarCategoryResponse> {
  try {
    const res = await axiosClient.patch<TRestoreGrammarCategoryResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteGrammarCategory(
  id: string,
): Promise<TForceDeleteGrammarCategoryResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteGrammarCategoryResponse>(
      `${GRAMMAR_CATEGORY_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
