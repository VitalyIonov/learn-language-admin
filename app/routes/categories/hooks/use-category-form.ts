import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type Schema } from '~/routes/categories/schema';

type Props = {
  defaultValues?: Schema;
};

export const useCategoryForm = ({ defaultValues }: Props = {}) => {
  const formMethods = useForm<Schema>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      ...defaultValues,
    },
    resolver: zodResolver(categorySchema),
  });

  const { control } = formMethods;

  return {
    formMethods,
    control,
  };
};
