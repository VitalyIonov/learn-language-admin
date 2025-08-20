import { type ReadQuestionTypesQuestionTypesGetResult } from "~/types/api-generated";
import { buildUrlWithParams } from "~/lib/url";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "~/lib/apiClient/apiClient";

export const useLoadQuestionTypes = () => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams("admin/question_types");

  const { data, isFetching } =
    useQuery<ReadQuestionTypesQuestionTypesGetResult>(
      { queryKey: [url], queryFn: () => apiClient.get(url) },
      queryClient,
    );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return {
    questionTypes: data?.data.items,
    isFetching,
    invalidate,
  };
};
