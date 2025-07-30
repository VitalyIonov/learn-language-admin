import { type MeaningCreate, type MeaningOut } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useCreateMeaning = () => {
  const url = 'admin/meanings';

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: MeaningCreate) => apiClient.post<MeaningOut, MeaningCreate>(url, data),
  });

  return { createMeaning: mutateAsync };
};
