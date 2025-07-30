import { type MeaningOut } from '~/types/api';
import { type AxiosResponse } from 'axios';
import type { UseQueryOptions } from '@tanstack/react-query';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: MeaningOut['id'] | null;
};

type Options = Omit<
  UseQueryOptions<AxiosResponse<MeaningOut>, unknown, AxiosResponse<MeaningOut>>,
  'queryKey' | 'queryFn'
>;

export const useLoadMeaning = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/meanings/${id}`;

  const { data, isFetching } = useQuery<AxiosResponse<MeaningOut>, unknown>({
    queryKey: [url],
    queryFn: () => apiClient.get(url),
    ...options,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { meaning: data?.data, isFetching, invalidate };
};
