import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type CreateCategoryFormValues } from '~/routes/categories/components/create-category-sheet/types';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const useCreateCategoryForm = () => {
  const formMethods = useForm<CreateCategoryFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
    },
    resolver: async (data, context, options) => {
      return zodResolver(schema)(data, context, options);
    },
  });

  const { handleSubmit, watch, control } = formMethods;

  const formValues = watch();

  return {
    formMethods,
    control,
    formValues,
  };
};
