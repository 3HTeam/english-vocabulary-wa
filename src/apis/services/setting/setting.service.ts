import { axiosClient, SETTING_ENDPOINTS } from "@/apis/config";
import {
  TSettingPayload,
  TSettingResponse,
  TUpdateSettingResponse,
} from "@/types/features/setting";

export async function getSetting(): Promise<TSettingResponse> {
  try {
    const res = await axiosClient.get<TSettingResponse>(SETTING_ENDPOINTS.base);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateSetting(
  payload: TSettingPayload,
): Promise<TUpdateSettingResponse> {
  try {
    const res = await axiosClient.put<TUpdateSettingResponse>(
      SETTING_ENDPOINTS.base,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
