import { axiosClient, GRAMMAR_EXERCISE_ENDPOINTS } from "@/apis/config";
import { Params } from "@/types/api";
import {
  TCreateGrammarExerciseResponse,
  TDeleteGrammarExerciseResponse,
  TForceDeleteGrammarExerciseResponse,
  TGrammarExerciseByIdResponse,
  TGrammarExercisePayload,
  TGrammarExercisesResponse,
  TRestoreGrammarExerciseResponse,
  TUpdateGrammarExerciseResponse,
} from "@/types/features";

export async function getGrammarExercises(
  params?: Params,
): Promise<TGrammarExercisesResponse> {
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
    const res = await axiosClient.get<TGrammarExercisesResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}?${queryParams.toString()}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getGrammarExerciseById(
  id: string,
): Promise<TGrammarExerciseByIdResponse> {
  try {
    const res = await axiosClient.get<TGrammarExerciseByIdResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createGrammarExercise(
  payload: TGrammarExercisePayload,
): Promise<TCreateGrammarExerciseResponse> {
  try {
    const res = await axiosClient.post<TCreateGrammarExerciseResponse>(
      GRAMMAR_EXERCISE_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateGrammarExercise(
  id: string,
  payload: TGrammarExercisePayload,
): Promise<TUpdateGrammarExerciseResponse> {
  try {
    const res = await axiosClient.put<TUpdateGrammarExerciseResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGrammarExercise(
  id: string,
): Promise<TDeleteGrammarExerciseResponse> {
  try {
    const res = await axiosClient.delete<TDeleteGrammarExerciseResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function restoreGrammarExercise(
  id: string,
): Promise<TRestoreGrammarExerciseResponse> {
  try {
    const res = await axiosClient.patch<TRestoreGrammarExerciseResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}/${id}/restore`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function forceDeleteGrammarExercise(
  id: string,
): Promise<TForceDeleteGrammarExerciseResponse> {
  try {
    const res = await axiosClient.delete<TForceDeleteGrammarExerciseResponse>(
      `${GRAMMAR_EXERCISE_ENDPOINTS.base}/${id}/force`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
