import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
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

import { GRAMMAR_EXERCISE_QUERY_KEYS } from "./constants";

export const useGetGrammarExercisesQuery = (params?: TParams) => {
  return useQuery<TGrammarExercisesResponse>({
    queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.list(params),
    queryFn: () => apiServices.grammarExercise.getGrammarExercises(params),
  });
};

export const useGetGrammarExerciseByIdQuery = (
  id: string,
  enabled: boolean = true,
  options?: Omit<
    UseQueryOptions<TGrammarExerciseByIdResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<TGrammarExerciseByIdResponse>({
    queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.detail(id),
    queryFn: () => apiServices.grammarExercise.getGrammarExerciseById(id),
    enabled: enabled && !!id,
    ...options,
  });
};

export const useCreateGrammarExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TCreateGrammarExerciseResponse,
    Error,
    TGrammarExercisePayload
  >({
    mutationFn: (payload) =>
      apiServices.grammarExercise.createGrammarExercise(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.lists(),
      });
    },
  });
};

export const useUpdateGrammarExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TUpdateGrammarExerciseResponse,
    Error,
    { id: string; payload: TGrammarExercisePayload }
  >({
    mutationFn: ({ id, payload }) =>
      apiServices.grammarExercise.updateGrammarExercise(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.detail(variables.id),
      });
    },
  });
};

export const useDeleteGrammarExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TDeleteGrammarExerciseResponse, Error, string>({
    mutationFn: (id) => apiServices.grammarExercise.deleteGrammarExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.lists(),
      });
    },
  });
};

export const useRestoreGrammarExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TRestoreGrammarExerciseResponse, Error, string>({
    mutationFn: (id) => apiServices.grammarExercise.restoreGrammarExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.lists(),
      });
    },
  });
};

export const useForceDeleteGrammarExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TForceDeleteGrammarExerciseResponse, Error, string>({
    mutationFn: (id) =>
      apiServices.grammarExercise.forceDeleteGrammarExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GRAMMAR_EXERCISE_QUERY_KEYS.lists(),
      });
    },
  });
};
