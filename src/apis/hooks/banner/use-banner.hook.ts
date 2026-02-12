import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TBannerPayload } from "@/types/features/banner";

import { BANNER_QUERY_KEYS } from "./constants";

export const useGetBannerQuery = (params: TParams) => {
  return useQuery({
    queryKey: [BANNER_QUERY_KEYS.getBanner, params],
    queryFn: () => apiServices.banner.getBanner(params),
  });
};

export const useGetBannerByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [BANNER_QUERY_KEYS.getBannerById, id],
    queryFn: () => apiServices.banner.getBannerById(id),
  });
};

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TBannerPayload) =>
      apiServices.banner.createBanner(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [BANNER_QUERY_KEYS.getBanner],
      });
    },
  });
};

export const useUpdateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TBannerPayload }) =>
      apiServices.banner.updateBanner(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BANNER_QUERY_KEYS.getBanner],
      });
    },
  });
};

export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.banner.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BANNER_QUERY_KEYS.getBanner],
      });
    },
  });
};

export const useRestoreBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.banner.restoreBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BANNER_QUERY_KEYS.getBanner],
      });
    },
  });
};

export const useForceDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.banner.forceDeleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BANNER_QUERY_KEYS.getBanner],
      });
    },
  });
};
