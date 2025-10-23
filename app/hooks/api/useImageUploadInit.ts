import { type ImageAssetUpload, type ImageAssetUploadOut } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useImageUploadInit = () => {
  const url = "admin/images/upload-init";

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: ImageAssetUpload) =>
      apiClient.post<ImageAssetUploadOut, ImageAssetUpload>(url, data),
  });

  return { imageUploadInit: mutateAsync };
};
