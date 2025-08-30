import { type TextDefinitionOutIds } from "~/types/api";
import { type AxiosResponse } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: TextDefinitionOutIds["id"] | null;
};

type Options = Omit<
  UseQueryOptions<
    AxiosResponse<TextDefinitionOutIds>,
    unknown,
    AxiosResponse<TextDefinitionOutIds>
  >,
  "queryKey" | "queryFn"
>;

export const useLoadTextDefinition = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/text_definitions/${id}`;

  const { data, isFetching } = useQuery<
    AxiosResponse<TextDefinitionOutIds>,
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
