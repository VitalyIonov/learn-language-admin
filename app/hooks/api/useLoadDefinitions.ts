import { type ReadDefinitionsDefinitionsGetResult } from "~/types/api-generated";
import { type ReadDefinitionsApiV1DefinitionsGetParams } from "~/types/api";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadDefinitions = (
  params: ReadDefinitionsApiV1DefinitionsGetParams,
) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/definitions", params);

  const { data, isFetching } = useQuery<ReadDefinitionsDefinitionsGetResult>(
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
