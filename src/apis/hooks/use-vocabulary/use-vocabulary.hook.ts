import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { VocabularyParams } from "@/types/api";
import { TVocabularyPayload } from "@/types/features";

import { VOCABULARY_QUERY_KEYS } from "./constants";

export const useGetVocabularyQuery = (params?: VocabularyParams) => {
  return useQuery({
    queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary, params],
    queryFn: () => apiServices.vocabulary.getVocabulary(params),
  });
};

export const useGetVocabularyByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary, id],
    queryFn: () => apiServices.vocabulary.getVocabularyById(id),
    enabled: !!id,
  });
};

export const useCreateVocabularyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TVocabularyPayload) =>
      apiServices.vocabulary.createVocabulary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary],
      });
    },
  });
};

export const useUpdateVocabularyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TVocabularyPayload;
    }) => apiServices.vocabulary.updateVocabulary(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary],
      });
    },
  });
};

export const useDeleteVocabularyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.vocabulary.deleteVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary],
      });
    },
  });
};

export const useRestoreVocabularyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.vocabulary.restoreVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary],
      });
    },
  });
};

export const useForceDeleteVocabularyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.vocabulary.forceDeleteVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VOCABULARY_QUERY_KEYS.getVocabulary],
      });
    },
  });
};
