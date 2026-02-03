import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TOnboardingPayload } from "@/types/features/onboarding";

import { ONBOARDING_QUERY_KEYS } from "./constants";

export const useGetOnboardingQuery = (params: TParams) => {
  return useQuery({
    queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding, params],
    queryFn: () => apiServices.onboarding.getOnboarding(params),
  });
};

export const useGetOnboardingByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [ONBOARDING_QUERY_KEYS.getOnboardingById, id],
    queryFn: () => apiServices.onboarding.getOnboardingById(id),
  });
};

export const useCreateOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TOnboardingPayload) =>
      apiServices.onboarding.createOnboarding(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding],
      });
    },
  });
};

export const useUpdateOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TOnboardingPayload;
    }) => apiServices.onboarding.updateOnboarding(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding],
      });
    },
  });
};

export const useDeleteOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.onboarding.deleteOnboarding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding],
      });
    },
  });
};

export const useRestoreOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.onboarding.restoreOnboarding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding],
      });
    },
  });
};

export const useForceDeleteOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiServices.onboarding.forceDeleteOnboarding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONBOARDING_QUERY_KEYS.getOnboarding],
      });
    },
  });
};
