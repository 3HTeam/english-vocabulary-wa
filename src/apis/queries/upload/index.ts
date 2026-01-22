import { AxiosProgressEvent } from "axios";
import { useMutation } from "@tanstack/react-query";

import { apiServices } from "@/apis/services";

interface UseUploadMutationOptions {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const useUploadMutation = (options?: UseUploadMutationOptions) => {
  return useMutation({
    mutationFn: (payload: FormData) =>
      apiServices.upload.postUpload(payload, options?.onUploadProgress),
  });
};
