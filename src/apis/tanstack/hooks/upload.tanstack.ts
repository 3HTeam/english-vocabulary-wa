import { apiServices } from "@/apis/services";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

interface UseUploadMutationOptions {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const useUploadMutation = (options?: UseUploadMutationOptions) => {
  return useMutation({
    mutationFn: (payload: FormData) =>
      apiServices.upload.postUpload(payload, options?.onUploadProgress),
  });
};
