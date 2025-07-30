import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Form } from '~/components/form';
import { useCreateCategoryForm } from '~/routes/categories/components/create-category-sheet/hooks/useCreateCategoryForm';
import { type CreateCategoryFormValues } from '~/routes/categories/components/create-category-sheet/types';

type Props = {
  id: string;
  onSubmit: (data: CreateCategoryFormValues) => void;
};

export const CreateCategoryForm = ({ id, onSubmit }: Props) => {
  const { formMethods, control } = useCreateCategoryForm();

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input placeholder="category" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};
