import type { ImageDefinitionOut, ImageDefinitionUpdate } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: ImageDefinitionOut["id"] | null;
};

export const useUpdateImageDefinition = ({ id }: Params) => {
  const url = `admin/image_definitions/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: ImageDefinitionUpdate) =>
      apiClient.patch<ImageDefinitionOut, ImageDefinitionUpdate>(url, data),
  });

  return { updateDefinition: mutateAsync };
};
