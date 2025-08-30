import { type ReadImageDefinitionsImageDefinitionsGetResult } from "~/types/api-generated";
import { type ReadImageDefinitionsImageDefinitionsGetParams } from "~/types/api";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadImageDefinitions = (
  params: ReadImageDefinitionsImageDefinitionsGetParams,
) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/image_definitions", params);

  const { data, isFetching } =
    useQuery<ReadImageDefinitionsImageDefinitionsGetResult>(
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
