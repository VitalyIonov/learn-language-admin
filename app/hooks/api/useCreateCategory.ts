import { type CategoryCreate, type CategoryOut } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useCreateCategory = () => {
  const url = 'admin/categories';

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: CategoryCreate) => apiClient.post<CategoryOut, CategoryCreate>(url, data),
  });

  return { createCategory: mutateAsync };
};
