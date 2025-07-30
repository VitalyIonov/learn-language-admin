import { type LevelOut } from '~/types/api';
import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: LevelOut['id'];
};

export const useDeleteLevel = (options?: UseMutationOptions<void, unknown, Params>) => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const url = `admin/levels/${id}`;

      await apiClient.delete(url);
    },
    ...options,
  });

  return { deleteLevel: mutateAsync };
};
