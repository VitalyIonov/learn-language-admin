import { type IssueUpdate, type IssueOut } from "~/types/api";

import { useMutation } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

type Params = {
  id: IssueOut["id"] | null;
};

export const useUpdateIssue = ({ id }: Params) => {
  const url = `admin/issues/${id}`;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [url],
    mutationFn: (data: IssueUpdate) =>
      apiClient.patch<IssueOut, IssueUpdate>(url, data),
  });

  return { updateIssue: mutateAsync, isPending };
};
