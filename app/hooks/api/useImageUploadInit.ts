import { type UploadImageResponse, type UploadImageRequest } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useImageUploadInit = () => {
  const url = "admin/images/upload-init";

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: UploadImageRequest) =>
      apiClient.post<UploadImageResponse, UploadImageRequest>(url, data),
  });

  return { imageUploadInit: mutateAsync };
};
