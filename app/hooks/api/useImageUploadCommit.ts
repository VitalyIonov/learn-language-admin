import { type CommitImageResponse, type CommitImageRequest } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useImageUploadCommit = () => {
  const url = "admin/images/upload-commit";

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: CommitImageRequest) =>
      apiClient.post<CommitImageResponse, CommitImageRequest>(url, data),
  });

  return { imageUploadCommit: mutateAsync };
};
