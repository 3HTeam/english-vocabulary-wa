import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TPopupPayload } from "@/types/features/popup";

import { POPUP_QUERY_KEYS } from "./constants";

export const useGetPopupQuery = (params: TParams) => {
  return useQuery({
    queryKey: [POPUP_QUERY_KEYS.getPopup, params],
    queryFn: () => apiServices.popup.getPopup(params),
  });
};

export const useGetPopupByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [POPUP_QUERY_KEYS.getPopupById, id],
    queryFn: () => apiServices.popup.getPopupById(id),
  });
};

export const useCreatePopupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TPopupPayload) =>
      apiServices.popup.createPopup(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [POPUP_QUERY_KEYS.getPopup],
      });
    },
  });
};

export const useUpdatePopupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TPopupPayload }) =>
      apiServices.popup.updatePopup(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POPUP_QUERY_KEYS.getPopup],
      });
    },
  });
};

export const useDeletePopupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.popup.deletePopup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POPUP_QUERY_KEYS.getPopup],
      });
    },
  });
};

export const useRestorePopupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.popup.restorePopup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POPUP_QUERY_KEYS.getPopup],
      });
    },
  });
};

export const useForceDeletePopupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiServices.popup.forceDeletePopup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POPUP_QUERY_KEYS.getPopup],
      });
    },
  });
};
