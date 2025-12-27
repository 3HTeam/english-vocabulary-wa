import { TUploadResponse } from "@/types/upload.type";
import axiosClient from "../config/axios-client";
import { UPLOAD_ENDPOINTS } from "../config/end-point";
import { AxiosProgressEvent } from "axios";

export async function uploadServices(
  payload: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<TUploadResponse> {
  try {
    const res = await axiosClient.post<TUploadResponse>(
      UPLOAD_ENDPOINTS.upload,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
