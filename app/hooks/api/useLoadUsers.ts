import { type ReadUsersUsersGetResult } from "~/types/api-generated";
import { type ReadUsersUsersGetParams } from "~/types/api";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadUsers = (params: ReadUsersUsersGetParams = {}) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/users", params);

  const { data, isFetching } = useQuery<ReadUsersUsersGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return {
    users: data?.data.items,
    meta: data?.data.meta,
    isFetching,
    invalidate,
  };
};
