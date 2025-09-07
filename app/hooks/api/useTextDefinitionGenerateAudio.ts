import type { TextDefinitionOut } from "~/types/api";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: TextDefinitionOut["id"] | null;
};

export const useTextDefinitionGenerateAudio = (
  options?: UseMutationOptions<void, unknown, Params>,
) => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const url = `admin/text_definitions/${id}/generate_audio`;

      await apiClient.post(url, {});
    },
    ...options,
  });

  return { generateTextDefinitionAudio: mutateAsync };
};
