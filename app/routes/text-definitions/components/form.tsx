import { useEffect } from "react";
import { Form as BaseForm } from "~/components/form";
import {
  InputField,
  LevelsField,
  MeaningsField,
  CategoriesField,
} from "~/components/form-fields";
import { useForm } from "~/routes/text-definitions/hooks/use-form";
import { type Schema } from "~/routes/text-definitions/schema";

type Props = {
  id: string;
  defaultValues?: Schema;
  onSubmit: (data: Schema) => void;
};

export function Form({ id, defaultValues, onSubmit }: Props) {
  const { formMethods, control } = useForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <BaseForm methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="text" label="Definition text" control={control} />
      <CategoriesField name="categoryId" label="Category" control={control} />
      <LevelsField name="levelId" label="Level" control={control} />
      <MeaningsField name="meaningIds" label="Meanings" control={control} />
    </BaseForm>
  );
}
