import { type GetIssueStatusesIssueStatusesGetResult } from "~/types/api-generated";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadIssueStatuses = () => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/issue_statuses");

  const { data, isFetching } = useQuery<GetIssueStatusesIssueStatusesGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return {
    issueStatuses: data?.data.items,
    isFetching,
    invalidate,
  };
};
