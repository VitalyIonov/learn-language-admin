import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/lib/apiClient/apiClient";
import type { CategoryOut, CategoryUpdate } from "~/types/api";

type Props = {
  id: CategoryOut["id"] | null;
};

export const useUpdateCategory = ({ id }: Props) => {
  const url = `admin/categories/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: CategoryUpdate) =>
      apiClient.patch<CategoryOut, CategoryUpdate>(url, data),
  });

  return { updateCategory: mutateAsync };
};
