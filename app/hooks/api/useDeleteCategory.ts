import { type CategoryOut } from "~/types/api";
import type { UseMutationOptions } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: CategoryOut["id"];
};

export const useDeleteCategory = (
  options?: UseMutationOptions<void, unknown, Params>,
) => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const url = `admin/categories/${id}`;

      await apiClient.delete(url);
    },
    ...options,
  });

  return { deleteCategory: mutateAsync };
};
