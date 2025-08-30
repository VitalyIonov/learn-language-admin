import type { TextDefinitionOut, TextDefinitionUpdate } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: TextDefinitionOut["id"] | null;
};

export const useUpdateTextDefinition = ({ id }: Params) => {
  const url = `admin/text_definitions/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: TextDefinitionUpdate) =>
      apiClient.patch<TextDefinitionOut, TextDefinitionUpdate>(url, data),
  });

  return { updateDefinition: mutateAsync };
};
