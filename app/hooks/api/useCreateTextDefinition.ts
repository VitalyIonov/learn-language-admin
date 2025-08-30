import type { TextDefinitionOut, TextDefinitionCreate } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useCreateTextDefinition = () => {
  const url = "admin/text_definitions";

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: TextDefinitionCreate) =>
      apiClient.post<TextDefinitionOut, TextDefinitionCreate>(url, data),
  });

  return { createDefinition: mutateAsync };
};
