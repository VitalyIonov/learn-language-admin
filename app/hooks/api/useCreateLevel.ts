import { type LevelCreate, type LevelOut } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useCreateLevel = () => {
  const url = 'admin/levels';

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: LevelCreate) => apiClient.post<LevelOut, LevelCreate>(url, data),
  });

  return { createLevel: mutateAsync };
};
