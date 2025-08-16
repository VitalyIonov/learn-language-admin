import { type CategoryUpdate, type CategoryOut } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: CategoryOut["id"] | null;
};

export const useUpdateMeaning = ({ id }: Params) => {
  const url = `admin/meanings/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: CategoryUpdate) =>
      apiClient.patch<CategoryOut, CategoryUpdate>(url, data),
  });

  return { updateMeaning: mutateAsync };
};
