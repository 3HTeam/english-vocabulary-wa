import { AxiosProgressEvent } from "axios";

import { axiosClient, UPLOAD_ENDPOINTS } from "@/apis/config";
import { TUploadResponse } from "@/types/features";

export async function postUpload(
  payload: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
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
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
