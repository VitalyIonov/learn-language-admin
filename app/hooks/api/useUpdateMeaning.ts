import { type MeaningUpdate, type MeaningOut } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: MeaningOut['id'] | null;
};

export const useUpdateMeaning = ({ id }: Params) => {
  const url = `admin/meanings/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: MeaningUpdate) => apiClient.patch<MeaningOut, MeaningUpdate>(url, data),
  });

  return { updateMeaning: mutateAsync };
};
