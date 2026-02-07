import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";
import { TSettingPayload } from "@/types/features/setting";

import { SETTING_QUERY_KEYS } from "./constants";

export const useSettingQuery = () => {
  return useQuery({
    queryKey: [SETTING_QUERY_KEYS.getSetting],
    queryFn: () => apiServices.setting.getSetting(),
  });
};

export const useUpdateSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TSettingPayload) =>
      apiServices.setting.updateSetting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SETTING_QUERY_KEYS.getSetting],
      });
    },
  });
};
