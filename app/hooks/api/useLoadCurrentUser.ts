import { type ReadUserApiV1CurrentUserGetResult } from '~/types/api-generated';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useLoadCurrentUser = () => {
  const queryClient = useQueryClient();
  const url = 'admin/current_user';

  const { data, isFetching } = useQuery<ReadUserApiV1CurrentUserGetResult>(
    { queryKey: [url], queryFn: () => apiClient.get(url) },
    queryClient,
  );

  return { currentUser: data?.data, isFetching };
};
