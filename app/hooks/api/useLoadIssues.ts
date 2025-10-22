import { type GetIssuesIssuesGetResult } from "~/types/api-generated";
import { type GetIssuesIssuesGetParams } from "~/types/api";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadIssues = (params: GetIssuesIssuesGetParams) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/issues", params);

  const { data, isFetching } = useQuery<GetIssuesIssuesGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return {
    issues: data?.data.items,
    meta: data?.data.meta,
    isFetching,
    invalidate,
  };
};
