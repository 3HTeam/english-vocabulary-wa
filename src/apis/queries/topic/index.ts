import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiServices } from "@/apis";
import { type Params } from "@/types";
import { TTopicPayload } from "@/types";
import { TOPIC_QUERY_KEYS } from "./constants";

export const useGetTopicQuery = (params?: Params) => {
  return useQuery({
    queryKey: [TOPIC_QUERY_KEYS.getTopic, params],
    queryFn: () => apiServices.topic.getTopic(params),
  });
};

export const useGetTopicByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [TOPIC_QUERY_KEYS.getTopicById, id],
    queryFn: () => apiServices.topic.getTopicById(id),
    enabled: !!id,
  });
};
export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TTopicPayload) =>
      apiServices.topic.createTopic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TOPIC_QUERY_KEYS.getTopic] });
    },
  });
};

export const useUpdateTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TTopicPayload }) =>
      apiServices.topic.updateTopic(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TOPIC_QUERY_KEYS.getTopic] });
    },
  });
};

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.topic.deleteTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TOPIC_QUERY_KEYS.getTopic] });
    },
  });
};
