import { useMutation, useQuery } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import {
  TRefreshTokenPayload,
  TSignInPayload,
  TSignUpPayload,
  TVerifyEmailPayload,
} from "@/types/features";

import { AUTH_QUERY_KEYS } from "./constants";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (payload: TSignUpPayload) => apiServices.auth.signUp(payload),
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (payload: TVerifyEmailPayload) =>
      apiServices.auth.verifyEmail(payload),
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (payload: TSignInPayload) => apiServices.auth.signIn(payload),
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: (payload?: TRefreshTokenPayload) =>
      apiServices.auth.refreshToken(payload),
  });
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: () => apiServices.auth.signOut(),
  });
};

export const useProfileQuery = () => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEYS.getProfile],
    queryFn: () => apiServices.auth.profile(),
  });
};
