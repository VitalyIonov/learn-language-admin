import { useEffect } from 'react';
import { Form } from '~/components/form';
import { InputField, LevelsField, MeaningsField, CategoriesField } from '~/components/form-fields';
import { useDefinitionForm } from '~/routes/definitions/hooks/use-definition-form';
import { type Schema } from '~/routes/definitions/schema';

type Props = {
  id: string;
  defaultValues?: Schema;
  onSubmit: (data: Schema) => void;
};

export function DefinitionForm({ id, defaultValues, onSubmit }: Props) {
  const { formMethods, control } = useDefinitionForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="text" label="Definition text" control={control} />
      <CategoriesField name="categoryId" label="Category" control={control} />
      <LevelsField name="levelId" label="Level" control={control} />
      <MeaningsField name="meaningIds" label="Meanings" control={control} />
    </Form>
  );
}
