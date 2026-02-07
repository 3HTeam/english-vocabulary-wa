import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TParams } from "@/types/api";
import { TUserPayload } from "@/types/features/user";

import { USER_QUERY_KEYS } from "./contains";

export const useGetUserQuery = (params?: TParams) => {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.getUserById, params],
    queryFn: () => apiServices.user.getUser(params),
  });
};

export const useGetUserByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.getUserById, id],
    queryFn: () => apiServices.user.getUserById(id),
    enabled: !!id,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TUserPayload }) =>
      apiServices.user.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.getUserById],
      });
    },
  });
};
