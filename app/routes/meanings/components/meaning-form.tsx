import { useEffect } from 'react';
import { Form } from '~/components/form';
import { InputField, LevelsField, CategoriesField } from '~/components/form-fields';
import { useMeaningForm } from '~/routes/meanings/hooks/use-meaning-form';
import { type Schema } from '~/routes/meanings/schema';

type Props = {
  id: string;
  defaultValues?: Schema;
  onSubmit: (data: Schema) => void;
};

export function MeaningForm({ id, defaultValues, onSubmit }: Props) {
  const { formMethods, control } = useMeaningForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="name" label="Meaning Name" control={control} />
      <CategoriesField name="categoryId" label="Category" control={control} />
      <LevelsField name="levelId" label="Level" control={control} />
    </Form>
  );
}
