import { ApiResponse } from "../api";

export type TSetting = {
  id: string;
  appName: string;
  appDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  createdAt: string;
  updatedAt: string;
};

export type TSettingPayload = Omit<TSetting, "id" | "createdAt" | "updatedAt">;

export type TSettingResponse = ApiResponse<{
  setting: TSetting;
}>;

export type TUpdateSettingResponse = ApiResponse<TSetting>;
