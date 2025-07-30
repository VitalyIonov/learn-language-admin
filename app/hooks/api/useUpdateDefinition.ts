import type { DefinitionOut, DefinitionUpdate } from '~/types/api';

import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/lib/apiClient/apiClient';

type Params = {
  id: DefinitionOut['id'] | null;
};

export const useUpdateDefinition = ({ id }: Params) => {
  const url = `admin/definitions/${id}`;

  const { mutateAsync } = useMutation({
    mutationKey: [url],
    mutationFn: (data: DefinitionUpdate) =>
      apiClient.patch<DefinitionOut, DefinitionUpdate>(url, data),
  });

  return { updateDefinition: mutateAsync };
};
