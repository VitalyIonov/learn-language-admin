import { type ReadMeaningsApiV1MeaningsGetResult } from '~/types/api-generated';
import { type ReadMeaningsApiV1MeaningsGetParams } from '~/types/api';
import { buildUrlWithParams } from '~/lib/url';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useLoadMeanings = (params: ReadMeaningsApiV1MeaningsGetParams) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams('admin/meanings', params);

  const { data, isFetching } = useQuery<ReadMeaningsApiV1MeaningsGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { meanings: data?.data.items, meta: data?.data.meta, isFetching, invalidate };
};
