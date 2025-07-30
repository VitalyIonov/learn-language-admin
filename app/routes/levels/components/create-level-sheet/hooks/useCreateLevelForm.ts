import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type CreateLevelFormValues } from '~/routes/levels/components/create-level-sheet/types';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  alias: z.string().min(1, 'Alias is required'),
});

export const useCreateLevelForm = () => {
  const formMethods = useForm<CreateLevelFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      alias: '',
    },
    resolver: async (data, context, options) => {
      return zodResolver(schema)(data, context, options);
    },
  });

  const { watch, control } = formMethods;

  const formValues = watch();

  return {
    formMethods,
    control,
    formValues,
  };
};
