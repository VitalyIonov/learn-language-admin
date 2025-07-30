import { type ReadCategoriesApiV1CategoriesGetResult } from '~/types/api-generated';
import { type ReadCategoriesApiV1CategoriesGetParams } from '~/types/api';
import { buildUrlWithParams } from '~/lib/url';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useLoadCategories = (params: ReadCategoriesApiV1CategoriesGetParams = {}) => {
  const queryClient = useQueryClient();
  const url = buildUrlWithParams('admin/categories', params);

  const { data, isFetching } = useQuery<ReadCategoriesApiV1CategoriesGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { categories: data?.data.items, meta: data?.data.meta, isFetching, invalidate };
};
