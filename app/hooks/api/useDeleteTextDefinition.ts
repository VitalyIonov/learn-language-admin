import { type TextDefinitionOut } from "~/types/api";
import type { UseMutationOptions } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: TextDefinitionOut["id"];
};

export const useDeleteTextDefinition = (
  options?: UseMutationOptions<void, unknown, Params>,
) => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const url = `admin/text_definitions/${id}`;

      await apiClient.delete(url);
    },
    ...options,
  });

  return { deleteDefinition: mutateAsync };
};
