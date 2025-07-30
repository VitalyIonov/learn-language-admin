import { type ReadLevelsApiV1LevelsGetResult } from '~/types/api-generated';
import { type ReadLevelsApiV1LevelsGetParams } from '~/types/api';
import { buildUrlWithParams } from '~/lib/url';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useLoadLevels = (params: ReadLevelsApiV1LevelsGetParams = {}) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams('admin/levels', params);

  const { data, isFetching } = useQuery<ReadLevelsApiV1LevelsGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { levels: data?.data.items, meta: data?.data.meta, isFetching, invalidate };
};
