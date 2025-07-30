import { type DefinitionOutIds } from '~/types/api';
import { type AxiosResponse } from 'axios';
import type { UseQueryOptions } from '@tanstack/react-query';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: DefinitionOutIds['id'] | null;
};

type Options = Omit<
  UseQueryOptions<AxiosResponse<DefinitionOutIds>, unknown, AxiosResponse<DefinitionOutIds>>,
  'queryKey' | 'queryFn'
>;

export const useLoadDefinition = ({ id }: Params, options?: Options) => {
  const queryClient = useQueryClient();
  const url = `admin/definitions/${id}`;

  const { data, isFetching } = useQuery<AxiosResponse<DefinitionOutIds>, unknown>({
    queryKey: [url],
    queryFn: () => apiClient.get(url),
    ...options,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: [url] });
  };

  return { definition: data?.data, isFetching, invalidate };
};
