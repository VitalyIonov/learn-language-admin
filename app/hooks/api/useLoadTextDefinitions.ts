import { type ReadTextDefinitionsTextDefinitionsGetResult } from "~/types/api-generated";
import { type ReadTextDefinitionsTextDefinitionsGetParams } from "~/types/api";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadTextDefinitions = (
  params: ReadTextDefinitionsTextDefinitionsGetParams,
) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/text_definitions", params);

  const { data, isFetching } =
    useQuery<ReadTextDefinitionsTextDefinitionsGetResult>(
      { queryKey: [url], queryFn: () => apiClient.get(url) },
      queryClient,
    );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return {
    definitions: data?.data.items,
    meta: data?.data.meta,
    isFetching,
    invalidate,
  };
};
