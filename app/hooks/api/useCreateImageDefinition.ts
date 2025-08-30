import type { ImageDefinitionOut, ImageDefinitionCreate } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useCreateImageDefinition = () => {
  const url = "admin/image_definitions";

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: ImageDefinitionCreate) =>
      apiClient.post<ImageDefinitionOut, ImageDefinitionCreate>(url, data),
  });

  return { createDefinition: mutateAsync };
};
