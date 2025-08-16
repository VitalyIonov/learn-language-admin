import { type CategoryOut } from "~/types/api";
import { type AxiosResponse } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: CategoryOut["id"] | null;
};

type Options = Omit<
  UseQueryOptions<
    AxiosResponse<CategoryOut>,
    unknown,
    AxiosResponse<CategoryOut>
  >,
  "queryKey" | "queryFn"
>;

export const useLoadCategory = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/categories/${id}`;

  const { data, isFetching } = useQuery<AxiosResponse<CategoryOut>, unknown>({
    queryKey: [url],
    queryFn: () => apiClient.get(url),
    ...options,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { category: data?.data, isFetching, invalidate };
};
