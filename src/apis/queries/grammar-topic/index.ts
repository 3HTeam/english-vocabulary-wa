import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { type TParams } from "@/types/api";
import { TGrammarTopicPayload } from "@/types/features";

import { GRAMMAR_TOPIC_QUERY_KEYS } from "./constants";

export const useGetGrammarTopicsQuery = (params?: TParams) => {
  return useQuery({
    queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics, params],
    queryFn: () => apiServices.grammarTopic.getGrammarTopics(params),
  });
};

export const useGetGrammarTopicByIdQuery = (
  id: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopicById, id],
    queryFn: () => apiServices.grammarTopic.getGrammarTopicById(id),
    enabled: enabled && !!id,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCreateGrammarTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TGrammarTopicPayload) =>
      apiServices.grammarTopic.createGrammarTopic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics],
      });
    },
  });
};

export const useUpdateGrammarTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TGrammarTopicPayload;
    }) => apiServices.grammarTopic.updateGrammarTopic(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics],
      });
    },
  });
};

export const useDeleteGrammarTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.grammarTopic.deleteGrammarTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics],
      });
    },
  });
};

export const useRestoreGrammarTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.grammarTopic.restoreGrammarTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics],
      });
    },
  });
};

export const useForceDeleteGrammarTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.grammarTopic.forceDeleteGrammarTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRAMMAR_TOPIC_QUERY_KEYS.getGrammarTopics],
      });
    },
  });
};
