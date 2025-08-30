import { useEffect, type ChangeEvent } from "react";
import { Form } from "~/components/form";
import { InputField, InputFileField } from "~/components/form-fields";
import { useCategoryForm } from "~/routes/categories/hooks/use-category-form";
import { type Schema } from "~/routes/categories/schema";

type Props = {
  id: string;
  defaultValues?: Schema;
  imageUrl?: string;
  onSubmit: (data: Schema) => void;
};

export function CategoryForm({ id, defaultValues, onSubmit, imageUrl }: Props) {
  const { formMethods, control } = useCategoryForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues, formMethods]);

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="name" label="Category Name" control={control} />
      <InputFileField
        name="imageId"
        label="Category Image"
        control={control}
        accept="image/*"
        initialImageUrl={imageUrl}
      />
    </Form>
  );
}
