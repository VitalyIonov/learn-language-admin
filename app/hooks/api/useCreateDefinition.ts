import type { DefinitionOut, DefinitionCreate } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

export const useCreateDefinition = () => {
  const url = 'admin/definitions';

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: DefinitionCreate) =>
      apiClient.post<DefinitionOut, DefinitionCreate>(url, data),
  });

  return { createDefinition: mutateAsync };
};
