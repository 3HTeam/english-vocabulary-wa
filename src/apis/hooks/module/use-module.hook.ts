import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TModulePayload } from "@/types/features/module";

import { MODULE_QUERY_KEYS } from "./constants";

export const useGetModuleQuery = (params: TParams) => {
  return useQuery({
    queryKey: [MODULE_QUERY_KEYS.getModule, params],
    queryFn: () => apiServices.module.getModule(params),
  });
};

export const useGetModuleByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [MODULE_QUERY_KEYS.getModuleById, id],
    queryFn: () => apiServices.module.getModuleById(id),
  });
};

export const useCreateModuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TModulePayload) =>
      apiServices.module.createModule(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [MODULE_QUERY_KEYS.getModule],
      });
    },
  });
};

export const useUpdateModuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TModulePayload }) =>
      apiServices.module.updateModule(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MODULE_QUERY_KEYS.getModule],
      });
    },
  });
};

export const useDeleteModuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.module.deleteModule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MODULE_QUERY_KEYS.getModule],
      });
    },
  });
};

export const useRestoreModuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.module.restoreModule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MODULE_QUERY_KEYS.getModule],
      });
    },
  });
};

export const useForceDeleteModuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.module.forceDeleteModule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MODULE_QUERY_KEYS.getModule],
      });
    },
  });
};
