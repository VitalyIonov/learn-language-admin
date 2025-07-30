import { type MeaningOut } from '~/types/api';
import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: MeaningOut['id'];
};

export const useDeleteMeaning = (options?: UseMutationOptions<void, unknown, Params>) => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const url = `admin/meanings/${id}`;

      await apiClient.delete(url);
    },
    ...options,
  });

  return { deleteMeaning: mutateAsync };
};
