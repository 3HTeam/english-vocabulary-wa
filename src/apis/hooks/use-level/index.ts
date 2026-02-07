import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TLevelPayload } from "@/types/features/level";

import { LEVEL_QUERY_KEYS } from "./contants";

export const useGetLevelQuery = (params?: TParams) => {
  return useQuery({
    queryKey: [LEVEL_QUERY_KEYS.getLevel, params],
    queryFn: () => apiServices.level.getLevel(params),
  });
};

export const useGetLevelByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [LEVEL_QUERY_KEYS.getLevelById, id],
    queryFn: () => apiServices.level.getLevelById(id),
    enabled: !!id,
  });
};

export const useCreateLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TLevelPayload) =>
      apiServices.level.createLevel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEVEL_QUERY_KEYS.getLevel] });
    },
  });
};

export const useUpdateLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TLevelPayload }) =>
      apiServices.level.updateLevel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEVEL_QUERY_KEYS.getLevel] });
    },
  });
};

export const useDeleteLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.level.deleteLevel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEVEL_QUERY_KEYS.getLevel] });
    },
  });
};

export const useRestoreLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.level.restoreLevel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEVEL_QUERY_KEYS.getLevel] });
    },
  });
};

export const useForceDeleteLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.level.forceDeleteLevel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEVEL_QUERY_KEYS.getLevel] });
    },
  });
};
