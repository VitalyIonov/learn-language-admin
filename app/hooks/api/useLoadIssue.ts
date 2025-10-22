import { type IssueOut } from "~/types/api";
import { type AxiosResponse } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: IssueOut["id"] | null;
};

type Options = Omit<
  UseQueryOptions<AxiosResponse<IssueOut>, unknown, AxiosResponse<IssueOut>>,
  "queryKey" | "queryFn"
>;

export const useLoadIssue = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/issues/${id}`;

  const { data, isFetching } = useQuery<AxiosResponse<IssueOut>, unknown>({
    queryKey: [url],
    queryFn: () => apiClient.get(url),
    ...options,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { issue: data?.data, isFetching, invalidate };
};
