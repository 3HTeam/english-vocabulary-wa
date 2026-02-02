import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { type Params } from "@/types/api";
import { TTopicPayload } from "@/types/features";

import { GRAMMAR_CATEGORY_QUERY_KEYS } from "./constants";

export const useGetGrammarCategoriesQuery = (params?: Params) => {
  return useQuery({
    queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories, params],
    queryFn: () => apiServices.grammarCategory.getGrammarCategories(params),
  });
};

export const useGetGrammarCategoryByIdQuery = (
  id: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategoryById, id],
    queryFn: () => apiServices.grammarCategory.getGrammarCategoryById(id),
    enabled: enabled && !!id,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCreateGrammarCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TTopicPayload) =>
      apiServices.grammarCategory.createGrammarCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories],
      });
    },
  });
};

export const useUpdateGrammarCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TTopicPayload }) =>
      apiServices.grammarCategory.updateGrammarCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories],
      });
    },
  });
};

export const useDeleteGrammarCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.grammarCategory.deleteGrammarCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories],
      });
    },
  });
};

export const useRestoreGrammarCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.grammarCategory.restoreGrammarCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories],
      });
    },
  });
};

export const useForceDeleteGrammarCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.grammarCategory.forceDeleteGrammarCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_CATEGORY_QUERY_KEYS.getGrammarCategories],
      });
    },
  });
};
