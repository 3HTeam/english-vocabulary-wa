import { ApiResponse } from "./base";

export type TUpload = {
  publicId: string;
  url: string;
  resourceType: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
};

export type TUploadResponse = ApiResponse<TUpload>;
