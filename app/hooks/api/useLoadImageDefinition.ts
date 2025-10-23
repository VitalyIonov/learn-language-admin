import { type ImageDefinitionOut } from "~/types/api";
import { type AxiosResponse } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: ImageDefinitionOut["id"] | null;
};

type Options = Omit<
  UseQueryOptions<
    AxiosResponse<ImageDefinitionOut>,
    unknown,
    AxiosResponse<ImageDefinitionOut>
  >,
  "queryKey" | "queryFn"
>;

export const useLoadImageDefinition = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/image_definitions/${id}`;

  const { data, isFetching } = useQuery<
    AxiosResponse<ImageDefinitionOut>,
    unknown
  >({
    queryKey: [url],
    queryFn: () => apiClient.get(url),
    ...options,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { definition: data?.data, isFetching, invalidate };
};
