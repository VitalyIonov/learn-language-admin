import { useEffect } from "react";
import { Form as BaseForm } from "~/components/form";
import {
  InputFileField,
  LevelsField,
  MeaningsField,
  CategoriesField,
} from "~/components/form-fields";
import { useForm } from "~/routes/image-definitions/hooks/use-form";
import { type Schema } from "~/routes/image-definitions/schema";

type Props = {
  id: string;
  defaultValues?: Schema;
  imageUrl?: string;
  onSubmit: (data: Schema) => void;
};

export function Form({ id, defaultValues, imageUrl, onSubmit }: Props) {
  const { formMethods, control } = useForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <BaseForm methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputFileField
        name="imageId"
        label="Definition Image"
        control={control}
        accept="image/*"
        initialImageUrl={imageUrl}
      />
      <CategoriesField name="categoryId" label="Category" control={control} />
      <LevelsField name="levelId" label="Level" control={control} />
      <MeaningsField name="meaningIds" label="Meanings" control={control} />
    </BaseForm>
  );
}
